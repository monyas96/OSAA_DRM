import React from 'react'
import { motion } from 'framer-motion'

const LeakageChannel = ({ number, title, color = 'red', children }) => {
  const colorClasses = {
    red: 'border-red-500 bg-red-50',
    orange: 'border-orange-500 bg-orange-50',
    blue: 'border-blue-500 bg-blue-50',
  }

  const numberColors = {
    red: 'bg-red-500 text-white',
    orange: 'bg-orange-500 text-white',
    blue: 'bg-blue-500 text-white',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`border-l-4 ${colorClasses[color]} p-6 rounded-r-lg mb-6`}
    >
      <div className="flex items-start gap-4">
        <div className={`${numberColors[color]} w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0`}>
          {number}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {title}
          </h3>
          <div className="prose prose-lg max-w-none text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LeakageChannel

