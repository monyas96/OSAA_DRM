import React from 'react'
import Plot from 'react-plotly.js'
import { convertToPefaScore, getPefaLetter, getPefaColor } from '../../utils/pefaUtils'

/**
 * Creates a PEFA horizontal bar chart matching the Streamlit version
 * For Indicator 4.1.2.1 - Expenditure Composition Outturn
 */
const PefaBarChart = ({ data, selectedYear = 'All Years', title = '' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 min-h-[400px] flex items-center justify-center">
        <p className="text-gray-600">No data available for the selected view and filters.</p>
      </div>
    )
  }

  // Convert values to PEFA scores
  const processedData = data.map(row => ({
    ...row,
    pefa_score: convertToPefaScore(row.value),
    pefa_letter: getPefaLetter(convertToPefaScore(row.value))
  })).filter(row => row.pefa_score !== null)

  if (processedData.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 min-h-[400px] flex items-center justify-center">
        <p className="text-gray-600">No valid data available for the selected view and filters.</p>
      </div>
    )
  }

  // Filter by year if specified
  let chartData = processedData
  if (selectedYear !== 'All Years') {
    chartData = chartData.filter(d => d.year === parseInt(selectedYear))
  } else {
    // Use latest year per country
    const latestYearByCountry = {}
    chartData.forEach(d => {
      if (!latestYearByCountry[d.country_or_area] || d.year > latestYearByCountry[d.country_or_area]) {
        latestYearByCountry[d.country_or_area] = d.year
      }
    })
    chartData = chartData.filter(d => d.year === latestYearByCountry[d.country_or_area])
  }

  // Sort by score (descending) then alphabetically
  chartData.sort((a, b) => {
    if (b.pefa_score !== a.pefa_score) {
      return b.pefa_score - a.pefa_score
    }
    return a.country_or_area.localeCompare(b.country_or_area)
  })

  // Get unique countries
  const countries = [...new Set(chartData.map(d => d.country_or_area))]

  // Create color list for each country based on their score
  const countryColors = countries.map(country => {
    const countryData = chartData.find(d => d.country_or_area === country)
    return getPefaColor(countryData.pefa_score)
  })

  // Prepare data for plot
  const scores = countries.map(country => {
    const countryData = chartData.find(d => d.country_or_area === country)
    return countryData.pefa_score
  })

  const hoverText = countries.map(country => {
    const countryData = chartData.find(d => d.country_or_area === country)
    return (
      `<b>${country}</b><br>` +
      `PEFA Score: ${countryData.pefa_score}<br>` +
      `Year: ${countryData.year}<br>`
    )
  })

  // Get display year for subtitle
  const displayYear = selectedYear !== 'All Years' 
    ? selectedYear 
    : Math.max(...chartData.map(d => d.year))

  const fig = {
    data: [{
      x: scores,
      y: countries,
      type: 'bar',
      orientation: 'h',
      marker: {
        color: countryColors,
        line: { width: 1, color: 'white' }
      },
      text: scores.map(s => s.toString()),
      textposition: 'outside',
      hovertemplate: hoverText.map((h, i) => h + '<extra></extra>'),
      showlegend: false
    }],
    layout: {
      title: {
        text: `${title}<br><sub>${selectedYear !== 'All Years' ? displayYear : 'Latest Available Year'}</sub>`,
        font: { size: 16 }
      },
      xaxis: {
        title: 'PEFA Score (1-4)',
        range: [0.5, 4.5],
        tickmode: 'linear',
        tick0: 1,
        dtick: 1
      },
      yaxis: {
        title: 'Country',
        autorange: 'reversed'
      },
      height: Math.max(400, countries.length * 30),
      hovermode: 'closest',
      margin: { l: 150, r: 200, t: 80, b: 50 }
    },
    config: {
      displayModeBar: true,
      responsive: true
    }
  }

  // Add legend traces (invisible, for legend only)
  const scoreColors = {
    4: '#003366',  // A
    3: '#3366CC',  // B
    2: '#99CCFF',  // C
    1: '#F26C2B'   // D
  }

  for (let score = 4; score >= 1; score--) {
    const letter = getPefaLetter(score)
    fig.data.push({
      x: [null],
      y: [null],
      type: 'bar',
      name: `Score ${score} (${letter})`,
      marker: { color: scoreColors[score] },
      showlegend: true,
      legendgroup: `score_${score}`
    })
  }

  fig.layout.legend = {
    orientation: 'v',
    yanchor: 'top',
    y: 1,
    xanchor: 'left',
    x: 1.02,
    title: 'PEFA Score'
  }

  return <Plot data={fig.data} layout={fig.layout} config={fig.config} style={{ width: '100%' }} />
}

export default PefaBarChart

