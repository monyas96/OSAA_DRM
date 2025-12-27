import React from 'react'
import SectionHeader from './SectionHeader'
import StreamlitGraphDirectEmbed from '../../../components/StreamlitGraphDirectEmbed'

const EvidenceSection42 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Evidence: Visualizing Africa's Tax Leakage"
          subtitle="Tax performance data reveals systematic patterns of collection inefficiency and structural inelasticity across African countries. The following visualizations show three critical dimensions of the tax leakage crisis:"
          color="orange"
        />
      <div className="prose max-w-none">
        {/* Graph 1: Tax Effort (4.2.2.1) */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[#003366] mb-4">
            Indicator 4.2.2.1 – Tax Collection Efficiency Score
          </h3>
          <p className="text-base text-gray-700 mb-4">
            <strong>Proxy Indicator:</strong> Tax Effort (Actual Tax Revenue / Estimated Tax Capacity)
          </p>
          <p className="text-sm text-gray-600 mb-6">
            This line graph shows tax effort over time for African countries, revealing how efficiently countries collect revenue relative to their estimated capacity. Countries with tax effort below 0.80 indicate significant collection gaps.
          </p>
          <StreamlitGraphDirectEmbed
            indicator="4.2.2.1"
            height={550}
          />
        </div>

        {/* Graph 2: Tax Buoyancy (4.2.2.2.a) */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[#003366] mb-4">
            Indicator 4.2.2.2.a – Tax Buoyancy by Country (2021)
          </h3>
          <p className="text-base text-gray-700 mb-4">
            <strong>What it shows:</strong> Tax buoyancy measures the responsiveness of tax revenue to GDP growth. A buoyancy of 1.0 means revenue grows at the same rate as GDP.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Countries with buoyancy below 1.0 (orange/red bars) have tax systems that fail to capture economic growth, indicating structural inelasticity. Green/teal bars show countries with buoyancy above 1.0, where taxes grow faster than GDP.
          </p>
          <StreamlitGraphEmbed
            indicator="4.2.2.2.a"
            title="Tax Buoyancy by Country"
            subtitle="Tax Revenue Elasticity (2021)"
            viewType="bar"
            filters={{
              years: 'latest'
            }}
            height={600}
          />
        </div>

        {/* Graph 3: Tax Capacity & Gap (4.2.2.2.b) */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[#003366] mb-4">
            Indicator 4.2.2.2.b – Tax Capacity & Gap by Country
          </h3>
          <p className="text-base text-gray-700 mb-4">
            <strong>What it shows:</strong> The tax gap represents the difference between estimated tax capacity and actual tax collection. Positive gaps (right side, orange) indicate under-collection, while negative gaps (left side, blue) indicate over-collection relative to capacity.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            The average tax gap across African countries is approximately 6.13% of GDP, representing significant untapped revenue potential. Countries on the right side of the chart have the largest leakage and greatest potential for improvement.
          </p>
          <StreamlitGraphEmbed
            indicator="4.2.2.2.b"
            title="Tax Capacity & Gap by Country"
            subtitle="Estimated Tax Capacity vs. Actual Collection"
            viewType="bar"
            filters={{
              years: 'latest'
            }}
            height={600}
          />
        </div>
      </div>
      </div>
    </section>
  )
}

export default EvidenceSection42

