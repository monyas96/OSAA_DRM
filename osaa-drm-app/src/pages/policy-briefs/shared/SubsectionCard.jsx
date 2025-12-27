import React from 'react'
import { motion } from 'framer-motion'
import { getUnifiedColor } from './colorScheme'

/**
 * SubsectionCard - Design for subsections within strategic priorities
 * Uses unified muted color scheme
 */
const SubsectionCard = ({ number, title, children, color = 'default' }) => {
  // All subsections use the same muted border
  const colors = getUnifiedColor(color)
  const borderColor = colors.border

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`bg-white ${borderColor} border-l-2 rounded-r p-5 mb-4 shadow-sm`}
    >
      <div className="flex items-start gap-3 mb-3">
        {number && (
          <span className="text-sm font-bold text-gray-500 flex-shrink-0">{number}.</span>
        )}
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
      </div>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">
        {children}
      </div>
    </motion.div>
  )
}

export default SubsectionCard

