/**
 * Direct Streamlit Graph Embed Component
 * 
 * This component embeds Streamlit graphs directly via iframe without using the API.
 * Streamlit pages can be configured to accept URL parameters for filters.
 * 
 * Advantages:
 * - No API server needed
 * - Uses exact same graphs as exploratory view
 * - Automatic updates when Streamlit code changes
 * - Simpler architecture
 * 
 * Usage:
 * <StreamlitGraphDirectEmbed
 *   indicator="4.4.2.4"
 *   title="Estimated Annual Corruption Loss"
 *   filters={{ countries: 'all', years: 'latest', view: 'bar' }}
 *   height={600}
 * />
 */

import React, { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'

const StreamlitGraphDirectEmbed = ({ 
  indicator,
  title,
  subtitle,
  caption,
  filters = {},
  height = 500,
  className = ''
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get Streamlit URL from environment variable
  const STREAMLIT_BASE_URL = import.meta.env.VITE_STREAMLIT_URL || 'http://localhost:8501'

  // Map indicator codes to Streamlit page paths
  const indicatorToPageMap = {
    '4.1.1.1': '3_topic_4_1',
    '4.1.2.1': '3_topic_4_1',
    '4.2.2.1': '4_topic_4_2',
    '4.2.2.2.a': '4_topic_4_2',
    '4.2.2.2.b': '4_topic_4_2',
    '4.3.1.1': '5_topic_4_3',
    '4.3.1.2': '5_topic_4_3',
    '4.3.1.3': '5_topic_4_3',
    '4.3.2.1': '5_topic_4_3',
    '4.3.2.2': '5_topic_4_3',
    '4.3.3.1': '5_topic_4_3',
    '4.4.2.1': '6_topic_4_4',
    '4.4.2.2': '6_topic_4_4',
    '4.4.2.3': '6_topic_4_4',
    '4.4.2.4': '6_topic_4_4',
    '4.4.3.1': '6_topic_4_4',
    '4.4.4.1': '6_topic_4_4'
  }

  // Build Streamlit URL with query parameters
  const buildStreamlitUrl = () => {
    // Map indicator codes to policy brief graph pages (pb_indicator_X_X_X_X.py)
    // Each indicator has its own pre-configured page
    const indicatorPageMap = {
      '4.1.1.1': 'pb_indicator_4_1_1_1',
      '4.1.2.1': 'pb_indicator_4_1_2_1',
      '4.2.2.1': 'pb_indicator_4_2_2_1',
      '4.2.2.2.a': 'pb_indicator_4_2_2_2a',
      '4.2.2.2.b': 'pb_indicator_4_2_2_2b',
      '4.3.1.1': 'pb_indicator_4_3_1_1',
      '4.3.1.2': 'pb_indicator_4_3_1_2',
      '4.3.2.1': 'pb_indicator_4_3_2_1',
      '4.3.2.2': 'pb_indicator_4_3_2_2',
      '4.3.3.1': 'pb_indicator_4_3_3_1',
      '4.4.2.1': 'pb_indicator_4_4_2_1',
      '4.4.2.2': 'pb_indicator_4_4_2_2',
      '4.4.2.3': 'pb_indicator_4_4_2_3',
      '4.4.2.4': 'pb_indicator_4_4_2_4',
      '4.4.3.1': 'pb_indicator_4_4_3_1',
      '4.4.4.1': 'pb_indicator_4_4_4_1'
    }
    
    const page = indicatorPageMap[indicator] || '8_graph_embed'
    
    // Build query parameters (for backward compatibility, but pages are pre-configured)
    const params = new URLSearchParams({
      embed: 'true',
      hide_header: 'true'
    })

    // Add filter parameters
    if (filters.countries && filters.countries !== 'all') {
      if (Array.isArray(filters.countries)) {
        params.append('countries', filters.countries.join(','))
      } else {
        params.append('countries', filters.countries)
      }
    }

    if (filters.years) {
      if (filters.years === 'latest') {
        params.append('year', 'latest')
      } else if (filters.years === 'all') {
        params.append('year', 'all')
      } else if (typeof filters.years === 'string' && filters.years.includes('-')) {
        const [start, end] = filters.years.split('-')
        params.append('year_start', start.trim())
        params.append('year_end', end.trim())
      } else {
        params.append('year', filters.years)
      }
    }

    if (filters.view) {
      params.append('view', filters.view)
    }

    return `${STREAMLIT_BASE_URL}/${page}?${params.toString()}`
  }

  const streamlitUrl = buildStreamlitUrl()

  useEffect(() => {
    setLoading(true)
    setError(null)
  }, [indicator, JSON.stringify(filters)])

  const handleLoad = () => {
    setLoading(false)
    setError(null)
  }

  const handleError = () => {
    setLoading(false)
    setError(`Failed to load Streamlit graph for indicator ${indicator}`)
  }

  return (
    <div className={`relative ${className}`} style={{ minHeight: `${height}px` }}>
      {/* Note: Title and subtitle are shown in the Streamlit page itself, so we don't render them here */}

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-[#003366] animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading graph from Streamlit...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-center p-4">
            <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm text-yellow-800 font-semibold mb-2">{error}</p>
            <p className="text-xs text-yellow-700">
              Make sure Streamlit is running: <code className="bg-yellow-100 px-2 py-1 rounded">streamlit run app_streamlit.py</code>
            </p>
            <p className="text-xs text-yellow-700 mt-2">
              Or visit: <a href={streamlitUrl} target="_blank" rel="noopener noreferrer" className="underline">{streamlitUrl}</a>
            </p>
          </div>
        </div>
      )}

      {/* Streamlit iframe */}
      <iframe
        src={streamlitUrl}
        className="w-full border border-gray-200 rounded-lg bg-white"
        style={{ 
          height: height,
          minHeight: '400px',
          display: loading || error ? 'none' : 'block'
        }}
        onLoad={handleLoad}
        onError={handleError}
        title={`Streamlit Graph: ${title || indicator}`}
        allow="clipboard-read; clipboard-write"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />

      {/* Caption */}
      {caption && (
        <p className="text-xs text-gray-500 mt-3 italic">{caption}</p>
      )}
    </div>
  )
}

export default StreamlitGraphDirectEmbed

