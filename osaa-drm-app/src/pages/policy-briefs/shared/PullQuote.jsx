import React from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const PullQuote = ({ 
  quote, 
  author = null,
  color = 'orange',
  className = '' 
}) => {
  const colorClasses = {
    orange: 'bg-orange-50 border-[#F26C2B]',
    blue: 'bg-blue-50 border-[#0072BC]',
    teal: 'bg-teal-50 border-[#009D8C]',
    purple: 'bg-purple-50 border-purple-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${colorClasses[color]} border-l-4 p-10 rounded-r-xl shadow-lg ${className}`}
    >
      <Quote className={`w-10 h-10 mb-4 ${
        color === 'orange' ? 'text-[#F26C2B]' : 
        color === 'blue' ? 'text-[#0072BC]' : 
        color === 'purple' ? 'text-purple-500' :
        'text-[#009D8C]'
      } opacity-60`} />
      <p className="text-2xl italic text-gray-900 leading-relaxed mb-3 font-light" style={{ lineHeight: '1.6' }}>
        "{quote}"
      </p>
      {author && (
        <p className="text-base font-semibold text-gray-700 mt-4">— {author}</p>
      )}
    </motion.div>
  )
}

export default PullQuote

