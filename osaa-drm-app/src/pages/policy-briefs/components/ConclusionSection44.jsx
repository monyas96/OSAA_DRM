import React from 'react'
import SectionHeader from './SectionHeader'

const ConclusionSection44 = () => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Conclusion: The Path Forward"
          subtitle="Reversing the Flow"
          color="purple"
        />
        <div className="prose max-w-none">
          <p className="text-base text-slate-700 leading-relaxed mb-6">
            Stopping the reverse flow completes the four-part resource mobilization story. Brief 4.1 addressed the value leak through efficiency losses in spending. Brief 4.2 tackled the collection leak with $120-145 billion in tax revenue lost. Brief 4.3 examined the capital drain as savings flow abroad from shallow markets. Brief 4.4 addresses the reverse flow—$88.6 billion stolen through illicit channels.
          </p>

          <p className="text-base text-slate-700 leading-relaxed mb-6">
            <strong>Total resource loss across all four briefs: $200-300+ billion annually.</strong> Africa doesn't have a resource scarcity problem—it has a resource hemorrhage problem. The continent generates sufficient revenue, savings, and economic activity, but weak institutions create four simultaneous leaks. The solution requires plugging all four leaks simultaneously.
          </p>

          {/* The Prize Box - Simplified like other briefs */}
          <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white p-8 rounded-xl shadow-xl mb-8">
            <h3 className="text-xl font-semibold mb-4">The Prize: What Success Looks Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-semibold mb-2">Flow Reversed</div>
                <div className="text-sm opacity-90">$62B net benefit: Africa becomes net capital importer</div>
              </div>
              <div>
                <div className="text-2xl font-semibold mb-2">Institutions Strengthened</div>
                <div className="text-sm opacity-90">Corruption prosecuted, transparency normalized</div>
              </div>
              <div>
                <div className="text-2xl font-semibold mb-2">Economic Sovereignty</div>
                <div className="text-sm opacity-90">Policy autonomy, self-determined development</div>
              </div>
            </div>
          </div>

          {/* The Bottom Line */}
          <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-xl">
            <p className="text-base text-gray-800 leading-relaxed mb-3">
              Stopping the reverse flow alone would retain $50+ billion annually—nearly equal to all development aid. Combined with other domestic resource mobilization improvements, Africa would mobilize $200-250 billion additional annually—enough to finance transformation without external dependency.
            </p>
            <p className="text-base text-gray-800 leading-relaxed font-semibold">
              The question is not whether Africa has the resources. The question is whether Africa will build the institutions to keep them. The flow must be reversed. Now.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConclusionSection44

