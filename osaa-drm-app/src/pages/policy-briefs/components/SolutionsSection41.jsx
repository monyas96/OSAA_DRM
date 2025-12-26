import React from 'react'
import SectionHeader from './SectionHeader'
import StrategicPriority from './StrategicPriority'
import TimelinePhase from './TimelinePhase'

const SolutionsSection41 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="What Needs to Happen: A Three-Pillar Strategy"
          subtitle="Improving budget credibility requires coordinated action across transparency, priority protection, and institutional strengthening. These reforms are not optional add-ons—they are the foundation of fiscal credibility and development effectiveness."
          color="teal"
        />
      <div className="prose max-w-none">
        {/* Strategic Priority 1 */}
        <StrategicPriority
          number="1"
          title="Improve Transparency and Accountability"
          target="Publish execution summaries and disclose reallocations within 0-12 months"
          color="blue"
        >
          <p className="mb-4">
            <strong>What needs to change:</strong> Budget execution must become transparent and accountable. Citizens and stakeholders need timely information about what was planned versus what was actually spent, and why deviations occurred.
          </p>
        </StrategicPriority>

        <div className="ml-20 mb-8">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-4">Action items:</h4>
            <ul className="space-y-2">
              <li className="text-gray-700">• Publish quarterly budget execution reports</li>
              <li className="text-gray-700">• Disclose all reallocations above threshold</li>
              <li className="text-gray-700">• Provide public access to execution data</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700">
                <strong>Rationale:</strong> Transparency constrains discretion and enables accountability
              </p>
            </div>
          </div>
        </div>

        {/* Strategic Priority 2 */}
        <StrategicPriority
          number="2"
          title="Protect Priority Sectors"
          target="Define and safeguard priority sectors within 0-12 months"
          color="orange"
        >
          <p className="mb-4">
            <strong>What needs to change:</strong> Health, education, and other priority sectors must be protected from mid-year cuts. Formal mechanisms are needed to ensure legislative budget approvals translate to actual sectoral spending.
          </p>
        </StrategicPriority>

        <div className="ml-20 mb-8">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-4">Action items:</h4>
            <ul className="space-y-2">
              <li className="text-gray-700">• Legislative designation of protected sectors</li>
              <li className="text-gray-700">• Formal approval required for major shifts</li>
              <li className="text-gray-700">• Ministry-level accountability for sectoral execution</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700">
                <strong>Rationale:</strong> Protects policy intent and ensures composition stability
              </p>
            </div>
          </div>
        </div>

        {/* Strategic Priority 3 */}
        <StrategicPriority
          number="3"
          title="Strengthen PFM Systems and Controls"
          target="Expand IFMIS, introduce commitment controls, and strengthen TSA within 1-3 years"
          color="teal"
        >
          <p className="mb-4">
            <strong>What needs to change:</strong> Public Financial Management (PFM) systems must be modernized to reduce discretionary reallocations and improve execution control. This includes integrated financial management information systems (IFMIS), commitment controls, and treasury single accounts (TSA).
          </p>
        </StrategicPriority>

        <div className="ml-20 mb-8">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-4">Action items:</h4>
            <ul className="space-y-2">
              <li className="text-gray-700">• Expand IFMIS coverage and functionality</li>
              <li className="text-gray-700">• Introduce commitment controls (no spending without budget cover)</li>
              <li className="text-gray-700">• Strengthen Treasury Single Account (TSA)</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700">
                <strong>Rationale:</strong> Stronger systems reduce discretionary reallocations and improve execution control
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Phases */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-12">Implementation Timeline: Phased Approach</h3>

        <TimelinePhase
          title="IMMEDIATE (0-12 months): Stop the Bleeding"
          color="red"
          items={[
            'Improve transparency: Publish execution summaries, disclose reallocations',
            'Protect priorities: Define priority sectors, formal approval for major shifts',
            'Strengthen ex-ante controls: No spending without budget cover'
          ]}
        />

        <TimelinePhase
          title="MEDIUM-TERM (1-3 years): Build Institutional Capacity"
          color="orange"
          items={[
            'PFM System Strengthening: Expand IFMIS, introduce commitment controls, strengthen TSA',
            'Sectoral Budget Safeguards: Formal approval for major shifts, ministry-level accountability',
            'Measurable improvement in execution consistency and composition stability'
          ]}
        />

        <TimelinePhase
          title="LONG-TERM (3-5 years): Achieve Regional Maturity"
          color="teal"
          items={[
            'More predictable budgets with fewer extreme execution deviations',
            'Stable fiscal space enabling credible multi-year planning',
            'Stronger citizen confidence and trust in government',
            'Sustained improvements in execution and composition stability'
          ]}
        />
      </div>
      </div>
    </section>
  )
}

export default SolutionsSection41

