import React from 'react'
import { motion } from 'framer-motion'

const WhatThisTopicMeasures = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-[#003366] mb-4"
        >
          Where public money leaks after it is collected
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg leading-relaxed text-gray-700 max-w-4xl"
        >
          This topic focuses on whether governments (1) spend roughly what Parliament approved, and (2) spend it in the way the budget promised. When either breaks down, public funds are more likely to be wasted, diverted to emergencies, or absorbed by inefficiencies—reducing the impact of every dollar.
        </motion.p>
      </div>
    </section>
  )
}

export default WhatThisTopicMeasures

