import React from 'react'
import { motion } from 'framer-motion'

const ImpactProjections = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500 p-8 rounded-r-xl mb-8"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">Impact Projections</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-gray-900 mb-3">Economic impact:</h4>
          <p className="text-gray-700 mb-4">
            <strong>$120-145B annual leakage reduced by 60-70% = $75-100B recaptured</strong>
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-700">• Equivalent to 3-4% of Africa's GDP</li>
            <li className="text-gray-700">• Could fund universal primary healthcare ($50B)</li>
            <li className="text-gray-700">• Could close infrastructure gap ($50B)</li>
            <li className="text-gray-700">• Could provide social protection for 500M people ($25B)</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-3">Development impact:</h4>
          <p className="text-gray-700 mb-4">
            <strong>400-500 million people</strong> benefit from improved public services
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-700">• 150-200M gain access to quality healthcare</li>
            <li className="text-gray-700">• 100-150M children enter improved schools</li>
            <li className="text-gray-700">• 80-100M connected to reliable electricity</li>
            <li className="text-gray-700">• 40-50M lifted out of extreme poverty through social protection</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-3">Governance impact:</h4>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-700">• Stronger state institutions and capacity</li>
            <li className="text-gray-700">• Improved government accountability and transparency</li>
            <li className="text-gray-700">• Enhanced citizen engagement and trust</li>
            <li className="text-gray-700">• Reduced corruption and elite capture</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default ImpactProjections

