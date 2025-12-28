import React from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SidebarNavigation from '../../components/SidebarNavigation'
import { usePDFExport } from './hooks/usePDFExport'
import HeroSection43 from './components/HeroSection43'
import CrisisSection43 from './components/CrisisSection43'
import CoreInsightSection43 from './components/CoreInsightSection43'
import SolutionsSection43 from './components/SolutionsSection43'
import ConclusionSection43 from './components/ConclusionSection43'
import MethodologyAnnex43 from './components/MethodologyAnnex43'

const PolicyBrief43 = () => {
  const navigate = useNavigate()
  const { exportToPDF, isExporting } = usePDFExport()

  const handleExport = async () => {
    try {
      // Try auto method first (will try print, then jspdf-html, then html2canvas)
      await exportToPDF('policy-brief-content', 'policy-brief-4.3-capital-markets', 'auto')
    } catch (error) {
      console.error('PDF export error:', error)
      // Error is already handled in the hook with fallback
    }
  }

  return (
    <div className="policy-brief bg-white">
      <SidebarNavigation alwaysVisible={true} />
      
      {/* Header with back buttons and export icon */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2" data-tour="back-buttons">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-osaa-blue hover:text-osaa-orange transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Landing Page</span>
              </button>
              <button
                onClick={() => navigate('/explanatory')}
                className="flex items-center gap-2 text-osaa-blue hover:text-osaa-orange transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Explanatory View</span>
              </button>
            </div>
            {/* Small Export Icon Button */}
            <motion.button
              data-tour="export-button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 text-gray-600 hover:text-osaa-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={isExporting ? 'Exporting...' : 'Export as PDF'}
            >
              <Download size={18} />
              {isExporting && <span className="text-sm">Exporting...</span>}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div id="policy-brief-content">
        {/* Hero Section with Three Info Boxes */}
        <div data-tour="hero-section">
          <HeroSection43 />
        </div>

        {/* Crisis Section */}
        <div data-tour="graphs">
          <CrisisSection43 />
        </div>

        {/* Core Insight Section */}
        <CoreInsightSection43 />

        {/* Solutions Section */}
        <SolutionsSection43 />

        {/* Conclusion Section */}
        <ConclusionSection43 />

        {/* Methodology Annex */}
        <MethodologyAnnex43 />
      </div>
    </div>
  )
}

export default PolicyBrief43

