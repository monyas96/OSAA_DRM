import React from 'react'
import SectionHeader from './SectionHeader'
import GraphIntegratedLayout from './GraphIntegratedLayout'

const EvidenceSection41 = ({ pi1, pi2, findings, loading, error }) => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Evidence: What PEFA Data Shows"
          subtitle="Public Expenditure and Financial Accountability (PEFA) assessments reveal systematic patterns of budget execution weakness and composition distortion across African countries. The data shows two critical failures:"
          color="orange"
        />
      <div className="prose max-w-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* PI-1 Findings */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-[#003366] mb-4">
              Indicator 4.1.1.1: Budget Execution Consistency
            </h3>
            <p className="text-base text-gray-700 mb-6">
              <strong>Question:</strong> Do governments spend what they plan?
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <strong className="text-[#003366]">Score A (95-105% execution):</strong> Less than 20% of countries
                <br />
                <small className="text-gray-600">Examples: Botswana, Cameroon, Malawi show consistent performance</small>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <strong className="text-[#F26C2B]">Score D (Below 85% or Above 115%):</strong> 45% of countries
                <br />
                <small className="text-gray-600">Chronic under-execution or fiscal discipline failures</small>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                <strong>Key Insight:</strong> Execution consistency remains rare. Most countries experience ±15-20% variance, making multi-year planning impossible and breaking citizen trust.
              </p>
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                <strong>Wide Dispersion:</strong> Data reveals significant variation in execution capacity. Only 23% of assessed countries (7 of 31) achieve Score A (strong execution), while 45% (14 of 31) score D, indicating actual spending deviates by more than 15% from planned budgets.
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                <strong>Temporal Patterns:</strong> Some countries show improvement over time, moving from D to A, proving that improvement is achievable through sustained PFM reforms. However, many countries remain stuck in weak execution patterns across multiple assessment cycles.
              </p>
            </div>
          </div>

          {/* PI-2 Findings */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-[#003366] mb-4">
              Indicator 4.1.2.1: Protecting Priorities
            </h3>
            <p className="text-base text-gray-700 mb-6">
              <strong>Question:</strong> Do health/education get their allocated funds?
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <strong className="text-[#003366]">Score 3-4 (Below 10% variance):</strong> Less than 30% of countries
                <br />
                <small className="text-gray-600">Examples: Kenya, Seychelles protect sectoral priorities</small>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <strong className="text-red-700">Score 1/D (Above 15% variance):</strong> 77% of countries
                <br />
                <small className="text-gray-600">Health budget of $100M → receives $80-85M mid-year</small>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                <strong>Critical Finding:</strong> Composition distortion is systemic. Legislative budget approvals don't translate to actual sectoral spending, undermining development planning.
              </p>
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                <strong>Wide Dispersion:</strong> Expenditure composition analysis reveals that only 10% of countries (3 of 31) achieve Score 3-4 (Kenya, Botswana, Morocco). The majority cluster at Score 1/D—few top performers.
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                <strong>Temporal Patterns:</strong> Variance between planned and actual sector allocations undermines long-term planning and breaks social contracts with citizens when health/education budgets are cut mid-year. Sector shifts are frequent and unpredictable.
              </p>
            </div>
          </div>
        </div>

        {/* Double Deficit Callout */}
        <div className="bg-red-50 border-2 border-red-500 p-8 rounded-xl mb-8">
          <div className="text-xl font-bold text-red-800 mb-4">The Double Deficit</div>
          <p className="text-base text-gray-800 leading-relaxed">
            Among 31 assessed African countries, 45% face execution weakness (Score D) AND 77% experience severe composition distortion (Score 1/D). Budgets are unpredictable in total AND unreliable by sector—a complete fiscal planning breakdown affecting the majority of assessed countries.
          </p>
        </div>

        {/* Graphs Section */}
        {loading ? (
          <div className="py-16 text-center">
            <p className="text-gray-600">Loading data...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-red-600">Error loading data: {error}</p>
            <p className="text-gray-600 mt-2">Graphs will show placeholder data</p>
          </div>
        ) : (
          <>
            <GraphIntegratedLayout
              indicator="4.1.1.1"
              graph={pi1 || {
                data: [],
                title: 'PEFA PI-1: Aggregate expenditure outturn',
                subtitle: 'Budget Execution Credibility'
              }}
              findings={findings?.pi1}
            />

            <GraphIntegratedLayout
              indicator="4.1.2.1"
              graph={pi2 || {
                data: [],
                title: 'PEFA PI-2: Expenditure composition outturn',
                subtitle: 'Spending Alignment with Priorities'
              }}
              findings={findings?.pi2}
            />
          </>
        )}
      </div>
      </div>
    </section>
  )
}

export default EvidenceSection41

