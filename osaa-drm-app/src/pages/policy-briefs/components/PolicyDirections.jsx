import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const PolicyDirections = () => {
  const actions = [
    "Strengthen budget credibility: realistic revenue forecasts + enforce commitment controls.",
    "Improve cash and treasury management to prevent mid-year cuts and arrears.",
    "Tighten procurement planning and transparency to reduce rushed/low-value spending.",
    "Protect priority spending (health/education/infrastructure) through rules-based reallocations.",
    "Publish in-year execution reports and follow-up on audit findings."
  ]

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-[#003366] mb-6"
        >
          What can reduce leakages (practical actions)
        </motion.h2>
        <motion.ol
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {actions.map((action, index) => (
            <li key={index} className="flex items-start gap-3 text-lg text-gray-700">
              <span className="font-bold text-[#0072BC] mt-1">{index + 1})</span>
              <span>{action}</span>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

export default PolicyDirections

