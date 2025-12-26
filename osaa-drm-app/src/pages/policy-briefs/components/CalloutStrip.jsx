import React from 'react'
import { motion } from 'framer-motion'

const CalloutStrip = ({ callouts }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {callouts.map((callout, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-xl border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
                callout.color === 'blue' 
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-600' 
                  : callout.color === 'orange' 
                  ? 'bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-500'
                  : 'bg-gradient-to-br from-red-50 to-red-100/50 border-red-500'
              }`}
            >
              <h4 className={`text-xl font-bold mb-4 ${
                callout.color === 'blue' ? 'text-blue-900' :
                callout.color === 'orange' ? 'text-orange-900' :
                'text-red-900'
              }`}>
                {callout.title}
              </h4>
              <p className="text-base leading-relaxed text-gray-800 mb-5 font-light">
                {callout.text}
              </p>
              {callout.kpi && (
                <div className={`text-sm font-semibold italic pt-4 border-t ${
                  callout.color === 'blue' 
                    ? 'text-blue-800 border-blue-300' 
                    : callout.color === 'orange' 
                    ? 'text-orange-800 border-orange-300'
                    : 'text-red-800 border-red-300'
                }`}>
                  "{callout.kpi}"
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CalloutStrip

