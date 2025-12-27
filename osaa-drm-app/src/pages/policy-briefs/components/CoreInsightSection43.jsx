import React from 'react'
import SectionHeader from './SectionHeader'
import PullQuote from '../shared/PullQuote'

const CoreInsightSection43 = () => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Why Markets Can't Capture Capital"
          subtitle="The Three Structural Barriers"
          color="orange"
        />
        <div className="prose max-w-none">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            The two channels of capital drain—domestic capital sitting abroad and volatile external borrowing—both stem from the same root cause: shallow markets cannot absorb capital. But why are markets shallow? The failure has three structural dimensions that reinforce each other:
          </p>

          {/* Dimension 1: Market Depth Failure */}
            <div className="mb-6">
            <h3 className="text-base font-bold text-[#003366] mb-2">1. Market Depth Failure: Too Few Instruments</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Market capitalization &lt;20-30% of GDP means limited investment options: narrow equity markets (few listed companies, minimal IPO activity, no junior exchanges), nascent bond markets (limited corporate bonds, no infrastructure bonds), minimal REITs, no project finance vehicles.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Result:</strong> Investors seeking to deploy capital have nowhere to put it domestically—capital flows abroad to deeper markets with more opportunities.
            </p>
          </div>

          {/* Dimension 2: Intermediation Failure */}
            <div className="mb-6">
            <h3 className="text-base font-bold text-[#003366] mb-2">2. Intermediation Failure: Banks Can't Channel Savings</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Credit at 35% of GDP (vs. 80-120% benchmark) reflects weak credit infrastructure (limited credit bureaus, collateral registries), high collateral requirements (excluding businesses without land titles), and conservative lending (banks prefer safe government bonds over risky business loans).
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Result:</strong> Savings sit idle in deposits or leak abroad rather than being intermediated into productive credit.
            </p>
          </div>

          {/* Dimension 3: Institutional Failure */}
            <div className="mb-6">
            <h3 className="text-base font-bold text-[#003366] mb-2">3. Institutional Failure: No Long-Term Vehicles</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Pension funds need infrastructure bonds (20-30 year maturities), REITs, and project finance vehicles—but they don't exist at scale. Heavy regulatory restrictions and lack of project preparation compound the problem.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Result:</strong> Institutional capital allocates to low-yield government bonds or foreign assets—neither finances infrastructure.
            </p>
          </div>

          {/* Bottom Line */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 p-6 rounded-xl mt-8">
            <h3 className="text-lg font-bold text-orange-900 mb-3">The Bottom Line</h3>
            <p className="text-sm text-gray-800 leading-relaxed">
              These three failures create a vicious cycle: Shallow markets → banks can't lend → no institutional vehicles → capital leaks → markets stay shallow. Breaking this cycle requires simultaneous intervention across all three dimensions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoreInsightSection43
