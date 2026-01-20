import React from 'react'
import SectionHeader from './SectionHeader'
import TimelinePhase from './TimelinePhase'

const ImplementationSection42 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="How to Make It Happen: Implementation Roadmap"
          subtitle="Success depends on aligning incentives, building capacity systematically, and maintaining political commitment through election cycles and economic shocks."
          color="blue"
        />
      <div className="prose max-w-none">
        {/* Stakeholder Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <th className="border border-gray-300 px-4 py-3 text-left font-bold">ACTOR</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-bold">KEY RESPONSIBILITIES</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-semibold">National Governments</td>
                <td className="border border-gray-300 px-4 py-3">
                  • Grant revenue authority legal and operational autonomy<br/>
                  • Commit adequate funding (2-3% of revenue for operations)<br/>
                  • Enforce tax compliance without political interference<br/>
                  • Publish revenue data and tax expenditure reports<br/>
                  • Invest in digital infrastructure and staff capacity
                </td>
              </tr>
              <tr className="hover:bg-gray-50 bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-semibold">Regional Bodies<br/>(AU, AfDB, ECA, ATAF)</td>
                <td className="border border-gray-300 px-4 py-3">
                  • Coordinate regional DRM strategies and peer learning<br/>
                  • Facilitate tax information exchange agreements<br/>
                  • Provide technical assistance and capacity building<br/>
                  • Monitor progress on regional DRM targets<br/>
                  • Advocate for fair international tax rules
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-semibold">Development Partners<br/>(World Bank, IMF, OECD)</td>
                <td className="border border-gray-300 px-4 py-3">
                  • Align financing with DRM priorities<br/>
                  • Provide technical and financial support for tax modernization<br/>
                  • Support regional cooperation on information exchange<br/>
                  • Condition support on governance/transparency improvements<br/>
                  • Promote beneficial ownership transparency globally
                </td>
              </tr>
              <tr className="hover:bg-gray-50 bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-semibold">Civil Society</td>
                <td className="border border-gray-300 px-4 py-3">
                  • Monitor revenue collection and tax expenditure<br/>
                  • Advocate for progressive, equitable tax systems<br/>
                  • Conduct research exposing evasion and avoidance<br/>
                  • Demand transparency and accountability<br/>
                  • Engage citizens on tax-service delivery linkages
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-semibold">Private Sector</td>
                <td className="border border-gray-300 px-4 py-3">
                  • Comply voluntarily and support compliance culture<br/>
                  • Invest in tax compliance systems and training<br/>
                  • Engage constructively on tax policy design<br/>
                  • Report beneficial ownership transparently<br/>
                  • Support efforts to broaden base and reduce informality
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Timeline Phases */}
        <h3 className="text-xl font-bold text-gray-900 mb-6">Timeline: Phased Approach</h3>

        <TimelinePhase
          title="IMMEDIATE (0-24 months): Stop the Bleeding"
          color="red"
          items={[
            'Grant revenue authority operational autonomy and funding',
            'Implement digital tax filing and payment systems',
            'Launch high-profile enforcement actions against major evaders',
            'Publish first comprehensive tax expenditure report',
            'Establish presidential DRM task force with clear targets'
          ]}
        />

        <TimelinePhase
          title="MEDIUM-TERM (2-5 years): Build Institutional Capacity"
          color="orange"
          items={[
            'Comprehensive revenue authority reform (HR, IT, processes)',
            'Full VAT implementation with minimal exemptions',
            'Property tax roll-out in major urban centers',
            'Digital services taxation framework',
            'Regional tax information exchange operational',
            'Measurable improvement in tax effort (0.72 → 0.80)'
          ]}
        />

        <TimelinePhase
          title="LONG-TERM (5-10 years): Achieve Elastic, Resilient Revenue Systems"
          color="teal"
          items={[
            'Tax buoyancy reaches 1.0 (revenue grows with GDP)',
            'Broad-based tax system less reliant on volatile sources',
            'Strong citizen-state fiscal contract (high compliance, visible services)',
            'Regional coordination prevents harmful tax competition',
            'Tax effort reaches 0.90+ (approaching full capacity)',
            'Target achieved: $120-145B leakage reduced by 60-70%'
          ]}
        />
      </div>
      </div>
    </section>
  )
}

export default ImplementationSection42

