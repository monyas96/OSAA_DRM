import React from 'react'
import SectionHeader from './SectionHeader'
import ThePrize43 from './ThePrize43'
import ImpactProjections43 from './ImpactProjections43'

const MetricsSection43 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Metrics & Success: Measuring Progress"
          subtitle="Key Performance Indicators and Impact Projections"
          color="blue"
        />
        <div className="prose max-w-none">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Key Performance Indicators</h3>
          
          {/* KPIs Table */}
          <div className="mb-12 overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold text-[#003366]">Indicator</th>
                  <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-[#003366]">Baseline (2023)</th>
                  <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-[#003366]">Target (2030)</th>
                  <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-[#003366]">Target (2035)</th>
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold text-[#003366]">Impact</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Market Cap / GDP</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">20%</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">40%</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">60%</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">+billions capacity</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Private Credit / GDP</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">35%</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">55%</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">80%</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">+billions credit</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Pension → Infrastructure</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">&lt;5%</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">15%</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">20%</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">+billions mobilized</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Listed Companies</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">~X</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">2X</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">3X</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Broader market</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Bond Market Size</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">&lt;5% GDP</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">15% GDP</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">25% GDP</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Domestic financing</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Capital Drain</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">$X billion/year</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">$Y billion/year</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">$Z billion/year</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">-60-70% leakage</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Banking Development Index</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">0.48</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">0.60</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-center text-gray-700">0.75</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Effective intermediation</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Data Requirements */}
          <div className="bg-slate-50 p-6 rounded-lg mb-8">
            <h4 className="font-bold text-gray-900 mb-4">Data Sources:</h4>
            <ul className="space-y-2 mb-6 text-sm text-gray-700">
              <li>• Market data: Stock exchanges, securities regulators, World Bank</li>
              <li>• Banking data: Central banks, IMF Financial Access Survey</li>
              <li>• Pension data: National pension regulators, OECD</li>
              <li>• Capital flows: Balance of payments, IIF, GFI</li>
            </ul>

            <h4 className="font-bold text-gray-900 mb-4">Reporting Framework:</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <strong>Annual:</strong> African Union Capital Market Development Report
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• Country-level performance on all indicators</li>
                  <li>• Regional aggregates and trends</li>
                  <li>• Best practice case studies</li>
                </ul>
              </li>
              <li>
                <strong>Quarterly:</strong> National capital market dashboards
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• Market depth tracking vs. targets</li>
                  <li>• Credit penetration trends</li>
                  <li>• Institutional investor allocation patterns</li>
                </ul>
              </li>
              <li>
                <strong>Real-time:</strong> Capital markets data platform
                <ul className="ml-6 mt-2 space-y-1">
                  <li>• Live market capitalization ratios</li>
                  <li>• Credit growth rates</li>
                  <li>• Portfolio flow tracking</li>
                </ul>
              </li>
            </ul>
          </div>

          <ThePrize43 />

          <ImpactProjections43 />
        </div>
      </div>
    </section>
  )
}

export default MetricsSection43

