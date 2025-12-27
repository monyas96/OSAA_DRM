import React from 'react'
import { TrendingUp } from 'lucide-react'
import { getUnifiedColor } from './colorScheme'

/**
 * OutcomeBox - Highlighted box for expected outcomes
 * Uses unified muted color scheme
 */
const OutcomeBox = ({ title = "Expected Outcome", children, color = 'default' }) => {
  // All outcome boxes use the same muted colors
  const colors = getUnifiedColor(color)

  return (
    <div className={`${colors.bg} ${colors.border} border-l-4 rounded-r-lg p-6 mb-6 shadow-sm border-opacity-50`}>
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className={colors.icon} size={24} />
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
      </div>
      <div className="text-base text-gray-800 leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  )
}

export default OutcomeBox

