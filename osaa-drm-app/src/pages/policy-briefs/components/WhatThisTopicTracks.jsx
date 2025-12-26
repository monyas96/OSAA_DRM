import React from 'react'
import { motion } from 'framer-motion'

const WhatThisTopicTracks = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN: "What this topic tracks" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#0072BC]"
          >
            <h3 className="text-2xl font-bold text-[#003366] mb-6">What this topic tracks</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-[#0072BC] font-bold text-xl mt-1">•</span>
                <span className="leading-relaxed"><strong className="text-[#003366]">Budget credibility</strong> (planned vs actual total spending)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#0072BC] font-bold text-xl mt-1">•</span>
                <span className="leading-relaxed"><strong className="text-[#003366]">Protection of priorities</strong> (sector allocations during execution)</span>
              </li>
            </ul>
          </motion.div>

          {/* RIGHT COLUMN: "What leakage looks like" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#F26C2B]"
          >
            <h3 className="text-2xl font-bold text-[#003366] mb-6">What leakage looks like</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-[#F26C2B] font-bold text-xl mt-1">•</span>
                <span className="leading-relaxed">When spending deviates from the approved budget, priorities slip and oversight weakens</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#F26C2B] font-bold text-xl mt-1">•</span>
                <span className="leading-relaxed">Even when funds exist, execution failures create leakage channels</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhatThisTopicTracks

