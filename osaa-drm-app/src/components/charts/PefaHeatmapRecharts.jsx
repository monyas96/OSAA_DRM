/**
 * PEFA Heatmap using HTML Table (Recharts doesn't have native heatmap)
 * Replicates the PEFA heatmap from Streamlit with table-based visualization
 */
import React, { useMemo } from 'react'
import { convertToPefaScore, getPefaLetter, getPefaColor } from '../../utils/pefaUtils'

const PefaHeatmapRecharts = ({ 
  data, 
  refData, 
  selectedRegions = [],
  height = 500,
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

  // Filter by regions if provided, or filter to Africa only by default
  const filteredData = useMemo(() => {
    if (!refData || refData.length === 0) return processedData
    
    // Get all African countries
    const africaCountries = new Set(
      refData
        .filter(r => r['Region Name'] === 'Africa')
        .map(r => r['Country or Area'])
        .filter(Boolean)
    )
    
    // If specific regions are selected, filter by those regions
    if (selectedRegions.length > 0) {
      const regionCountries = refData
        .filter(r => r['Region Name'] === 'Africa' && selectedRegions.includes(r['Intermediate Region Name']))
        .map(r => r['Country or Area'])
      
      return processedData.filter(d => regionCountries.includes(d.country_or_area))
    }
    
    // Otherwise, filter to Africa only (default behavior)
    return processedData.filter(d => africaCountries.has(d.country_or_area))
  }, [processedData, selectedRegions, refData])

  // Create pivot table: country x year -> pefa_score
  const heatmapData = useMemo(() => {
    if (filteredData.length === 0) return []
    
    // Get unique countries and years
    const countries = [...new Set(filteredData.map(d => d.country_or_area))].sort()
    const years = [...new Set(filteredData.map(d => d.year))].sort((a, b) => a - b)
    
    // Sort countries by region if refData available
    let sortedCountries = countries
    if (refData) {
      const africaRef = refData.filter(r => r['Region Name'] === 'Africa')
      const countryRegionMap = new Map(
        africaRef.map(r => [r['Country or Area'], r['Intermediate Region Name']])
      )
      
      sortedCountries = countries.sort((a, b) => {
        const regionA = countryRegionMap.get(a) || ''
        const regionB = countryRegionMap.get(b) || ''
        if (regionA !== regionB) return regionA.localeCompare(regionB)
        return a.localeCompare(b)
      })
    }
    
    // Create data structure for heatmap
    const pivot = {}
    filteredData.forEach(row => {
      const key = `${row.country_or_area}_${row.year}`
      pivot[key] = {
        country: row.country_or_area,
        year: row.year,
        score: row.pefa_score,
        letter: row.pefa_letter,
        value: row.value
      }
    })
    
    // Transform to format Recharts can use
    // Each row is a country, columns are years
    return sortedCountries.map(country => {
      const row = { country }
      years.forEach(year => {
        const key = `${country}_${year}`
        row[year] = pivot[key]?.score || null
        row[`${year}_meta`] = pivot[key] || null
      })
      return row
    })
  }, [filteredData, refData])

  const years = useMemo(() => {
    if (filteredData.length === 0) return []
    return [...new Set(filteredData.map(d => d.year))].sort((a, b) => a - b)
  }, [filteredData])

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

  if (filteredData.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 border border-gray-200 min-h-[400px] flex items-center justify-center">
        <p className="text-gray-600">No data available for the selected filters.</p>
      </div>
    )
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload
      const year = payload[0].dataKey
      const meta = data[`${year}_meta`]
      
      if (meta) {
        return (
          <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg text-sm">
            <p className="font-semibold">{meta.country}</p>
            <p>Year: {meta.year}</p>
            <p>PEFA Score: {meta.score} ({meta.letter})</p>
            <p>Value: {meta.value?.toFixed(1)}%</p>
          </div>
        )
      }
    }
    return null
  }

  // Custom cell renderer for heatmap cells
  const renderCell = (entry, dataKey) => {
    const value = entry[dataKey]
    const meta = entry[`${dataKey}_meta`]
    
    if (value === null || value === undefined) {
      return <Cell key={dataKey} fill="#f3f4f6" /> // Gray for no data
    }
    
    const color = getPefaColor(value)
    return <Cell key={dataKey} fill={color} />
  }

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
      <div className="overflow-x-auto" style={{ maxHeight: `${height}px`, overflowY: 'auto' }}>
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-20 bg-gray-50">
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-50 text-left sticky left-0 z-30 min-w-[150px] font-semibold">
                Country
              </th>
              {years.map(year => (
                <th key={year} className="border border-gray-300 p-2 bg-gray-50 text-center min-w-[60px] font-semibold">
                  {year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 bg-gray-50 sticky left-0 z-10 font-medium text-xs">
                  {row.country}
                </td>
                {years.map(year => {
                  const score = row[year]
                  const meta = row[`${year}_meta`]
                  const color = score !== null ? getPefaColor(score) : '#f3f4f6'
                  const letter = meta?.letter || ''
                  
                  return (
                    <td
                      key={year}
                      className="border border-gray-300 p-2 text-center text-xs font-semibold cursor-help transition-colors hover:opacity-80"
                      style={{ 
                        backgroundColor: color, 
                        color: score === 1 ? 'white' : (score === 4 ? 'white' : '#1f2937'),
                        minWidth: '60px'
                      }}
                      title={meta ? `${row.country} - ${year}: ${meta.letter} (Score: ${meta.score}) - Value: ${meta.value?.toFixed(1)}%` : 'No data'}
                    >
                      {letter || '—'}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6 flex-wrap">
        {[4, 3, 2, 1].map(score => (
          <div key={score} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: getPefaColor(score) }}
            />
            <span className="text-sm">
              {getPefaLetter(score)} ({score}) - {score === 4 ? '95-105%' : score === 3 ? '90-110%' : score === 2 ? '85-115%' : '<85% or >115%'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PefaHeatmapRecharts

