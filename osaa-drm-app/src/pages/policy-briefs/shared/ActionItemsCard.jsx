import React from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'

/**
 * ActionItemsCard - Modern design for action items lists
 */
const ActionItemsCard = ({ title, items, color = 'blue', rationale }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-white',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      bullet: 'text-blue-500'
    },
    orange: {
      bg: 'bg-white',
      border: 'border-orange-200',
      icon: 'text-orange-600',
      bullet: 'text-orange-500'
    },
    teal: {
      bg: 'bg-white',
      border: 'border-teal-200',
      icon: 'text-teal-600',
      bullet: 'text-teal-500'
    },
    purple: {
      bg: 'bg-white',
      border: 'border-purple-200',
      icon: 'text-purple-600',
      bullet: 'text-purple-500'
    },
    red: {
      bg: 'bg-white',
      border: 'border-red-200',
      icon: 'text-red-600',
      bullet: 'text-red-500'
    }
  }

  const colors = colorClasses[color] || colorClasses.blue

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-lg p-6 shadow-sm`}>
      {title && (
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className={colors.icon} size={20} />
          {title}
        </h4>
      )}
      
      {Array.isArray(items) ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <ArrowRight className={`${colors.bullet} mt-1 flex-shrink-0`} size={16} />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-3">
          {items}
        </div>
      )}

      {rationale && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            <strong className="text-gray-900">Rationale:</strong> {rationale}
          </p>
        </div>
      )}
    </div>
  )
}

export default ActionItemsCard

