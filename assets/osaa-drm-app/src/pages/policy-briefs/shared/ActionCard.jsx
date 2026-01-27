import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Target, TrendingUp } from 'lucide-react'

const ActionCard = ({ 
  action, 
  target, 
  impact,
  priority = 1,
  className = '' 
}) => {
  const priorityConfig = {
    1: { 
      border: 'border-red-400', 
      bg: 'bg-red-50',
      badgeBg: 'bg-red-500',
      badgeText: 'text-white'
    },
    2: { 
      border: 'border-orange-400', 
      bg: 'bg-orange-50',
      badgeBg: 'bg-orange-500',
      badgeText: 'text-white'
    },
    3: { 
      border: 'border-blue-400', 
      bg: 'bg-blue-50',
      badgeBg: 'bg-blue-500',
      badgeText: 'text-white'
    },
  }

  const config = priorityConfig[priority] || priorityConfig[1]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      className={`p-6 rounded-lg border-2 ${config.border} ${config.bg} shadow-md transition-all ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full ${config.badgeBg} ${config.badgeText} flex items-center justify-center text-xl font-bold`}>
          {priority}
        </div>
        <h4 className="text-xl font-bold text-[#003366]">Priority {priority}</h4>
      </div>
      
      <div className="mb-4">
        <div className="flex items-start gap-2 mb-2">
          <Target className="w-4 h-4 text-[#0072BC] mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-600 mb-1">Action</p>
            <p className="font-semibold text-gray-800">{action}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-start gap-2 mb-2">
          <Target className="w-4 h-4 text-[#009D8C] mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-600 mb-1">Target</p>
            <p className="text-gray-700">{target}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-[#F26C2B] mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-600 mb-1">Impact</p>
            <p className="font-semibold text-[#003366]">{impact}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ActionCard

