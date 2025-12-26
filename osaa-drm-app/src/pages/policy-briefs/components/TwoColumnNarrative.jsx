import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, TrendingDown, DollarSign } from 'lucide-react'
import PullQuote from '../shared/PullQuote'
import StatCallout from '../shared/StatCallout'

const TwoColumnNarrative = ({ content }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-[#003366] mb-8"
          style={{ letterSpacing: '-0.025em' }}
        >
          THE CRISIS: WHERE EFFICIENCY MEETS ACCOUNTABILITY
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Narrative (60%) */}
          <div className="lg:col-span-3 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl leading-relaxed text-gray-700"
              style={{ lineHeight: '1.75' }}
            >
              African countries face a staggering $500-600 billion annual drain from inefficient 
              public expenditure management. This crisis manifests in three critical ways that 
              undermine state capacity and development outcomes.
            </motion.p>

            {/* Three Critical Ways */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-[#003366] mb-3 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-[#F26C2B]" />
                  1. Budget Execution Gaps
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  When actual spending deviates significantly from approved budgets, governments 
                  lose credibility with citizens and investors. PEFA data shows that 60%+ of 
                  African countries score 'D' on aggregate expenditure outturn, meaning actual 
                  spending varies by more than 15% from planned budgets. This unpredictability 
                  breaks promises to citizens and signals weak fiscal management.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#003366] mb-3 flex items-center gap-2">
                  <TrendingDown className="w-6 h-6 text-[#F26C2B]" />
                  2. Composition Distortion
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  Even when total spending aligns with budgets, the allocation across sectors 
                  often shifts dramatically. 70%+ of countries experience severe composition 
                  distortion, with health and education budgets cut by 15%+ mid-year. This 
                  undermines long-term planning, breaks social contracts, and signals that 
                  strategic priorities are not protected.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#003366] mb-3 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-[#F26C2B]" />
                  3. Waste and Leakage
                </h3>
                <p className="text-base leading-relaxed text-gray-700">
                  Inefficient execution creates opportunities for waste, leakage, and corruption. 
                  When budgets are not credible, oversight mechanisms break down, and resources 
                  are diverted from intended purposes. This compounds the fiscal drain and 
                  erodes public trust in government institutions.
                </p>
              </div>
            </motion.div>

            {/* Institutional Dimension Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-blue-50 border-l-4 border-[#0072BC] p-6 rounded-r-lg shadow-sm"
            >
              <h4 className="text-xl font-bold text-[#003366] mb-3">The Institutional Dimension</h4>
              <p className="text-base leading-relaxed text-gray-700">
                Weak expenditure management reflects deeper institutional challenges: fragmented 
                budget systems, weak commitment controls, and limited capacity for strategic 
                resource allocation. These institutional gaps prevent African states from 
                demonstrating the fundamental capacity to do what they promise—the core test 
                of state sovereignty and development effectiveness.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Visual Box (40%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stat Box - Blue */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <StatCallout
                value="$483"
                label="Billion"
                unit="B"
                color="blue"
                size="large"
              />
              <p className="text-center text-sm text-gray-600 mt-2">Public Revenue</p>
            </motion.div>

            {/* Small Infographic */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">60%+ weak execution</span>
                  <span className="px-2 py-1 bg-[#F26C2B] text-white text-xs font-semibold rounded">D</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">70%+ weak composition</span>
                  <span className="px-2 py-1 bg-[#F26C2B] text-white text-xs font-semibold rounded">1/D</span>
                </div>
                <div className="pt-3 border-t border-gray-300">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800">Est. drain:</span>
                    <span className="text-base font-bold text-[#003366]">$500-600B</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pull Quote - Orange Border */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <PullQuote
                quote="When governments cannot execute budgets, they cannot deliver on promises. This breaks the social contract and signals weak state capacity—the most fundamental barrier to sustainable development."
                color="orange"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TwoColumnNarrative

