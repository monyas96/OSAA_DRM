import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const GraphIntegratedLayout = ({ indicator, graph, findings }) => {
  // Color mapping for PEFA scores
  const getScoreColor = (score) => {
    if (score >= 3.5) return '#003366' // A (4) - Dark Blue
    if (score >= 2.5) return '#0072BC' // B (3) - Blue
    if (score >= 1.5) return '#60A5FA' // C (2) - Light Blue
    return '#F26C2B' // D (1) - Orange
  }

  // Process graph data
  const processedData = graph?.data?.map(item => ({
    ...item,
    country: item.country || item.country_or_area,
    score: item.score || item.value,
    color: getScoreColor(item.score || item.value)
  })) || []

  // Calculate statistics
  const scoreDistribution = processedData.reduce((acc, item) => {
    const score = Math.round(item.score || 0)
    acc[score] = (acc[score] || 0) + 1
    return acc
  }, {})

  const scoreACount = scoreDistribution[4] || 0
  const scoreDCount = scoreDistribution[1] || 0
  const totalCountries = processedData.length
  const scoreAPercentage = totalCountries > 0 ? Math.round((scoreACount / totalCountries) * 100) : 0
  const scoreDPercentage = totalCountries > 0 ? Math.round((scoreDCount / totalCountries) * 100) : 0

  // PI-1 specific findings
  const pi1Findings = [
    {
      title: 'Wide Dispersion',
      text: 'Data reveals significant variation in execution capacity. Only 23% of assessed countries (7 of 31) achieve Score A (strong execution), while 45% (14 of 31) score D, indicating actual spending deviates by more than 15% from planned budgets.',
      stat: '23%',
      statLabel: 'ACHIEVE A',
      borderColor: 'border-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Temporal Patterns',
      text: 'Some countries show improvement over time, moving from D to A, proving that improvement is achievable through sustained PFM reforms. However, many countries remain stuck in weak execution patterns across multiple assessment cycles.',
      stat: 'Some',
      statLabel: 'MOVING D→A',
      borderColor: 'border-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Key Insight',
      text: 'Execution consistency remains rare. Most countries experience ±15-20% variance, making multi-year planning impossible and breaking citizen trust.',
      stat: '45%',
      statLabel: 'SCORE D',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-50',
      isKeyInsight: true
    }
  ]

  // PI-2 specific findings
  const pi2Findings = [
    {
      title: 'Wide Dispersion',
      text: 'Expenditure composition analysis reveals that only 10% of countries (3 of 31) achieve Score 3-4 (Kenya, Botswana, Morocco). The majority cluster at Score 1/D—few top performers.',
      stat: '10%',
      statLabel: 'ACHIEVE 3-4',
      borderColor: 'border-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Temporal Patterns',
      text: 'Variance between planned and actual sector allocations undermines long-term planning and breaks social contracts with citizens when health/education budgets are cut mid-year. Sector shifts are frequent and unpredictable.',
      stat: 'Frequent',
      statLabel: 'Sector Shifts',
      borderColor: 'border-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Critical Finding',
      text: 'Composition distortion is systemic. Legislative budget approvals don\'t translate to actual sectoral spending, undermining development planning.',
      stat: '77%',
      statLabel: 'SCORE 1/D',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-50',
      isKeyInsight: true
    }
  ]

  const currentFindings = indicator === '4.1.1.1' ? pi1Findings : pi2Findings

  // Legend data based on indicator
  const legendData = indicator === '4.1.1.1' ? [
    { score: 4, label: 'A (4)', range: '95-105%', color: '#003366' },
    { score: 3, label: 'B (3)', range: '90-110%', color: '#0072BC' },
    { score: 2, label: 'C (2)', range: '85-115%', color: '#60A5FA' },
    { score: 1, label: 'D (1)', range: '<85% or >115%', color: '#F26C2B' },
  ] : [
    { score: 4, label: '4 (A)', range: '<5% variance', color: '#003366' },
    { score: 3, label: '3 (B)', range: '5-10% variance', color: '#0072BC' },
    { score: 2, label: '2 (C)', range: '10-15% variance', color: '#60A5FA' },
    { score: 1, label: '1 (D)', range: '>15% variance', color: '#F26C2B' },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Indicator Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-[#003366] mb-4">
            {indicator === '4.1.1.1' 
              ? 'INDICATOR 4.1.1.1: Budget Execution Consistency'
              : 'INDICATOR 4.1.2.1: Protecting Priorities'}
          </h3>
          <p className="text-lg text-gray-700">
            <strong>Question:</strong> {indicator === '4.1.1.1' 
              ? 'Do governments spend what they plan?'
              : 'Do health/education get their allocated funds?'}
          </p>
        </motion.div>

        {/* Full-Width Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg border border-gray-200 mb-8"
        >
          {processedData.length > 0 ? (
            <ResponsiveContainer width="100%" height={600}>
              <BarChart
                data={processedData.sort((a, b) => (b.score || 0) - (a.score || 0))}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
              >
                <XAxis 
                  type="number" 
                  domain={[0, 4]} 
                  ticks={[1, 2, 3, 4]}
                />
                <YAxis 
                  type="category" 
                  dataKey="country" 
                  width={150}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const scoreLabels = { 4: 'A', 3: 'B', 2: 'C', 1: 'D' }
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-semibold">{payload[0].payload.country}</p>
                          <p className="text-sm">
                            Score: {scoreLabels[payload[0].value] || payload[0].value} ({payload[0].value})
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {processedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-500">
              <p>Graph data will be loaded from the data service</p>
            </div>
          )}

          {/* PEFA Score Legend */}
          <div className="mt-8 pt-6 border-t-2 border-gray-300">
            <h4 className="text-base font-bold text-[#003366] mb-4">PEFA SCORE LEGEND</h4>
            <div className="grid grid-cols-4 gap-4">
              {legendData.map(({ score, label, range, color }) => (
                <div key={score} className="text-center">
                  <div
                    className="w-12 h-12 mx-auto rounded mb-2"
                    style={{ backgroundColor: color }}
                  />
                  <div className="font-semibold text-sm">{label}</div>
                  <div className="text-xs text-gray-600">{range}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Three Finding Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentFindings.map((finding, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${finding.bgColor} ${finding.isKeyInsight ? 'border-2 border-red-500' : `border-l-4 ${finding.borderColor}`} p-6 rounded-lg`}
            >
              <h4 className={`text-xl font-bold mb-3 ${finding.isKeyInsight ? 'text-red-900' : 'text-[#003366]'}`}>
                {finding.title}
              </h4>
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                {finding.text}
              </p>
              {finding.isKeyInsight ? (
                <div className="bg-red-100 border-2 border-red-500 p-4 rounded-lg text-center">
                  <div className="text-6xl font-bold text-red-900">{finding.stat}</div>
                  <div className="text-sm font-semibold text-red-800 mt-2">{finding.statLabel}</div>
                </div>
              ) : (
                <div className={`${finding.borderColor.replace('border-', 'bg-').replace('-600', '-100').replace('-500', '-100')} p-3 rounded-lg text-center`}>
                  <div className="text-2xl font-bold text-[#003366]">{finding.stat}</div>
                  <div className="text-xs font-semibold text-gray-700 mt-1">{finding.statLabel}</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GraphIntegratedLayout
