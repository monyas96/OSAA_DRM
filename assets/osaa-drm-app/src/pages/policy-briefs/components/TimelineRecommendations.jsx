import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Clock, Calendar, Target } from 'lucide-react'
import ActionCard from '../shared/ActionCard'

const TimelineRecommendations = ({ recommendations }) => {
  const [activeTab, setActiveTab] = useState('immediate')

  const timeHorizons = [
    {
      id: 'immediate',
      label: 'IMMEDIATE ACTIONS',
      period: '0-12 Months',
      color: 'red',
      actions: [
        {
          action: 'Real-Time Monitoring',
          target: 'All D-scored countries implement quarterly budget execution reports',
          impact: '±20% → ±15% variance reduction',
          priority: 1
        },
        {
          action: 'Protect Priority Sectors',
          target: 'All 1/D countries implement budget locks for health/education',
          impact: '>15% → <10% composition variance',
          priority: 2
        },
        {
          action: 'Commitment Controls',
          target: 'Pilot IFMIS commitment controls in 5 countries',
          impact: 'D → B score improvement',
          priority: 3
        }
      ]
    },
    {
      id: 'medium',
      label: 'MEDIUM-TERM ACTIONS',
      period: '1-3 Years',
      color: 'orange',
      actions: [
        {
          action: 'Integrated Financial Management',
          target: 'Deploy IFMIS systems with commitment controls',
          impact: 'B → A score achievement',
          priority: 1
        },
        {
          action: 'Capacity Building',
          target: 'Train budget execution teams in 20+ countries',
          impact: '15% improvement in execution scores',
          priority: 2
        },
        {
          action: 'Strategic Planning',
          target: 'Link budget planning to development priorities',
          impact: 'Reduced composition distortion',
          priority: 3
        }
      ]
    },
    {
      id: 'long',
      label: 'LONG-TERM ACTIONS',
      period: '3-5 Years',
      color: 'green',
      actions: [
        {
          action: 'Institutional Reform',
          target: 'Establish independent budget oversight bodies',
          impact: 'Sustained A/B scores',
          priority: 1
        },
        {
          action: 'Digital Transformation',
          target: 'Full digital budget execution systems',
          impact: 'Real-time monitoring and control',
          priority: 2
        },
        {
          action: 'Regional Integration',
          target: 'Share best practices across countries',
          impact: 'Continent-wide improvement',
          priority: 3
        }
      ]
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#003366] mb-8 text-center"
        >
          THE PATH FORWARD: EVIDENCE-BASED RECOMMENDATIONS
        </motion.h2>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 -translate-y-1/2" />
            {timeHorizons.map((horizon, index) => (
              <div key={horizon.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: horizon.color === 'red' ? '#F44336' : 
                                   horizon.color === 'orange' ? '#FF9800' : 
                                   '#4CAF50'
                  }}
                >
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="mt-4 text-center">
                  <p className="font-bold text-[#003366] text-sm">{horizon.period}</p>
                  <p className="text-xs text-gray-600 mt-1">{horizon.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tab Interface */}
        <div className="mb-8">
          <div className="flex gap-4 border-b border-gray-200">
            {timeHorizons.map((horizon) => (
              <button
                key={horizon.id}
                onClick={() => setActiveTab(horizon.id)}
                className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                  activeTab === horizon.id
                    ? 'border-transparent text-[#003366]'
                    : 'border-transparent text-gray-600 hover:text-[#003366]'
                }`}
                style={activeTab === horizon.id ? {
                  borderBottomColor: horizon.color === 'red' ? '#F44336' : 
                                    horizon.color === 'orange' ? '#FF9800' : 
                                    '#4CAF50',
                  color: horizon.color === 'red' ? '#F44336' : 
                        horizon.color === 'orange' ? '#FF9800' : 
                        '#4CAF50'
                } : {}}
              >
                {horizon.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Cards */}
        <AnimatePresence mode="wait">
          {timeHorizons.map((horizon) => (
            activeTab === horizon.id && (
              <motion.div
                key={horizon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {horizon.actions.map((action, index) => (
                  <ActionCard
                    key={index}
                    action={action.action}
                    target={action.target}
                    impact={action.impact}
                    priority={action.priority}
                  />
                ))}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default TimelineRecommendations

