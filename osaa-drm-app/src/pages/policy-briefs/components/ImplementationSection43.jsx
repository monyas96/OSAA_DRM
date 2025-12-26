import React from 'react'
import SectionHeader from './SectionHeader'

const ImplementationSection43 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Implementation: How to Make It Happen"
          subtitle="Implementation Roadmap"
          color="teal"
        />
        <div className="prose max-w-none">
          <p className="text-base text-slate-700 leading-relaxed mb-8">
            Success requires coordination across regulators, market operators, institutional investors, and governments.
          </p>

          {/* Stakeholder Responsibilities */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-[#003366] mb-6">Stakeholder Responsibilities</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold text-[#003366]">Actor</th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold text-[#003366]">Key Responsibilities</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Securities Regulators</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      • Streamline listing requirements for corporate issuance<br/>
                      • Develop bond market regulations and infrastructure<br/>
                      • Strengthen investor protection frameworks<br/>
                      • Enable market innovation (REITs, infrastructure funds)<br/>
                      • Regional harmonization of regulations
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Pension Regulators</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      • Reform asset allocation limits (allow 15-20% alternatives)<br/>
                      • Adopt prudent person principles<br/>
                      • Establish clear infrastructure investment guidelines<br/>
                      • Build trustee capacity on alternative investments<br/>
                      • Monitor fund performance and governance
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Central Banks</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      • Develop government bond yield curves<br/>
                      • Support repo markets and liquidity facilities<br/>
                      • Regulate bank lending prudentially (not restrictively)<br/>
                      • Enable credit bureau and collateral registry infrastructure<br/>
                      • Manage reserves efficiently
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Governments</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      • Regular government bond issuance (benchmark curves)<br/>
                      • Enable municipal bonds for infrastructure<br/>
                      • Establish project preparation facilities<br/>
                      • Provide partial guarantees for infrastructure projects<br/>
                      • Transparent PPP frameworks
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Stock Exchanges</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      • Invest in modern trading and settlement systems<br/>
                      • Create junior boards for SME listings<br/>
                      • Develop corporate bond trading platforms<br/>
                      • Provide listing support and advisory services<br/>
                      • Cross-border integration (regional listings)
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Pension Funds</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      • Develop infrastructure investment expertise<br/>
                      • Participate in infrastructure funds and PPPs<br/>
                      • Engage in project governance and monitoring<br/>
                      • Report transparently on alternative investments<br/>
                      • Collaborate regionally (co-investment)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900">Development Partners</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                      • Provide technical assistance for market development<br/>
                      • Support credit infrastructure (bureaus, registries)<br/>
                      • Offer partial guarantees for infrastructure bonds<br/>
                      • Finance project preparation facilities<br/>
                      • Regional integration programs
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-[#003366] mb-6">Timeline: Phased Approach</h3>
            
            <div className="space-y-6">
              {/* Immediate */}
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h4 className="text-lg font-bold text-red-900 mb-3">IMMEDIATE (0-24 months): Stop the Hemorrhage</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Reform pension regulations (allow infrastructure allocation)</li>
                  <li>• Establish first infrastructure funds and REITs</li>
                  <li>• Strengthen credit bureau coverage</li>
                  <li>• Launch corporate bond market development programs</li>
                  <li>• Begin regional market integration discussions</li>
                </ul>
              </div>

              {/* Medium-term */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <h4 className="text-lg font-bold text-yellow-900 mb-3">MEDIUM-TERM (2-5 years): Build Absorption Capacity</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Double number of listed companies (SME exchanges)</li>
                  <li>• Develop functioning corporate bond markets</li>
                  <li>• Increase banking credit penetration (35% → 50% GDP)</li>
                  <li>• Mobilize first billions pension capital for infrastructure</li>
                  <li>• Regional cross-listing and harmonized regulations operational</li>
                </ul>
              </div>

              {/* Long-term */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h4 className="text-lg font-bold text-green-900 mb-3">LONG-TERM (5-10 years): Achieve Deep, Integrated Markets</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Market capitalization reaches 60% of GDP</li>
                  <li>• Private sector credit reaches 80% of GDP</li>
                  <li>• Pension funds allocate 15-20% to infrastructure</li>
                  <li>• Regional markets integrated (pan-African exchange linkages)</li>
                  <li>• <strong>Target achieved: Capital drain reduced by 60-70%</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImplementationSection43

