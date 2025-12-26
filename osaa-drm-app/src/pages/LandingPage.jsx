import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import FundamentalShift from '../components/FundamentalShift'
import FourPillars from '../components/FourPillars'
import FinancingParadox from '../components/FinancingParadox'
import DRMGameChanger from '../components/DRMGameChanger'
import TransitionSection from '../components/TransitionSection'
import BreadcrumbNavigation from '../components/BreadcrumbNavigation'
import EmbeddedExploratoryView from '../components/EmbeddedExploratoryView'
import EmbeddedExplanatoryView from '../components/EmbeddedExplanatoryView'
import SidebarNavigation from '../components/SidebarNavigation'
import ResourcePanel from '../components/ResourcePanel'
import ScrollProgress from '../components/ScrollProgress'
import BackToTop from '../components/BackToTop'

function LandingPage() {
  const navigate = useNavigate()
  const [showResourcePanel, setShowResourcePanel] = useState(false)
  const [currentView, setCurrentView] = useState(null) // null, 'exploratory', or 'explanatory'
  const [showDashboard, setShowDashboard] = useState(false)

  const handleViewSelection = (view) => {
    setCurrentView(view)
    setShowDashboard(true)
    
    // Smooth scroll to dashboard
    setTimeout(() => {
      const dashboard = document.getElementById('dashboard-content')
      dashboard?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleBackToIntroduction = () => {
    setShowDashboard(false)
    setCurrentView(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToFramework = () => {
    setShowDashboard(false)
    setCurrentView(null)
    const section = document.getElementById('transition-to-dashboard')
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleViewSwitch = (view) => {
    setCurrentView(view)
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <HeroSection />
      <SidebarNavigation />
      <ResourcePanel 
        isOpen={showResourcePanel} 
        onClose={() => setShowResourcePanel(false)}
      />
      
      <main className="relative">
        <FundamentalShift />
        <FourPillars />
        <FinancingParadox />
        <DRMGameChanger />
        <TransitionSection onViewSelection={handleViewSelection} />
      </main>

      {/* Dashboard Section */}
      {showDashboard && (
        <div id="dashboard-content" className="min-h-screen bg-gray-50">
          {/* Breadcrumb Navigation */}
          <BreadcrumbNavigation
            currentView={currentView}
            onBackToIntroduction={handleBackToIntroduction}
            onBackToFramework={handleBackToFramework}
            onViewSwitch={handleViewSwitch}
          />

          {/* Conditional Dashboard Content */}
          <div className="max-w-7xl mx-auto px-8 py-12">
            {currentView === 'exploratory' && (
              <div className="fade-in">
                <EmbeddedExploratoryView />
              </div>
            )}
            
            {currentView === 'explanatory' && (
              <div className="fade-in">
                <EmbeddedExplanatoryView />
              </div>
            )}
          </div>
        </div>
      )}

      <BackToTop />
    </div>
  )
}

export default LandingPage
