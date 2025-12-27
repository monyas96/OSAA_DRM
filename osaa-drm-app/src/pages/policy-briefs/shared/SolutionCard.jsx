import React from 'react'
import { motion } from 'framer-motion'

/**
 * SolutionCard - Modern card design for strategic priorities
 */
const SolutionCard = ({ 
  number, 
  title, 
  target, 
  color = 'blue',
  children 
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-500 text-blue-900',
    orange: 'bg-orange-50 border-orange-500 text-orange-900',
    teal: 'bg-teal-50 border-teal-500 text-teal-900',
    purple: 'bg-purple-50 border-purple-500 text-purple-900',
    red: 'bg-red-50 border-red-500 text-red-900'
  }

  const bgColor = colorClasses[color] || colorClasses.blue

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${bgColor} border-l-4 rounded-r-lg p-6 mb-6 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-xl ${bgColor.split(' ')[1].replace('border-', 'text-')}`}>
          {number}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          {target && (
            <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
              <p className="text-sm font-semibold text-gray-700">
                <span className="text-gray-500">Target: </span>
                {target}
              </p>
            </div>
          )}
          <div className="text-sm text-gray-800 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SolutionCard

