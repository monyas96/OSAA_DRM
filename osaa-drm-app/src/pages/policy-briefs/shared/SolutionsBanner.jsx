import React from 'react'
import { motion } from 'framer-motion'
import { getUnifiedColor } from './colorScheme'

/**
 * SolutionsBanner - Prominent banner header for Solutions sections
 * Uses unified muted color scheme
 */
const SolutionsBanner = ({ title, subtitle, color = 'default' }) => {
  // All banners use the same muted slate gradient
  const colors = getUnifiedColor(color)
  const gradient = colors.gradient

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-r ${gradient} rounded-lg p-8 mb-8 shadow-lg`}
    >
      <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>
      {subtitle && (
        <p className="text-base text-white opacity-90 leading-relaxed max-w-4xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SolutionsBanner

