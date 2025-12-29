import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import SidebarNavigation from './SidebarNavigation'

const StreamlitEmbed = ({ page: pageProp, hideHeader = false }) => {
  const { page: pageParam } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isTopicPage, setIsTopicPage] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState('checking')
  
  // Use pageProp if provided, otherwise use route parameter
  const page = pageProp || pageParam || 'theme-4'
  
  // Initial check for topic page based on React route
  useEffect(() => {
    const routeIsTopicPage = (page && (page.startsWith('topic-') || page === 'data-availability')) || 
                            (location.pathname.includes('/streamlit/topic-') && !location.pathname.includes('/streamlit/theme-4')) ||
                            location.pathname.includes('/streamlit/data-availability')
    setIsTopicPage(routeIsTopicPage)
  }, [page, location.pathname])
  
  // Get Streamlit URL from environment variable or default to localhost
  // Ensure URL doesn't have trailing slash
  const rawUrl = import.meta.env.VITE_STREAMLIT_URL || 'http://localhost:8501'
  
  // Validate URL - if it looks like a GitHub URL, use the correct Streamlit URL
  let streamlitUrl = rawUrl.replace(/\/$/, '')
  if (streamlitUrl.includes('github.com') || streamlitUrl.includes('settings/secrets')) {
    console.error('❌ Invalid Streamlit URL detected:', streamlitUrl)
    console.error('⚠️ VITE_STREAMLIT_URL secret is missing or incorrect!')
    console.error('📝 Should be: https://osaadrm.streamlit.app')
    // Fallback to the correct Streamlit Cloud URL
    streamlitUrl = 'https://osaadrm.streamlit.app'
  }
  
  const STREAMLIT_BASE_URL = streamlitUrl
  
  // Listen for postMessage from Streamlit iframe to sync navigation
  useEffect(() => {
    const handleMessage = (event) => {
      // Only accept messages from Streamlit origin (check both localhost and production URL)
      const allowedOrigins = [STREAMLIT_BASE_URL, 'http://localhost:8501', 'https://*.streamlit.app']
      if (!allowedOrigins.some(origin => event.origin.includes(origin.replace('*.', '')))) return
      
      if (event.data && event.data.type === 'STREAMLIT_NAVIGATION') {
        const { pagePath } = event.data
        
        // Map Streamlit page paths to React routes
        const pageRouteMap = {
          '3_topic_4_1': '/streamlit/topic-4-1',
          '4_topic_4_2': '/streamlit/topic-4-2',
          '5_topic_4_3': '/streamlit/topic-4-3',
          '6_topic_4_4': '/streamlit/topic-4-4',
          '7_data_availability': '/streamlit/data-availability',
          '2_theme_4': '/exploratory',
          '': '/exploratory',
        }
        
        // Extract page name from path (e.g., 'pages/3_topic_4_1' -> '3_topic_4_1')
        const pageName = pagePath.replace('pages/', '').replace('/', '')
        const targetRoute = pageRouteMap[pageName] || '/exploratory'
        
        // Only navigate if we're not already on the correct route
        if (location.pathname !== targetRoute) {
          // Use replace to avoid cluttering history, or push for proper history
          navigate(targetRoute, { replace: false }) // Use push to maintain history
        }
        
        // Update topic page state
        const isTopic = pageName.startsWith('3_') || pageName.startsWith('4_') || 
                       pageName.startsWith('5_') || pageName.startsWith('6_') ||
                       pageName === '7_data_availability'
        setIsTopicPage(isTopic)
      }
    }
    
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [navigate, location.pathname])

  // Monitor iframe URL to detect Streamlit page changes (fallback method)
  useEffect(() => {
    const checkIframeUrl = () => {
      const iframe = document.querySelector('iframe[title="Streamlit Dashboard"]')
      if (iframe && iframe.src) {
        const iframeSrc = iframe.src
        
        // Check for topic page patterns in URL
        const topicPatterns = ['3_topic_4_1', '4_topic_4_2', '5_topic_4_3', '6_topic_4_4', '7_data_availability']
        const hasTopicPattern = topicPatterns.some(pattern => iframeSrc.includes(pattern))
        
        // Also check for query parameter navigation (e.g., ?topic=4.1)
        const hasTopicParam = iframeSrc.includes('topic=4.1') || 
                             iframeSrc.includes('topic=4.2') || 
                             iframeSrc.includes('topic=4.3') || 
                             iframeSrc.includes('topic=4.4')
        
        // Check if it's the main Theme 4 page (not a topic)
        const isTheme4 = (iframeSrc.includes('/?embed=true') && !hasTopicParam) || 
                        iframeSrc.includes('2_theme_4') ||
                        (iframeSrc.includes('/?topic=4') && !hasTopicPattern && !hasTopicParam)
        
        const isCurrentlyTopic = (hasTopicPattern || hasTopicParam) && !isTheme4
        
        // Only update if state changed to avoid unnecessary re-renders
        if (isCurrentlyTopic !== isTopicPage) {
          setIsTopicPage(isCurrentlyTopic)
        }
      }
    }
    
    // Check immediately
    checkIframeUrl()
    
    // Check periodically as fallback
    const interval = setInterval(checkIframeUrl, 1000)
    
    // Also check on iframe load
    const iframe = document.querySelector('iframe[title="Streamlit Dashboard"]')
    if (iframe) {
      iframe.addEventListener('load', checkIframeUrl)
      
      return () => {
        clearInterval(interval)
        iframe.removeEventListener('load', checkIframeUrl)
      }
    }
    
    return () => {
      clearInterval(interval)
    }
  }, [isTopicPage])

  // Map React routes to Streamlit page routes
  // app_streamlit.py is now the main entry point (accessible at root /)
  // Other pages are in pages/ directory
  const streamlitRoutes = {
    'theme-4': '', // Root URL - app_streamlit.py is the main page
    'topic-4-1': '3_topic_4_1',
    'topic-4-2': '4_topic_4_2',
    'topic-4-3': '5_topic_4_3',
    'topic-4-4': '6_topic_4_4',
    'data-availability': '7_data_availability', // Try without pages/ prefix first (like other pages)
  }

  // Map React routes to topic IDs for query parameter navigation
  const topicIdMap = {
    'topic-4-1': '4.1',
    'topic-4-2': '4.2',
    'topic-4-3': '4.3',
    'topic-4-4': '4.4',
    'data-availability': 'data-availability',
  }

  const streamlitPage = streamlitRoutes[page] || '' // Default to root
  const topicId = topicIdMap[page] || null
  
  // Build URL: Use direct page URL (faster) with query parameter as fallback
  // Option 1: Direct page URL (preferred - faster, works with Streamlit multi-page)
  // Option 2: Query parameter URL (fallback - works via app_streamlit.py routing)
  // For data-availability, use query parameter approach since it's routed through app_streamlit.py
  const useQueryParams = (page === 'data-availability' && topicId) ? true : false
  
  // Build URL with embed parameter for iframe compatibility
  // Using the same URL with ?embed=true is the correct approach
  // Streamlit Cloud doesn't have a separate "embed link" - you use the share link with embed=true
  const streamlitUrl = useQueryParams && topicId
    ? `${STREAMLIT_BASE_URL}/?topic=${topicId}&embed=true`
    : streamlitPage
      ? `${STREAMLIT_BASE_URL}/${streamlitPage}?embed=true`
      : `${STREAMLIT_BASE_URL}/?embed=true` // Root URL for theme-4
  
  // Debug: log the URL being used
  useEffect(() => {
    console.log('StreamlitEmbed - React route parameter:', page)
    console.log('StreamlitEmbed - Mapped Streamlit page filename:', streamlitPage)
    console.log('StreamlitEmbed - Full URL:', streamlitUrl)
    console.log('StreamlitEmbed - Available route mappings:', streamlitRoutes)
  }, [page, streamlitPage, streamlitUrl])

  useEffect(() => {
    // Reset loading state when page changes
    setLoading(true)
    setError(null)
  }, [page])

  const handleIframeLoad = () => {
    console.log('Iframe load event fired')
    // Check if the iframe content indicates an error after a delay
    setTimeout(() => {
      const iframe = document.querySelector('iframe[title="Streamlit Dashboard"]')
      if (iframe) {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
          if (iframeDoc) {
            const bodyText = iframeDoc.body?.innerText || ''
            const bodyHTML = iframeDoc.body?.innerHTML || ''
            console.log('Iframe loaded, checking content...')
            
            // Check for various error conditions
            if (bodyText.includes('Page not found') || bodyText.includes('does not seem to exist')) {
              console.error('Page not found in iframe content')
              setError(`Streamlit page "${streamlitPage}" not found. URL: ${streamlitUrl}`)
              setLoading(false)
              return
            }
            
            // Check for GitHub connection errors
            if (bodyText.includes('github.com') && (bodyText.includes('refused') || bodyText.includes('failed') || bodyText.includes('error'))) {
              console.error('GitHub connection error detected in iframe')
              setError(`Connection error: Streamlit is trying to connect to GitHub but it's being blocked. This is usually a CORS or security issue. Try opening the Streamlit app directly: ${streamlitUrl.replace('?embed=true', '')}`)
              setLoading(false)
              return
            }
          }
        } catch (e) {
          // CORS error is expected, but iframe loaded
          console.log('Iframe loaded (CORS prevents content check)')
        }
      }
      setLoading(false)
    }, 3000) // Increased delay to catch GitHub errors
  }

  const handleIframeError = () => {
    console.error('Iframe error event fired')
    setLoading(false)
    
    // Retry logic: try up to 3 times
    if (retryCount < 3) {
      console.log(`Retrying connection (attempt ${retryCount + 1}/3)...`)
      setTimeout(() => {
        setRetryCount(prev => prev + 1)
        setLoading(true)
        setError(null)
        // Force iframe reload by changing key
        window.location.reload()
      }, 2000 * (retryCount + 1)) // Exponential backoff
    } else {
      setError(`Unable to load Streamlit page after ${retryCount} attempts. Please check:
        - Streamlit is deployed and accessible at: ${STREAMLIT_BASE_URL}
        - The URL is correct in GitHub secrets (VITE_STREAMLIT_URL)
        - Streamlit Cloud is running (check https://share.streamlit.io)
        - There are no CORS or network issues`)
      setConnectionStatus('failed')
    }
  }

  // Check Streamlit connection health
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setConnectionStatus('checking')
        const response = await fetch(`${STREAMLIT_BASE_URL}/health`, { 
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache'
        })
        setConnectionStatus('connected')
      } catch (err) {
        // Try direct URL check
        try {
          const testUrl = `${STREAMLIT_BASE_URL}/?embed=true`
          const testResponse = await fetch(testUrl, { 
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-cache'
          })
          setConnectionStatus('connected')
        } catch (e) {
          console.warn('Streamlit connection check failed:', e)
          setConnectionStatus('unknown') // Don't fail immediately, let iframe try
        }
      }
    }
    
    checkConnection()
    // Recheck every 30 seconds
    const interval = setInterval(checkConnection, 30000)
    return () => clearInterval(interval)
  }, [STREAMLIT_BASE_URL])

  // Try to detect if Streamlit shows "Page not found" by checking the iframe
  useEffect(() => {
    const checkIframeContent = () => {
      const iframe = document.querySelector('iframe[title="Streamlit Dashboard"]')
      if (iframe && iframe.contentWindow) {
        try {
          // This might fail due to CORS, but we'll try
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
          if (iframeDoc) {
            const bodyText = iframeDoc.body?.innerText || ''
            if (bodyText.includes('Page not found') || bodyText.includes('does not seem to exist')) {
              setError(`Streamlit page "${streamlitPage}" not found. Please check that the page exists in the pages/ directory.`)
              setLoading(false)
            }
          }
        } catch (e) {
          // CORS error - can't access iframe content, which is normal
          // The iframe will load normally
        }
      }
    }
    
    // Check after a delay to allow iframe to load
    const timer = setTimeout(checkIframeContent, 3000)
    return () => clearTimeout(timer)
  }, [streamlitPage])
  
  // Additional check: monitor iframe src changes and detect errors
  useEffect(() => {
    const iframe = document.querySelector('iframe[title="Streamlit Dashboard"]')
    if (!iframe) return
    
    const handleLoad = () => {
      console.log('Iframe loaded, checking for errors...')
      setTimeout(() => {
        // Try to access iframe content to check for errors
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
          if (iframeDoc) {
            const bodyText = iframeDoc.body?.innerText || ''
            console.log('Iframe body text (first 200 chars):', bodyText.substring(0, 200))
            if (bodyText.includes('Page not found') || bodyText.includes('does not seem to exist')) {
              console.error('Page not found detected in iframe')
              setError(`Streamlit page "${streamlitPage}" returned "Page not found". Make sure Streamlit is running with "streamlit run app_streamlit.py" and the page exists.`)
              setLoading(false)
            } else {
              console.log('Page loaded successfully')
              setLoading(false)
            }
          }
        } catch (e) {
          // CORS - can't access, but that's okay, assume it loaded
          console.log('Cannot access iframe content (CORS), assuming loaded')
          setLoading(false)
        }
      }, 2000)
    }
    
    iframe.addEventListener('load', handleLoad)
    return () => iframe.removeEventListener('load', handleLoad)
  }, [streamlitPage])

  // Debug: Log pathname to help troubleshoot
  useEffect(() => {
    console.log('StreamlitEmbed - Current pathname:', location.pathname)
    console.log('StreamlitEmbed - Page:', page)
    console.log('StreamlitEmbed - Is Topic Page:', isTopicPage)
    console.log('StreamlitEmbed - Should show Back to Exploratory:', location.pathname === '/exploratory' || location.pathname.startsWith('/streamlit/topic-') || isTopicPage)
  }, [location.pathname, page, isTopicPage])

  // Determine if we should show "Back to Exploratory View" button
  // Show it when:
  // 1. On /exploratory route (from sidebar) AND on a topic page
  // 2. On /streamlit/topic-* routes (direct topic access)
  // 3. When isTopicPage is true (detected from iframe navigation) - this means user navigated to a topic from Theme 4
  const showBackToExploratory = location.pathname.startsWith('/streamlit/topic-') || 
                                 (isTopicPage && (location.pathname === '/streamlit/theme-4' || location.pathname === '/exploratory'))

  return (
    <div className={hideHeader ? "min-h-screen bg-white" : "min-h-screen bg-gray-50"}>
      {!hideHeader && <SidebarNavigation alwaysVisible={true} />}
      {/* Header with back buttons - only show if not hidden */}
      {!hideHeader && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col gap-2">
              {/* Always show "Back to Landing Page" */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-osaa-blue hover:text-osaa-orange transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Landing Page</span>
              </button>
              {/* Show "Back to Exploratory View" when on a topic page */}
              {showBackToExploratory && (
                <button
                  onClick={() => {
                    // Navigate back to exploratory view using React Router
                    navigate('/exploratory', { replace: false })
                    setIsTopicPage(false)
                  }}
                  className="flex items-center gap-2 text-osaa-blue hover:text-osaa-orange transition-colors font-medium"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Exploratory View</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className={`${hideHeader ? 'absolute' : 'fixed'} inset-0 bg-white bg-opacity-90 flex items-center justify-center z-40`}>
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-osaa-blue animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading Streamlit dashboard...</p>
            {retryCount > 0 && (
              <p className="text-sm text-gray-500 mt-2">Retry attempt {retryCount}/3</p>
            )}
            {connectionStatus === 'checking' && (
              <p className="text-sm text-gray-500 mt-2">Checking connection...</p>
            )}
            {connectionStatus === 'connected' && (
              <p className="text-sm text-green-600 mt-2">✓ Connected to Streamlit</p>
            )}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">Connection Error</h3>
            <p className="text-red-600">{error}</p>
            {error.includes('github.com') && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-yellow-800 font-medium mb-2">GitHub Connection Issue Detected</p>
                <p className="text-yellow-700 text-sm mb-3">
                  The Streamlit app is trying to connect to GitHub, which is being blocked. This is usually a CORS or security issue.
                </p>
                <div className="space-y-2">
                  <p className="text-yellow-700 text-sm font-medium">Try these solutions:</p>
                  <ol className="list-decimal list-inside space-y-1 text-yellow-700 text-sm ml-2">
                    <li><strong>Open Streamlit directly:</strong> <a href={streamlitUrl.replace('?embed=true', '')} target="_blank" rel="noopener noreferrer" className="underline font-semibold">Click here to open in a new tab</a></li>
                    <li><strong>Check Streamlit Cloud:</strong> Visit <a href={STREAMLIT_BASE_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold">{STREAMLIT_BASE_URL}</a> to verify it's running</li>
                    <li><strong>Clear browser cache:</strong> The iframe might be cached. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)</li>
                    <li><strong>Check browser console:</strong> Press F12 and look for CORS or network errors</li>
                  </ol>
                </div>
              </div>
            )}
            <div className="mt-4 space-y-2 text-sm">
              <p className="text-red-700 font-medium">Debug Information:</p>
              <ul className="list-disc list-inside space-y-1 text-red-600 ml-4 mb-4">
                <li>React route: <code className="bg-red-100 px-2 py-1 rounded">{page}</code></li>
                <li>Streamlit page: <code className="bg-red-100 px-2 py-1 rounded">{streamlitPage}</code></li>
                <li>URL: <code className="bg-red-100 px-2 py-1 rounded">{streamlitUrl}</code></li>
              </ul>
              <p className="text-red-700 font-medium">Troubleshooting steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-red-600 ml-4">
                <li><strong>CRITICAL: Use the correct entry point:</strong> 
                  <br />Stop the current Streamlit process (Ctrl+C in the terminal where it's running)
                  <br />Then run: <code className="bg-red-100 px-2 py-1 rounded">streamlit run app_streamlit.py</code>
                  <br />OR use: <code className="bg-red-100 px-2 py-1 rounded">./start_streamlit.sh</code>
                  <br /><strong>DO NOT use:</strong> <code className="bg-red-100 px-2 py-1 rounded">streamlit run app.py</code> (this redirects and breaks direct page access)
                </li>
                <li>Make sure Streamlit is running on port 8501</li>
                <li>Verify the page exists: <code className="bg-red-100 px-2 py-1 rounded">pages/{streamlitPage}.py</code></li>
                <li><strong>Test direct access:</strong> <a href={streamlitUrl.replace('?embed=true', '')} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">Open {streamlitPage} directly in new tab</a></li>
                <li>If you see "The page that you have requested does not seem to exist", you're using <code className="bg-red-100 px-2 py-1 rounded">app.py</code> - switch to <code className="bg-red-100 px-2 py-1 rounded">app_streamlit.py</code></li>
                <li>After restarting with <code className="bg-red-100 px-2 py-1 rounded">app_streamlit.py</code>, refresh this page</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Streamlit iframe */}
      <div data-tour="streamlit-content">
        <iframe
          key={`${streamlitPage}-${retryCount}`} // Force reload when page changes or retry
          src={streamlitUrl}
          className={hideHeader ? "w-full h-[calc(100vh-200px)] border-0 rounded-lg" : "w-full h-[calc(100vh-80px)] border-0"}
          title="Streamlit Dashboard"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation"
          referrerPolicy="no-referrer-when-downgrade"
        onLoad={(e) => {
          handleIframeLoad()
          // Check iframe src after load to detect topic pages
          const iframe = e.target
          if (iframe && iframe.src) {
            const iframeSrc = iframe.src
            const topicPatterns = ['3_topic_4_1', '4_topic_4_2', '5_topic_4_3', '6_topic_4_4']
            const hasTopicPattern = topicPatterns.some(pattern => iframeSrc.includes(pattern))
            const hasTopicParam = iframeSrc.includes('topic=4.1') || 
                                 iframeSrc.includes('topic=4.2') || 
                                 iframeSrc.includes('topic=4.3') || 
                                 iframeSrc.includes('topic=4.4')
            const isTheme4 = (iframeSrc.includes('/?embed=true') && !hasTopicParam) || 
                            iframeSrc.includes('2_theme_4')
            const isTopic = (hasTopicPattern || hasTopicParam) && !isTheme4
            setIsTopicPage(isTopic)
            console.log('Iframe loaded - src:', iframeSrc, 'isTopicPage:', isTopic, {
              hasTopicPattern,
              hasTopicParam,
              isTheme4
            })
          }
        }}
        onError={handleIframeError}
        style={{ display: error ? 'none' : 'block' }}
        allow="fullscreen"
        loading="lazy"
      />
      </div>
    </div>
  )
}

export default StreamlitEmbed


