import React from 'react'
import SectionHeader from './SectionHeader'
import PullQuote from '../shared/PullQuote'

const CoreInsightSection = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Core Problem"
          subtitle="This isn't technical—it's systemic and political."
          color="orange"
        />
      <div className="prose max-w-none">
        <p className="text-base text-slate-700 leading-relaxed mb-6">
          Tax leakage doesn't result from poor tax policy design or lack of technical knowledge. African countries have spent decades reforming tax codes, modernizing revenue authorities, and adopting international best practices. Yet the leak persists.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-6">
          The root cause is <strong>institutional fragility compounded by political economy barriers</strong>. Weak revenue authorities lack autonomy, resources, and enforcement power. Political elites capture tax policy through exemptions and special deals. Compliance is selective—powerful actors evade with impunity while small businesses bear disproportionate burdens. Citizens see governments fail to collect from those who should pay most, eroding tax morale and feeding the vicious cycle.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-6">
          <strong>DRM is no longer a technical reform agenda—it is the central macroeconomic strategy for stability, sovereignty, and development impact.</strong> Strengthening DRM means regaining control over economic and financial flows, restoring the social contract between citizens and the state, and financing national priorities at scale without external dependency.
        </p>

        <div className="mt-8">
          <PullQuote 
            quote="The question is no longer whether Africa can afford DRM reform, but whether it can afford not to."
            color="orange"
          />
        </div>
      </div>
      </div>
    </section>
  )
}

export default CoreInsightSection

