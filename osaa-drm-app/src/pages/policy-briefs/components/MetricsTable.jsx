import React from 'react'
import { motion } from 'framer-motion'

const MetricsTable = () => {
  const metrics = [
    {
      indicator: 'Tax Gap (% of GDP)',
      baseline: '5-7%',
      target: '2.5%',
      impact: '+$80-100B annually'
    },
    {
      indicator: 'Tax Effort',
      baseline: '0.72',
      target: '0.90',
      impact: '+$60-80B annually'
    },
    {
      indicator: 'Tax Buoyancy',
      baseline: '0.71',
      target: '0.90*',
      impact: '+$30-50B annually'
    },
    {
      indicator: 'Tax/GDP Ratio',
      baseline: '13-15%',
      target: '18-20%',
      impact: '+$140-180B annually'
    },
    {
      indicator: 'Revenue Volatility (CoV)',
      baseline: '0.28',
      target: '0.18',
      impact: 'Improved stability'
    },
    {
      indicator: 'Countries with Effort >0.8',
      baseline: '18% (8/45)',
      target: '50% (27/54)',
      impact: 'Broad improvement'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-x-auto mb-8"
    >
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
            <th className="border border-gray-300 px-4 py-3 text-left font-bold">INDICATOR</th>
            <th className="border border-gray-300 px-4 py-3 text-left font-bold">BASELINE</th>
            <th className="border border-gray-300 px-4 py-3 text-left font-bold">TARGET (2030)</th>
            <th className="border border-gray-300 px-4 py-3 text-left font-bold">IMPACT</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, index) => (
            <tr 
              key={index} 
              className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <td className="border border-gray-300 px-4 py-3 font-semibold">{metric.indicator}</td>
              <td className="border border-gray-300 px-4 py-3">{metric.baseline}</td>
              <td className="border border-gray-300 px-4 py-3">{metric.target}</td>
              <td className="border border-gray-300 px-4 py-3 text-teal-700 font-semibold">{metric.impact}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-sm text-gray-600 mt-2">*Intermediate target; full buoyancy = 1.0 by 2035</p>
    </motion.div>
  )
}

export default MetricsTable

