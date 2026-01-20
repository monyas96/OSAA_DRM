import React, { useState, useEffect } from 'react'
import Joyride, { STATUS, EVENTS } from 'react-joyride'
import { useLocation, useNavigate } from 'react-router-dom'
import { Play, X, HelpCircle } from 'lucide-react'

const DemoMode = () => {
  const [run, setRun] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Check if user has completed demo before (only on client side)
  const [showDemoButton, setShowDemoButton] = useState(true)
  
  useEffect(() => {
    // Check localStorage only on client side
    if (typeof window !== 'undefined') {
      const hasCompletedDemo = localStorage.getItem('demo_completed') === 'true'
      setShowDemoButton(!hasCompletedDemo)
    }
  }, [])

  // Tour steps configuration based on current route
  const getTourSteps = () => {
    const path = location.pathname

    if (path === '/') {
      return [
        // Step 1: Opening/Welcome
        {
          target: 'body',
          content: (
            <div>
              <h3 className="font-bold text-lg mb-2">Welcome!</h3>
              <p className="text-sm">This tour will show you how to navigate and use the dashboard. Click "Next" to continue.</p>
            </div>
          ),
          placement: 'center',
          disableBeacon: true,
        },
        // Step 2: Hero Section
        {
          target: '[data-tour="hero-section"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Landing Page</h3>
              <p className="text-sm">Scroll down to explore different sections of this page. Use the sidebar on the left to navigate to other views.</p>
            </div>
          ),
          disableBeacon: false,
          placement: 'bottom',
        },
        // Step 3: The Two Views Introduction
        {
          target: '[data-tour="transition-section"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Choose Your View</h3>
              <p className="text-sm mb-2">Click one of these buttons to navigate:</p>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li><strong>Exploratory View:</strong> Opens the data dashboard</li>
                <li><strong>Explanatory View:</strong> Opens policy briefs</li>
              </ul>
              <p className="text-sm mt-2">You can also use the sidebar on the left to navigate.</p>
            </div>
          ),
          disableBeacon: false,
          placement: 'auto',
        },
        // Step 4: Sidebar Function
        {
          target: '[data-tour="sidebar"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Navigation Sidebar</h3>
              <p className="text-sm mb-2">Click any item in this sidebar to navigate:</p>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Landing Page, Exploratory View, Explanatory View</li>
                <li>Data Availability, Resources</li>
              </ul>
              <p className="text-sm mt-2">Use the chevron buttons (◀ ▶) to collapse or expand the sidebar.</p>
            </div>
          ),
          disableBeacon: false,
          placement: 'auto',
        },
        // Step 8: Ready to explore
        {
          target: 'body',
          content: (
            <div>
              <h3 className="font-bold mb-2">Ready to Explore!</h3>
              <p className="text-sm">Navigate to Exploratory or Explanatory View using the buttons above or the sidebar. The tour will continue when you arrive.</p>
            </div>
          ),
          placement: 'center',
          disableBeacon: true,
        },
      ]
    } else if (path === '/exploratory' || path.startsWith('/streamlit/')) {
      return [
        // Step 1: Welcome to Exploratory View
        {
          target: 'body',
          content: (
            <div>
              <h3 className="font-bold text-lg mb-2">Exploratory View</h3>
              <p className="text-sm">This is the data exploration dashboard. Use filters and tabs to explore data.</p>
            </div>
          ),
          placement: 'center',
          disableBeacon: true,
        },
        // Step 2: Sidebar in Exploratory View
        {
          target: '[data-tour="sidebar"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Navigate Topics</h3>
              <p className="text-sm">Click on Topic 4.1, 4.2, 4.3, or 4.4 in the sidebar to explore specific indicators. Use other sidebar links to switch views or return home.</p>
            </div>
          ),
          disableBeacon: false,
          placement: 'auto',
        },
        // Step 3: Main Dashboard Area
        {
          target: '[data-tour="streamlit-content"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Interactive Dashboard</h3>
              <p className="text-sm mb-2">Use the controls here to:</p>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Select countries, regions, and years from dropdown filters</li>
                <li>Switch between Graph, Map, and Data Table tabs</li>
                <li>Click "How to Read This Graph" for help</li>
                <li>Expand "Learn more about this indicator" for details</li>
              </ul>
            </div>
          ),
          disableBeacon: false,
          placement: 'auto',
        },
        // Step 4: How to Enter Each Topic
        {
          target: '[data-tour="sidebar"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Enter a Topic</h3>
              <p className="text-sm">In the sidebar, find "Explore Data" section and click on Topic 4.1, 4.2, 4.3, or 4.4. This opens that topic's page with all its indicators.</p>
            </div>
          ),
          disableBeacon: false,
          placement: 'auto',
        },
        // Step 5: How to Go Back to Theme 4
        {
          target: 'body',
          content: (
            <div>
              <h3 className="font-bold mb-2">Go Back</h3>
              <p className="text-sm mb-2">When on a topic page, you can return by:</p>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Clicking the "← Back to Theme 4" button at the top</li>
                <li>Clicking "Exploratory View" in the sidebar</li>
                <li>Using your browser's back button</li>
              </ul>
            </div>
          ),
          placement: 'center',
          disableBeacon: true,
        },
        // Step 6: Topic Overview
        {
          target: 'body',
          content: (
            <div>
              <h3 className="font-bold mb-2">Topic Pages</h3>
              <p className="text-sm">Each topic page shows multiple indicators. Each indicator has filters, multiple views (Graph/Map/Table), and expandable information sections. Click a topic in the sidebar to explore.</p>
            </div>
          ),
          placement: 'center',
          disableBeacon: true,
        },
      ]
    } else if (path === '/explanatory') {
      return [
        // Step 1: Welcome to Explanatory View
        {
          target: 'body',
          content: (
            <div>
              <h3 className="font-bold text-lg mb-2">Explanatory View</h3>
              <p className="text-sm">This page shows policy brief previews. Click tabs above to browse different topics.</p>
            </div>
          ),
          placement: 'center',
          disableBeacon: true,
        },
        // Step 2: Policy Brief Tabs
        {
          target: '[data-tour="policy-brief-tabs"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Browse Topics</h3>
              <p className="text-sm">Click the tabs above (4.1, 4.2, 4.3, 4.4) to see previews for each topic. You can switch between tabs anytime.</p>
            </div>
          ),
          disableBeacon: false,
        },
        // Step 3: Policy Brief Previews
        {
          target: '[data-tour="policy-brief-preview"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Preview Cards</h3>
              <p className="text-sm mb-2">Each preview card has two buttons:</p>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li><strong>"Expand":</strong> Click to see more details on this page</li>
                <li><strong>"View Full":</strong> Click to open the complete policy brief page</li>
              </ul>
            </div>
          ),
          disableBeacon: false,
        },
        // Step 4: Sidebar Navigation
        {
          target: '[data-tour="sidebar"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Navigation</h3>
              <p className="text-sm">Use the sidebar to switch to Exploratory View, access Data Availability, open Resources, or return to the landing page.</p>
            </div>
          ),
          disableBeacon: false,
          placement: 'auto',
        },
        // Step 5: How to Navigate Each Policy Brief
        {
          target: 'body',
          content: (
            <div>
              <h3 className="font-bold mb-2">Opening a Policy Brief</h3>
              <p className="text-sm mb-2">To read a full brief:</p>
              <ol className="text-sm list-decimal list-inside space-y-1">
                <li>Click "View Full" on any preview card</li>
                <li>Scroll through the brief sections</li>
                <li>Use "Back" buttons at the top to return</li>
                <li>Or use the sidebar to navigate elsewhere</li>
              </ol>
            </div>
          ),
          placement: 'center',
          disableBeacon: true,
        },
        // Step 6: Full Policy Brief Features
        {
          target: 'body',
          content: (
            <div>
              <h3 className="font-bold mb-2">Policy Brief Page</h3>
              <p className="text-sm">When you open a full brief, you'll see sections with graphs, analysis, and an "Export to PDF" button at the top. Use the back buttons or sidebar to navigate.</p>
            </div>
          ),
          placement: 'center',
          disableBeacon: true,
        },
      ]
    } else if (path.startsWith('/policy-brief/')) {
      return [
        {
          target: 'body',
          content: (
            <div>
              <h3 className="font-bold text-lg mb-2">Policy Brief Page</h3>
              <p className="text-sm">This is a full policy brief. Scroll to read sections, view graphs, and explore the content.</p>
            </div>
          ),
          placement: 'center',
          disableBeacon: true,
        },
        {
          target: '[data-tour="back-buttons"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Back Buttons</h3>
              <p className="text-sm">Click "Back to Landing Page" or "Back to Explanatory View" to return. You can also use the sidebar or browser back button.</p>
            </div>
          ),
          disableBeacon: false,
        },
        {
          target: '[data-tour="hero-section"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Brief Summary</h3>
              <p className="text-sm">This section provides a quick overview. Scroll down to read the full analysis and view interactive graphs.</p>
            </div>
          ),
          disableBeacon: false,
        },
        {
          target: '[data-tour="graphs"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Interactive Graphs</h3>
              <p className="text-sm">Scroll through the brief to find graphs embedded throughout. Each graph supports the narrative with visual data.</p>
            </div>
          ),
          disableBeacon: false,
        },
        {
          target: '[data-tour="export-button"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Export to PDF</h3>
              <p className="text-sm">Click this button at the top to download the entire brief as a PDF for offline reading or sharing.</p>
            </div>
          ),
          disableBeacon: false,
        },
        {
          target: '[data-tour="sidebar"]',
          content: (
            <div>
              <h3 className="font-bold mb-2">Continue Exploring</h3>
              <p className="text-sm">Use the sidebar to navigate to other policy briefs, switch to Exploratory View, or access other resources.</p>
            </div>
          ),
          disableBeacon: false,
          placement: 'auto',
        },
      ]
    }

    // Default steps for other pages
    return [
      {
        target: 'body',
        content: (
          <div>
            <h3 className="font-bold mb-2">Welcome!</h3>
            <p className="text-sm">Use the sidebar to navigate through different sections of the dashboard.</p>
          </div>
        ),
        placement: 'center',
        disableBeacon: true,
      },
    ]
  }

  const [steps, setSteps] = useState(() => getTourSteps())

  // Update steps when route changes
  useEffect(() => {
    const newSteps = getTourSteps()
    setSteps(newSteps)
    setRun(false)
  }, [location.pathname])

  const handleJoyrideCallback = (data) => {
    const { status, type, step, index, action } = data

    if (process.env.NODE_ENV === 'development') {
      console.log('Joyride callback:', { status, type, index, action, target: step?.target })
    }

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false)
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo_completed', 'true')
      }
      setShowDemoButton(false)
    } else if (type === EVENTS.TARGET_NOT_FOUND) {
      // If target not found, log warning
      console.warn('Tour target not found:', step?.target)
      // Joyride should handle this automatically with continuous mode, but we can help
      // by ensuring the element exists or using a fallback
      if (step?.target && typeof window !== 'undefined') {
        // Try to find the element and scroll to it
        const element = document.querySelector(step.target)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    } else if (type === EVENTS.STEP_AFTER) {
      // After a step completes (when Next is clicked), scroll to next target with precise timing
      const currentSteps = getTourSteps()
      if (index < currentSteps.length - 1 && action === 'next') {
        const nextStep = currentSteps[index + 1]
        if (nextStep?.target && nextStep.target !== 'body' && typeof window !== 'undefined') {
          // Wait for joyride to finish its transition and tooltip to appear
          setTimeout(() => {
            const nextElement = document.querySelector(nextStep.target)
            if (nextElement) {
              // Use getBoundingClientRect for precise positioning
              const elementRect = nextElement.getBoundingClientRect()
              const absoluteElementTop = elementRect.top + window.pageYOffset
              const viewportHeight = window.innerHeight
              
              // Position element in the upper-middle of viewport (better for tooltips)
              const offset = viewportHeight * 0.25 // 25% from top
              
              window.scrollTo({
                top: Math.max(0, absoluteElementTop - offset),
                behavior: 'smooth'
              })
            }
          }, 600) // Wait for tooltip animation to complete
        }
      }
    } else if (type === EVENTS.STEP_BEFORE) {
      // Before showing a step, ensure target is visible
      if (step?.target && step.target !== 'body' && typeof window !== 'undefined') {
        setTimeout(() => {
          const element = document.querySelector(step.target)
          if (element) {
            const elementRect = element.getBoundingClientRect()
            const absoluteElementTop = elementRect.top + window.pageYOffset
            const viewportHeight = window.innerHeight
            const offset = viewportHeight * 0.25
            
            // Only scroll if element is not already in good position
            const currentScroll = window.pageYOffset
            const targetScroll = Math.max(0, absoluteElementTop - offset)
            
            if (Math.abs(currentScroll - targetScroll) > 100) {
              window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
              })
            }
          }
        }, 100)
      }
    }
  }

  const startDemo = () => {
    setShowDemoButton(false) // Hide the demo card when tour starts
    // Wait longer to ensure DOM is fully ready
    setTimeout(() => {
      setRun(true)
    }, 1200)
  }

  const skipDemo = () => {
    setShowDemoButton(false)
    setRun(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo_completed', 'true')
    }
  }

  return (
    <>
      {/* Demo Button - Hide when tour is running */}
      {showDemoButton && !run && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#0072BC]" />
                <h3 className="font-semibold text-gray-900 text-sm">Take a Tour</h3>
              </div>
              <button
                onClick={skipDemo}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              New to the dashboard? Take a quick tour to learn how to navigate and use the interface.
            </p>
            <div className="flex gap-2">
              <button
                onClick={startDemo}
                className="flex-1 bg-[#0072BC] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005a9e] transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Tour
              </button>
              <button
                onClick={skipDemo}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Help Button (always visible, only when demo card is not shown) */}
      {!showDemoButton && !run && (
        <button
          onClick={startDemo}
          className="fixed bottom-24 right-6 z-50 bg-[#0072BC] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          aria-label="Start demo tour"
          title="Start guided tour"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      )}

      {/* Joyride Component */}
      {steps.length > 0 && (
        <Joyride
          steps={steps}
          run={run}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          callback={handleJoyrideCallback}
          disableOverlayClose={false}
          disableScrolling={false}
          spotlightClicks={false}
          scrollOffset={200}
          scrollToFirstStep={true}
          disableCloseOnEsc={false}
          floaterProps={{
            disableAnimation: false,
            placement: 'center',
            styles: {
              options: {
                zIndex: 10000,
              },
            },
          }}
          spotlightPadding={5}
          styles={{
            options: {
              primaryColor: '#0072BC',
              zIndex: 10000,
            },
            tooltip: {
              borderRadius: 8,
              fontSize: 14,
              maxWidth: 350,
              transition: 'all 0.5s ease-in-out',
            },
            tooltipContainer: {
              textAlign: 'left',
              transition: 'all 0.5s ease-in-out',
            },
            overlay: {
              transition: 'all 0.5s ease-in-out',
            },
            spotlight: {
              transition: 'all 0.5s ease-in-out',
            },
            tooltipTitle: {
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 8,
            },
            tooltipContent: {
              fontSize: 14,
              lineHeight: 1.6,
            },
            buttonNext: {
              backgroundColor: '#0072BC',
              fontSize: 14,
              padding: '10px 20px',
              borderRadius: 6,
              fontWeight: 600,
              transition: 'all 0.3s ease',
            },
            buttonBack: {
              color: '#0072BC',
              fontSize: 14,
              padding: '10px 20px',
              marginRight: 10,
              transition: 'all 0.3s ease',
            },
            buttonSkip: {
              color: '#6B7280',
              fontSize: 14,
              transition: 'all 0.3s ease',
            },
          }}
          hideCloseButton={false}
          locale={{
            back: 'Back',
            close: 'Close',
            last: 'Finish',
            next: 'Next',
            skip: 'Skip tour',
          }}
        />
      )}
    </>
  )
}

export default DemoMode
