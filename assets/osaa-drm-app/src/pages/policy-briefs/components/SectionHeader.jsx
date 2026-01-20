import React from 'react'
import { getUnifiedColor } from '../shared/colorScheme'

const SectionHeader = ({ title, subtitle, color = 'default' }) => {
  // All section headers use unified muted border
  const colors = getUnifiedColor(color)

  return (
    <div className={`border-l-4 ${colors.border} border-opacity-60 pl-4 mb-4`}>
      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs md:text-sm text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeader

