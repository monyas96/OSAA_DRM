import React from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SidebarNavigation from '../../components/SidebarNavigation'
import HeroSection from './components/HeroSection'
import CrisisSection41 from './components/CrisisSection41'
import EvidenceSection41 from './components/EvidenceSection41'
import CoreInsightSection41 from './components/CoreInsightSection41'
import ImpactSection41 from './components/ImpactSection41'
import SolutionsSection41 from './components/SolutionsSection41'
import ConclusionSection41 from './components/ConclusionSection41'
import { usePDFExport } from './hooks/usePDFExport'
const PolicyBrief41 = () => {
  const navigate = useNavigate()
  const { exportToPDF, isExporting } = usePDFExport()

  const briefData = {
    topic: '4.1',
    title: 'Public Expenditures',
    subtitle: 'From Waste to Worth: Making Every Dollar Count',
    crisis: {
      opening: 'African countries face a staggering $500-600 billion annual drain from inefficient public expenditure management.'
    },
    findings: {
      pi1: {
        finding1: 'The data reveals significant variation in expenditure efficiency across African countries. While a minority achieve Score A (strong execution), the majority score D, indicating actual spending deviates by more than 15% from planned budgets.',
        finding2: 'Some countries show improvement over time, moving from Score D to B or A, demonstrating that better budget execution is achievable. However, many countries remain stuck in weak execution patterns, indicating systemic institutional challenges.',
        keyInsight: 'Regional patterns show that 60%+ of countries score D, indicating widespread budget execution challenges across the continent.'
      },
      pi2: {
        finding1: 'Expenditure composition analysis reveals that 70%+ of countries experience severe distortion, with health and education budgets cut by 15%+ mid-year.',
        finding2: 'The variance between planned and actual sector allocations undermines long-term planning and breaks social contracts with citizens.',
        keyInsight: 'Composition distortion signals that strategic priorities are not protected, undermining development effectiveness.'
      }
    }
  }

  const handleExport = async () => {
    try {
      // Try auto method first (will try print, then jspdf-html, then html2canvas)
      await exportToPDF('policy-brief-content', 'policy-brief-4.1-public-expenditures', 'auto')
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
            <div className="flex flex-col gap-2">
              {/* Back to Landing Page */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-osaa-blue hover:text-osaa-orange transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Landing Page</span>
              </button>
              {/* Back to Explanatory View */}
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
        <HeroSection data={briefData} />
        
        {/* Crisis Section */}
        <CrisisSection41 />

        {/* Evidence Section (includes graphs) */}
          <EvidenceSection41 />

        {/* Core Insight Section */}
        <CoreInsightSection41 />

        {/* Impact Section */}
        <ImpactSection41 />

        {/* Solutions Section */}
        <SolutionsSection41 />

        {/* Conclusion Section */}
        <ConclusionSection41 />
      </div>
    </div>
  )
}

export default PolicyBrief41

