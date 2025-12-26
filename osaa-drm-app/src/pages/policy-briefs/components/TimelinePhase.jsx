import React from 'react'
import { motion } from 'framer-motion'

const TimelinePhase = ({ title, subtitle, color = 'blue', items }) => {
  const colorClasses = {
    red: 'border-red-500',
    orange: 'border-orange-500',
    teal: 'border-teal-500',
    blue: 'border-blue-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`border-l-4 ${colorClasses[color]} pl-6 mb-8`}
    >
      <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
      {subtitle && (
        <p className="text-gray-600 mb-4">{subtitle}</p>
      )}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className={`text-${color}-600 mt-1`}>•</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default TimelinePhase

