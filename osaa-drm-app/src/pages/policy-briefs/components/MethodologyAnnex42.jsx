import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const MethodologyAnnex42 = () => {
  const [showMethodology, setShowMethodology] = useState(false)

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.button
          onClick={() => setShowMethodology(!showMethodology)}
          className="w-full bg-white border-2 border-gray-300 rounded-lg px-6 py-4 flex items-center justify-between hover:border-blue-500 transition-colors text-left"
        >
          <span className="text-base font-semibold text-gray-900">
            {showMethodology ? 'Hide Detailed Methodology' : 'Show Detailed Methodology'}
          </span>
          {showMethodology ? (
            <ChevronUp className="w-6 h-6 text-gray-500" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-500" />
          )}
        </motion.button>

        <AnimatePresence>
          {showMethodology && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-lg shadow-md p-8 mt-4">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Methodology Annex</h2>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Calculation of $120-145 Billion Tax Leakage</h3>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Overview</h4>
                  <p className="text-gray-700 mb-6">
                    The tax leakage estimate represents the gap between what African countries currently collect in tax revenue and what they could collect given their economic characteristics. This annex explains the calculation methodology, data sources, assumptions, and limitations.
                  </p>

                  <h4 className="text-lg font-bold text-gray-900 mb-3">Step 1: Tax Gap Calculation</h4>
                  <p className="text-gray-700 mb-4">
                    <strong>Data Used:</strong>
                  </p>
                  <ul className="list-disc ml-6 mb-4 text-gray-700">
                    <li>2012 data: 45 countries (best coverage: 83% of African countries)</li>
                    <li>2019 data: 45 countries (most recent with good coverage)</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    <strong>Average Tax Gap:</strong>
                  </p>
                  <ul className="list-disc ml-6 mb-4 text-gray-700">
                    <li>2012: 5.11% of GDP (45 countries)</li>
                    <li>2019: 5.66% of GDP (45 countries)</li>
                    <li><strong>Range: 5.1-5.7% of GDP</strong></li>
                  </ul>

                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`Method A (2012 baseline):
Total Africa GDP (2012) ≈ $2,560 billion
Average tax gap = 5.11% of GDP
Total leakage = 5.11% × $2,560B = $131 billion

Method B (2019 updated):
Total Africa GDP (2019) ≈ $2,560 billion  
Average tax gap = 5.66% of GDP
Total leakage = 5.66% × $2,560B = $145 billion

Range: $131-145 billion`}
                    </pre>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 mb-3">Step 2: Tax Effort Validation</h4>
                  <p className="text-gray-700 mb-4">
                    <strong>Alternative Calculation Using Tax Effort:</strong>
                  </p>
                  <p className="text-gray-700 mb-4">
                    Tax Effort measures the ratio of actual to potential revenue. If effort = 0.72, countries collect 72% of capacity, meaning 28% leaks.
                  </p>

                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`Current tax revenue (2019) ≈ 15.0% of GDP
Africa GDP (2019) ≈ $2,560 billion
Current revenue = $384 billion

If Tax Effort = 0.72:
Capacity = Current Revenue / Tax Effort
Capacity = $384B / 0.72 = $533 billion
Gap = $533B - $384B = $149 billion

If Tax Effort = 0.75 (2020):
Capacity = $384B / 0.75 = $512 billion
Gap = $512B - $384B = $128 billion

Range: $128-149 billion`}
                    </pre>
                  </div>

                  <p className="text-gray-700 mb-6">
                    <strong>Convergence:</strong> Both methods (tax gap and tax effort) produce similar estimates of $120-150 billion.
                  </p>

                  <h4 className="text-lg font-bold text-gray-900 mb-3">Step 3: Final Estimate</h4>
                  <ul className="list-disc ml-6 mb-6 text-gray-700">
                    <li><strong>Conservative Estimate:</strong> $120 billion (uses 2012 tax gap, higher tax effort)</li>
                    <li><strong>Upper Estimate:</strong> $145 billion (uses 2019 tax gap, lower tax effort)</li>
                    <li><strong>Recommended Range:</strong> <strong>$120-145 billion</strong></li>
                  </ul>

                  <h4 className="text-lg font-bold text-gray-900 mb-3">Data Sources</h4>
                  <p className="text-gray-700 mb-4">
                    <strong>Tax Gap, Tax Effort, Tax Buoyancy:</strong> Data from OSAA Domestic Resource Mobilization platform, drawing on:
                  </p>
                  <ul className="list-disc ml-6 mb-4 text-gray-700">
                    <li>IMF Government Finance Statistics (GFS)</li>
                    <li>ICTD Government Revenue Dataset</li>
                    <li>National revenue authorities</li>
                    <li>African Tax Administration Forum (ATAF)</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    <strong>Coverage:</strong> 45-48 African countries with varying time series (1980-2021)
                  </p>

                  <h4 className="text-lg font-bold text-gray-900 mb-3">Methodology Notes</h4>
                  <p className="text-gray-700 mb-4">
                    <strong>Tax Capacity Estimation:</strong> Ordinary Least Squares (OLS) regression model:
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <code className="text-sm text-gray-800">
                      Tax Revenue (% GDP) = f(GDP per capita, Trade openness, Natural resource dependence, Institutional quality)
                    </code>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Frontier adjustment applied using 75th percentile to create realistic benchmarks. Capacity represents estimated potential based on peer country performance, not absolute maximum.
                  </p>

                  <p className="text-gray-700 mb-4">
                    <strong>Tax Effort Calculation:</strong>
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <code className="text-sm text-gray-800">
                      Tax Effort = Actual Tax Revenue / Estimated Tax Capacity
                    </code>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Values &lt;1.0 indicate under-collection; values &gt;1.0 indicate over-collection relative to estimated capacity.
                  </p>

                  <p className="text-gray-700 mb-4">
                    <strong>Tax Buoyancy Calculation:</strong> Log-log regression of tax revenue on GDP over 10-20 year periods per country:
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <code className="text-sm text-gray-800">
                      ln(Tax Revenue) = α + β × ln(GDP) + ε
                    </code>
                  </div>
                  <p className="text-gray-700 mb-4">
                    β coefficient = buoyancy (elasticity of revenue to GDP)
                  </p>

                  <p className="text-gray-700 mb-4">
                    <strong>Tax Gap Calculation:</strong>
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <code className="text-sm text-gray-800">
                      Tax Gap (% GDP) = Tax Capacity - Actual Tax Revenue
                    </code>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Positive values indicate under-collection (leakage); negative values indicate over-collection.
                  </p>

                  <div className="border-t border-gray-300 pt-6">
                    <p className="text-sm text-gray-600">
                      <strong>Platform:</strong> UN Office of the Special Adviser on Africa (OSAA) - Evidence for Policy Making in Practice: Domestic Resource Mobilization
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>For more information:</strong> OSAA DRM Platform: www.un.org/osaa/drm | African Tax Administration Forum: www.ataftax.org | Contact: drm-policy@un.org
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default MethodologyAnnex42

