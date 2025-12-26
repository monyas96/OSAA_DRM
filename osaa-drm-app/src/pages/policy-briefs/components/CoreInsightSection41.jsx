import React from 'react'
import SectionHeader from './SectionHeader'
import PullQuote from '../shared/PullQuote'

const CoreInsightSection41 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Core Problem: Institutional Fragility"
          subtitle="This isn't technical—it's institutional."
          color="orange"
        />
      <div className="prose max-w-none">
        <p className="text-base text-slate-700 leading-relaxed mb-6">
          Weak budget execution doesn't result from poor technical design or lack of knowledge. African countries have spent decades reforming public financial management systems, adopting international best practices, and modernizing budget processes. Yet execution gaps persist.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-6">
          The root cause is <strong>institutional fragility compounded by political economy barriers</strong>. Budget systems lack autonomy, resources, and enforcement power. Political elites capture budget processes through discretionary reallocations and special deals. Execution is selective—priority sectors get cut while non-priority spending continues. Citizens see governments fail to deliver on budget commitments, eroding trust and feeding the vicious cycle.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-6">
          <strong>Public expenditure efficiency is no longer a technical reform agenda—it is the foundation of fiscal credibility, development effectiveness, and citizen trust.</strong> Strengthening budget execution means regaining control over public spending, restoring the social contract between citizens and the state, and ensuring that allocated resources actually reach intended priorities.
        </p>

        <div className="mt-8">
          <PullQuote 
            quote="When governments cannot execute budgets, they cannot deliver on promises—the most fundamental test of state capacity."
            color="orange"
          />
        </div>
      </div>
      </div>
    </section>
  )
}

export default CoreInsightSection41

