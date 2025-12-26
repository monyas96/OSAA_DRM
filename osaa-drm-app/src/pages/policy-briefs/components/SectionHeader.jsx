import React from 'react'

const SectionHeader = ({ title, subtitle, color = 'blue' }) => {
  const colorClasses = {
    blue: 'border-blue-500',
    orange: 'border-orange-500',
    teal: 'border-teal-500',
    red: 'border-red-500',
  }

  return (
    <div className={`border-l-4 ${colorClasses[color]} pl-4 mb-4`}>
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

