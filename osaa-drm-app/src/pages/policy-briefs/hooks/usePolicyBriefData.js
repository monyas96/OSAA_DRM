import { useState, useEffect } from 'react'
import { getIndicatorData } from '../../../services/dataService'

export const usePolicyBriefData = () => {
  const [data, setData] = useState({
    pi1: null,
    pi2: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load PEFA PI-1 data
        const pi1Data = await getIndicatorData('PEFA: PI-1 Aggregate expenditure out-turn', {
          regions: ['Africa']
        })

        // Load PEFA PI-2 data
        const pi2Data = await getIndicatorData('PEFA: PI-2 Expenditure composition outturn', {
          regions: ['Africa']
        })

        // Process data for graphs
        const processGraphData = (rawData) => {
          if (!rawData || rawData.length === 0) return []
          
          // Get latest year for each country
          const latestByCountry = {}
          rawData.forEach(item => {
            if (item.value !== null && item.value !== undefined && item.country_or_area) {
              const country = item.country_or_area
              const year = item.year || 0
              if (!latestByCountry[country] || year > latestByCountry[country].year) {
                latestByCountry[country] = {
                  country,
                  score: item.value,
                  year
                }
              }
            }
          })
          
          return Object.values(latestByCountry)
            .sort((a, b) => (b.score || 0) - (a.score || 0))
        }

        setData({
          pi1: {
            data: processGraphData(pi1Data),
            title: 'PEFA PI-1: Aggregate Expenditure Outturn',
            subtitle: 'Public Expenditure Efficiency (Aggregate Expenditure Outturn)'
          },
          pi2: {
            data: processGraphData(pi2Data),
            title: 'PEFA PI-2: Expenditure Composition Outturn',
            subtitle: 'Expenditure Quality (Expenditure Composition Outturn)'
          },
          loading: false,
          error: null
        })
      } catch (error) {
        console.error('Error loading policy brief data:', error)
        setData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }))
      }
    }

    loadData()
  }, [])

  return data
}

