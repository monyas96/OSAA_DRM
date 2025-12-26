import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'
import SidebarNavigation from '../components/SidebarNavigation'
import ScrollProgress from '../components/ScrollProgress'
import BackToTop from '../components/BackToTop'
import BreadcrumbNavigation from '../components/BreadcrumbNavigation'
import PolicyBriefPreview from './policy-briefs/components/PolicyBriefPreview'

const ExplanatoryView = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('public-expenditures')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname === '/policy-brief/4.1') {
      setActiveTab('public-expenditures')
    } else if (location.pathname === '/policy-brief/4.2') {
      setActiveTab('budget-tax')
    } else if (location.pathname === '/policy-brief/4.3') {
      setActiveTab('capital-markets')
    } else if (location.pathname === '/policy-brief/4.4') {
      setActiveTab('illicit-flows')
    } else if (location.pathname === '/explanatory') {
      // Default to first tab when on explanatory view page
      setActiveTab('public-expenditures')
    } else if (location.pathname.includes('capital-markets')) {
      setActiveTab('capital-markets')
    } else if (location.pathname.includes('illicit-flows')) {
      setActiveTab('illicit-flows')
    }
  }, [location.pathname])

  const handleViewSwitch = (view) => {
    if (view === 'exploratory') {
      // Navigate to /exploratory which redirects to Streamlit app
      navigate('/exploratory')
    } else if (view === 'explanatory') {
      // Already on explanatory view
      return
    }
  }

  const handleBackToIntroduction = () => {
    navigate('/')
  }

  const handleBackToFramework = () => {
    navigate('/')
  }

  const tabs = [
    { id: 'public-expenditures', label: 'Public Expenditures (Topic 4.1)', route: '/policy-brief/4.1' },
    { id: 'budget-tax', label: 'Budget and Tax Revenues (Topic 4.2)', route: '/policy-brief/4.2' },
    { id: 'capital-markets', label: 'Capital Markets (Topic 4.3)', route: '/policy-brief/4.3' },
    { id: 'illicit-flows', label: 'Illicit Flows (Topic 4.4)', route: '/policy-brief/4.4' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <SidebarNavigation alwaysVisible={true} />
      
      {/* Breadcrumb Navigation with View Switcher */}
      <BreadcrumbNavigation
        currentView="explanatory"
        onBackToIntroduction={handleBackToIntroduction}
        onBackToFramework={handleBackToFramework}
        onViewSwitch={handleViewSwitch}
      />
      
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
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-bold text-[#003366]">
                Understanding the Framework
              </h2>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
              <h3 className="text-lg font-bold text-[#003366] mb-3">What is this view about?</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-[#003366] mb-1 text-sm">Definition:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Synthesis of data to answer a high-level strategic policy question.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[#003366] mb-1 text-sm">Purpose:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Provide actionable conclusions and policy recommendations, fulfilling The Solution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Policy Brief Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <div className="bg-white border-l-4 border-orange-500 pl-6 py-4">
            <h2 className="text-xl font-bold text-[#003366]">
              Policy Brief: Strategic Insights from DRM Data
            </h2>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          data-tour="policy-brief-tabs"
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

        {/* Content Area - Policy Brief Previews */}
        <motion.div
          data-tour="policy-brief-preview"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4"
        >
          {activeTab === 'public-expenditures' && (
            <PolicyBriefPreview
              briefId="4.1"
              title="Public Expenditures (Topic 4.1)"
              subtitle="From Waste to Worth: Making Every Dollar Count"
              heroContent="African countries face a staggering $500-600 billion annual drain from inefficient public expenditure management. The evidence from PEFA assessments is clear: 45% of assessed African countries score D on budget execution, and 77% experience severe composition distortion, meaning strategic priorities are not protected."
              keyPoints={[
                "45% of assessed African countries score D on budget execution, indicating actual spending deviates by more than 15% from planned budgets",
                "77% experience severe composition distortion, with health and education budgets cut by 15%+ mid-year",
                "Inefficient public expenditure management contributes significantly to Africa's $500-600 billion annual resource drain",
                "Weak budget execution reveals fragmented systems, poor commitment controls, political interference, and absent accountability mechanisms",
                "The solution requires a three-pillar strategy: improving transparency and accountability, protecting priority sectors, and strengthening PFM systems"
              ]}
              route="/policy-brief/4.1"
            />
          )}

          {activeTab === 'budget-tax' && (
            <PolicyBriefPreview
              briefId="4.2"
              title="Budget and Tax Revenues (Topic 4.2)"
              subtitle="Closing the Tap: Africa's $120-145 Billion Tax Leakage Crisis"
              heroContent="African countries collect only $340-400 billion of $480-545 billion in potential tax revenue annually. This $120-145 billion leakage—revenue that should reach government coffers but never does—flows through cracks in weak tax systems, inefficient administration, and porous enforcement."
              keyPoints={[
                "African countries collect only 65-75% of their tax capacity (tax effort averages 0.72)",
                "Tax systems are structurally inelastic—buoyancy averages 0.71, meaning revenues grow at just 71% the rate of GDP",
                "The tax gap averages 5-7% of GDP across African countries, with the largest leaks in countries with the weakest institutions",
                "$120-145 billion annual leakage equals 2-2.5× total development aid to Africa",
                "The hemorrhage creates chronic underfunding, forced reliance on volatile external financing, and reduced economic sovereignty"
              ]}
              route="/policy-brief/4.2"
            />
          )}

          {activeTab === 'capital-markets' && (
            <PolicyBriefPreview
              briefId="4.3"
              title="Capital Markets (Topic 4.3)"
              subtitle="The Capital Drain: When Savings Escape Instead of Investing"
              heroContent="African capital markets are too shallow to absorb domestic savings. 75% of countries have market capitalization below 30% of GDP—less than half the emerging market benchmark. Banking systems provide credit equal to just 35% of GDP on average, compared to 80-120% in comparable economies. Capital escapes abroad because it has nowhere productive to go domestically."
              keyPoints={[
                "75% of African countries have market capitalization below 30% of GDP—less than half the emerging market benchmark",
                "Banking systems provide credit equal to just 35% of GDP on average, compared to 80-120% in comparable economies",
                "Portfolio investment flows are highly volatile—surging during booms, collapsing during crises, forcing sudden fiscal adjustments",
                "Countries hold billions in defensive foreign reserves (unproductive assets abroad) while facing domestic financing gaps",
                "Pension funds allocate 70-80% to bonds and listed equities, less than 5% to infrastructure, yet Africa faces a $100B annual infrastructure gap"
              ]}
              route="/policy-brief/4.3"
            />
          )}

          {activeTab === 'illicit-flows' && (
            <PolicyBriefPreview
              briefId="4.4"
              title="Illicit Financial Flows (Topic 4.4)"
              subtitle="The Reverse Flow: How Africa Sends $88.6 Billion More Than It Receives"
              heroContent="Africa receives $102 billion annually in aid ($48B) and foreign direct investment ($54B), but loses $88.6 billion to illicit financial flows. The net benefit is only $13.4 billion—an 87% leakage rate. For every $100 flowing into Africa, $87 flows back out illicitly. The continent averages 3.7% of GDP lost to IFFs annually, with West Africa losing 10.3% of GDP—among the highest rates globally."
              keyPoints={[
                "Africa receives $102 billion but loses $88.6 billion to illicit flows—an 87% leakage rate",
                "Trade-based IFFs account for approximately 65% of total outflows through invoice manipulation and profit shifting",
                "The extractive sector alone loses $40 billion annually to under-invoicing, with gold representing 77% of this mispricing",
                "Nigeria ($41B), Egypt ($17.5B), and South Africa ($14.1B) account for 82% of total IFF outflows",
                "From 2000-2015, cumulative IFF losses reached $836 billion—exceeding total aid received during the same period"
              ]}
              route="/policy-brief/4.4"
            />
          )}
        </motion.div>
      </main>

      <BackToTop />
    </div>
  )
}

export default ExplanatoryView

