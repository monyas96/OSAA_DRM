import React from 'react'
import SectionHeader from './SectionHeader'
import StrategicPriority from './StrategicPriority'
import ThePrize from './ThePrize'

const SolutionsSection42 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="What Needs to Happen: A Three-Pillar Strategy to Stop the Leak"
          subtitle="Closing the $120-145 billion tax leakage requires coordinated action across three fronts: strengthening collection efficiency, building elastic revenue systems, and addressing political economy barriers."
          color="teal"
        />
      <div className="prose max-w-none">
        <p className="text-base text-slate-700 leading-relaxed mb-8">
          These reforms are not optional add-ons—they are the foundation of fiscal sovereignty and sustainable development financing.
        </p>

        {/* Strategic Priority 1 */}
        <StrategicPriority
          number="1"
          title="Plug the Collection Leak"
          target="Increase tax effort from 0.72 to 0.90 by 2030 (+$60-80B annually)"
          color="blue"
        >
          <p className="mb-4">
            <strong>What needs to change:</strong> African revenue authorities must transition from weak, under-resourced agencies to autonomous, well-staffed, technology-enabled institutions with the power to enforce tax compliance across all economic actors.
          </p>
        </StrategicPriority>

        <div className="ml-20 mb-8">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-4">Action items:</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <div>
                  <strong className="text-gray-900">Strengthen revenue authority autonomy and capacity</strong>
                  <ul className="mt-2 ml-4 space-y-2">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      <span>Legal independence from political interference</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      <span>Adequate funding (2-3% of revenue collection as operational budget)</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      <span>Modern technology platforms (integrated systems, digital filing)</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      <span>Professional recruitment and competitive salaries</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <div>
                  <strong className="text-gray-900">Expand enforcement capacity</strong>
                  <ul className="mt-2 ml-4 space-y-2">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      <span>Risk-based audit systems targeting high-value evaders</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      <span>Meaningful penalties that deter evasion</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      <span>Cross-border information exchange to combat profit shifting</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      <span>Public disclosure of large taxpayer compliance</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                <div>
                  <strong className="text-gray-900">Combat corruption and elite capture</strong>
                  <ul className="mt-2 ml-4 space-y-2">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      <span>Transparent tax incentive policies with cost-benefit analysis</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      <span>Independent oversight of revenue authorities</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-400">-</span>
                      <span>Beneficial ownership registries to identify ultimate taxpayers</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <p className="ml-20 mb-8 text-base text-slate-700">
          <strong>Expected outcome:</strong> Tax effort improves to 0.90 over five years, capturing an additional <strong>$60-80 billion annually</strong> without raising tax rates.
        </p>

        {/* Strategic Priority 2 */}
        <StrategicPriority
          number="2"
          title="Fix the Elasticity Leak"
          target="Increase tax buoyancy from 0.71 to 1.0 by 2035 (+$40-60B annually)"
          color="orange"
        >
          <p className="mb-4">
            <strong>What needs to change:</strong> Tax systems must evolve from narrow bases in declining sectors to broad bases that automatically capture growth in expanding sectors.
          </p>
        </StrategicPriority>

        <div className="ml-20 mb-8">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-4">Action items:</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 mt-1">•</span>
                <div>
                  <strong className="text-gray-900">Broaden the tax base</strong>
                  <ul className="mt-2 ml-4 space-y-2">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-orange-400">-</span>
                      <span>Full VAT implementation with minimal exemptions</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-orange-400">-</span>
                      <span>Digital services taxation (streaming, e-commerce, platforms)</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-orange-400">-</span>
                      <span>Property taxation (especially urban real estate)</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-orange-400">-</span>
                      <span>Progressive formalization strategies for small businesses</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 mt-1">•</span>
                <div>
                  <strong className="text-gray-900">Reduce reliance on volatile sources</strong>
                  <ul className="mt-2 ml-4 space-y-2">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-orange-400">-</span>
                      <span>Shift from trade taxes to consumption taxes (VAT)</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-orange-400">-</span>
                      <span>Diversify income tax beyond resource/formal sectors</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-orange-400">-</span>
                      <span>Automatic indexation (thresholds adjust with inflation/GDP)</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 mt-1">•</span>
                <div>
                  <strong className="text-gray-900">Capture natural resource revenues effectively</strong>
                  <ul className="mt-2 ml-4 space-y-2">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-orange-400">-</span>
                      <span>Revenue laws linking taxation to production/prices</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-orange-400">-</span>
                      <span>Renegotiate extractive contracts for fair government share</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-orange-400">-</span>
                      <span>Transparent resource revenue management</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <p className="ml-20 mb-8 text-base text-slate-700">
          <strong>Expected outcome:</strong> Tax buoyancy increases to 1.0 over 10-15 years. Revenue grows in line with GDP, ending the "growth without revenue" paradox. Impact: <strong>$40-60 billion annually</strong> by 2035.
        </p>

        {/* Strategic Priority 3 */}
        <StrategicPriority
          number="3"
          title="Address the Political Economy"
          target="Build political commitment and citizen support for DRM"
          color="teal"
        >
          <p className="mb-4">
            <strong>What needs to change:</strong> DRM reform requires moving from elite-captured, low-compliance equilibrium to broad-based, high-compliance social contract.
          </p>
        </StrategicPriority>

        <div className="ml-20 mb-8">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-4">Action items:</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-teal-600 mt-1">•</span>
                <div>
                  <strong className="text-gray-900">Build political commitment</strong>
                  <ul className="mt-2 ml-4 space-y-2">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-teal-400">-</span>
                      <span>Presidential/cabinet-level DRM task forces</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-teal-400">-</span>
                      <span>Public commitments to revenue targets and transparency</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-teal-400">-</span>
                      <span>Regional peer review mechanisms (ATAF)</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 mt-1">•</span>
                <div>
                  <strong className="text-gray-900">Strengthen citizen engagement</strong>
                  <ul className="mt-2 ml-4 space-y-2">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-teal-400">-</span>
                      <span>Participatory budgeting linking taxes to services</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-teal-400">-</span>
                      <span>Taxpayer charters outlining rights and obligations</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-teal-400">-</span>
                      <span>Citizens' budget tracking and oversight</span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 mt-1">•</span>
                <div>
                  <strong className="text-gray-900">Regional and international cooperation</strong>
                  <ul className="mt-2 ml-4 space-y-2">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-teal-400">-</span>
                      <span>African Union DRM strategy coordination</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-teal-400">-</span>
                      <span>Information exchange agreements</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-teal-400">-</span>
                      <span>Technical assistance and capacity building</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-teal-400">-</span>
                      <span>Coordinated positions on international tax negotiations</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <p className="ml-20 mb-8 text-base text-slate-700">
          <strong>Expected outcome:</strong> Political commitment translates to sustained institutional investment. Citizens see service improvements linked to tax contributions, creating virtuous cycle.
        </p>

        {/* The Prize Section */}
        <div className="mt-12">
          <ThePrize />
        </div>
      </div>
      </div>
    </section>
  )
}

export default SolutionsSection42

