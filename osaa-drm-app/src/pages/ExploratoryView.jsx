import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import SidebarNavigation from '../components/SidebarNavigation'
import ScrollProgress from '../components/ScrollProgress'
import BackToTop from '../components/BackToTop'
import StreamlitEmbed from '../components/StreamlitEmbed'

const ExploratoryView = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [frameworkExpanded, setFrameworkExpanded] = useState(true)
  const [activeTab, setActiveTab] = useState('theme-4')

  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname === '/exploratory') {
      setActiveTab('theme-4')
    } else if (location.pathname === '/streamlit/topic-4-1' || location.pathname === '/topic/4.1') {
      setActiveTab('topic-4-1')
    } else if (location.pathname === '/streamlit/topic-4-2') {
      setActiveTab('topic-4-2')
    } else if (location.pathname === '/streamlit/topic-4-3') {
      setActiveTab('topic-4-3')
    } else if (location.pathname === '/streamlit/topic-4-4') {
      setActiveTab('topic-4-4')
    }
  }, [location.pathname])

  const tabs = [
    { id: 'theme-4', label: 'Theme 4 Overview', page: 'theme-4' },
    { id: 'topic-4-1', label: 'Public Expenditures (Topic 4.1)', page: 'topic-4-1' },
    { id: 'topic-4-2', label: 'Budget and Tax Revenues (Topic 4.2)', page: 'topic-4-2' },
    { id: 'topic-4-3', label: 'Capital Markets (Topic 4.3)', page: 'topic-4-3' },
    { id: 'topic-4-4', label: 'Illicit Flows (Topic 4.4)', page: 'topic-4-4' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <SidebarNavigation alwaysVisible={true} />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#003366] hover:text-orange-500 transition-colors font-medium mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Landing Page</span>
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-[#003366] mb-3">
            Theme 4: Domestic Resource Mobilization (DRM)
          </h1>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed">
            Institutions & Systems — Building robust financial frameworks for sustainable development through efficient resource management, transparent governance, and institutional capacity.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Understanding the Framework */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
            <button
              onClick={() => setFrameworkExpanded(!frameworkExpanded)}
              className="flex items-center justify-between w-full mb-4"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-bold text-[#003366]">
                  Understanding the Framework
                </h2>
              </div>
              {frameworkExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {frameworkExpanded && (
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
                  <h3 className="text-lg font-bold text-[#003366] mb-3">What is this view about?</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-[#003366] mb-1 text-sm">Definition:</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Access raw, indicator-level data for all four topics.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#003366] mb-1 text-sm">Purpose:</p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Enable unfiltered data discovery and direct validation of the framework's Challenge and Root Cause.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-l-4 border-orange-500 p-5 rounded-r-lg">
                  <h3 className="text-lg font-bold text-[#003366] mb-3">The Challenge (What):</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Countries have money, but it is not where it should be, it is not used as it should be, and does not benefit whom it should.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-blue-500 p-5 rounded-r-lg">
                  <h3 className="text-lg font-bold text-[#003366] mb-3">The Root Cause (Why):</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Institutional weaknesses in managing and capturing domestic financial resources.
                  </p>
                </div>

                <div className="bg-white border-l-4 border-teal-500 p-5 rounded-r-lg">
                  <h3 className="text-lg font-bold text-[#003366] mb-3">The Solution (Therefore):</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Stronger ability to evaluate and manage domestic resources contributes to offering sustainable financial resources.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Exploratory Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <div className="bg-white border-l-4 border-orange-500 pl-6 py-4">
            <h2 className="text-xl font-bold text-[#003366]">
              Exploratory Dashboard: Interactive Data Exploration
            </h2>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          data-tour="exploratory-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                // Navigate to the appropriate route
                if (tab.id === 'theme-4') {
                  navigate('/exploratory')
                } else {
                  navigate(`/streamlit/${tab.page}`)
                }
              }}
              className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#003366] text-[#003366] bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-[#003366] hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content Area - Streamlit Embed or Topic 4.1 */}
        <motion.div
          data-tour="streamlit-content"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
        >
          <StreamlitEmbed 
            key={activeTab} // Force re-render when tab changes
            page={tabs.find(t => t.id === activeTab)?.page || 'theme-4'} 
            hideHeader={true} 
          />
        </motion.div>
      </main>

      <BackToTop />
    </div>
  )
}

export default ExploratoryView

