import React from 'react'
import { motion } from 'framer-motion'

const SynthesisSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN: "How PI-1 + PI-2 link" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-[#0072BC]"
          >
            <h3 className="text-2xl font-bold text-[#003366] mb-6">How PI-1 + PI-2 link</h3>
            <ul className="space-y-5 text-lg text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-[#0072BC] font-bold text-xl mt-0.5">•</span>
                <div className="leading-relaxed">
                  <strong className="text-[#003366]">Stage 1: Credibility leakage</strong> (aggregate deviation)
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-[#0072BC] font-bold text-xl mt-0.5">•</span>
                <div className="leading-relaxed">
                  <strong className="text-[#003366]">Stage 2: Allocation leakage</strong> (priorities not protected)
                </div>
              </li>
            </ul>
          </motion.div>

          {/* RIGHT COLUMN: "So what?" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl p-8 shadow-lg border-l-4 border-[#F26C2B]"
          >
            <h3 className="text-2xl font-bold text-[#003366] mb-6">So what?</h3>
            <p className="text-lg leading-relaxed text-gray-800 font-light">
              If budgets don't bind total spending <strong className="text-[#003366]">AND</strong> don't protect composition, extra financing won't reliably translate into services. Execution reform becomes a prerequisite for impact.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SynthesisSection

