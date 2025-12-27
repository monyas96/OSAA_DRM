import React, { useState } from 'react'
import SectionHeader from './SectionHeader'
import StreamlitGraphDirectEmbed from '../../../components/StreamlitGraphDirectEmbed'
import CollapsibleSection from './CollapsibleSection'

const MethodologyAnnex43 = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <CollapsibleSection
      title="Methodology Annex: Data Patterns"
      subtitle="Distribution analysis confirms the shallow market diagnosis"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      color="gray"
    >
      <div className="prose max-w-none">
        <p className="text-base text-slate-700 leading-relaxed mb-8">
          Distribution analysis reveals the structural nature of shallow markets. The data shows a heavily skewed distribution—75% of countries have market capitalization below 30% of GDP, confirming the "shallow market" diagnosis. This pattern is consistent across indicators and time periods.
        </p>

        {/* Graph 6: Market Cap Distribution */}
        <div className="mb-12">
          <StreamlitGraphDirectEmbed
            indicator="4.3.1.1"
            height={500}
          />
          <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded-r-lg mb-6">
            <p className="text-sm text-gray-800 mb-3">
              <strong>Key Message:</strong> Distribution is heavily skewed. 75% of countries have market cap below 30% of GDP, confirming the "shallow market" diagnosis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="bg-red-100 p-3 rounded">
                <div className="text-sm font-bold text-red-800">Shallow Cluster</div>
                <div className="text-xs text-gray-700">&lt;30%: 35+ countries</div>
              </div>
              <div className="bg-yellow-100 p-3 rounded">
                <div className="text-sm font-bold text-yellow-800">Moderate Cluster</div>
                <div className="text-xs text-gray-700">30-60%: 8-10 countries</div>
              </div>
              <div className="bg-green-100 p-3 rounded">
                <div className="text-sm font-bold text-green-800">Deep Cluster</div>
                <div className="text-xs text-gray-700">&gt;60%: 3-5 countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Data Sources and Methodology</h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <strong>Market Capitalization:</strong> World Bank, World Federation of Exchanges, national stock exchanges
            </div>
            <div>
              <strong>Banking Sector Development:</strong> World Bank Financial Development Index, IMF Financial Development Index
            </div>
            <div>
              <strong>Private Sector Credit:</strong> World Bank World Development Indicators, IMF International Financial Statistics
            </div>
            <div>
              <strong>Portfolio Investment Flows:</strong> IMF Balance of Payments Statistics, national central banks
            </div>
            <div>
              <strong>Pension Fund Data:</strong> OECD Global Pension Statistics, national pension regulators, individual fund reports
            </div>
            <div>
              <strong>Infrastructure Gap:</strong> African Development Bank, African Economic Outlook series
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-300">
            <h4 className="text-base font-bold text-gray-900 mb-3">Footnotes & Citations</h4>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong>1. Infrastructure Financing Gap:</strong><br />
                The African Development Bank estimates that Africa requires <strong>USD $130-170 billion annually</strong> for infrastructure development, leaving a financing gap of <strong>$68-108 billion</strong> after current investments.
                <br /><br />
                <strong>Source:</strong> African Development Bank (AfDB), 2018. <em>African Economic Outlook 2018: Macroeconomic Developments and Structural Change: Infrastructure and its Financing</em>. Abidjan: African Development Bank.
                <br /><br />
                <strong>Also cited in:</strong>
                <ul className="ml-4 mt-2 space-y-1 list-disc">
                  <li>African Development Bank (AfDB). November 17, 2023. "Public-private partnerships needed to bridge Africa's infrastructure development gap."</li>
                  <li>African Development Bank (AfDB). December 2024. "Time Is Running Out to Close Continent's Massive Infrastructure and Climate-Finance Gap – 2025 Africa Investment Forum Panel Warns."</li>
                  <li>Global Solutions Initiative. "Africa's Infrastructure Finance."</li>
                </ul>
                <br />
                <strong>Note:</strong> The $130-170B represents total infrastructure needs across transport, energy, water, ICT, and logistics. The $68-108B gap represents unmet financing after accounting for current public and private investment (~$75B annually = ~4% of GDP). By comparison, China invests 14% of GDP in infrastructure.
              </div>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}

export default MethodologyAnnex43

