import React, { useState, useEffect, useMemo } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts'
import { getIndicatorData, getPensionFundData } from '../../../services/dataService'

// Mapping from indicator codes to indicator labels
const INDICATOR_MAP = {
  '4.3.1.1': 'Market capitalization of listed domestic companies (current US$)',
  '4.3.1.2': 'Portfolio investment, bonds (PPG + PNG) (NFL, current US$)',
  '4.3.1.3': 'Adequacy of International Reserves',
  '4.3.2.1': 'Banking Sector Development Index',
  '4.3.2.2': 'Private Sector Credit to GDP',
  '4.3.3.1': 'Pension Funds and Sovereign Wealth Funds',
  '4.2.2.1': 'Tax Effort (Actual / Capacity)',
  '4.2.2.2.a': 'Tax Buoyancy (Elasticity)',
  '4.2.2.2.b': 'Tax Gap (% of GDP)',
  '4.4.2.1': 'Trade Mispricing (current US$)',
  '4.4.2.2': 'Tax Evasion ISORA Data',
  '4.4.2.3': 'Criminal Activities IFF (current US$)',
  '4.4.2.4': 'Corruption and Bribery',
  '4.4.3.1': 'Control of Corruption: Estimate',
  '4.4.4.1': 'Financial Secrecy Index'
}

/**
 * Component to embed graphs using API data
 * @param {string} indicator - The indicator code (e.g., "4.3.1.1")
 * @param {string} title - Graph title
 * @param {string} subtitle - Graph subtitle
 * @param {string} caption - Caption text below the graph
 * @param {object} filters - Filter configuration (countries, years, view type)
 * @param {string} viewType - Type of view (line, bar, stacked_bar)
 * @param {number} height - Graph height in pixels
 */
const StreamlitGraphEmbed = ({ 
  indicator, 
  title, 
  subtitle, 
  caption,
  filters = {},
  viewType = 'line',
  height = 500
}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get indicator label from mapping
        const indicatorLabel = INDICATOR_MAP[indicator]
        if (!indicatorLabel) {
          throw new Error(`Unknown indicator code: ${indicator}`)
        }

        // Prepare filters
        const apiFilters = {}
        
        // Handle countries
        if (filters.countries) {
          if (Array.isArray(filters.countries)) {
            apiFilters.countries = filters.countries
          } else if (typeof filters.countries === 'string') {
            if (filters.countries === 'all') {
              // Don't filter by countries
            } else {
              apiFilters.countries = filters.countries.split(',').map(c => c.trim())
            }
          }
        }

        // Handle years
        if (filters.years) {
          if (filters.years === 'all' || filters.years === 'latest') {
            // Don't set year filters
          } else if (typeof filters.years === 'string' && filters.years.includes('-')) {
            const [start, end] = filters.years.split('-').map(y => parseInt(y.trim()))
            if (!isNaN(start)) apiFilters.yearStart = start
            if (!isNaN(end)) apiFilters.yearEnd = end
          } else {
            const year = parseInt(filters.years)
            if (!isNaN(year)) {
              apiFilters.yearStart = year
              apiFilters.yearEnd = year
            }
          }
        }

        // Special handling for pension fund asset allocation (4.3.3.1)
        if (indicator === '4.3.3.1' && viewType === 'stacked_bar') {
          console.log('🔍 Fetching pension fund data for indicator:', indicator, 'filters:', apiFilters)
          let rawData = await getPensionFundData(apiFilters)
          console.log('📊 Pension fund data received:', rawData.length, 'rows')
          
          if (rawData.length > 0) {
            console.log('   Sample data:', rawData[0])
          } else {
            console.error('❌ No pension fund data found')
          }
          
          // Process pension fund data for stacked bar chart
          // Data structure: each row is a country with asset class percentages
          // API returns keys like: domestic_equities, domestic_bonds, real_estate, cash_deposits, foreign_assets
          const processedData = rawData.map(row => {
            const country = row.country || row.country_or_area || 'Unknown'
            return {
              country: country,
              'Domestic_Equities': parseFloat(row.domestic_equities || 0) || 0,
              'Domestic_Bonds': parseFloat(row.domestic_bonds || 0) || 0,
              'Real_Estate': parseFloat(row.real_estate || 0) || 0,
              'Private_Equity': parseFloat(row.private_equity || 0) || 0,
              'Cash & Deposits': parseFloat(row.cash_deposits || 0) || 0,
              'Foreign_Assets': parseFloat(row.foreign_assets || 0) || 0
            }
          }).filter(row => row.country !== 'Unknown')
          
          setData(processedData)
          setLoading(false)
          return
        }
        
        // Fetch data from API for other indicators
        console.log('🔍 Fetching data for indicator:', indicator, 'with label:', indicatorLabel, 'filters:', apiFilters)
        let rawData = await getIndicatorData(indicatorLabel, apiFilters)
        console.log('📊 Raw data received:', rawData.length, 'rows')
        if (rawData.length === 0) {
          console.warn('⚠️ No data returned from API with filters. Trying without filters...')
          // Try without any filters to see if data exists
          rawData = await getIndicatorData(indicatorLabel, {})
          console.warn('   Data without filters:', rawData.length, 'rows')
        }
        if (rawData.length > 0) {
          console.log('   Sample data:', rawData.slice(0, 2))
        } else {
          console.error('❌ No data found for indicator:', indicatorLabel)
        }
        
        // Process data for charting
        let processedData = []
        
        if (indicator === '4.3.1.1') {
          // Market Capitalization - need to calculate % of GDP
          // Group by country and year, calculate average
          const grouped = {}
          rawData.forEach(row => {
            const key = `${row.country_or_area}_${row.year}`
            if (!grouped[key]) {
              grouped[key] = {
                country: row.country_or_area,
                year: row.year,
                values: []
              }
            }
            if (row.value !== null && row.value !== undefined) {
              grouped[key].values.push(row.value)
            }
          })
          
          // For now, use raw values (GDP calculation would need GDP data)
          processedData = rawData
            .filter(row => row.value !== null && row.value !== undefined)
            .map(row => ({
              country: row.country_or_area,
              year: row.year,
              value: row.value
            }))
            .sort((a, b) => a.year - b.year)
        } else if (indicator === '4.3.2.1') {
          // Banking Sector Development Index - normalize to 0-1 range if needed
          processedData = rawData
            .filter(row => {
              const hasValue = row.value !== null && row.value !== undefined
              const hasCountry = row.country_or_area && row.country_or_area.trim() !== ''
              const hasYear = row.year !== null && row.year !== undefined
              if (!hasValue || !hasCountry || !hasYear) return false
              
              // Try to parse value
              const numValue = typeof row.value === 'string' ? parseFloat(row.value.replace(/[^0-9.-]/g, '')) : parseFloat(row.value)
              return !isNaN(numValue) && isFinite(numValue)
            })
            .map(row => {
              // Parse value, handling string formats
              let value = typeof row.value === 'string' 
                ? parseFloat(row.value.replace(/[^0-9.-]/g, '')) 
                : parseFloat(row.value)
              
              console.log(`🔍 Banking Index raw value: ${row.value} -> parsed: ${value}`)
              
              // If value is > 1, it might be in 0-100 range or raw index - normalize to 0-1
              if (value > 1 && value <= 100) {
                value = value / 100
              } else if (value > 100 && value <= 1000000) {
                // If value is in thousands, divide by 1000
                value = value / 1000
              } else if (value > 1000000) {
                // If value is very large (millions), divide by 1,000,000
                value = value / 1000000
              }
              // Ensure value is between 0 and 1
              value = Math.max(0, Math.min(1, value))
              return {
                country: row.country_or_area,
                year: parseInt(row.year),
                value: value
              }
            })
            .filter(item => item.value >= 0 && item.value <= 1) // Filter out invalid values
            .sort((a, b) => a.year - b.year)
          
          console.log('📈 Banking Index processed data sample:', processedData.slice(0, 5))
          if (processedData.length > 0) {
            const sampleValues = processedData.slice(0, 5).map(d => d.value)
            console.log('   Sample values:', sampleValues)
          }
        } else if (indicator === '4.3.2.2') {
          // Private Sector Credit to GDP - ensure values are in percentage range
          processedData = rawData
            .filter(row => {
              const hasValue = row.value !== null && row.value !== undefined
              const hasCountry = row.country_or_area && row.country_or_area.trim() !== ''
              const hasYear = row.year !== null && row.year !== undefined
              if (!hasValue || !hasCountry || !hasYear) return false
              
              // Try to parse value
              const numValue = typeof row.value === 'string' ? parseFloat(row.value.replace(/[^0-9.-]/g, '')) : parseFloat(row.value)
              return !isNaN(numValue) && isFinite(numValue)
            })
            .map(row => {
              // Parse value, handling string formats
              let value = typeof row.value === 'string' 
                ? parseFloat(row.value.replace(/[^0-9.-]/g, '')) 
                : parseFloat(row.value)
              
              console.log(`🔍 Credit to GDP raw value: ${row.value} -> parsed: ${value}`)
              
              // If value is very large (likely in millions or raw format), normalize
              if (value > 1000 && value <= 10000) {
                // Values in thousands - divide by 10
                value = value / 10
              } else if (value > 10000 && value <= 100000) {
                // Values in ten-thousands - divide by 100
                value = value / 100
              } else if (value > 100000 && value <= 1000000) {
                // Values in hundred-thousands - divide by 1000
                value = value / 1000
              } else if (value > 1000000) {
                // Values in millions - divide by 10,000
                value = value / 10000
              }
              // Cap at reasonable percentage range (0-200%)
              value = Math.max(0, Math.min(200, value))
              return {
                country: row.country_or_area,
                year: parseInt(row.year),
                value: value
              }
            })
            .filter(item => item.value >= 0 && item.value <= 200) // Filter out invalid values
            .sort((a, b) => a.year - b.year)
          
          console.log('📈 Credit to GDP processed data sample:', processedData.slice(0, 5))
          if (processedData.length > 0) {
            const sampleValues = processedData.slice(0, 5).map(d => d.value)
            console.log('   Sample values:', sampleValues)
          }
        } else {
          // For other indicators, use raw data
          processedData = rawData
            .filter(row => {
              const hasValue = row.value !== null && row.value !== undefined && !isNaN(row.value)
              const hasCountry = row.country_or_area && row.country_or_area.trim() !== ''
              const hasYear = row.year !== null && row.year !== undefined
              return hasValue && hasCountry && hasYear
            })
            .map(row => ({
              country: row.country_or_area,
              year: parseInt(row.year),
              value: parseFloat(row.value)
            }))
            .sort((a, b) => a.year - b.year)
          
          console.log('📈 Processed data sample:', processedData.slice(0, 3))
        }

        // Group by year for line charts, or by country for bar charts
        if (viewType === 'line') {
          // Group by year, show multiple countries
          // Limit to top countries by average value to avoid overcrowding
          const countryAverages = {}
          processedData.forEach(item => {
            if (!countryAverages[item.country]) {
              countryAverages[item.country] = { sum: 0, count: 0 }
            }
            countryAverages[item.country].sum += item.value
            countryAverages[item.country].count += 1
          })
          
          // Get top countries by average
          const topCountries = Object.entries(countryAverages)
            .map(([country, stats]) => ({
              country,
              avg: stats.sum / stats.count
            }))
            .sort((a, b) => b.avg - a.avg)
            .slice(0, 10)
            .map(c => c.country)
          
          const yearGroups = {}
          processedData
            .filter(item => topCountries.includes(item.country))
            .forEach(item => {
              if (!yearGroups[item.year]) {
                yearGroups[item.year] = { year: item.year }
              }
              yearGroups[item.year][item.country] = item.value
            })
          processedData = Object.values(yearGroups).sort((a, b) => a.year - b.year)
          
          console.log('📊 Line chart data:', processedData.length, 'years,', topCountries.length, 'countries')
        } else if (viewType === 'bar' || viewType === 'stacked_bar') {
          // For latest year or specific year
          if (processedData.length > 0) {
            let targetYear = filters.years === 'latest' 
              ? Math.max(...processedData.map(d => d.year))
              : (filters.years ? parseInt(filters.years) : Math.max(...processedData.map(d => d.year)))
            
            if (!isNaN(targetYear)) {
              const yearData = processedData.filter(d => d.year === targetYear)
              if (yearData.length > 0) {
                processedData = yearData.map(item => ({
                  country: item.country,
                  value: item.value
                })).sort((a, b) => b.value - a.value)
              } else {
                // If no data for target year, use latest available year
                const latestYear = Math.max(...processedData.map(d => d.year))
                const latestYearData = processedData.filter(d => d.year === latestYear)
                processedData = latestYearData.map(item => ({
                  country: item.country,
                  value: item.value
                })).sort((a, b) => b.value - a.value)
              }
            } else {
              // If no year filter, use latest year
              const latestYear = Math.max(...processedData.map(d => d.year))
              const latestYearData = processedData.filter(d => d.year === latestYear)
              processedData = latestYearData.map(item => ({
                country: item.country,
                value: item.value
              })).sort((a, b) => b.value - a.value)
            }
          }
        }

        setData(processedData)
        setLoading(false)
      } catch (err) {
        console.error('Error loading graph data:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    loadData()
  }, [indicator, filters.countries, filters.years, viewType])

  // Get unique countries for legend
  const countries = filters.countries 
    ? (Array.isArray(filters.countries) ? filters.countries : filters.countries.split(',').map(c => c.trim()))
    : [...new Set(data.flatMap(d => Object.keys(d).filter(k => k !== 'year' && k !== 'country' && k !== 'value')))]

  const colors = ['#0072BC', '#F26C2B', '#009D8C', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444']

  // Helper function to extract all numeric values from data
  const getAllValues = useMemo(() => {
    if (!data || data.length === 0) return []
    
    const values = []
    data.forEach(item => {
      // For line charts, extract values from all keys except 'year'
      if (viewType === 'line') {
        Object.keys(item).forEach(key => {
          if (key !== 'year' && item[key] !== undefined && item[key] !== null) {
            const numVal = Number(item[key])
            if (!isNaN(numVal) && isFinite(numVal)) {
              values.push(numVal)
            }
          }
        })
      } 
      // For bar charts, extract from 'value' key
      else if (viewType === 'bar') {
        if (item.value !== undefined && item.value !== null) {
          const numVal = Number(item.value)
          if (!isNaN(numVal) && isFinite(numVal)) {
            values.push(numVal)
          }
        }
      }
      // For stacked bar charts, extract from all numeric keys
      else if (viewType === 'stacked_bar') {
        Object.keys(item).forEach(key => {
          if (key !== 'country' && key !== 'year' && typeof item[key] === 'number') {
            const numVal = Number(item[key])
            if (!isNaN(numVal) && isFinite(numVal)) {
              values.push(numVal)
            }
          }
        })
      }
    })
    return values
  }, [data, viewType])

  // Calculate domain and formatting based on indicator type and data range
  const yAxisConfig = useMemo(() => {
    if (getAllValues.length === 0) {
      return { domain: [0, 100], tickFormatter: (val) => val.toFixed(0) }
    }

    // Filter out invalid values (NaN, Infinity, or extreme outliers)
    const validValues = getAllValues.filter(v => isFinite(v) && !isNaN(v))
    if (validValues.length === 0) {
      return { domain: [0, 100], tickFormatter: (val) => val.toFixed(0) }
    }

    const minVal = Math.min(...validValues)
    const maxVal = Math.max(...validValues)
    const range = maxVal - minVal
    
    console.log(`📊 Y-axis config for ${indicator}: min=${minVal}, max=${maxVal}, range=${range}`)

    // Determine appropriate formatting based on indicator
    if (indicator === '4.3.3.1') {
      // Pension funds - percentages (0-100)
      return {
        domain: [0, 100],
        tickFormatter: (val) => `${val.toFixed(0)}%`
      }
    } else if (indicator === '4.3.2.1') {
      // Banking Sector Development Index - 0-1 scale (already normalized in data processing)
      // Ensure values are reasonable (0-1 range)
      const safeMin = Math.max(0, Math.min(1, minVal))
      const safeMax = Math.max(0, Math.min(1, maxVal))
      const padding = Math.max(0.05, (safeMax - safeMin) * 0.1)
      const domainMin = Math.max(0, safeMin - padding)
      const domainMax = Math.min(1, safeMax + padding)
      console.log(`   Banking Index domain: [${domainMin.toFixed(2)}, ${domainMax.toFixed(2)}]`)
      return {
        domain: [domainMin, domainMax],
        tickFormatter: (val) => {
          const formatted = val.toFixed(2)
          return formatted
        }
      }
    } else if (indicator === '4.3.2.2') {
      // Private Sector Credit to GDP - percentages (already normalized in data processing)
      // Ensure values are reasonable (0-200% range)
      const safeMin = Math.max(0, Math.min(200, minVal))
      const safeMax = Math.max(0, Math.min(200, maxVal))
      const padding = Math.max(5, (safeMax - safeMin) * 0.1)
      const domainMin = Math.max(0, safeMin - padding)
      const domainMax = Math.min(200, safeMax + padding)
      console.log(`   Credit to GDP domain: [${domainMin.toFixed(0)}, ${domainMax.toFixed(0)}]`)
      return {
        domain: [domainMin, domainMax],
        tickFormatter: (val) => {
          const formatted = `${Math.round(val)}%`
          return formatted
        }
      }
    } else if (indicator === '4.2.2.1') {
      // Tax Effort - ratio (0-1 or higher)
      return {
        domain: ['auto', 'auto'],
        tickFormatter: (val) => val.toFixed(2)
      }
    } else if (indicator === '4.2.2.2.a') {
      // Tax Buoyancy - elasticity (can be negative, usually -1 to 3)
      const padding = Math.max(0.2, range * 0.1)
      return {
        domain: [minVal - padding, maxVal + padding],
        tickFormatter: (val) => val.toFixed(2)
      }
    } else if (indicator === '4.2.2.2.b') {
      // Tax Gap - percentage of GDP (can be negative)
      const padding = Math.max(1, range * 0.1)
      return {
        domain: [minVal - padding, maxVal + padding],
        tickFormatter: (val) => `${val.toFixed(1)}%`
      }
    } else if (indicator === '4.3.1.1') {
      // Market Capitalization - could be % of GDP or absolute values
      // Check if values are in percentage range (0-200) or absolute (millions/billions)
      if (maxVal < 200) {
        // Likely percentage
        return {
          domain: ['auto', 'auto'],
          tickFormatter: (val) => `${val.toFixed(0)}%`
        }
      } else {
        // Absolute values - format as billions or millions
        return {
          domain: ['auto', 'auto'],
          tickFormatter: (val) => {
            if (Math.abs(val) >= 1e9) {
              return `${(val / 1e9).toFixed(1)}B`
            } else if (Math.abs(val) >= 1e6) {
              return `${(val / 1e6).toFixed(1)}M`
            } else if (Math.abs(val) >= 1e3) {
              return `${(val / 1e3).toFixed(1)}K`
            }
            return val.toFixed(0)
          }
        }
      }
    } else if (indicator === '4.3.1.2') {
      // Portfolio Investment Bonds - can be positive/negative, large numbers
      const padding = Math.max(Math.abs(maxVal) * 0.1, Math.abs(minVal) * 0.1, 1)
      return {
        domain: [minVal - padding, maxVal + padding],
        tickFormatter: (val) => {
          if (Math.abs(val) >= 1e9) {
            return `${(val / 1e9).toFixed(1)}B`
          } else if (Math.abs(val) >= 1e6) {
            return `${(val / 1e6).toFixed(1)}M`
          } else if (Math.abs(val) >= 1e3) {
            return `${(val / 1e3).toFixed(1)}K`
          }
          return val.toFixed(0)
        }
      }
    } else if (indicator === '4.3.1.3') {
      // Reserve Adequacy - ratio (usually 0-2 or higher)
      return {
        domain: ['auto', 'auto'],
        tickFormatter: (val) => val.toFixed(2)
      }
    }

    // Default formatting based on value range
    if (range < 1) {
      // Small values - show 2 decimal places
      const padding = Math.max(0.1, range * 0.1)
      return {
        domain: [minVal - padding, maxVal + padding],
        tickFormatter: (val) => val.toFixed(2)
      }
    } else if (range < 100) {
      // Medium values - show 1 decimal place
      const padding = Math.max(1, range * 0.1)
      return {
        domain: [minVal - padding, maxVal + padding],
        tickFormatter: (val) => val.toFixed(1)
      }
    } else if (range < 1000) {
      // Larger values - show as integers
      const padding = Math.max(10, range * 0.1)
      return {
        domain: [minVal - padding, maxVal + padding],
        tickFormatter: (val) => val.toFixed(0)
      }
    } else {
      // Very large values - format with K, M, B
      const padding = Math.max(100, range * 0.1)
      return {
        domain: [minVal - padding, maxVal + padding],
        tickFormatter: (val) => {
          if (Math.abs(val) >= 1e9) {
            return `${(val / 1e9).toFixed(1)}B`
          } else if (Math.abs(val) >= 1e6) {
            return `${(val / 1e6).toFixed(1)}M`
          } else if (Math.abs(val) >= 1e3) {
            return `${(val / 1e3).toFixed(1)}K`
          }
          return val.toFixed(0)
        }
      }
    }
  }, [getAllValues, indicator])

  if (loading) {
    return (
      <div className="my-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center" style={{ minHeight: `${height}px` }}>
            <div className="text-gray-500">Loading graph data...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="my-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200" style={{ minHeight: `${height}px` }}>
            <div className="text-red-600">Error loading graph: {error}</div>
            <div className="text-sm text-red-500 mt-2">Make sure the API server is running at http://localhost:8000</div>
          </div>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="my-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center" style={{ minHeight: `${height}px` }}>
            <div className="text-gray-500">No data available for the selected filters</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200" style={{ minHeight: `${height}px` }}>
          <ResponsiveContainer width="100%" height={height}>
            {viewType === 'line' ? (
              <LineChart data={data} margin={{ top: 5, right: 30, left: indicator === '4.3.2.2' ? 50 : 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  domain={yAxisConfig.domain}
                  tickFormatter={yAxisConfig.tickFormatter}
                  width={indicator === '4.3.2.1' ? 60 : indicator === '4.3.2.2' ? 70 : 80}
                  allowDecimals={indicator === '4.3.2.1' ? true : false}
                  tick={{ fontSize: 11 }}
                  label={indicator === '4.3.2.2' ? { value: 'Percentage (%)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } } : undefined}
                />
                <Tooltip 
                  formatter={(value) => {
                    if (typeof value === 'number') {
                      return yAxisConfig.tickFormatter(value)
                    }
                    return value
                  }}
                />
                {countries.slice(0, 8).map((country, idx) => (
                  <Line 
                    key={country}
                    type="monotone" 
                    dataKey={country} 
                    stroke={colors[idx % colors.length]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                ))}
              </LineChart>
            ) : viewType === 'stacked_bar' ? (
              indicator === '4.3.3.1' ? (
                // Pension fund asset allocation - stacked by asset class
                <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" angle={-45} textAnchor="end" height={100} />
                  <YAxis 
                    domain={[0, 100]}
                    tickFormatter={(val) => `${val.toFixed(0)}%`}
                    label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value) => `${Number(value).toFixed(1)}%`}
                  />
                  <Legend />
                  <Bar dataKey="Domestic_Equities" stackId="a" fill="#F26C2B" name="Domestic Equities" />
                  <Bar dataKey="Domestic_Bonds" stackId="a" fill="#0072BC" name="Domestic Bonds" />
                  <Bar dataKey="Real_Estate" stackId="a" fill="#009D8C" name="Real Estate" />
                  <Bar dataKey="Private_Equity" stackId="a" fill="#007B33" name="Private Equity" />
                  <Bar dataKey="Cash & Deposits" stackId="a" fill="#003366" name="Cash & Deposits" />
                  <Bar dataKey="Foreign_Assets" stackId="a" fill="#FFD34E" name="Foreign Assets" />
                </ComposedChart>
              ) : (
                // Other stacked bar charts (by country)
                <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" angle={-45} textAnchor="end" height={100} />
                  <YAxis 
                    domain={yAxisConfig.domain}
                    tickFormatter={yAxisConfig.tickFormatter}
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value) => {
                      if (typeof value === 'number') {
                        return yAxisConfig.tickFormatter(value)
                      }
                      return value
                    }}
                  />
                  {countries.slice(0, 5).map((country, idx) => (
                    <Bar 
                      key={country}
                      dataKey={country} 
                      stackId="a"
                      fill={colors[idx % colors.length]}
                    />
                  ))}
                </ComposedChart>
              )
            ) : (
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" angle={-45} textAnchor="end" height={100} />
                <YAxis 
                  domain={yAxisConfig.domain}
                  tickFormatter={yAxisConfig.tickFormatter}
                  width={80}
                />
                <Tooltip 
                  formatter={(value) => {
                    if (typeof value === 'number') {
                      return yAxisConfig.tickFormatter(value)
                    }
                    return value
                  }}
                />
                <Bar dataKey="value" fill="#0072BC" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {caption && (
          <p className="text-xs text-gray-500 mt-3 italic">{caption}</p>
        )}
        
        <div className="mt-2 text-xs text-gray-400">
          <strong>Indicator:</strong> {indicator} | <strong>View:</strong> {viewType} | <strong>Data Points:</strong> {data.length}
        </div>
      </div>
    </div>
  )
}

export default StreamlitGraphEmbed
