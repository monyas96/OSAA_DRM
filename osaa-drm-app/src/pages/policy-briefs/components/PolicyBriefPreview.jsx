import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PolicyBriefPreview = ({ briefId, title, subtitle, heroContent, keyPoints, route }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Preview Header - Always Visible */}
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#003366] mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
            
            {/* Key Points Preview */}
            <div className="space-y-2">
              {keyPoints.slice(0, 2).map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="ml-4 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigate(route)
              }}
              className="px-4 py-2 text-sm font-semibold text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Full
            </button>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-200 pt-6">
              {/* Hero Content */}
              {heroContent && (
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-l-4 border-blue-500">
                    <p className="text-base text-gray-800 leading-relaxed">{heroContent}</p>
                  </div>
                </div>
              )}

              {/* All Key Points */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-[#003366] mb-3">Key Insights:</h4>
                <div className="space-y-3">
                  {keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => navigate(route)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <span>View Full Policy Brief</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PolicyBriefPreview

