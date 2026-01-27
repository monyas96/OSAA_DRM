import React from 'react'
import SectionHeader from './SectionHeader'
import LeakageChannel from './LeakageChannel'
import StatsCalloutBox from './StatsCalloutBox'
import PullQuote from '../shared/PullQuote'

const CrisisSection41 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Crisis: Where Efficiency Meets Accountability"
          subtitle="Inefficient public expenditure is a major contributor to Africa's overall $500-600 billion annual resource drain. This total comes from weak tax systems, inefficient public spending, illicit financial flows, and under-governed assets."
          color="blue"
        />
      <div className="prose max-w-none">
        <p className="text-base text-slate-700 leading-relaxed mb-8">
          Based on the Public Expenditure and Financial Accountability (PEFA) evidence, public expenditure inefficiency manifests in three interconnected ways:
        </p>

        {/* Manifestation 1 */}
        <LeakageChannel 
          number="1" 
          title="Budget Execution Gaps"
          color="red"
        >
          <p className="mb-4">
            Money is allocated but not spent, or spent late. As the Public Expenditure and Financial Accountability (PEFA) data shows, 45% of assessed African countries score D on aggregate expenditure outturn, meaning spending deviates by more than 15% from plans.
          </p>
          <p className="mb-4">
            <strong>The cost:</strong> When budgets are not executed as planned, governments lose value through delayed projects, idle funds, cost overruns, and emergency reallocations. This represents significant fiscal waste and lost development value.
          </p>
        </LeakageChannel>

        {/* Manifestation 2 */}
        <LeakageChannel 
          number="2" 
          title="Composition Distortion"
          color="orange"
        >
          <p className="mb-4">
            Health and education budgets are cut 15-20% mid-year despite legislative approval. Public Expenditure and Financial Accountability (PEFA) data reveals 77% of African countries experience severe composition distortion (Score 1/D), with sectoral variance exceeding 15%. For example, a health budget of $100M may receive only $80-85M mid-year.
          </p>
          <p className="mb-4">
            <strong>The cost:</strong> The variance between planned and actual sector allocations undermines long-term planning and breaks social contracts with citizens. Strategic priorities are not protected, undermining development effectiveness.
          </p>
        </LeakageChannel>

        {/* Manifestation 3 */}
        <LeakageChannel 
          number="3" 
          title="Institutional Failure"
          color="blue"
        >
          <p className="mb-4">
            When governments cannot execute their own budgets, they signal inability to deliver on any reform agenda—undermining tax compliance, capital market access, and governance credibility.
          </p>
          <p className="mb-4">
            <strong>The cost:</strong> Weak oversight and controls increase exposure to procurement fraud, mispricing, and diversion—creating pathways for illicit and inefficient outflows. This governance enabler for leakages amplifies losses across the system.
          </p>
        </LeakageChannel>

        {/* Sidebar Callout Box */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-8">
          <div>
            <PullQuote 
              quote="When governments cannot execute budgets, they cannot deliver on promises—the most fundamental test of state capacity."
              color="blue"
            />
          </div>
          <div>
            <StatsCalloutBox
              title="$688.7 BILLION ANNUAL PUBLIC REVENUE"
              stats={[
                { value: '45%', label: 'weak execution (Score D)' },
                { value: '77%', label: 'severe comp. distortion' },
                { value: '$500-600B', label: 'total resource drain' }
              ]}
              equivalents={[
                'Contributes to $500-600B annual drain',
                'Affects majority of assessed countries',
                'Undermines development planning'
              ]}
            />
          </div>
        </div>

        <div className="bg-slate-50 border-l-4 border-slate-300 p-6 rounded-r-lg mt-8 border-opacity-50">
          <strong className="text-gray-900">The Core Problem:</strong>
          <p className="text-base text-gray-800 mt-2 leading-relaxed">
            This isn't technical—it's institutional. Weak budget execution reveals fragmented systems, poor commitment controls, political interference, and absent accountability mechanisms.
          </p>
        </div>
      </div>
      </div>
    </section>
  )
}

export default CrisisSection41

