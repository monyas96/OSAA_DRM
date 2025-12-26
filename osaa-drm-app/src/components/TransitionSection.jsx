import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Lightbulb, 
  Target, 
  BookOpen, 
  ArrowRight, 
  ArrowDown,
  Check, 
  Info
} from 'lucide-react'

const TransitionSection = ({ onViewSelection }) => {
  const navigate = useNavigate()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const handleViewSelection = (view) => {
    if (view === 'exploratory') {
      // Navigate directly to Streamlit Theme 4 page
      navigate('/streamlit/theme-4')
    } else if (onViewSelection) {
      onViewSelection(view)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section
      id="transition-to-dashboard"
      data-tour="transition-section"
      ref={ref}
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-6">
            Now Let's Explore the Data
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Use our interactive tools to understand how DRM can transform your country's 
            economic landscape. Choose your preferred view based on your needs.
          </p>
        </motion.div>

        {/* Visual Journey Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
        >
          {/* Step 1 */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-3 mx-auto">
              <BookOpen size={32} className="text-orange-600" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Learn the Story</p>
            <p className="text-xs text-gray-500 mt-1">Understanding DRM</p>
          </motion.div>
          
          <ArrowRight size={32} className="text-gray-400 hidden md:block" />
          <ArrowDown size={32} className="text-gray-400 md:hidden" />
          
          {/* Step 2 */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3 mx-auto">
              <Search size={32} className="text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Explore Data</p>
            <p className="text-xs text-gray-500 mt-1">Validate & Discover</p>
          </motion.div>
          
          <ArrowRight size={32} className="text-gray-400 hidden md:block" />
          <ArrowDown size={32} className="text-gray-400 md:hidden" />
          
          {/* Step 3 */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mb-3 mx-auto">
              <Target size={32} className="text-teal-600" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Get Insights</p>
            <p className="text-xs text-gray-500 mt-1">Policy Recommendations</p>
          </motion.div>
        </motion.div>

        {/* Two View Comparison Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* EXPLORATORY VIEW CARD */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-500 hover:shadow-2xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <Search size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#003366]">Exploratory View</h3>
                <p className="text-sm text-gray-500">For Data Discovery</p>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Purpose</p>
                <p className="text-gray-700">
                  Validate framework assumptions with raw data across all indicators
                </p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">What You Do</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                    <span>Filter countries and compare years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                    <span>Test hypotheses across 457 indicators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                    <span>Export findings for verification</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-800 italic">
                  "How much Africa is losing in IFFs?"
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewSelection('exploratory')}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Go to Exploratory View
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* EXPLANATORY VIEW CARD */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500 hover:shadow-2xl transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Lightbulb size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#003366]">Explanatory View</h3>
                <p className="text-sm text-gray-500">For Policy Insights</p>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Purpose</p>
                <p className="text-gray-700">
                  Answer strategic policy questions with synthesized evidence
                </p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">What You Get</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                    <span>Pre-filtered data with strategic framing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                    <span>Evidence-based interpretations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                    <span>Actionable policy recommendations</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 italic">
                  "CAN markets finance development?"
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewSelection('explanatory')}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Go to Explanatory View
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Info Banner - Data Traceability */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <Info size={24} className="text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-blue-900 mb-2">Methodology Note</p>
              <p className="text-blue-800 leading-relaxed">
                Every graph in the Explanatory View is built from patterns discovered 
                and validated in the Exploratory View. Both views query the same data source 
                (616,409 rows | 457 indicators | 239 countries) and use identical calculation 
                functions, ensuring complete traceability and reproducibility.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TransitionSection

