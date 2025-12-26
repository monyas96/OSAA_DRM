import React from 'react'
import SectionHeader from './SectionHeader'
import MetricsTable from './MetricsTable'
import ThePrize from './ThePrize'
import ImpactProjections from './ImpactProjections'

const MetricsSection42 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Measuring Success: Key Performance Indicators"
          subtitle="DRM reform success must be measured by the health of tax systems—their efficiency, equity, buoyancy, and citizen support."
          color="teal"
        />
      <div className="prose max-w-none">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Targets (2024-2030)</h3>
        
        <MetricsTable />

        <h3 className="text-xl font-bold text-gray-900 mb-6 mt-12">Data Requirements & Reporting</h3>
        
        <div className="bg-slate-50 p-6 rounded-lg mb-8">
          <h4 className="font-bold text-gray-900 mb-4">Data sources:</h4>
          <ul className="space-y-2 mb-6">
            <li className="text-gray-700">• Tax revenue data: National revenue authorities, IMF GFS (annual)</li>
            <li className="text-gray-700">• GDP and trade data: National statistics offices, World Bank (annual)</li>
            <li className="text-gray-700">• Tax capacity estimates: Updated regression models (biennial)</li>
            <li className="text-gray-700">• Institutional assessments: PEFA, TADAT, ATAF benchmarking (periodic)</li>
          </ul>

          <h4 className="font-bold text-gray-900 mb-4">Reporting framework:</h4>
          <ul className="space-y-3">
            <li className="text-gray-700">
              <strong>Annual:</strong> African Union DRM Progress Report
              <ul className="ml-6 mt-2 space-y-1">
                <li className="text-sm">• Country-level performance on key indicators</li>
                <li className="text-sm">• Regional aggregates and trends</li>
                <li className="text-sm">• Best practice case studies</li>
              </ul>
            </li>
            <li className="text-gray-700">
              <strong>Quarterly:</strong> National revenue authority dashboards
              <ul className="ml-6 mt-2 space-y-1">
                <li className="text-sm">• Tax effort tracking vs. targets</li>
                <li className="text-sm">• Revenue composition and trends</li>
                <li className="text-sm">• Compliance and enforcement metrics</li>
              </ul>
            </li>
            <li className="text-gray-700">
              <strong>Real-time:</strong> DRM data platform (hosted by AfDB/ATAF)
              <ul className="ml-6 mt-2 space-y-1">
                <li className="text-sm">• Live tax/GDP ratios and growth rates</li>
                <li className="text-sm">• Country comparisons and peer rankings</li>
              </ul>
            </li>
          </ul>
        </div>

        <ThePrize />

        <ImpactProjections />
      </div>
      </div>
    </section>
  )
}

export default MetricsSection42

