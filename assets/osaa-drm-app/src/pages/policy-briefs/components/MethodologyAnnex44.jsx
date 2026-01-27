import React, { useState } from 'react'
import SectionHeader from './SectionHeader'
import CollapsibleSection from './CollapsibleSection'

const MethodologyAnnex44 = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <CollapsibleSection
      title="Footnotes & Data Sources"
      subtitle="Methodology and data sources for Policy Brief 4.4"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      color="gray"
    >
      <div className="prose max-w-none">
        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Primary Source</h3>
          <div className="space-y-4 text-sm text-gray-700 mb-6">
            <div>
              <strong>UNCTAD (2020).</strong> <em>Economic Development in Africa Report: Tackling Illicit Financial Flows for Sustainable Development in Africa.</em>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-4">Key Statistics</h3>
          <div className="space-y-3 text-sm text-gray-700 mb-6">
            <div>
              <strong>Annual IFF volume:</strong> $88.6 billion (p. 3, 24)
            </div>
            <div>
              <strong>Trade-based IFFs:</strong> approximately 65% of total (p. 40)
            </div>
            <div>
              <strong>Extractive sector:</strong> $40B under-invoicing, 77% gold (p. 44)
            </div>
            <div>
              <strong>Regional variation:</strong> West Africa 10.3%, Africa 3.7%, North Africa 2.7% of GDP (p. 28)
            </div>
            <div>
              <strong>Country breakdown:</strong> Nigeria $41B, Egypt $17.5B, South Africa $14.1B (p. 28-29)
            </div>
            <div>
              <strong>Cumulative 2000-2015:</strong> $836 billion (p. 25, 52)
            </div>
            <div>
              <strong>Comparison:</strong> IFFs exceed aid ($48B) plus FDI ($54B) (p. 3)
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Sources</h3>
          <div className="space-y-3 text-sm text-gray-700 mb-6">
            <div>
              <strong>World Bank Worldwide Governance Indicators (WGI)</strong> - Control of Corruption, Rule of Law
            </div>
            <div>
              <strong>Tax Justice Network Financial Secrecy Index</strong> - Financial transparency assessments
            </div>
            <div>
              <strong>ISORA (International Survey on Revenue Administration)</strong> - Tax administration data
            </div>
            <div>
              <strong>World Justice Project Rule of Law Index</strong> - Rule of law assessments
            </div>
            <div>
              <strong>UNODC data on criminal activities</strong> - Drug trafficking, smuggling, wildlife trafficking
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-4">Data Sources</h3>
          <div className="space-y-3 text-sm text-gray-700 mb-6">
            <div>
              <strong>IFF Volume:</strong> UNCTAD estimates using trade gap analysis, balance of payments, gravity models
            </div>
            <div>
              <strong>Governance Indicators:</strong> World Bank WGI, World Justice Project
            </div>
            <div>
              <strong>Financial Secrecy:</strong> Tax Justice Network Financial Secrecy Index
            </div>
            <div>
              <strong>Tax Administration:</strong> ISORA database
            </div>
            <div>
              <strong>Trade Data:</strong> UN Comtrade, national customs data
            </div>
            <div>
              <strong>Criminal Activities:</strong> UNODC, national law enforcement data
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-300">
            <h4 className="text-base font-bold text-gray-900 mb-3">Platform</h4>
            <p className="text-sm text-gray-700">
              United Nations Office of the Special Adviser on Africa (UN OSAA) - Evidence for Policy Making in Practice: Development Resource Mobilization
            </p>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}

export default MethodologyAnnex44

