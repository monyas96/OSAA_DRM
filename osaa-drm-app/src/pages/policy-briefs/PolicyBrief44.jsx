import React from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SidebarNavigation from '../../components/SidebarNavigation'
import { usePDFExport } from './hooks/usePDFExport'
import HeroSection44 from './components/HeroSection44'
import CrisisSection44 from './components/CrisisSection44'
import CoreInsightSection44 from './components/CoreInsightSection44'
import SolutionsSection44 from './components/SolutionsSection44'
import ConclusionSection44 from './components/ConclusionSection44'
import MethodologyAnnex44 from './components/MethodologyAnnex44'

const PolicyBrief44 = () => {
  const navigate = useNavigate()
  const { exportToPDF, isExporting } = usePDFExport()

  const handleExport = async () => {
    try {
      // Try auto method first (will try print, then jspdf-html, then html2canvas)
      await exportToPDF('policy-brief-content', 'policy-brief-4.4-illicit-flows', 'auto')
    } catch (error) {
      console.error('PDF export error:', error)
      // Error is already handled in the hook with fallback
    }
  }

  return (
    <div className="policy-brief bg-white">
      <SidebarNavigation alwaysVisible={true} />
      
      {/* Header with back buttons */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
        </div>
      </div>

      {/* Fixed Export Button */}
      <motion.button
        data-tour="export-button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleExport}
        disabled={isExporting}
        className="fixed bottom-8 right-8 bg-[#0072BC] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 z-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download size={20} />
        {isExporting ? 'Exporting...' : 'Export as PDF'}
      </motion.button>

      {/* Content */}
      <div id="policy-brief-content">
        {/* Hero Section with Three Info Boxes */}
        <div data-tour="hero-section">
          <HeroSection44 />
        </div>

        {/* Crisis Section */}
        <div data-tour="graphs">
          <CrisisSection44 />
        </div>

        {/* Core Insight Section */}
        <CoreInsightSection44 />

        {/* Solutions Section */}
        <SolutionsSection44 />

        {/* Conclusion Section */}
        <ConclusionSection44 />

        {/* Methodology Annex */}
        <MethodologyAnnex44 />
      </div>
    </div>
  )
}

export default PolicyBrief44

