import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const ThePrize43 = () => {
  const outcomes = [
    {
      title: 'Billions in Additional Absorption Capacity',
      description: 'Market depth increases from 20% to 60% of GDP by 2035, providing billions in additional capacity to capture domestic savings.'
    },
    {
      title: 'Capital Stays Domestic',
      description: 'Pension funds, wealthy individuals, and diaspora invest at home instead of abroad. Returns accrue to African savers.'
    },
    {
      title: 'Infrastructure Gap Closes',
      description: 'Pension funds allocate 15-20% to infrastructure, mobilizing billions and closing a significant portion of the $130-170B gap.'
    },
    {
      title: 'External Dependency Decreases',
      description: 'Less reliance on volatile portfolio flows. Reduced need to borrow back leaked capital at premium rates. Self-sustaining development cycle.'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white p-8 rounded-xl shadow-xl mb-8"
    >
      <h3 className="text-xl font-bold mb-8">The Prize: What Success Looks Like</h3>
      <p className="text-xl mb-8 opacity-90">The three-pillar strategy delivers:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {outcomes.map((outcome, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="bg-slate-600 rounded-full p-2 flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base font-semibold mb-2">{outcome.title}</h4>
              <p className="text-sm text-slate-200 leading-relaxed">{outcome.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default ThePrize43

