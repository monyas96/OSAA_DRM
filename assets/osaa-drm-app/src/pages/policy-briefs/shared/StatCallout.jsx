import React from 'react'
import { motion } from 'framer-motion'

const StatCallout = ({ 
  value, 
  label, 
  unit = '',
  color = 'blue',
  size = 'large',
  className = '' 
}) => {
  const sizeClasses = {
    large: 'text-5xl',
    medium: 'text-3xl',
    small: 'text-2xl',
  }

  const colorClasses = {
    blue: 'bg-gradient-to-br from-[#0072BC] to-[#003366]',
    orange: 'bg-gradient-to-br from-[#F26C2B] to-[#F58220]',
    teal: 'bg-gradient-to-br from-[#009D8C] to-[#007A6B]',
    green: 'bg-gradient-to-br from-[#4CAF50] to-[#388E3C]',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`${colorClasses[color]} text-white p-6 rounded-lg text-center shadow-lg ${className}`}
    >
      <div className={`${sizeClasses[size]} font-bold mb-2`}>
        {value}
        {unit && <span className="text-2xl ml-1">{unit}</span>}
      </div>
      <div className="text-sm uppercase tracking-wide opacity-90">{label}</div>
    </motion.div>
  )
}

export default StatCallout

