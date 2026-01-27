import React from 'react'
import { motion } from 'framer-motion'

const ConclusionSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#003366] mb-10 text-center"
        >
          CONCLUSION: Public Expenditure as a Test of State Capacity
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <p className="text-lg leading-relaxed text-gray-800">
            Public expenditure failures in Africa are not primarily about budget size but about execution and composition.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-800">
            When governments cannot reliably execute approved budgets or protect stated priorities, fiscal policy loses credibility, oversight weakens, and resources become vulnerable to leakage and misuse.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-800">
            Strengthening expenditure management is therefore a foundational reform that underpins revenue mobilisation, capital market development, and efforts to curb illicit financial flows.
          </p>
          
          <p className="text-lg leading-relaxed text-gray-800 font-semibold">
            Public expenditure performance is one of the clearest observable signals of state capability and institutional trust.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

export default ConclusionSection
