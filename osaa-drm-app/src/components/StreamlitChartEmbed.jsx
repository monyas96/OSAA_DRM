/**
 * StreamlitChartEmbed - Embeds a Streamlit page in an iframe
 * Used for data visualizations only, while keeping React UI for text/navigation
 */
import React, { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'

const StreamlitChartEmbed = ({ 
  page, 
  height = '600px',
  title = null,
  className = ''
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Map React page names to Streamlit page filenames
  // Use chart-only versions for clean embedding
  const streamlitRoutes = {
    'topic-4-1': '3_topic_4_1_chart_only',  // Chart-only version
    'topic-4-1-full': '3_topic_4_1',  // Full page version
    'topic-4-2': '4_topic_4_2',
    'topic-4-3': '5_topic_4_3',
    'topic-4-4': '6_topic_4_4',
    'theme-4': '2_theme_4'
  }

  // Get Streamlit URL from environment variable or default to localhost
  const STREAMLIT_BASE_URL = import.meta.env.VITE_STREAMLIT_URL || 'http://localhost:8501'
  
  const streamlitPage = streamlitRoutes[page] || page
  const streamlitUrl = `${STREAMLIT_BASE_URL}/${streamlitPage}?embed=true`

  useEffect(() => {
    setLoading(true)
    setError(null)
  }, [page])

  const handleLoad = () => {
    setLoading(false)
    setError(null)
  }

  const handleError = () => {
    setLoading(false)
    setError(`Failed to load Streamlit page: ${streamlitPage}`)
  }

  return (
    <div className={`relative ${className}`} style={{ minHeight: height }}>
      {title && (
        <h3 className="text-lg font-semibold text-[#003366] mb-4">{title}</h3>
      )}
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-[#003366] animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading chart from Streamlit...</p>
          </div>
        </div>
      )}

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

      <iframe
        src={streamlitUrl}
        className="w-full border border-gray-200 rounded-lg"
        style={{ 
          height: height,
          minHeight: '400px',
          display: loading || error ? 'none' : 'block'
        }}
        onLoad={handleLoad}
        onError={handleError}
        title={`Streamlit Chart: ${title || page}`}
        allow="clipboard-read; clipboard-write"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
      />
    </div>
  )
}

export default StreamlitChartEmbed

