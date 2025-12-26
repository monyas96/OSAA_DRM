import React from 'react'
import { motion } from 'framer-motion'

const WhyItMatters = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-[#003366] mb-4"
        >
          Why expenditure leakages deepen the financing gap
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg leading-relaxed text-gray-700 max-w-4xl"
        >
          When governments cannot execute budgets credibly, they lose more than money—they lose policy control. Credibility gaps drive stop-go service delivery, arrears, rushed procurement, and inefficient spending patterns that compound over time. This weakens trust, raises the cost of financing, and makes it harder to convert domestic resources into visible development results—reinforcing the very financing paradox highlighted on the landing page.
        </motion.p>
      </div>
    </section>
  )
}

export default WhyItMatters

