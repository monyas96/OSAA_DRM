/**
 * Local Data Service - Loads data from JSON files (no API server needed)
 * This replaces dataService.js when using the data mart approach
 */

// Data files are in the public/data directory (served by Vite)
const DATA_BASE_URL = '/data'

// Cache for loaded data
let _cachedMainData = null
let _cachedRefData = null
let _cachedMetadata = null
let _cachedIndicators = null
let _cachedCountries = null
let _cachedYears = null

export const loadMainData = async () => {
  if (_cachedMainData) {
    console.log('✓ Using cached main data:', _cachedMainData.length, 'rows')
    return _cachedMainData
  }
  
  try {
    const url = `${DATA_BASE_URL}/main_data.json`
    console.log('🔄 Fetching main_data.json from', url)
    console.log('   ⚠️  Large file (599MB) - this may take 1-2 minutes to download...')
    const startTime = Date.now()
    
    // Add timeout and progress tracking
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      console.warn('⏱️  Download taking longer than expected...')
    }, 30000) // Warn after 30 seconds
    
    const response = await fetch(url, {
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}. Make sure main_data.json exists in public/data/`)
    }
    
    // Check content length
    const contentLength = response.headers.get('content-length')
    if (contentLength) {
      const sizeMB = (parseInt(contentLength) / (1024 * 1024)).toFixed(2)
      console.log(`📥 Downloading ${sizeMB} MB...`)
    } else {
      console.log('📥 Downloading main_data.json (this may take a while for large files)...')
    }
    
    // Parse JSON with error handling
    let data
    try {
      const text = await response.text()
      console.log('✓ File downloaded, parsing JSON...')
      data = JSON.parse(text)
    } catch (parseError) {
      console.error('❌ Failed to parse JSON:', parseError)
      throw new Error(`Failed to parse JSON: ${parseError.message}. File may be corrupted.`)
    }
    
    const loadTime = ((Date.now() - startTime) / 1000).toFixed(2)
    _cachedMainData = data
    
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array. Expected array of objects.')
    }
    
    console.log(`✅ Loaded main data from JSON: ${data.length.toLocaleString()} rows in ${loadTime}s`)
    return data
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('❌ Request timed out. File is too large (599MB).')
      console.error('   💡 Consider using API server approach instead.')
    } else {
      console.error('❌ Error loading main data from JSON:', error)
      console.error('   URL attempted:', `${DATA_BASE_URL}/main_data.json`)
    }
    console.error('   Make sure:')
    console.error('   1. JSON files exist in osaa-drm-app/public/data/')
    console.error('   2. Run: python create_data_mart.py')
    console.error('   3. Restart React dev server')
    console.error('   4. Check browser network tab for failed requests')
    throw error
  }
}

export const loadReferenceData = async () => {
  if (_cachedRefData) {
    return _cachedRefData
  }
  
  try {
    const response = await fetch(`${DATA_BASE_URL}/reference_data.json`)
    if (!response.ok) {
      console.warn('Reference data not available, using empty array')
      return []
    }
    const data = await response.json()
    _cachedRefData = data
    console.log('✓ Loaded reference data from JSON:', data.length, 'rows')
    return data
  } catch (error) {
    console.warn('Error loading reference data from JSON:', error)
    return []
  }
}

export const getIndicatorData = async (indicatorLabel, filters = {}) => {
  // Load main data if not cached
  if (!_cachedMainData) {
    await loadMainData()
  }
  
  if (!_cachedMainData || _cachedMainData.length === 0) {
    return []
  }
  
  // Filter by indicator label (flexible matching)
  let filtered = _cachedMainData.filter(d => {
    const label = (d.indicator_label || '').toLowerCase()
    const searchLabel = indicatorLabel.toLowerCase()
    
    // Exact match
    if (label === searchLabel) return true
    
    // Flexible matching for PEFA indicators
    if (label.includes('pi-1') && searchLabel.includes('pi-1')) {
      if (label.includes('aggregate') && label.includes('expenditure')) return true
    }
    if (label.includes('pi-2') && searchLabel.includes('pi-2')) {
      if (label.includes('expenditure') && label.includes('composition')) return true
    }
    
    // Partial match
    if (label.includes(searchLabel) || searchLabel.includes(label)) return true
    
    return false
  })
  
  // Apply country filter
  if (filters.countries && filters.countries.length > 0) {
    filtered = filtered.filter(d => filters.countries.includes(d.country_or_area))
  }
  
  // Apply region filter (requires reference data)
  if (filters.regions && filters.regions.length > 0) {
    if (!_cachedRefData) {
      await loadReferenceData()
    }
    if (_cachedRefData && _cachedRefData.length > 0) {
      const regionCountries = _cachedRefData
        .filter(r => r['Region Name'] === 'Africa' && filters.regions.includes(r['Intermediate Region Name']))
        .map(r => r['Country or Area'])
      filtered = filtered.filter(d => regionCountries.includes(d.country_or_area))
    }
  }
  
  // Apply year filters
  if (filters.yearStart) {
    filtered = filtered.filter(d => d.year >= filters.yearStart)
  }
  if (filters.yearEnd) {
    filtered = filtered.filter(d => d.year <= filters.yearEnd)
  }
  
  return filtered
}

export const listIndicators = async () => {
  if (_cachedIndicators) {
    return _cachedIndicators
  }
  
  try {
    const response = await fetch(`${DATA_BASE_URL}/indicators.json`)
    if (!response.ok) {
      // Fallback: extract from main data
      if (_cachedMainData) {
        const indicators = [...new Set(_cachedMainData.map(d => d.indicator_label).filter(Boolean))].sort()
        _cachedIndicators = indicators
        return indicators
      }
      throw new Error(`Failed to load indicators: ${response.statusText}`)
    }
    const result = await response.json()
    _cachedIndicators = result.indicators || []
    return _cachedIndicators
  } catch (error) {
    console.error('Error loading indicators:', error)
    return []
  }
}

export const listCountries = async () => {
  if (_cachedCountries) {
    return _cachedCountries
  }
  
  try {
    const response = await fetch(`${DATA_BASE_URL}/countries.json`)
    if (!response.ok) {
      // Fallback: extract from main data
      if (_cachedMainData) {
        const countries = [...new Set(_cachedMainData.map(d => d.country_or_area).filter(Boolean))].sort()
        _cachedCountries = countries
        return countries
      }
      throw new Error(`Failed to load countries: ${response.statusText}`)
    }
    const result = await response.json()
    _cachedCountries = result.countries || []
    return _cachedCountries
  } catch (error) {
    console.error('Error loading countries:', error)
    return []
  }
}

export const listYears = async () => {
  if (_cachedYears) {
    return _cachedYears
  }
  
  try {
    const response = await fetch(`${DATA_BASE_URL}/years.json`)
    if (!response.ok) {
      // Fallback: extract from main data
      if (_cachedMainData) {
        const years = [...new Set(_cachedMainData.map(d => d.year).filter(Boolean))].sort((a, b) => a - b)
        _cachedYears = years
        return years
      }
      throw new Error(`Failed to load years: ${response.statusText}`)
    }
    const result = await response.json()
    _cachedYears = result.years || []
    return _cachedYears
  } catch (error) {
    console.error('Error loading years:', error)
    return []
  }
}

export const getMetadata = async () => {
  if (_cachedMetadata) {
    return _cachedMetadata
  }
  
  try {
    const response = await fetch(`${DATA_BASE_URL}/metadata.json`)
    if (!response.ok) {
      return null
    }
    const metadata = await response.json()
    _cachedMetadata = metadata
    return metadata
  } catch (error) {
    console.warn('Error loading metadata:', error)
    return null
  }
}

