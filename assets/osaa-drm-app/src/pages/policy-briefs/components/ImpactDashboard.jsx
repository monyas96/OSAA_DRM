import React from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Building2, 
  ShieldAlert, 
  Zap 
} from 'lucide-react'
import StatCallout from '../shared/StatCallout'

const ImpactDashboard = ({ impacts }) => {
  const impactCards = [
    {
      icon: DollarSign,
      title: 'DIRECT FISCAL WASTE',
      content: 'Unutilized budget allocations and execution gaps represent direct fiscal waste. When governments cannot spend as planned, resources sit idle or are diverted, reducing the effectiveness of every dollar mobilized.',
      stat: { value: '$X', label: 'Billion Unutilized', unit: 'B' },
      color: 'blue'
    },
    {
      icon: Users,
      title: 'SOCIAL CONTRACT EROSION',
      content: 'When health and education budgets are cut mid-year, citizens lose trust in government promises. This erosion of the social contract reduces tax compliance and willingness to contribute to public goods.',
      stat: { value: '15-20%', label: 'Tax Compliance ↓' },
      color: 'orange'
    },
    {
      icon: TrendingUp,
      title: 'COST OF CAPITAL INCREASE',
      content: 'Weak budget execution signals fiscal instability to investors and lenders. Countries with poor expenditure management face higher borrowing costs, reducing fiscal space for development investments.',
      stat: { value: '+XX', label: 'Basis Points', unit: 'bp' },
      color: 'teal'
    },
    {
      icon: Building2,
      title: 'CAPITAL MARKET CONSTRAINT',
      content: 'Inefficient expenditure management prevents countries from demonstrating the fiscal discipline required to access capital markets. This constrains long-term development financing options.',
      stat: { value: 'Limited', label: 'Market Access' },
      color: 'blue'
    },
    {
      icon: ShieldAlert,
      title: 'IFF ENABLER',
      content: 'Weak budget controls and execution gaps create opportunities for illicit financial flows. When oversight mechanisms break down, resources are more easily diverted through corruption and fraud.',
      stat: { value: '-30-40%', label: 'IFF Reduction Potential' },
      color: 'orange'
    },
    {
      icon: Zap,
      title: 'MULTIPLIER EFFECTS',
      content: 'Inefficient expenditure management has cascading effects: reduced service delivery undermines human capital, weak institutions prevent tax reform, and low credibility blocks capital market access.',
      stat: { value: '2-3x', label: 'Multiplier Impact' },
      color: 'teal'
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#003366] mb-12 text-center"
        >
          THE IMPACT: DEVELOPMENT FINANCING IMPLICATIONS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impactCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all"
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: card.color === 'blue' ? '#E3F2FD' : 
                                    card.color === 'orange' ? '#FFF3E0' : 
                                    '#E0F2F1'
                  }}
                >
                  <Icon 
                    className="w-6 h-6"
                    style={{
                      color: card.color === 'blue' ? '#1976D2' : 
                            card.color === 'orange' ? '#F57C00' : 
                            '#00796B'
                    }}
                  />
                </div>
                
                <h3 className="text-xl font-bold text-[#003366] mb-3">{card.title}</h3>
                
                <p className="text-base leading-relaxed text-gray-700 mb-6">
                  {card.content}
                </p>

                <div className="pt-4 border-t border-gray-200">
                  <div 
                    className="text-white p-6 rounded-lg text-center shadow-lg"
                    style={{
                      background: card.color === 'blue' 
                        ? 'linear-gradient(135deg, #1976D2, #0D47A1)' 
                        : card.color === 'orange'
                        ? 'linear-gradient(135deg, #F57C00, #E65100)'
                        : 'linear-gradient(135deg, #00796B, #004D40)'
                    }}
                  >
                    <div className="text-5xl font-bold mb-1">{card.stat.value}{card.stat.unit || ''}</div>
                    <div className="text-sm uppercase tracking-wider opacity-90">
                      {card.stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ImpactDashboard

