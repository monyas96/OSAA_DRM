import React from 'react'
import { motion } from 'framer-motion'

const InfoBox = ({ 
  icon: Icon, 
  title, 
  content, 
  color = 'blue',
  className = '' 
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-[#0072BC] text-[#003366]',
    orange: 'bg-orange-50 border-[#F26C2B] text-[#003366]',
    teal: 'bg-teal-50 border-[#009D8C] text-[#003366]',
  }

  const iconColors = {
    blue: 'text-[#0072BC]',
    orange: 'text-[#F26C2B]',
    teal: 'text-[#009D8C]',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-lg border-l-4 shadow-sm ${colorClasses[color]} ${className}`}
    >
      {Icon && (
        <div className={`mb-3 ${iconColors[color]}`}>
          <Icon size={32} />
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-base leading-relaxed text-gray-700">{content}</p>
    </motion.div>
  )
}

export default InfoBox

