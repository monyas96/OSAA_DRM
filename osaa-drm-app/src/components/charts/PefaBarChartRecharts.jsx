/**
 * PEFA Bar Chart using Recharts
 * Replicates the horizontal bar chart for PI-2 Expenditure Composition Outturn
 */
import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { convertToPefaScore, getPefaLetter, getPefaColor } from '../../utils/pefaUtils'

const PefaBarChartRecharts = ({ 
  data, 
  pefaView = 'PEFA: PI-2 Expenditure Composition Outturn',
  selectedYear = 'All Years',
  loading = false 
}) => {
  // Process data: convert values to PEFA scores
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return []
    
    return data.map(row => ({
      ...row,
      pefa_score: convertToPefaScore(row.value),
      pefa_letter: getPefaLetter(convertToPefaScore(row.value))
    })).filter(row => row.pefa_score !== null)
  }, [data])

  // Get latest year per country (or use selected year)
  const chartData = useMemo(() => {
    if (processedData.length === 0) return []
    
    let filtered = processedData
    
    if (selectedYear !== 'All Years') {
      filtered = filtered.filter(d => d.year === parseInt(selectedYear))
    } else {
      // Group by country and get the row with the max year for each
      const latestDataMap = new Map()
      filtered.forEach(row => {
        const currentLatest = latestDataMap.get(row.country_or_area)
        if (!currentLatest || row.year > currentLatest.year) {
          latestDataMap.set(row.country_or_area, row)
        }
      })
      filtered = Array.from(latestDataMap.values())
    }
    
    // Sort by score (descending) then alphabetically
    return filtered.sort((a, b) => {
      if (b.pefa_score !== a.pefa_score) {
        return b.pefa_score - a.pefa_score
      }
      return a.country_or_area.localeCompare(b.country_or_area)
    })
  }, [processedData, selectedYear])

  // Prepare data for Recharts
  const barData = useMemo(() => {
    return chartData.map(d => ({
      country: d.country_or_area,
      score: d.pefa_score,
      letter: d.pefa_letter,
      value: d.value,
      year: d.year,
      color: getPefaColor(d.pefa_score)
    }))
  }, [chartData])

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-8 border border-gray-200 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003366] mx-auto mb-2"></div>
          <p className="text-gray-600">Loading chart data...</p>
        </div>
      </div>
    )
  }

  if (barData.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 border border-gray-200 min-h-[400px] flex items-center justify-center">
        <p className="text-gray-600">No data available for the selected view and filters.</p>
      </div>
    )
  }

  const displayYear = selectedYear !== 'All Years' 
    ? selectedYear 
    : (barData.length > 0 ? Math.max(...barData.map(d => d.year)) : 'N/A')

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload
      return (
        <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg text-sm">
          <p className="font-semibold">{data.country}</p>
          <p>PEFA Score: {data.score} ({data.letter})</p>
          <p>Value: {data.value?.toFixed(1)}%</p>
          <p>Year: {data.year}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-[#003366]">
          {pefaView}
        </h4>
        {displayYear !== 'N/A' && (
          <p className="text-sm text-gray-600">{displayYear}</p>
        )}
      </div>
      
      <ResponsiveContainer width="100%" height={Math.max(400, barData.length * 30)}>
        <BarChart
          data={barData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            domain={[0.5, 4.5]}
            ticks={[1, 2, 3, 4]}
            label={{ value: 'PEFA Score (1-4)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            type="category" 
            dataKey="country" 
            width={140}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="score" radius={[0, 4, 4, 0]}>
            {barData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6">
        {[4, 3, 2, 1].map(score => (
          <div key={score} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: getPefaColor(score) }}
            />
            <span className="text-sm">
              Score {score} ({getPefaLetter(score)})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PefaBarChartRecharts

