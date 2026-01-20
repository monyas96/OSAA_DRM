import React from 'react'
import { motion } from 'framer-motion'

const EvidenceSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#003366] mb-10"
        >
          THE EVIDENCE: What PEFA Data Shows
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* PI-1 Findings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-[#003366] mb-4">
              Indicator 4.1.1.1: Budget Execution Consistency
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Question:</strong> Do governments spend what they plan?
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <strong className="text-[#003366]">Score A (95-105% execution):</strong> Less than 20% of countries
                <br />
                <small className="text-gray-600">Examples: Botswana, Cameroon, Malawi show consistent performance</small>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <strong className="text-[#F26C2B]">Score D (Below 85% or Above 115%):</strong> 45% of countries
                <br />
                <small className="text-gray-600">Chronic under-execution or fiscal discipline failures</small>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-base leading-relaxed text-gray-700">
                <strong>Key Insight:</strong> Execution consistency remains rare. Most countries experience ±15-20% variance, making multi-year planning impossible and breaking citizen trust.
              </p>
            </div>
          </motion.div>

          {/* PI-2 Findings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-[#003366] mb-4">
              Indicator 4.1.2.1: Protecting Priorities
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Question:</strong> Do health/education get their allocated funds?
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <strong className="text-[#003366]">Score 3-4 (Below 10% variance):</strong> Less than 30% of countries
                <br />
                <small className="text-gray-600">Examples: Kenya, Seychelles protect sectoral priorities</small>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <strong className="text-red-700">Score 1/D (Above 15% variance):</strong> 77% of countries
                <br />
                <small className="text-gray-600">Health budget of $100M → receives $80-85M mid-year</small>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-base leading-relaxed text-gray-700">
                <strong>Critical Finding:</strong> Composition distortion is systemic. Legislative budget approvals don't translate to actual sectoral spending, undermining development planning.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Double Deficit Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-red-50 border-2 border-red-500 p-8 rounded-xl"
        >
          <div className="text-2xl font-bold text-red-800 mb-4">THE DOUBLE DEFICIT</div>
          <p className="text-base text-gray-800 leading-relaxed">
            Among 31 assessed African countries, 45% face execution weakness (Score D) AND 77% experience severe composition distortion (Score 1/D). Budgets are unpredictable in total AND unreliable by sector—a complete fiscal planning breakdown affecting the majority of assessed countries.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default EvidenceSection

