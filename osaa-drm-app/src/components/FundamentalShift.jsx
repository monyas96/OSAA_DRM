import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

const FundamentalShift = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section
      id="introduction"
      ref={ref}
      className="py-20 px-4 bg-white"
    >
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#003366] mb-8 whitespace-nowrap">
              Africa and African Partners Must Internalize a Fundamental Shift…
            </h2>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="space-y-6 max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-lg">
              The era in which development could be financed primarily through external assistance is over. 
              Financing for Development can no longer be anchored in ODA expectations; it must be built on 
              Africa's own capacity to mobilize, manage, and govern domestic resources.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg">
              Today, African countries mobilize the majority of their development financing domestically, yet 
              weak tax systems, inefficient public spending, illicit financial flows, and under-governed natural 
              and financial assets drain over <span className="font-bold text-orange-500">USD 500-600 billion annually</span> from African economies. This is the real 
              fiscal crisis.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg">
              In a context of tighter global resources and rising social pressures, DRM is no longer a technical 
              reform agenda, it is the central macroeconomic strategy for stability, sovereignty, and development 
              impact. Strengthening DRM means regaining control over economic and financial flows, restoring the 
              social contract, and financing priorities at scale, from infrastructure and energy to education and 
              social protection.
            </p>

            <p className="text-gray-700 leading-relaxed text-lg">
              The question is no longer whether Africa can afford DRM reform, but whether it can afford not to.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-lg">
              This is why Africa's development rests on four interdependent pillars: durable peace requires 
              sustainable development; sustainable development requires sustainable financing; sustainable financing 
              requires control over economic flows; and that control requires strong institutions. These pillars 
              form a virtuous cycle of transformation, not sequential steps, but a dynamic system where each 
              reinforces the others.
            </p>
          </motion.div>

          {/* Key Message Callout - Enhanced */}
          <motion.div
            variants={itemVariants}
            className="bg-orange-50 border-l-6 border-orange-500 p-6 rounded-r-lg mt-12 mb-8 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4">
              <AlertTriangle className="w-8 h-8 text-orange-500 flex-shrink-0" />
              <p className="text-orange-700 text-xl font-semibold leading-relaxed text-center">
                Any strategy that treats them separately will fail.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FundamentalShift
