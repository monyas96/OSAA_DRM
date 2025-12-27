import React from 'react'
import { motion } from 'framer-motion'
import { Target, CheckCircle2 } from 'lucide-react'
import { getUnifiedColor } from './colorScheme'

/**
 * StrategyCard - Modern card design for strategic priorities with unified color scheme
 */
const StrategyCard = ({ 
  number, 
  title, 
  target, 
  description,
  color = 'default',
  children 
}) => {
  // Use unified color scheme - all colors map to muted slate
  const colors = getUnifiedColor(color)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${colors.bg} ${colors.border} border-l-4 rounded-r-lg p-6 mb-8 shadow-sm hover:shadow-md transition-all duration-300`}
    >
      {/* Header with Number Badge */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`${colors.badge} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0`}>
          {number}
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-semibold ${colors.text} mb-3`}>{title}</h3>
          {target && (
            <div className="flex items-start gap-2 bg-white rounded-lg p-4 border border-gray-200">
              <Target className={`${colors.icon} mt-0.5 flex-shrink-0`} size={20} />
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Target</p>
                <p className={`text-base font-bold ${colors.text}`}>{target}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="mb-6">
          <p className="text-base text-gray-800 leading-relaxed">{description}</p>
        </div>
      )}

      {/* Content */}
      <div className="mt-4">
        {children}
      </div>
    </motion.div>
  )
}

export default StrategyCard

