import React from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SidebarNavigation from '../../components/SidebarNavigation'
import { usePDFExport } from './hooks/usePDFExport'
import HeroSection42 from './components/HeroSection42'
import CrisisSection42 from './components/CrisisSection42'
import EvidenceSection42 from './components/EvidenceSection42'
import CoreInsightSection from './components/CoreInsightSection'
import SolutionsSection42 from './components/SolutionsSection42'
import MethodologyAnnex42 from './components/MethodologyAnnex42'

const PolicyBrief42 = () => {
  const navigate = useNavigate()
  const { exportToPDF, isExporting } = usePDFExport()

  const handleExport = async () => {
    try {
      // Try auto method first (will try print, then jspdf-html, then html2canvas)
      await exportToPDF('policy-brief-content', 'policy-brief-4.2-tax-revenues', 'auto')
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
          <div className="flex flex-col gap-2">
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
        <HeroSection42 />

        {/* Crisis Section */}
        <CrisisSection42 />

        {/* Evidence Section with Graphs */}
        <EvidenceSection42 />

        {/* Core Insight Section */}
        <CoreInsightSection />

        {/* Solutions Section */}
        <SolutionsSection42 />

        {/* Methodology Annex */}
        <MethodologyAnnex42 />
      </div>
    </div>
  )
}

export default PolicyBrief42

