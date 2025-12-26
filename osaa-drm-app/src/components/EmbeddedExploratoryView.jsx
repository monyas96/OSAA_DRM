import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, DollarSign, Building2, Shield } from 'lucide-react'

const EmbeddedExploratoryView = () => {
  const navigate = useNavigate()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const topics = [
    {
      number: '4.1',
      title: 'Public Expenditures',
      description: 'Efficient management of public funds ensures that they are allocated toward priority sectors like education and infrastructure and are spent responsibly to avoid waste.',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      route: '/topic/4.1'
    },
    {
      number: '4.2',
      title: 'Budget and Tax Revenues',
      description: 'Strengthening revenue collection and budget credibility creates predictable fiscal space for development priorities.',
      icon: DollarSign,
      color: 'from-teal-500 to-teal-600',
      route: '/streamlit/topic-4-2'
    },
    {
      number: '4.3',
      title: 'Capital Markets',
      description: 'Well-developed capital markets channel savings into productive investments, promoting economic growth and reducing reliance on foreign financing.',
      icon: Building2,
      color: 'from-purple-500 to-purple-600',
      route: '/streamlit/topic-4-3'
    },
    {
      number: '4.4',
      title: 'Illicit Financial Flows (IFFs)',
      description: 'Reducing illicit financial flows protects domestic resources and strengthens the integrity of financial systems.',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      route: '/streamlit/topic-4-4'
    }
  ]

  return (
    <div ref={ref} className="w-full">
      {/* Understanding the Framework Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="bg-orange-50 border border-orange-200 rounded-lg overflow-hidden">
          {/* Title Bar */}
          <div className="bg-gray-100 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">▼</span>
              <h2 className="text-xl font-bold text-[#003366]">Understanding the Framework</h2>
            </div>
          </div>
          
          {/* Content */}
          <div className="bg-white p-6 space-y-4">
            <div>
              <p className="font-semibold text-[#003366] mb-1">The Challenge (What):</p>
              <p className="text-gray-700">
                Countries have money, but it is not where it should be, it is not used as it should be, and does not benefit whom it should.
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-[#003366] mb-1">The Root Cause (Why):</p>
              <p className="text-gray-700">
                Institutional weaknesses in managing and capturing domestic financial resources.
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-[#003366] mb-1">The Solution (Therefore):</p>
              <p className="text-gray-700">
                Stronger ability to evaluate and manage domestic resources contributes to offering sustainable financial resources.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Topic Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid md:grid-cols-2 gap-8"
      >
        {topics.map((topic, index) => {
          const Icon = topic.icon
          return (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${topic.color} p-6`}>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 rounded-lg p-3">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-white/80 text-sm font-medium">Topic</span>
                    <h3 className="text-2xl font-bold text-white">{topic.number} {topic.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {topic.description}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    console.log('Navigating to topic:', topic.number, 'Route:', topic.route)
                    navigate(topic.route)
                  }}
                  className={`w-full bg-gradient-to-r ${topic.color} text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  Explore Topic {topic.number}
                </motion.button>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default EmbeddedExploratoryView

