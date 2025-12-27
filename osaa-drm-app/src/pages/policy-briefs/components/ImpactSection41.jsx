import React from 'react'
import SectionHeader from './SectionHeader'

const ImpactSection41 = () => {
  const impactCards = [
    {
      icon: '$',
      title: 'Direct Fiscal Waste ($)',
      description: 'When budgets are not executed as planned, governments lose value through delayed projects, idle funds, cost overruns, and emergency reallocations.',
      stat: 'Significant fiscal waste',
      statLabel: 'Lost development value from weak execution',
      tooltip: 'Public Expenditure Reviews and PEFA assessments consistently show that weak budget credibility reduces value-for-money and increases inefficiency.',
      borderColor: 'border-slate-300',
      bgColor: 'bg-slate-50',
      iconColor: 'text-slate-600',
      statBg: 'bg-slate-600'
    },
    {
      icon: '↓',
      title: 'Social Contract Erosion (↓)',
      description: 'When budgets do not deliver visible services, trust declines—citizens and firms become less willing to comply with taxes and fees, and informality deepens.',
      stat: 'Lower tax morale and compliance',
      statLabel: 'Trust declines when budgets don\'t deliver',
      tooltip: 'Governance and fiscal literature links credible service delivery to tax morale, especially where citizens repeatedly experience unmet budget commitments.',
      borderColor: 'border-slate-300',
      bgColor: 'bg-slate-50',
      iconColor: 'text-slate-600',
      statBg: 'bg-slate-600'
    },
    {
      icon: '+',
      title: 'Higher Borrowing Costs (+)',
      description: 'Weak public financial management signals fiscal risk, which can raise risk premiums and limit access to affordable finance.',
      stat: 'Higher risk premiums',
      statLabel: 'More expensive sovereign borrowing',
      tooltip: 'Investors and lenders price fiscal credibility and transparency. Unpredictable execution patterns contribute to higher perceived sovereign risk.',
      borderColor: 'border-slate-300',
      bgColor: 'bg-slate-50',
      iconColor: 'text-slate-600',
      statBg: 'bg-slate-600'
    },
    {
      icon: '⊗',
      title: 'Capital Market Block (⊗)',
      description: 'Domestic institutional investors depend on predictable fiscal policy and credible public investment planning. Volatility discourages long-term local financing.',
      stat: 'Reduced long-term domestic finance',
      statLabel: 'Shallow local capital markets',
      tooltip: 'Where budget execution is volatile, domestic markets tend to remain short-term and fragmented, limiting mobilisation of local savings.',
      borderColor: 'border-slate-300',
      bgColor: 'bg-slate-50',
      iconColor: 'text-slate-600',
      statBg: 'bg-slate-600'
    },
    {
      icon: '!',
      title: 'Governance Enabler for Leakages (!)',
      description: 'Weak oversight and controls increase exposure to procurement fraud, mispricing, and diversion—creating pathways for illicit and inefficient outflows.',
      stat: 'Higher leakage risk',
      statLabel: 'Procurement and control weaknesses amplify losses',
      tooltip: 'Illicit financial flows have multiple drivers, but weak procurement, auditing, and expenditure controls materially increase vulnerability to leakage.',
      borderColor: 'border-slate-300',
      bgColor: 'bg-slate-50',
      iconColor: 'text-slate-600',
      statBg: 'bg-slate-600'
    },
    {
      icon: '×',
      title: 'Multiplier Effects (✕)',
      description: 'Leakages reduce the development return of every dollar spent. When resources fail to reach intended outputs, impacts cascade across human capital and productivity.',
      stat: 'Lower development returns',
      statLabel: 'Spending delivers less impact',
      tooltip: 'The same fiscal envelope produces very different outcomes depending on execution quality, targeting, and accountability.',
      borderColor: 'border-slate-300',
      bgColor: 'bg-slate-50',
      iconColor: 'text-slate-600',
      statBg: 'bg-slate-600'
    }
  ]

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Impact: Development Financing Consequences"
          subtitle="Weak expenditure management creates cascading effects across fiscal credibility, citizen trust, and development outcomes"
          color="teal"
        />
      <div className="prose max-w-none">
        <div className="mb-8 p-4 bg-slate-50 border-l-4 border-slate-300 rounded-r-lg border-opacity-50">
          <p className="text-sm text-gray-700 italic">
            <strong>How to read these impacts:</strong> These impacts describe channels of loss, not additive totals. Weak expenditure management can simultaneously reduce value-for-money, weaken trust, increase financing costs, and amplify governance risks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactCards.map((card, index) => (
            <div
              key={index}
              className={`border-2 ${card.borderColor} border-opacity-50 rounded-xl p-6 bg-white hover:shadow-lg transition-shadow`}
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
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

export default ImpactSection41

