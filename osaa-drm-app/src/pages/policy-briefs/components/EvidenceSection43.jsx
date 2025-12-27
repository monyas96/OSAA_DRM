import React from 'react'
import SectionHeader from './SectionHeader'
import StreamlitGraphDirectEmbed from '../../../components/StreamlitGraphDirectEmbed''

const EvidenceSection43 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Evidence: The Pension Fund Opportunity"
          subtitle="Capital exists domestically—pension funds show massive untapped potential"
          color="blue"
        />
        <div className="prose max-w-none">
          <p className="text-base text-slate-700 leading-relaxed mb-8">
            Pension funds represent a massive untapped opportunity. Across major African countries, pension funds hold significant assets but allocate conservatively—70-80% to bonds and listed equities, less than 5% to infrastructure. Yet Africa faces a $100 billion annual infrastructure gap. The capital exists domestically, but allocation is mismatched with development needs.
          </p>

          {/* Graph 4: Pension Fund Asset Allocation */}
          <div className="mb-12">
            <StreamlitGraphDirectEmbed
              indicator="4.3.3.1"
              height={500}
            />
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg mb-6">
              <p className="text-sm text-gray-800 mb-3">
                <strong>Key Message:</strong> Pension funds allocate 70-80% to bonds and listed equities, &lt;5% to infrastructure. Yet Africa faces a $100B annual infrastructure gap. Capital exists but allocation is mismatched.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4 text-xs">
                <div className="bg-orange-100 p-2 rounded">Domestic Equities</div>
                <div className="bg-blue-100 p-2 rounded">Domestic Bonds (50-70%)</div>
                <div className="bg-teal-100 p-2 rounded">Private Equity / Real Estate</div>
                <div className="bg-green-100 p-2 rounded">Cash & Deposits</div>
                <div className="bg-yellow-100 p-2 rounded">Foreign Assets</div>
              </div>
            </div>
          </div>

          {/* Opportunity Box */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 p-6 rounded-xl mt-8">
            <h3 className="text-lg font-bold text-blue-900 mb-3">The Pension Fund Opportunity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Current Allocation</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Bonds: 50-70% (dominant)</li>
                  <li>• Listed Equities: 10-20%</li>
                  <li>• Infrastructure: &lt;5%</li>
                  <li>• Foreign Assets: 5-15%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">The Opportunity</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Reallocate 10-15% to infrastructure</li>
                  <li>• Create infrastructure investment vehicles</li>
                  <li>• Reduce foreign asset allocation</li>
                  <li>• Channel domestic savings to domestic needs</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-800">
                <strong>Impact:</strong> If pension funds reallocated just 10% of assets to infrastructure, it would mobilize $10-20 billion annually—directly addressing the infrastructure financing gap while keeping capital domestically invested.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EvidenceSection43

