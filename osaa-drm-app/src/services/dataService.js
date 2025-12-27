/**
 * Data Service for loading and filtering dashboard data
 * Connects to Python FastAPI backend
 */

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'http://localhost:8000/api'

export const loadMainData = async () => {
  try {
    console.log('🔄 Fetching main data from API:', `${API_BASE_URL}/data/main`)
    const response = await fetch(`${API_BASE_URL}/data/main`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API response error:', response.status, errorText)
      throw new Error(`Failed to load main data: ${response.status} ${response.statusText}`)
    }
    
    const result = await response.json()
    console.log('✅ Loaded main data from API:', result.row_count || 0, 'rows')
    return result.data || []
  } catch (error) {
    console.error('❌ Error loading main data from API:', error)
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      console.error('   → API server is not running or not accessible')
      console.error('   → Start API server: python api_server.py')
      console.error('   → Check: http://localhost:8000/api/health')
    }
    throw error
  }
}

export const loadReferenceData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/data/reference`)
    if (!response.ok) {
      throw new Error(`Failed to load reference data: ${response.statusText}`)
    }
    const result = await response.json()
    return result.data || []
  } catch (error) {
    console.error('Error loading reference data:', error)
    throw error
  }
}

export const getIndicatorData = async (indicatorLabel, filters = {}) => {
  try {
    const params = new URLSearchParams({
      indicator_label: indicatorLabel
    })
    
    if (filters.countries && filters.countries.length > 0) {
      params.append('countries', filters.countries.join(','))
    }
    
    if (filters.regions && filters.regions.length > 0) {
      params.append('regions', filters.regions.join(','))
    }
    
    if (filters.yearStart) {
      params.append('year_start', filters.yearStart)
    }
    
    if (filters.yearEnd) {
      params.append('year_end', filters.yearEnd)
    }
    
    const url = `${API_BASE_URL}/data/indicator?${params}`
    console.log('🔄 Fetching indicator data:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API response error:', response.status, errorText)
      throw new Error(`Failed to load indicator data: ${response.status} ${response.statusText}`)
    }
    
    const result = await response.json()
    console.log('✅ Loaded indicator data:', result.row_count || result.data?.length || 0, 'rows')
    return result.data || []
  } catch (error) {
    console.error('❌ Error loading indicator data:', error)
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      console.error('   → API server is not running or not accessible')
      console.error('   → Start API server: python api_server.py')
      console.error('   → Check: http://localhost:8000/api/health')
    }
    throw error
  }
}

export const listIndicators = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/indicators/list`)
    if (!response.ok) {
      throw new Error(`Failed to list indicators: ${response.statusText}`)
    }
    const result = await response.json()
    return result.indicators || []
  } catch (error) {
    console.error('Error listing indicators:', error)
    throw error
  }
}

export const listCountries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries/list`)
    if (!response.ok) {
      throw new Error(`Failed to list countries: ${response.statusText}`)
    }
    const result = await response.json()
    return result.countries || []
  } catch (error) {
    console.error('Error listing countries:', error)
    throw error
  }
}

export const listYears = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/years/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to list years: ${response.statusText}`)
    }
    const result = await response.json()
    return result.years || []
  } catch (error) {
    console.error('Error listing years:', error)
    throw error
  }
}

export const getCorruptionLosses = async (filters = {}) => {
  try {
    const params = new URLSearchParams()
    
    if (filters.countries && filters.countries.length > 0) {
      params.append('countries', filters.countries.join(','))
    }
    
    if (filters.regions && filters.regions.length > 0) {
      params.append('regions', filters.regions.join(','))
    }
    
    const url = `${API_BASE_URL}/data/corruption-losses${params.toString() ? '?' + params.toString() : ''}`
    console.log('🔄 Fetching corruption losses:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API response error:', response.status, errorText)
      throw new Error(`Failed to load corruption losses: ${response.status} ${response.statusText}`)
    }
    
    const result = await response.json()
    console.log('✅ Loaded corruption losses:', result.row_count || result.data?.length || 0, 'rows')
    return result.data || []
  } catch (error) {
    console.error('❌ Error loading corruption losses:', error)
    throw error
  }
}

export const getPensionFundData = async (filters = {}) => {
  try {
    const params = new URLSearchParams()
    
    if (filters.countries && filters.countries.length > 0) {
      params.append('countries', filters.countries.join(','))
    }
    
    const url = `${API_BASE_URL}/data/pension-funds${params.toString() ? '?' + params.toString() : ''}`
    console.log('🔄 Fetching pension fund data:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API response error:', response.status, errorText)
      throw new Error(`Failed to load pension fund data: ${response.status} ${response.statusText}`)
    }
    
    const result = await response.json()
    console.log('✅ Loaded pension fund data:', result.row_count || result.data?.length || 0, 'rows')
    return result.data || []
  } catch (error) {
    console.error('❌ Error loading pension fund data:', error)
    throw error
  }
}
