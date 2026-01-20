import React from 'react'
import Plot from 'react-plotly.js'
import { convertToPefaScore, getPefaLetter, getPefaColor } from '../../utils/pefaUtils'

/**
 * Creates a PEFA heatmap chart matching the Streamlit version
 * Replicates create_pefa_heatmap from universal_viz.py
 */
const PefaHeatmap = ({ data, xColumn = 'year', yColumn = 'country_or_area', height = 500 }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-2">No data available for the selected filters.</p>
          <p className="text-sm text-gray-500">
            Make sure the API server is running: <code className="bg-gray-200 px-2 py-1 rounded">python api_server.py</code>
          </p>
        </div>
      </div>
    )
  }
  
  console.log('PefaHeatmap received data:', data.length, 'rows')

  // Convert values to PEFA scores
  const processedData = data.map(row => ({
    ...row,
    pefa_score: convertToPefaScore(row.value),
    pefa_letter: getPefaLetter(convertToPefaScore(row.value))
  })).filter(row => row.pefa_score !== null)

  if (processedData.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 min-h-[400px] flex items-center justify-center">
        <p className="text-gray-600">No valid PEFA score data available.</p>
      </div>
    )
  }

  // Get unique years and countries
  const years = [...new Set(processedData.map(d => d[xColumn]))].sort()
  const countries = [...new Set(processedData.map(d => d[yColumn]))].sort()

  // Create pivot table for heatmap
  const heatmapData = []
  const hoverText = []
  
  countries.forEach(country => {
    const row = []
    const hoverRow = []
    
    years.forEach(year => {
      const cellData = processedData.find(
        d => d[yColumn] === country && d[xColumn] === year
      )
      
      if (cellData) {
        row.push(cellData.pefa_score)
        hoverRow.push(
          `${country}<br>` +
          `Year: ${year}<br>` +
          `PEFA Score: ${cellData.pefa_score} (${cellData.pefa_letter})<br>` +
          `Value: ${cellData.value?.toFixed(1)}%`
        )
      } else {
        row.push(null)
        hoverRow.push('')
      }
    })
    
    heatmapData.push(row)
    hoverText.push(hoverRow)
  })

  // Create custom colorscale for discrete PEFA scores
  const pefaColorscale = [
    [0.0, '#F26C2B'],    // D (1) - Orange
    [0.249, '#F26C2B'],
    [0.25, '#99CCFF'],    // C (2) - Light Blue
    [0.499, '#99CCFF'],
    [0.5, '#3366CC'],     // B (3) - Medium Blue
    [0.749, '#3366CC'],
    [0.75, '#003366'],    // A (4) - Deep Blue
    [1.0, '#003366']
  ]

  const fig = {
    data: [{
      z: heatmapData,
      x: years,
      y: countries,
      text: hoverText,
      hoverinfo: 'text',
      type: 'heatmap',
      colorscale: pefaColorscale,
      zmin: 1,
      zmax: 4,
      showscale: false,
      colorbar: {
        title: 'PEFA Score',
        tickvals: [1, 2, 3, 4],
        ticktext: ['D (1)', 'C (2)', 'B (3)', 'A (4)']
      }
    }],
    layout: {
      height: Math.max(height, countries.length * 25 + 150),
      margin: { l: 150, r: 50, t: 50, b: 50 },
      xaxis: {
        title: 'Year',
        side: 'bottom'
      },
      yaxis: {
        title: 'Country',
        autorange: 'reversed'
      }
    },
    config: {
      displayModeBar: true,
      responsive: true
    }
  }

  return (
    <div>
      <Plot data={fig.data} layout={fig.layout} config={fig.config} style={{ width: '100%' }} />
      
      {/* PEFA Score Legend */}
      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <h5 className="text-[#002B7F] font-semibold mb-3">PEFA Score Legend</h5>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-[#003366] mx-auto rounded mb-2"></div>
            <strong>A (4)</strong><br />
            <small className="text-gray-600">95–105%</small>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-[#3366CC] mx-auto rounded mb-2"></div>
            <strong>B (3)</strong><br />
            <small className="text-gray-600">90–110%</small>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-[#99CCFF] mx-auto rounded mb-2"></div>
            <strong>C (2)</strong><br />
            <small className="text-gray-600">85–115%</small>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-[#F26C2B] mx-auto rounded mb-2"></div>
            <strong>D (1)</strong><br />
            <small className="text-gray-600">&lt;85% or &gt;115%</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PefaHeatmap

