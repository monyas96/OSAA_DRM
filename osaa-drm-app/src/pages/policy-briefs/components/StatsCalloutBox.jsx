import React from 'react'
import { motion } from 'framer-motion'

const StatsCalloutBox = ({ title, stats, equivalents }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-xl shadow-xl"
    >
      <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
        {title}
      </h3>
      
      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {equivalents && (
        <>
          <div className="border-t border-slate-700 pt-6 mt-6">
            <p className="font-semibold mb-3">Equivalent to:</p>
            <ul className="space-y-2">
              {equivalents.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </motion.div>
  )
}

export default StatsCalloutBox

