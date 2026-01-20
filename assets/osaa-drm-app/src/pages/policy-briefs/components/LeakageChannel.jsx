import React from 'react'
import { motion } from 'framer-motion'

const LeakageChannel = ({ number, title, color = 'default', children }) => {
  // Use unified muted color scheme - all colors map to muted slate
  const colorClasses = 'border-slate-300 bg-slate-50 border-opacity-50'
  const numberColors = 'bg-slate-600 text-white'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`border-l-4 ${colorClasses} p-6 rounded-r-lg mb-6`}
    >
      <div className="flex items-start gap-4">
        <div className={`${numberColors} w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0`}>
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

