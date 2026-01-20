import React from 'react'
import { motion } from 'framer-motion'

const ImpactSection = () => {
  const impactCards = [
    {
      icon: '$',
      title: 'Direct Fiscal Waste',
      description: 'When budgets are not executed as planned, governments lose value through delayed projects, idle funds, cost overruns, and emergency reallocations.',
      stat: 'Significant fiscal waste',
      statLabel: 'Lost development value from weak execution',
      tooltip: 'Public Expenditure Reviews and PEFA assessments consistently show that weak budget credibility reduces value-for-money and increases inefficiency.',
      borderColor: 'border-[#0072BC]',
      bgColor: 'bg-blue-50',
      iconColor: 'text-[#0072BC]',
      statBg: 'bg-[#0072BC]'
    },
    {
      icon: '↓',
      title: 'Social Contract Erosion',
      description: 'When budgets do not deliver visible services, trust declines—citizens and firms become less willing to comply with taxes and fees, and informality deepens.',
      stat: 'Lower tax morale and compliance',
      statLabel: 'Trust declines when budgets don\'t deliver',
      tooltip: 'Governance and fiscal literature links credible service delivery to tax morale, especially where citizens repeatedly experience unmet budget commitments.',
      borderColor: 'border-[#F26C2B]',
      bgColor: 'bg-orange-50',
      iconColor: 'text-[#F26C2B]',
      statBg: 'bg-[#F26C2B]'
    },
    {
      icon: '+',
      title: 'Higher Borrowing Costs',
      description: 'Weak public financial management signals fiscal risk, which can raise risk premiums and limit access to affordable finance.',
      stat: 'Higher risk premiums',
      statLabel: 'More expensive sovereign borrowing',
      tooltip: 'Investors and lenders price fiscal credibility and transparency. Unpredictable execution patterns contribute to higher perceived sovereign risk.',
      borderColor: 'border-[#009D8C]',
      bgColor: 'bg-teal-50',
      iconColor: 'text-[#009D8C]',
      statBg: 'bg-[#009D8C]'
    },
    {
      icon: '⊗',
      title: 'Capital Market Block',
      description: 'Domestic institutional investors depend on predictable fiscal policy and credible public investment planning. Volatility discourages long-term local financing.',
      stat: 'Reduced long-term domestic finance',
      statLabel: 'Shallower local capital markets',
      tooltip: 'Where budget execution is volatile, domestic markets tend to remain short-term and fragmented, limiting mobilisation of local savings.',
      borderColor: 'border-[#7E57C2]',
      bgColor: 'bg-purple-50',
      iconColor: 'text-[#7E57C2]',
      statBg: 'bg-[#7E57C2]'
    },
    {
      icon: '!',
      title: 'Governance Enabler for Leakages',
      description: 'Weak oversight and controls increase exposure to procurement fraud, mispricing, and diversion—creating pathways for illicit and inefficient outflows.',
      stat: 'Higher leakage risk',
      statLabel: 'Procurement and control weaknesses amplify losses',
      tooltip: 'Illicit financial flows have multiple drivers, but weak procurement, auditing, and expenditure controls materially increase vulnerability to leakage.',
      borderColor: 'border-[#FF6F00]',
      bgColor: 'bg-orange-50',
      iconColor: 'text-[#FF6F00]',
      statBg: 'bg-[#FF6F00]'
    },
    {
      icon: '×',
      title: 'Multiplier Effects',
      description: 'Leakages reduce the development return of every dollar spent. When resources fail to reach intended outputs, impacts cascade across human capital and productivity.',
      stat: 'Lower development returns',
      statLabel: 'Spending delivers less impact',
      tooltip: 'The same fiscal envelope produces very different outcomes depending on execution quality, targeting, and accountability.',
      borderColor: 'border-[#43A047]',
      bgColor: 'bg-green-50',
      iconColor: 'text-[#43A047]',
      statBg: 'bg-[#43A047]'
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
          THE IMPACT: Development Financing Consequences
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 p-4 bg-blue-50 border-l-4 border-[#0072BC] rounded-r-lg"
        >
          <p className="text-sm text-gray-700 italic">
            <strong>How to read these impacts:</strong> These impacts describe channels of loss, not additive totals. Weak expenditure management can simultaneously reduce value-for-money, weaken trust, increase financing costs, and amplify governance risks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border-2 ${card.borderColor} rounded-xl p-6 bg-white hover:shadow-lg transition-shadow`}
            >
              <div className={`${card.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl font-bold ${card.iconColor}`}>
                {card.icon}
              </div>
              <h3 className="font-bold text-lg text-[#003366] mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{card.description}</p>
              <div className={`${card.statBg} text-white p-4 rounded-lg text-center`}>
                <div className="text-lg font-bold mb-1">{card.stat}</div>
                <div className="text-xs mt-1 opacity-90">{card.statLabel}</div>
              </div>
              {card.tooltip && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 italic">{card.tooltip}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactSection

