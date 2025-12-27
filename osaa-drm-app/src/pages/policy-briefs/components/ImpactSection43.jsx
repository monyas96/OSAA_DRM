import React from 'react'
import SectionHeader from './SectionHeader'
import StreamlitGraphDirectEmbed from '../../../components/StreamlitGraphDirectEmbed'

const ImpactSection43 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Impact: The Cost of Shallow Markets"
          subtitle="Dependence on volatile flows creates vulnerability and perpetuates underdevelopment"
          color="red"
        />
        <div className="prose max-w-none">
          <p className="text-base text-slate-700 leading-relaxed mb-8">
            When global crises hit, portfolio flows collapse—forcing countries into sudden fiscal adjustments and expensive external borrowing. Dependence on volatile flows creates vulnerability. Shallow markets mean capital can't be mobilized domestically, perpetuating underdevelopment and forcing reliance on external financing.
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
            <h4 className="font-bold text-gray-900 mb-3">The cost:</h4>
            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Premium pricing (paying higher rates than necessary)</li>
              <li>Currency risk (debt service costs spike during depreciation)</li>
              <li>Volatility (portfolio flows collapse during crises)</li>
              <li>Lost sovereignty (external bondholders and rating agencies influence policy)</li>
              <li>Countries effectively borrow back their own capital at premium rates</li>
            </ul>
            <p className="text-sm text-gray-800 mt-4">
              Each crisis (2008, 2014-16, 2020) follows the same pattern: boom → sudden stop → emergency borrowing → premium rates → repeat. This is not sustainable financing—it's a vulnerability created by shallow domestic markets.
            </p>
          </div>

          {/* Graph 5: Portfolio Flow Volatility */}
          <div className="mb-12">
            <StreamlitGraphDirectEmbed
              indicator="4.3.1.2"
              height={500}
            />
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
              <p className="text-sm text-gray-800">
                <strong>Key Message:</strong> When global crises hit, portfolio flows collapse—forcing countries into sudden fiscal adjustments and expensive external borrowing. Dependence on volatile flows creates vulnerability.
              </p>
            </div>
          </div>

          {/* Crisis Periods Box */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Crisis Periods Highlighted</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded">
                <div className="text-sm font-bold text-gray-700 mb-1">2008 Financial Crisis</div>
                <p className="text-xs text-gray-600">Flows drop 80% - Sudden Stop</p>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="text-sm font-bold text-gray-700 mb-1">2014-2016 Commodity Shock</div>
                <p className="text-xs text-gray-600">Capital flees - External borrowing</p>
              </div>
              <div className="bg-white p-3 rounded">
                <div className="text-sm font-bold text-gray-700 mb-1">COVID-19 (2020)</div>
                <p className="text-xs text-gray-600">Sudden stop forces fiscal adjustments</p>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 p-6 rounded-xl mt-8">
            <h3 className="text-lg font-bold text-red-900 mb-3">The Cost of Shallow Markets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Vulnerability</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Sudden stops during global crises</li>
                  <li>• Forced fiscal adjustments</li>
                  <li>• Expensive external borrowing</li>
                  <li>• Limited countercyclical capacity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Underdevelopment</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• $130-170 billion infrastructure gap</li>
                  <li>• Capital escapes instead of investing</li>
                  <li>• Perpetual reliance on external finance</li>
                  <li>• Reduced economic sovereignty</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImpactSection43

