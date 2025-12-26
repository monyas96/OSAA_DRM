import React from 'react'
import { motion } from 'framer-motion'

const ImpactProjections43 = () => {
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
          <h4 className="font-bold text-gray-900 mb-3">Economic Impact:</h4>
          <p className="text-gray-700 mb-4">
            <strong>Capital drain reduced from billions to billions = billions retained</strong>
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-700">• Infrastructure financing: +billions (closes portion of gap)</li>
            <li className="text-gray-700">• SME credit: +billions (supports millions of businesses)</li>
            <li className="text-gray-700">• Corporate investment: +billions (creates jobs)</li>
            <li className="text-gray-700">• Total additional domestic financing: billions annually</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-3">Development Impact:</h4>
          <p className="text-gray-700 mb-4">
            <strong>400-500 million people</strong> benefit from infrastructure investments
          </p>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-700">• Millions of businesses access credit (previously excluded)</li>
            <li className="text-gray-700">• Millions of jobs created through domestic investment</li>
            <li className="text-gray-700">• Pension members earn higher returns (invested in growing economy)</li>
            <li className="text-gray-700">• GDP growth acceleration: +percentage points from productive capital deployment</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-3">Sovereignty Impact:</h4>
          <ul className="space-y-2 ml-4">
            <li className="text-gray-700">• External debt reduced by billions (less foreign borrowing needed)</li>
            <li className="text-gray-700">• Vulnerability to capital flow reversals eliminated</li>
            <li className="text-gray-700">• Policy independence restored (less external influence)</li>
            <li className="text-gray-700">• Domestic ownership of development agenda</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default ImpactProjections43

