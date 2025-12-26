import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const ThePrize = () => {
  const outcomes = [
    {
      title: 'Fiscal Sovereignty Restored',
      description: 'Africa finances its own development priorities. Reduced dependence on aid and volatile external flows. Policy autonomy—governments set priorities without donor conditionalities.'
    },
    {
      title: 'Social Contract Strengthened',
      description: 'Visible link between taxes paid and services delivered. Citizens demand accountability, governments respond. Trust in government institutions increases.'
    },
    {
      title: 'Development Transformation Funded',
      description: 'Universal healthcare coverage achievable. Quality education systems fully funded. Infrastructure gap closed ($100B annually). Climate adaptation and energy transition financed domestically.'
    },
    {
      title: 'Economic Resilience Built',
      description: 'Counter-cyclical fiscal capacity during downturns. Reduced debt vulnerability and crisis risk. Stable, predictable revenue for planning and investment.'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white p-8 rounded-xl shadow-xl mb-8"
    >
      <h3 className="text-xl font-bold mb-8">The Prize: What Success Looks Like</h3>
      <p className="text-xl mb-8 opacity-90">If these reforms succeed:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {outcomes.map((outcome, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="bg-teal-500 rounded-full p-2 flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold mb-2">{outcome.title}</h4>
              <p className="text-sm text-blue-100 leading-relaxed">{outcome.description}</p>
            </div>
          </div>
        ))}
      </div>

    </motion.div>
  )
}

export default ThePrize

