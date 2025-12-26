import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const CaseStudy = ({ title, description, results, keyLesson }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-teal-50 to-teal-100 border-l-4 border-teal-600 p-8 rounded-r-xl shadow-lg mb-6"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-teal-600 rounded-full p-2 flex-shrink-0">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {results.map((result, index) => (
            <div key={index} className="bg-white/70 p-4 rounded-lg">
              <div className="text-xl font-bold text-teal-700 mb-1">{result.value}</div>
              <div className="text-sm text-gray-700">{result.label}</div>
            </div>
          ))}
        </div>
      )}

      {keyLesson && (
        <div className="mt-6 pt-6 border-t border-teal-300">
          <p className="text-sm italic text-gray-700">
            <strong>Key lesson:</strong> {keyLesson}
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default CaseStudy

