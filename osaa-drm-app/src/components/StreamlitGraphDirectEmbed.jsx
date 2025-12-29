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
import { Loader2, AlertCircle, X, Maximize2 } from 'lucide-react'

const StreamlitGraphDirectEmbed = ({ 
  indicator,
  title,
  subtitle,
  caption,
  filters = {},
  height = 500,
  className = '',
  autoFullscreen = false
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(autoFullscreen)
  const [iframeHeight, setIframeHeight] = useState(height) // Dynamic height based on chart size

  // Get Streamlit URL from environment variable
  const STREAMLIT_BASE_URL = import.meta.env.VITE_STREAMLIT_URL || 'http://localhost:8501'

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
      '4.3.1.3': 'pb_indicator_4_3_1_3',
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
    // Using embed=true is the standard way to embed Streamlit apps
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
    // Auto-open fullscreen modal if enabled (with small delay to let page render)
    if (autoFullscreen) {
      // Small delay to ensure page renders first
      const timer = setTimeout(() => {
        setIsFullscreen(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [indicator, JSON.stringify(filters), autoFullscreen])

  // Listen for debug messages from Streamlit iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'STREAMLIT_FULLSCREEN_DEBUG') {
        console.log('[Streamlit Fullscreen Debug]', event.data.message)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Listen for height messages from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // Accept messages from Streamlit origin
      if (event.data && event.data.type === 'STREAMLIT_CHART_HEIGHT') {
        const chartHeight = event.data.height
        if (chartHeight && chartHeight > 0) {
          setIframeHeight(chartHeight + 20) // Add small padding
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleLoad = () => {
    setLoading(false)
    setError(null)
  }

  const handleError = () => {
    setLoading(false)
    setError(`Failed to load Streamlit graph for indicator ${indicator}`)
  }

  // Fullscreen modal component
  const FullscreenModal = () => {
    if (!isFullscreen) return null

    return (
      <div 
        className="fixed inset-0 z-[9999] bg-white"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 z-[10000] bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-colors"
          aria-label="Close fullscreen"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Loading State in Modal */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-[#003366] animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">Loading graph from Streamlit...</p>
            </div>
          </div>
        )}

        {/* Error State in Modal */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-yellow-50">
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

        {/* Fullscreen iframe */}
        <iframe
          src={streamlitUrl}
          className="w-full h-full border-0"
          style={{ 
            width: '100vw',
            height: '100vh',
            border: 'none',
            display: loading || error ? 'none' : 'block'
          }}
          onLoad={handleLoad}
          onError={handleError}
          title={`Streamlit Graph: ${title || indicator}`}
          allow="clipboard-read; clipboard-write; fullscreen"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      </div>
    )
  }

  return (
    <>
      {/* Fullscreen Modal */}
      <FullscreenModal />

      {/* Regular embed (hidden when fullscreen) */}
      {!isFullscreen && (
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

          {/* Streamlit iframe - sized to match chart exactly */}
          <iframe
            ref={(iframe) => {
              if (iframe) {
                // Store iframe reference for potential future use
              }
            }}
            src={streamlitUrl}
            className="w-full border border-gray-200 rounded-lg bg-white"
            style={{ 
              height: `${iframeHeight}px`,  // Dynamic height matching chart size
              width: '100%',
              display: loading || error ? 'none' : 'block',
              border: 'none' // Remove border for cleaner look
            }}
            onLoad={handleLoad}
            onError={handleError}
            title={`Streamlit Graph: ${title || indicator}`}
            allow="clipboard-read; clipboard-write; fullscreen"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />

          {/* Fullscreen button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-2 right-2 bg-white hover:bg-gray-100 rounded p-2 shadow-md transition-colors z-10"
            aria-label="Open in fullscreen"
            title="Open in fullscreen"
          >
            <Maximize2 className="w-4 h-4 text-gray-700" />
          </button>

          {/* Caption */}
          {caption && (
            <p className="text-xs text-gray-500 mt-3 italic">{caption}</p>
          )}
        </div>
      )}
    </>
  )
}

export default StreamlitGraphDirectEmbed

