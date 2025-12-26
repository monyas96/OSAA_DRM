import React from 'react'
import { motion } from 'framer-motion'
import StatCallout from '../shared/StatCallout'
import PullQuote from '../shared/PullQuote'

const CrisisSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#003366] mb-8"
        >
          THE CRISIS: Where Efficiency Meets Accountability
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* LEFT COLUMN: Narrative (60% width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-gray-800">
              Inefficient public expenditure is a major contributor to Africa's overall <strong className="text-[#003366]">$500-600 billion annual resource drain</strong>. This total comes from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-700 ml-4">
              <li>Weak tax systems</li>
              <li>Inefficient public spending</li>
              <li>Illicit financial flows</li>
              <li>Under-governed assets</li>
            </ul>

            <p className="text-lg leading-relaxed text-gray-800">
              Public expenditure inefficiency manifests in three ways:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">
                  1. Budget Execution Gaps
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  Money allocated but not spent, or spent late. PEFA data shows 45% of assessed African countries score D on aggregate expenditure outturn, meaning spending deviates by more than 15% from plans.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">
                  2. Composition Distortion
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  Health and education budgets cut 15-20% mid-year despite legislative approval. PEFA reveals 77% of African countries experience severe composition distortion (Score 1/D), with sectoral variance exceeding 15%.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">
                  3. Institutional Failure
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  When governments cannot execute their own budgets, they signal inability to deliver on any reform agenda—undermining tax compliance, capital market access, and governance credibility.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-[#0072BC] p-6 rounded-r-lg mt-6">
              <strong className="text-[#003366]">The Core Problem:</strong>
              <p className="text-base text-gray-800 mt-2 leading-relaxed">
                This isn't technical—it's institutional. Weak budget execution reveals fragmented systems, poor commitment controls, political interference, and absent accountability mechanisms.
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Stats and Quote (1/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-[#0072BC] to-[#003366] text-white p-6 rounded-lg text-center shadow-lg">
              <div className="text-5xl font-bold mb-2">$523B</div>
              <div className="text-sm uppercase tracking-wider opacity-90">ANNUAL PUBLIC REVENUE (2021)</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
              <div className="text-sm">
                <strong className="text-[#003366]">45%</strong> weak execution (Score D)
              </div>
              <div className="text-sm">
                <strong className="text-[#003366]">77%</strong> severe comp. distortion (Score 1/D)
              </div>
              <div className="text-sm">
                <strong>Contributes to</strong> $500-600B drain
              </div>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-lg italic">
              <p className="text-base text-gray-800 leading-relaxed">
                "When governments cannot execute budgets, they cannot deliver on promises—the most fundamental test of state capacity."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CrisisSection

