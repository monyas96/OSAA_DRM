import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const CollapsibleSection = ({ 
  title, 
  subtitle, 
  expanded, 
  onToggle, 
  color = 'blue',
  children 
}) => {
  const colorClasses = {
    blue: 'border-blue-500',
    orange: 'border-orange-500',
    teal: 'border-teal-500',
    red: 'border-red-500',
  }

  const colorBg = {
    blue: 'bg-blue-50',
    orange: 'bg-orange-50',
    teal: 'bg-teal-50',
    red: 'bg-red-50',
  }

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className={`bg-white rounded-lg shadow-md border-l-4 ${colorClasses[color]} overflow-hidden`}
        >
          {/* Header */}
          <button
            onClick={onToggle}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-lg text-gray-600">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0">
              {expanded ? (
                <ChevronUp className="w-6 h-6 text-gray-500" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )}
            </div>
          </button>

          {/* Content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2">
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default CollapsibleSection

