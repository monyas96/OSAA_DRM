import React from 'react'
import { motion } from 'framer-motion'

const StrategicPriority = ({ number, title, target, color = 'blue', children, actionItems }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-white border-blue-600',
    orange: 'bg-orange-500 text-white border-orange-600',
    teal: 'bg-teal-500 text-white border-teal-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`${colorClasses[color]} w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0 border-4`}>
          {number}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          {target && (
            <p className="text-base text-gray-600 mb-4">
              <strong>Target:</strong> {target}
            </p>
          )}
        </div>
      </div>

      {children && (
        <div className="ml-20 mb-4">
          <div className="prose max-w-none text-gray-700">
            {children}
          </div>
        </div>
      )}

      {actionItems && (
        <div className="ml-20 bg-slate-50 p-6 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-4">Action items:</h4>
          <ul className="space-y-3">
            {actionItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <div>
                  {typeof item === 'string' ? (
                    <span className="text-gray-700">{item}</span>
                  ) : (
                    <>
                      <strong className="text-gray-900">{item.title}</strong>
                      {item.items && (
                        <ul className="mt-2 ml-4 space-y-2">
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex} className="text-gray-700 flex items-start gap-2">
                              <span className="text-blue-400">-</span>
                              <span>{subItem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}

export default StrategicPriority

