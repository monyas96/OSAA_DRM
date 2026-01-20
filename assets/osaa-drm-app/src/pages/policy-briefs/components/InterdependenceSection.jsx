import React from 'react'
import { motion } from 'framer-motion'

const InterdependenceSection = () => {
  const connections = [
    {
      title: 'Enables Tax (4.2)',
      mechanism: 'Credible budgets support compliance',
      logic: 'Service delivery builds tax morale',
      enables: 'Stronger social contract',
      gradient: 'from-teal-50 to-teal-100',
      borderColor: 'border-[#009D8C]',
      titleColor: 'text-[#00695C]'
    },
    {
      title: 'Enables Capital (4.3)',
      mechanism: 'Fiscal predictability underpins market trust',
      logic: 'Execution credibility shapes investor risk',
      enables: 'Deeper domestic debt markets',
      gradient: 'from-purple-50 to-purple-100',
      borderColor: 'border-[#7E57C2]',
      titleColor: 'text-[#4A148C]'
    },
    {
      title: 'Reduces IFF Risks (4.4)',
      mechanism: 'Strong controls reduce fraud and diversion',
      logic: 'Oversight quality affects exposure to leakages',
      enables: 'Stronger anti-corruption and procurement systems',
      gradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-[#FF6F00]',
      titleColor: 'text-[#E65100]'
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#003366] mb-10"
        >
          THE INTERDEPENDENCE: Enabling Other DRM Reforms
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {connections.map((connection, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${connection.gradient} border-l-4 ${connection.borderColor} p-6 rounded-r-xl`}
            >
              <div className={`font-bold text-base mb-4 ${connection.titleColor}`}>
                {connection.title}
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-[#003366]">Mechanism:</strong>
                  <div className="text-gray-700 mt-1">{connection.mechanism}</div>
                </div>
                <div>
                  <strong className="text-[#003366]">Logic:</strong>
                  <div className="text-gray-700 mt-1">{connection.logic}</div>
                </div>
                <div>
                  <strong className="text-[#003366]">Enables:</strong>
                  <div className="text-gray-700 mt-1">{connection.enables}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InterdependenceSection

