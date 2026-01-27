import React from 'react'
import { motion } from 'framer-motion'
import { getUnifiedColor } from './colorScheme'

const InfoBox = ({ 
  icon: Icon, 
  title, 
  content, 
  color = 'default',
  className = '' 
}) => {
  // Use unified muted color scheme
  const colors = getUnifiedColor(color)
  
  const colorClasses = `bg-slate-50 border-slate-300 text-slate-900`
  const iconColor = 'text-slate-600'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-lg border-l-4 shadow-sm ${colorClasses} border-opacity-50 ${className}`}
    >
      {Icon && (
        <div className={`mb-3 ${iconColor}`}>
          <Icon size={32} />
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-base leading-relaxed text-gray-700">{content}</p>
    </motion.div>
  )
}

export default InfoBox

