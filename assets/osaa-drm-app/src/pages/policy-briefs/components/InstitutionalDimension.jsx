import React from 'react'
import { motion } from 'framer-motion'

const InstitutionalDimension = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-50 border-l-4 border-[#0072BC] p-10 rounded-r-xl shadow-lg"
        >
          <h3 className="text-3xl font-bold text-[#003366] mb-6">Institutional Dimension</h3>
          <p className="text-lg leading-relaxed text-gray-800 font-light" style={{ lineHeight: '1.8' }}>
            Weak PI-1 and PI-2 performance reflects institutional constraints: fragmented budget systems, weak commitment controls, limited cash forecasting capacity, and inadequate enforcement of approved plans. These gaps prevent budgets from functioning as credible policy instruments, sustaining the financing paradox.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default InstitutionalDimension

