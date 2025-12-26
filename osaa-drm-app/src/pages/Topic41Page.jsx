import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Info, Loader2 } from 'lucide-react'
import SidebarNavigation from '../components/SidebarNavigation'
import ScrollProgress from '../components/ScrollProgress'
import BackToTop from '../components/BackToTop'
import PefaHeatmapRecharts from '../components/charts/PefaHeatmapRecharts'
import PefaBarChartRecharts from '../components/charts/PefaBarChartRecharts'
import MultiSelect from '../components/MultiSelect'
import { 
  loadMainData, 
  loadReferenceData, 
  getIndicatorData, 
  listCountries, 
  listYears 
} from '../services/dataService'

const Topic41Page = () => {
  const navigate = useNavigate()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  // Global data and loading states
  const [data, setData] = useState(null)
  const [refData, setRefData] = useState(null)
  const [countries, setCountries] = useState([])
  const [years, setYears] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Sub-topic tabs
  const [activeTab, setActiveTab] = useState('efficiency')
  
  // View tabs for each indicator (graph/map/table)
  const [ind411View, setInd411View] = useState('graph')
  const [ind412View, setInd412View] = useState('graph')

  // Indicator 4.1.1.1 filters and data
  const [ind411Year, setInd411Year] = useState('All Years')
  const [ind411Countries, setInd411Countries] = useState([])
  const [ind411Regions, setInd411Regions] = useState([])
  const [indicator411Data, setIndicator411Data] = useState([])
  const [loadingInd411, setLoadingInd411] = useState(false)

  // Indicator 4.1.2.1 filters and data
  const [ind412Year, setInd412Year] = useState('All Years')
  const [ind412Countries, setInd412Countries] = useState([])
  const [ind412Regions, setInd412Regions] = useState([])
  const [ind412PefaView, setInd412PefaView] = useState('PEFA: PI-2 Expenditure Composition Outturn')
  const [indicator412Data, setIndicator412Data] = useState([])
  const [loadingInd412, setLoadingInd412] = useState(false)

  // Supporting info expanders
  const [expanded411Learn, setExpanded411Learn] = useState(false)
  const [expanded411Lens, setExpanded411Lens] = useState(false)
  const [expanded412Learn, setExpanded412Learn] = useState(false)
  const [expanded412Lens, setExpanded412Lens] = useState(false)

  // Load initial metadata from API (countries, years, reference data)
  // Don't load full main data - it's too large (616K rows)
  // Instead, load indicator-specific data on demand
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🔄 Loading metadata from API...')
        
        const [refDataResult, countriesList, yearsList] = await Promise.all([
          loadReferenceData().catch((e) => {
            console.warn('⚠️ Failed to load reference data:', e)
            return []
          }),
          listCountries().catch((e) => {
            console.error('❌ Failed to load countries:', e)
            return []
          }),
          listYears().catch((e) => {
            console.error('❌ Failed to load years:', e)
            return []
          })
        ])
        
        console.log('✅ Metadata loaded successfully:')
        console.log(`  - Reference data: ${refDataResult?.length || 0} rows`)
        console.log(`  - Countries: ${countriesList?.length || 0}`)
        console.log(`  - Years: ${yearsList?.length || 0}`)
        
        // Don't load full main data - too large
        // setData(null) // We'll load indicator data on demand
        setRefData(refDataResult)
        setCountries(countriesList)
        setYears(yearsList)
        
        if (countriesList.length === 0 && yearsList.length === 0) {
          setError('No metadata loaded. Make sure API server is running: python api_server.py')
        }
      } catch (loadError) {
        console.error('❌ Error loading metadata:', loadError)
        setError(`Failed to load metadata: ${loadError.message}. Make sure API server is running: python api_server.py`)
        setRefData([])
        setCountries([])
        setYears([])
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  // Load Indicator 4.1.1.1 data
  // This effect runs when filters change OR when initial loading completes
  useEffect(() => {
    // Wait for initial metadata to load before fetching indicator data
    if (loading || !years.length || !countries.length) {
      console.log('⏳ Waiting for metadata to load...', { loading, yearsCount: years.length, countriesCount: countries.length })
      return
    }
    
    const loadInd411Data = async () => {
      try {
        setLoadingInd411(true)
        // Use the correct indicator label from the database
        // The actual format in the database is "PEFA: PI-1 Aggregate expenditure out-turn"
        const indicatorLabel = "PEFA: PI-1 Aggregate expenditure out-turn"
        
        // Filter by Africa by default (if no specific countries/regions selected)
        // Get all African countries from reference data
        let africaFilterCountries = undefined
        if (ind411Countries.length === 0 && ind411Regions.length === 0 && refData && refData.length > 0) {
          // Default: filter to Africa only
          africaFilterCountries = refData
            .filter(r => r['Region Name'] === 'Africa')
            .map(r => r['Country or Area'])
            .filter(Boolean)
        }
        
        const filters = {
          countries: ind411Countries.length > 0 
            ? ind411Countries 
            : africaFilterCountries, // Use Africa countries as default if no selection
          regions: ind411Regions.length > 0 ? ind411Regions : undefined,
          yearStart: ind411Year !== 'All Years' ? parseInt(ind411Year) : undefined,
          yearEnd: ind411Year !== 'All Years' ? parseInt(ind411Year) : undefined
        }
        
        console.log(`🔄 Loading indicator 4.1.1.1 data (filter changed):`)
        console.log(`   Label: ${indicatorLabel}`)
        console.log(`   Year: ${ind411Year}`)
        console.log(`   Countries: ${ind411Countries.length > 0 ? ind411Countries : 'All'}`)
        console.log(`   Regions: ${ind411Regions.length > 0 ? ind411Regions : 'All'}`)
        console.log(`   Filters object:`, filters)
        
        const indData = await getIndicatorData(indicatorLabel, filters)
        console.log(`✅ Loaded indicator 4.1.1.1 data:`, indData.length, 'rows')
        if (indData.length > 0) {
          console.log(`   Sample data:`, indData.slice(0, 3))
        } else {
          console.warn(`   ⚠️ No data returned. Check API response.`)
        }
        setIndicator411Data(indData)
      } catch (err) {
        console.error('❌ Error loading indicator 4.1.1.1 data:', err)
        setIndicator411Data([])
      } finally {
        setLoadingInd411(false)
      }
    }
    
    loadInd411Data()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ind411Year, JSON.stringify(ind411Countries), JSON.stringify(ind411Regions), loading, years.length, countries.length, JSON.stringify(refData)])

  // Load Indicator 4.1.2.1 data
  useEffect(() => {
    // Wait for initial metadata to load before fetching indicator data
    if (loading) {
      return
    }
    
    // If years or countries aren't loaded yet, wait
    if (!years.length || !countries.length) {
      return
    }
    
    const loadInd412Data = async () => {
      try {
        setLoadingInd412(true)
        
        // Determine indicator label based on selected PEFA view
        // Match the exact labels from the database
        let indicatorLabel = "PEFA: Composition of expenditure out-turn compared to original approved budget"
        if (ind412PefaView === "PEFA: Expenditure Composition Outturn by Function") {
          indicatorLabel = "PEFA: Expenditure composition outturn by function"
        } else if (ind412PefaView === "PEFA: Expenditure Composition Outturn by Economic Type") {
          indicatorLabel = "PEFA: Expenditure composition outturn by economic type"
        }
        
        // Filter by Africa by default (if no specific countries/regions selected)
        // Get all African countries from reference data
        let africaFilterCountries = undefined
        if (ind412Countries.length === 0 && ind412Regions.length === 0 && refData && refData.length > 0) {
          // Default: filter to Africa only
          africaFilterCountries = refData
            .filter(r => r['Region Name'] === 'Africa')
            .map(r => r['Country or Area'])
            .filter(Boolean)
        }
        
        const filters = {
          countries: ind412Countries.length > 0 
            ? ind412Countries 
            : africaFilterCountries, // Use Africa countries as default if no selection
          regions: ind412Regions.length > 0 ? ind412Regions : undefined,
          yearStart: ind412Year !== 'All Years' ? parseInt(ind412Year) : undefined,
          yearEnd: ind412Year !== 'All Years' ? parseInt(ind412Year) : undefined
        }
        
        const indData = await getIndicatorData(indicatorLabel, filters)
        console.log('Loaded indicator 4.1.2.1 data:', indData.length, 'rows')
        setIndicator412Data(indData)
      } catch (err) {
        console.error('Error loading indicator 4.1.2.1 data:', err)
        setIndicator412Data([])
      } finally {
        setLoadingInd412(false)
      }
    }
    
    loadInd412Data()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ind412Year, JSON.stringify(ind412Countries), JSON.stringify(ind412Regions), ind412PefaView, loading, years.length, countries.length, JSON.stringify(refData)])

  // Get Africa countries and regions for filters
  const africaCountries = React.useMemo(() => {
    if (!refData || refData.length === 0) {
      console.log('⚠️ No reference data available for africaCountries')
      return []
    }
    const countries = [...new Set(
      refData
        .filter(r => r['Region Name'] === 'Africa')
        .map(r => r['Country or Area'])
        .filter(Boolean)
    )].sort()
    console.log(`✅ Africa countries loaded: ${countries.length} countries`)
    if (countries.length > 0) {
      console.log(`   Sample: ${countries.slice(0, 5).join(', ')}`)
    }
    return countries
  }, [refData])

  const africaRegions = React.useMemo(() => {
    if (!refData || refData.length === 0) {
      console.log('⚠️ No reference data available for africaRegions')
      return []
    }
    const regions = [...new Set(
      refData
        .filter(r => r['Region Name'] === 'Africa')
        .map(r => r['Intermediate Region Name'])
        .filter(Boolean)
    )].sort()
    console.log(`✅ Africa regions loaded: ${regions.length} regions`)
    if (regions.length > 0) {
      console.log(`   Sample: ${regions.slice(0, 5).join(', ')}`)
    }
    return regions
  }, [refData])

  // Get available years from indicator data (for 4.1.1.1)
  const availableYears411 = React.useMemo(() => {
    if (!indicator411Data || indicator411Data.length === 0) return years
    const indicatorYears = [...new Set(indicator411Data.map(d => d.year))].filter(Boolean).sort((a, b) => a - b)
    return indicatorYears.length > 0 ? indicatorYears : years
  }, [indicator411Data, years])

  const subtopics = [
    {
      id: 'efficiency',
      title: 'Sub-topic 4.1.1 – Public Expenditure Efficiency',
      indicators: [
        {
          id: '4.1.1.1',
          title: 'Public Expenditure Efficiency Index',
          proxy: 'Aggregate Expenditure Outturn',
          question: 'How consistent are governments in executing their approved budgets over time? Does actual spending align with planned expenditure?',
          howToRead: "Each cell represents a country's PEFA score for a specific year. Dark blue (A) = Strong fiscal discipline (spending within 95–105% of budget). Medium blue (B) = Moderate variation (spending within 90–110% of budget). Light blue (C) = Moderate deviation (spending within 85–115% of budget). Orange (D) = Significant deviation from planned budgets (spending <85% or >115% of budget). Read horizontally to see how fiscal discipline changes over time for each country. Read vertically to compare countries' performance in a given year.",
          learnMore: {
            definition: `This indicator measures the extent to which aggregate budget expenditure outturn reflects the amount originally approved, as defined in government budget documentation and fiscal reports.
            **Source:** [PEFA Framework - PI-1](https://www.pefa.org/node/4762)`,
            relevance: `- **Efficiency**: Reflects fiscal discipline — how well governments adhere to planned spending and minimize waste.
            - **Effectiveness**: Indicates reliability of budget execution — predictable spending supports stable service delivery.`,
            proxyJustification: `PEFA standard indicator, globally recognized as a measure of budget credibility and public financial management quality.`,
            pillarConnection: `Sustainable development requires not only mobilizing funds but also managing them effectively. This indicator links directly to Theme 1: Budget Credibility and Efficiency — a government that consistently spends as planned builds investor confidence, supports fiscal stability, and enables long-term sustainable development planning.`
          },
          analyticalLens: `**Efficiency:** Higher (blue) scores show efficient use of funds and credible budget execution. Countries with consistent A/B scores demonstrate strong fiscal frameworks and better planning capacity.
          **Effectiveness:** Stable or improving scores suggest predictable implementation, supporting trust and sustained development outcomes. Predictable spending enables stable service delivery and long-term planning.`
        }
      ]
    },
    {
      id: 'quality',
      title: 'Sub-topic 4.1.2 – Expenditure Quality',
      indicators: [
        {
          id: '4.1.2.1',
          title: 'Expenditure Composition Outturn',
          proxy: 'PEFA: PI-2 Expenditure Composition Outturn',
          question: 'How well do actual expenditure allocations match planned budget allocations?',
          howToRead: "This vertical bar chart shows PEFA Expenditure Composition Outturn scores (1–4) for the latest available year. Each bar represents a country's PEFA PI-2 score, indicating how closely actual expenditures match approved budgets.",
          learnMore: {
            definition: `Variance in expenditure composition compared to the original budget by functional classification.
            **Source:** [PEFA Framework - PI-2](https://www.pefa.org/)`,
            relevance: `- **Efficiency**: Strategic allocation adherence — how well governments stick to planned sector priorities.
            - **Effectiveness**: Predictability of sector funding — consistent allocation supports service delivery planning.`,
            proxyJustification: `PEFA standard indicator, globally recognized as a measure of budget composition credibility and public financial management quality.`,
            pillarConnection: `Effective public expenditure management requires not only spending within budget totals but also allocating resources according to strategic priorities. This indicator links directly to Theme 1: Budget Credibility and Efficiency — governments that maintain planned expenditure composition demonstrate stronger fiscal discipline and better strategic resource allocation, supporting sustainable development outcomes.`
          },
          analyticalLens: `**Efficiency:** Lower variance values indicate efficient adherence to planned expenditure allocations. Countries with consistent, low variance demonstrate strong strategic planning and execution capacity, ensuring resources are directed toward intended priorities.
          **Effectiveness:** Stable or improving composition adherence suggests predictable sector funding, enabling better service delivery planning and resource management. Predictable allocations support long-term development planning and institutional capacity building.`
        }
      ]
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
            className="flex items-center gap-2 text-[#003366] hover:text-orange-500 transition-colors font-medium mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Landing Page</span>
          </button>
          
          <button
            onClick={() => navigate('/exploratory')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#003366] transition-colors text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Exploratory View</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-[#003366] mb-2">
                Topic 4.1: Public Expenditures
              </h1>
              <p className="text-lg text-gray-600">
                Public expenditures focus on how governments allocate resources to essential services such as education, health, and infrastructure. Effective public expenditure management ensures that resources are not wasted and are directed toward development priorities.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Banner */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              <strong>⚠️ {error}</strong>
            </p>
            <p className="text-yellow-700 text-xs mt-2">
              To fix: Open a terminal and run: <code className="bg-yellow-100 px-2 py-1 rounded">python api_server.py</code>
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8 mb-8">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-[#003366] animate-spin mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Loading data from API...</p>
            </div>
          </div>
        )}

        {/* Orange Divider */}
        <div className="border-t-2 border-orange-500 my-8"></div>

        <h2 className="text-2xl font-bold text-[#003366] mb-6">Key Indicators Overview</h2>
        
        {/* Tabs for Sub-topics */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-4">
            {subtopics.map((subtopic) => (
              <button
                key={subtopic.id}
                onClick={() => setActiveTab(subtopic.id)}
                className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                  activeTab === subtopic.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-600 hover:text-[#003366]'
                }`}
              >
                {subtopic.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {subtopics.map((subtopic) => (
          activeTab === subtopic.id && (
            <div key={subtopic.id} className="space-y-8">
              {subtopic.indicators.map((indicator) => (
                <motion.div
                  key={indicator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-[#003366] mb-2">
                      Indicator {indicator.id} – {indicator.title}
                    </h3>
                    <p className="text-sm text-gray-500 italic mb-2">
                      Proxied by: {indicator.proxy}
                    </p>
                    <p className="text-gray-700">
                      <strong>Analytical Focus Question:</strong> {indicator.question}
                    </p>
                  </div>

                  {/* Filters for Indicator 4.1.1.1 */}
                  {indicator.id === '4.1.1.1' && (
                    <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                      <div className="grid grid-cols-4 gap-4 items-end">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Select Year(s)</label>
                          <select
                            value={ind411Year}
                            onChange={(e) => {
                              const newYear = e.target.value
                              console.log('📅 Year filter changed:', newYear)
                              setInd411Year(newYear)
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                          >
                            <option value="All Years">All Years</option>
                            {availableYears411.map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <MultiSelect
                            label="Select Country"
                            options={africaCountries}
                            value={ind411Countries}
                            onChange={(newCountries) => {
                              console.log('🌍 Countries filter changed:', newCountries)
                              setInd411Countries(newCountries)
                            }}
                            placeholder="Choose options"
                          />
                        </div>
                        <div>
                          <MultiSelect
                            label="Select Region"
                            options={africaRegions}
                            value={ind411Regions}
                            onChange={(newRegions) => {
                              console.log('🗺️ Regions filter changed:', newRegions)
                              setInd411Regions(newRegions)
                            }}
                            placeholder="Choose options"
                          />
                        </div>
                        <div>
                          <button 
                            onClick={() => {
                              setInd411Year('All Years')
                              setInd411Countries([])
                              setInd411Regions([])
                            }}
                            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium border border-gray-300"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Filters for Indicator 4.1.2.1 */}
                  {indicator.id === '4.1.2.1' && (
                    <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Indicator View</label>
                        <div className="flex flex-wrap gap-4">
                          {['PEFA: PI-2 Expenditure Composition Outturn', 'PEFA: Expenditure Composition Outturn by Function', 'PEFA: Expenditure Composition Outturn by Economic Type'].map(view => (
                            <button
                              key={view}
                              onClick={() => setInd412PefaView(view)}
                              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                ind412PefaView === view
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                              }`}
                            >
                              {view.replace('PEFA: ', '')}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 items-end">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Select Year(s)</label>
                          <select
                            value={ind412Year}
                            onChange={(e) => setInd412Year(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                          >
                            <option value="All Years">All Years</option>
                            {years.map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <MultiSelect
                            label="Select Country"
                            options={africaCountries}
                            value={ind412Countries}
                            onChange={(newCountries) => setInd412Countries(newCountries)}
                            placeholder="Choose options"
                          />
                        </div>
                        <div>
                          <MultiSelect
                            label="Select Region"
                            options={africaRegions}
                            value={ind412Regions}
                            onChange={(newRegions) => setInd412Regions(newRegions)}
                            placeholder="Choose options"
                          />
                        </div>
                        <div>
                          <button 
                            onClick={() => {
                              setInd412Year('All Years')
                              setInd412Countries([])
                              setInd412Regions([])
                              setInd412PefaView('PEFA: PI-2 Expenditure Composition Outturn')
                            }}
                            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium border border-gray-300"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* View Tabs (Graph/Map/Table) */}
                  <div className="mb-6">
                    <div className="flex items-center border-b border-gray-200">
                      <div className="flex">
                        <button
                          onClick={() => {
                            if (indicator.id === '4.1.1.1') setInd411View('graph')
                            else if (indicator.id === '4.1.2.1') setInd412View('graph')
                          }}
                          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                            (indicator.id === '4.1.1.1' && ind411View === 'graph') || (indicator.id === '4.1.2.1' && ind412View === 'graph')
                              ? 'border-orange-500 text-orange-600'
                              : 'border-transparent text-gray-600 hover:text-[#003366]'
                          }`}
                        >
                          Graph View
                        </button>
                        <button
                          onClick={() => {
                            if (indicator.id === '4.1.1.1') setInd411View('map')
                            else if (indicator.id === '4.1.2.1') setInd412View('map')
                          }}
                          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                            (indicator.id === '4.1.1.1' && ind411View === 'map') || (indicator.id === '4.1.2.1' && ind412View === 'map')
                              ? 'border-orange-500 text-orange-600'
                              : 'border-transparent text-gray-600 hover:text-[#003366]'
                          }`}
                        >
                          Map View
                        </button>
                        <button
                          onClick={() => {
                            if (indicator.id === '4.1.1.1') setInd411View('table')
                            else if (indicator.id === '4.1.2.1') setInd412View('table')
                          }}
                          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                            (indicator.id === '4.1.1.1' && ind411View === 'table') || (indicator.id === '4.1.2.1' && ind412View === 'table')
                              ? 'border-orange-500 text-orange-600'
                              : 'border-transparent text-gray-600 hover:text-[#003366]'
                          }`}
                        >
                          Data Table
                        </button>
                      </div>
                      <div className="flex-1"></div>
                      <button
                        type="button"
                        onClick={() => {
                          if (indicator.id === '4.1.1.1') setExpanded411Learn(!expanded411Learn)
                          else if (indicator.id === '4.1.2.1') setExpanded412Learn(!expanded412Learn)
                        }}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#003366] transition-colors px-4 py-2"
                      >
                        How to Read This Graph <Info className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* How to Read This Graph - Expandable Section */}
                    {((indicator.id === '4.1.1.1' && expanded411Learn) || (indicator.id === '4.1.2.1' && expanded412Learn)) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800"
                      >
                        <h5 className="font-semibold mb-2">How to Read This Graph:</h5>
                        <p>{indicator.howToRead}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Charts using Recharts */}
                  <div className="mb-6 min-h-[400px]">
                    {indicator.id === '4.1.1.1' && ind411View === 'graph' && (
                      loadingInd411 ? (
                        <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-[400px] flex items-center justify-center">
                          <div className="text-center">
                            <Loader2 className="w-8 h-8 text-[#003366] animate-spin mx-auto mb-2" />
                            <p className="text-gray-600 text-sm">Loading chart data...</p>
                          </div>
                        </div>
                      ) : (
                        <PefaHeatmapRecharts 
                          data={indicator411Data}
                          refData={refData}
                          selectedRegions={ind411Regions}
                          height={600}
                          loading={loadingInd411}
                        />
                      )
                    )}
                    
                    {indicator.id === '4.1.2.1' && ind412View === 'graph' && (
                      loadingInd412 ? (
                        <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-[400px] flex items-center justify-center">
                          <div className="text-center">
                            <Loader2 className="w-8 h-8 text-[#003366] animate-spin mx-auto mb-2" />
                            <p className="text-gray-600 text-sm">Loading chart data...</p>
                          </div>
                        </div>
                      ) : (
                        <PefaBarChartRecharts 
                          data={indicator412Data}
                          pefaView={ind412PefaView}
                          selectedYear={ind412Year}
                          loading={loadingInd412}
                        />
                      )
                    )}

                    {((indicator.id === '4.1.1.1' && ind411View === 'map') || 
                      (indicator.id === '4.1.2.1' && ind412View === 'map')) && (
                      <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-[400px] flex items-center justify-center">
                        <p className="text-gray-600">Map view will be implemented here.</p>
                      </div>
                    )}

                    {((indicator.id === '4.1.1.1' && ind411View === 'table') || 
                      (indicator.id === '4.1.2.1' && ind412View === 'table')) && (
                      <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-[400px] flex items-center justify-center">
                        <p className="text-gray-600">Data table will be implemented here.</p>
                      </div>
                    )}
                  </div>

                  {/* Supporting Information */}
                  <div className="space-y-4 mt-6">
                    <button
                      onClick={() => {
                        if (indicator.id === '4.1.1.1') setExpanded411Lens(!expanded411Lens)
                        else if (indicator.id === '4.1.2.1') setExpanded412Lens(!expanded412Lens)
                      }}
                      className="w-full text-left border border-gray-200 rounded-lg p-4 font-semibold text-[#003366] hover:bg-gray-50 transition-colors"
                    >
                      {((indicator.id === '4.1.1.1' && expanded411Lens) || (indicator.id === '4.1.2.1' && expanded412Lens)) 
                        ? 'Hide' : 'Show'} Analytical Lens (Efficiency and Effectiveness)
                    </button>
                    
                    {((indicator.id === '4.1.1.1' && expanded411Lens) || (indicator.id === '4.1.2.1' && expanded412Lens)) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-gray-700 text-sm"
                        dangerouslySetInnerHTML={{ __html: indicator.analyticalLens }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ))}
      </main>

      <BackToTop />
    </div>
  )
}

export default Topic41Page
