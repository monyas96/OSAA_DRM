import React from 'react'
import SectionHeader from './SectionHeader'
import StreamlitGraphDirectEmbed from '../../../components/StreamlitGraphDirectEmbed'
import PullQuote from '../shared/PullQuote'

const CrisisSection43 = () => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Crisis: The Capital Drain"
          subtitle="Where Savings Escape and Development Starves"
          color="purple"
        />
        <div className="prose max-w-none">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            Capital markets exist to capture savings and channel them into productive investments. In developed economies, deep markets absorb domestic capital—pension funds buy corporate bonds, households invest in equity markets, banks intermediate savings into credit. Returns stay domestic, financing circulates internally, development is self-funded.
          </p>

          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            In Africa, shallow markets leak capital instead. Market capitalization averages only 20% of GDP across the continent—less than one-third the depth of comparable emerging markets. Banking systems provide credit equal to just 35% of GDP (vs. 80-120% benchmark). Bond markets are nascent or non-existent. This capture failure creates a perverse dynamic: domestic savings cannot find viable domestic investments, so capital leaks abroad.
          </p>

          {/* Graph 1A: Market Capitalization */}
            <div className="mb-6">
            <h3 className="text-base font-bold text-[#003366] mb-3">Graph 1A: Market Capitalization to GDP - Line Chart</h3>
            <StreamlitGraphDirectEmbed
              indicator="4.3.1.1"
              height={500}
            />
            <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-lg mb-6 border-opacity-50">
              <p className="text-sm text-gray-800 mb-3">
                <strong>Key Insight:</strong> The graph reveals that Africa's capital market problem is not universal—some countries achieve depth comparable to global peers. But the majority remain trapped in shallow markets that can't absorb domestic capital.
              </p>
              <div className="mt-3 text-xs text-gray-700 space-y-2">
                <p><strong>Wide Dispersion:</strong> Data reveals significant variation in market depth. Only a handful of countries achieve the depth needed to absorb institutional capital. The majority cluster below 30% of GDP—far too shallow for pension funds seeking diversified, long-term instruments.</p>
                <p><strong>Temporal Patterns:</strong> Most countries show minimal progress over time. Market depth remains stagnant or grows very slowly. Without deliberate intervention—expanding listings, developing bond markets, creating infrastructure vehicles—shallow markets stay shallow indefinitely, perpetuating the capital drain.</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            <strong>The result is a capital drain—an estimated billions annually—that operates through two primary channels:</strong>
          </p>

          {/* Section 1: The Domestic Capital Drain */}
            <div className="mb-6">
            <h3 className="text-xl font-bold text-[#003366] mb-4">Channel 1: The Domestic Capital Drain</h3>
            <h4 className="text-base font-semibold text-[#003366] mb-3">Trillions Sitting Abroad While Infrastructure Waits</h4>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              African capital exists but sits abroad—in pension fund portfolios, government reserves, and private accounts. Pension funds manage trillions in assets yet allocate substantial portions to foreign investments. Governments hold billions in foreign reserves (defensive buffers earning minimal returns). Wealthy individuals and diaspora keep capital in offshore accounts. All of this reflects the same problem: domestic markets lack the depth and instruments to absorb capital at home.
            </p>

            {/* Graph 1B: Pension Fund Asset Allocation (Detail View) */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">Graph 1B: Pension Fund Asset Allocation - Stacked Bar Chart</h4>
              <StreamlitGraphDirectEmbed
                indicator="4.3.3.1"
                height={500}
              />
              <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-lg mb-6 border-opacity-50">
                <p className="text-sm text-gray-800 mb-3">
                  <strong>Key Insight:</strong> The graph shows capital exists but is either trapped in low-yield bonds or leaking to foreign markets. Neither allocation finances the infrastructure and development Africa needs.
                </p>
                <p className="text-xs text-gray-700 mb-3">
                  <strong>Composite Insight:</strong> The pattern is clear: African capital exists in massive quantities—pension funds hold trillions, governments hold billions in reserves, private savers hold more billions abroad. The problem isn't lack of capital—it's lack of domestic investment vehicles deep enough to absorb it.
                </p>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                  <div className="bg-gray-100 p-2 rounded border border-gray-200">Domestic Equities</div>
                  <div className="bg-gray-100 p-2 rounded border border-gray-200">Domestic Bonds (50-70%)</div>
                  <div className="bg-gray-100 p-2 rounded border border-gray-200">Private Equity / Real Estate</div>
                  <div className="bg-gray-100 p-2 rounded border border-gray-200">Cash & Deposits</div>
                  <div className="bg-gray-100 p-2 rounded border border-gray-200">Foreign Assets</div>
                </div>
              </div>
            </div>

            {/* Three Forms of Capital Drain */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">The Three Forms of Capital Drain:</h4>
              
              <div className="space-y-6">
                {/* 1. Pension Fund Drain */}
                <div className="bg-slate-50 border-l-4 border-slate-300 p-6 rounded-r-lg border-opacity-50">
                  <h5 className="font-semibold text-gray-900 mb-3">1. Pension Fund Drain</h5>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    African pension funds manage trillions in assets, yet invest substantial portions abroad because domestic equity markets are narrow (few listed companies), bond markets are shallow (limited corporate bonds, no infrastructure bonds), and alternative investment vehicles don't exist (no REITs, project bonds, or infrastructure funds). Pension members need infrastructure—roads, power, water—but their savings finance projects in London, New York, and Hong Kong instead.
                  </p>
                </div>

                {/* 2. Reserve Holding Drain */}
                <div className="bg-slate-50 border-l-4 border-slate-300 p-6 rounded-r-lg border-opacity-50">
                  <h5 className="font-semibold text-gray-900 mb-3">2. Reserve Holding Drain</h5>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    Governments hold billions in foreign reserves—defensive capital sitting in low-yield U.S. Treasuries or European bonds rather than financing domestic development. This isn't poor policy—it's rational response to shallow markets. Without deep domestic capital markets, governments can't mobilize domestic savings for public investment, so they maintain large external buffers against shocks.
                  </p>
                </div>

                {/* 3. Private Capital Flight */}
                <div className="bg-slate-50 border-l-4 border-slate-300 p-6 rounded-r-lg border-opacity-50">
                  <h5 className="font-semibold text-gray-900 mb-3">3. Private Capital Flight</h5>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    Wealthy individuals, corporations, and diaspora keep capital offshore. Without viable domestic investment opportunities—deep equity markets, corporate bonds, real estate vehicles, or project finance—capital flows to foreign banks and markets. The diaspora alone sends $95 billion annually to Africa, but much of it stays in foreign bank accounts rather than being intermediated into productive domestic investment.
                  </p>
                </div>
              </div>
            </div>

            {/* The Paradox - Combined Box */}
            <div className="bg-slate-50 border-l-4 border-slate-300 p-6 rounded-r-lg mb-6 border-opacity-50">
              <p className="text-base text-gray-800 leading-relaxed mb-4">
                <strong>The paradox:</strong>
              </p>
              <ul className="text-sm text-gray-800 leading-relaxed space-y-2 mb-4 list-disc list-inside">
                <li>Pension funds invest billions abroad while African infrastructure faces a <strong>$130-170B financing gap</strong>¹</li>
                <li>Governments hold billions in foreign reserves while domestic development starves</li>
                <li>Private capital sits offshore while local businesses can't access credit</li>
                <li>All of this capital exists—it's African capital, owned by Africans—but shallow markets can't capture it</li>
              </ul>
              <p className="text-sm text-gray-800 leading-relaxed mb-3">
                <strong>The cost:</strong> Returns flow to foreign economies (lost wealth accumulation). Infrastructure remains underfunded (pension members suffer from poor roads, unreliable power). Missed opportunity for job creation and growth (capital employed abroad, not at home).
              </p>
              <p className="text-sm text-gray-800 leading-relaxed">
                <strong>The opportunity:</strong> If pension funds allocated 15-20% to domestic infrastructure, governments mobilized 10% of reserves for development finance, and markets captured even 30% of private capital flight, Africa would mobilize hundreds of billions—closing a massive portion of the financing gap without external borrowing.
              </p>
            </div>

            {/* Transition to Banking Intermediation */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">Why Can't Markets Capture This Capital?</h4>
              <p className="text-base text-slate-700 leading-relaxed">
                The domestic capital drain stems from banking systems that can't intermediate savings at scale. Credit penetration averages just 35% of GDP (vs. 80-120% benchmark)—meaning banks absorb only a fraction of domestic savings. The rest sits idle in deposits or leaks abroad.
              </p>
            </div>

            {/* Graph 2A: Banking Sector Development */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">Graph 2A: Banking Sector Development Index</h4>
              <StreamlitGraphDirectEmbed
                indicator="4.3.2.1"
                height={500}
              />
              <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-lg mb-6 border-opacity-50">
                <p className="text-sm text-gray-800">
                  <strong>Key Insight:</strong> Banking development isn't progressing. Most countries remain in the moderate zone indefinitely, unable to break through to deep intermediation. This perpetuates the capital drain—banks can't absorb and deploy savings, so capital seeks foreign alternatives.
                </p>
              </div>
            </div>

            {/* Graph 2B: Private Sector Credit */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">Graph 2B: Private Sector Credit to GDP</h4>
              <StreamlitGraphDirectEmbed
                indicator="4.3.2.2"
                height={500}
              />
              <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-lg mb-6 border-opacity-50">
                <p className="text-sm text-gray-800">
                  <strong>Key Insight:</strong> The credit gap is enormous. If African banking systems reached even 60% of GDP (still below global benchmarks), they would mobilize an additional <strong>billions</strong> in financing—all from domestic savings that currently leak abroad or sit idle.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: The Portfolio Flow Drain */}
            <div className="mb-6">
            <h3 className="text-xl font-bold text-[#003366] mb-4">Channel 2: The Portfolio Flow Drain</h3>
            <h4 className="text-base font-semibold text-[#003366] mb-3">Borrowing Back Leaked Capital at Premium Rates</h4>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              The ultimate paradox of capital drain: African countries <strong>borrow externally</strong> (issuing bonds in foreign markets) to finance deficits and development—often attracting the <strong>same capital that leaked out</strong>.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h4 className="font-bold text-gray-900 mb-3">The Perverse Cycle:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Domestic savings leak abroad (shallow markets can't capture)</li>
                <li>Countries need financing (infrastructure, deficits)</li>
                <li>Issue bonds in foreign markets (Eurobonds, dollar bonds)</li>
                <li>Foreign investors buy bonds (including African pension funds with offshore allocations!)</li>
                <li>Countries pay premium rates + currency risk</li>
                <li>Returns flow out as debt service</li>
                <li>Cycle repeats</li>
              </ol>
            </div>

            {/* Graph 1C: Portfolio Investment Volatility */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">Graph 1C: The Volatility of External Dependency</h4>
              <StreamlitGraphDirectEmbed
                indicator="4.3.1.2"
                height={500}
              />
              <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-lg mb-6 border-opacity-50">
                <p className="text-sm text-gray-800 mb-3">
                  <strong>Key Insight:</strong> The graph reveals that external financing is not stable or reliable—it's a fair-weather friend that disappears precisely when countries need it most. Shallow domestic markets force this dependency.
                </p>
                <div className="mt-3 text-xs text-gray-700 space-y-2 mb-3">
                  <p><strong>Wide Dispersion:</strong> Portfolio flows vary dramatically across countries and time. Some countries experience massive inflows (Gabon's spike), while others remain marginal. The regional average shows consistent volatility, with no country immune to sudden stops.</p>
                  <p><strong>Temporal Patterns:</strong> The pattern is clear—boom (capital floods in during good times), bust (capital flees during crises), emergency borrowing (countries pay premium rates for liquidity), repeat. This is not sustainable financing—it's a vulnerability created by shallow domestic markets.</p>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded">
                    <div className="text-sm font-bold text-gray-700 mb-1">2008 Financial Crisis</div>
                    <p className="text-xs text-gray-600">Sudden Stop → Capital Flees</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-sm font-bold text-gray-700 mb-1">2014-2016 Commodity Shock</div>
                    <p className="text-xs text-gray-600">Flow drops 80% in crisis periods</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-sm font-bold text-gray-700 mb-1">COVID-19 (2020)</div>
                    <p className="text-xs text-gray-600">Sudden stop forces fiscal adjustments</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border-l-4 border-slate-300 p-6 rounded-r-lg mb-6 border-opacity-50">
              <p className="text-base text-gray-800 leading-relaxed">
                <strong>The cost:</strong> Premium pricing (paying higher rates than necessary), currency risk (debt service costs spike during currency depreciation), volatility (portfolio flows collapse during crises), lost sovereignty (external bondholders and rating agencies influence policy). Countries effectively <strong>borrow back their own capital at premium rates</strong>—paying for the privilege of accessing savings that should have stayed domestic.
              </p>
            </div>
          </div>

          {/* Pull Quote */}
          <div className="my-12">
            <PullQuote
              quote="Africa doesn't have a savings problem—it has a capture problem. Capital exists—in pension funds, government reserves, private accounts—but shallow markets let it leak abroad. Then countries borrow the same money back at premium rates. The drain is structural, not inevitable. Deepening markets would keep capital home."
              color="purple"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CrisisSection43
