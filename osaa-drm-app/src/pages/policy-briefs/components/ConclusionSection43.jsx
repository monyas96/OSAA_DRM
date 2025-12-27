import React from 'react'
import SectionHeader from './SectionHeader'

const ConclusionSection43 = () => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Conclusion: The Path Forward"
          subtitle="The Bottom Line"
          color="purple"
        />
        <div className="prose max-w-none">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            Africa doesn't have a savings problem—it has a capture problem. Pension funds, wealthy individuals, and diaspora hold trillions, but shallow markets can't absorb it. Capital leaks abroad, then countries borrow the same money back at premium rates.
          </p>

          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            The solution is institutional: deepen markets and mobilize pension capital for infrastructure.
          </p>

          {/* Two-Pillar Strategy Summary */}
          <div className="bg-slate-50 border-l-4 border-slate-300 p-6 rounded-r-lg mb-8 border-opacity-50">
            <h3 className="text-base font-semibold text-gray-900 mb-3">The Two-Pillar Strategy</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              The first pillar deepens capital markets from 20% to 60% of GDP by 2035 through expanded equity markets, developed bond markets, and strengthened market infrastructure. The second pillar mobilizes 15-20% of pension assets for infrastructure by 2030 through regulatory reform, investment vehicles, bankable project pipelines, and institutional capacity building.
            </p>
          </div>

          {/* The Prize Box */}
          <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-xl mb-8">
            <h3 className="text-base font-semibold text-gray-900 mb-3">The Prize</h3>
            <p className="text-sm text-gray-800 leading-relaxed">
              Success delivers hundreds of billions in additional absorption capacity. Capital stays domestic rather than leaking abroad. Returns accrue to African savers instead of foreign investors. The infrastructure gap closes by 50-60% as pension funds deploy capital domestically. External dependency decreases as countries rely less on volatile portfolio flows. A self-sustaining development cycle emerges where infrastructure enables growth, growth increases savings, and deeper markets channel those savings back into productive investment.
            </p>
          </div>

          {/* Stakes Paragraph */}
          <div className="bg-slate-50 border-l-4 border-slate-300 p-6 rounded-r-lg mb-8 border-opacity-50">
            <p className="text-sm text-gray-800 leading-relaxed">
              The stakes are existential. Africa's $130-170 billion annual infrastructure gap cannot be closed through external borrowing alone. The capital exists domestically—pension funds, banks, wealthy savers hold trillions. The question is not whether Africa has the savings. The question is whether markets are deep enough to capture and channel them.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConclusionSection43

