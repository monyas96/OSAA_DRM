import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Database, Settings, CheckCircle } from 'lucide-react'
import SidebarNavigation from '../components/SidebarNavigation'
import ScrollProgress from '../components/ScrollProgress'
import BackToTop from '../components/BackToTop'

const EvidenceProcessView = () => {
  const navigate = useNavigate()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const sections = [
    {
      icon: Database,
      title: 'Data Sources',
      description: 'View the underlying data tables and sources used in the framework',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Settings,
      title: 'ETL Pipeline',
      description: 'Understand how data is extracted, transformed, and loaded',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: CheckCircle,
      title: 'Quality & Coverage',
      description: 'Review data quality metrics and coverage statistics',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <SidebarNavigation />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#003366] hover:text-orange-500 transition-colors font-medium mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Landing Page</span>
          </button>
          
          <h1 className="text-4xl font-bold text-[#003366] mb-4">
            Evidence Process: How We Built This System
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Understand the methodology, data sources, and technical implementation behind the DRM framework.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-[#003366] to-[#004080] rounded-xl p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-4">The Analytical Journey</h2>
            <p className="text-lg text-white/90 leading-relaxed">
              From raw data to policy insights: Explore how we transform indicators into actionable evidence.
            </p>
          </div>
        </motion.div>

        {/* Process Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#003366] mb-3">
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {section.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gray-50 rounded-xl p-8 border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-[#003366] mb-6">Technical Implementation</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-[#003366] mb-2">Data Tables</h4>
              <p className="text-gray-600 mb-4">
                Main dataset (df_main): 616,409 rows | 457 indicators | 239 countries
              </p>
              <p className="text-gray-600">
                Reference data (ref_data): 242 countries with regional and income classifications
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-[#003366] mb-2">Shared Rendering Functions</h4>
              <p className="text-gray-600">
                Both Exploratory and Explanatory views use identical rendering functions to ensure consistency across all indicators.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA to View in Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/streamlit/theme-4?view=evidence-process')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 text-lg"
          >
            View Full Evidence Process in Dashboard
          </button>
        </motion.div>
      </main>

      <BackToTop />
    </div>
  )
}

export default EvidenceProcessView

