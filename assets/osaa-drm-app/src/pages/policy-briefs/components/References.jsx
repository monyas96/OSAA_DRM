import React from 'react'
import { motion } from 'framer-motion'

const References = () => {
  const references = [
    "UN SDG Global Metadata for Indicator 16.6.1 (PEFA-based methodology and interpretation).",
    "PEFA Framework (PI-1 and PI-2 concepts used for budget reliability and composition).",
    "UNCTAD estimates on illicit financial outflows from Africa (context on broader leakages narrative)."
  ]

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-[#003366] mb-4"
        >
          References (for credibility; keep short)
        </motion.h2>
        <motion.ol
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-2 text-base text-gray-700"
        >
          {references.map((ref, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="font-semibold text-[#0072BC]">{index + 1})</span>
              <span>{ref}</span>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

export default References

