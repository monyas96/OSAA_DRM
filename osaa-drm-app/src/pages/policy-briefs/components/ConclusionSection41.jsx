import React from 'react'
import SectionHeader from './SectionHeader'

const ConclusionSection41 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Conclusion: The Path to Fiscal Credibility"
          subtitle="Strengthening budget execution is fundamental to development effectiveness and citizen trust"
          color="blue"
        />
      <div className="prose max-w-none">
        <p className="text-base text-slate-700 leading-relaxed mb-6">
          Inefficient public expenditure management contributes significantly to Africa's $500-600 billion annual resource drain. The evidence from Public Expenditure and Financial Accountability (PEFA) assessments is clear: <strong>45% of assessed African countries score D on budget execution</strong>, and <strong>77% experience severe composition distortion</strong>, meaning strategic priorities are not protected.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-6">
          This isn't a technical problem—it's an institutional one. Weak budget execution reveals fragmented systems, poor commitment controls, political interference, and absent accountability mechanisms. The consequences cascade: fiscal waste, eroded citizen trust, higher borrowing costs, blocked capital market access, and enabled illicit flows.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-6">
          <strong>The solution requires a three-pillar strategy:</strong> improving transparency and accountability, protecting priority sectors, and strengthening PFM systems and controls. These reforms must be implemented systematically over 0-5 years, with immediate actions to stop the bleeding, medium-term capacity building, and long-term institutional maturity.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-8">
          <strong>The stakes are existential.</strong> When governments cannot execute budgets, they cannot deliver on promises—the most fundamental test of state capacity. Strengthening budget execution means regaining control over public spending, restoring the social contract between citizens and the state, and ensuring that allocated resources actually reach intended priorities. The question is no longer whether Africa can afford these reforms, but <strong>whether it can afford not to</strong>.
        </p>

        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 text-white p-8 rounded-xl shadow-xl">
          <h3 className="text-xl font-bold mb-4">The Prize: What Success Looks Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">More Predictable</div>
              <div className="text-sm opacity-90">Budgets with fewer extreme deviations</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Protected Priorities</div>
              <div className="text-sm opacity-90">Health and education receive allocated funds</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Stronger Trust</div>
              <div className="text-sm opacity-90">Citizen confidence in government delivery</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default ConclusionSection41

