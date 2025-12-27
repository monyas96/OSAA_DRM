import React from 'react'

/**
 * Clean, Modern Flow Diagram
 * Main Message: 87% of inflows leak out, only 13% remains
 */
const NetFlowLeakDiagram = ({ height = 400 }) => {
  const totalInflow = 102
  const iffs = 88.6
  const netBenefit = 13.4
  
  // Proportional bar widths (visual representation)
  const maxWidth = 400
  const inflowWidth = maxWidth
  const iffsWidth = (iffs / totalInflow) * maxWidth  // 87% - DOMINANT
  const netWidth = (netBenefit / totalInflow) * maxWidth  // 13% - tiny
  
  return (
    <div className="w-full bg-white py-8">
      {/* Main Headline */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-1">
          For Every $100 Flowing Into Africa
        </h3>
        <p className="text-4xl font-bold text-gray-900">
          $87 Flows Back Out
        </p>
      </div>

      {/* Visual Flow - Clean Bars */}
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Inflow Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Total Inflow</span>
            <span className="text-2xl font-bold text-gray-900">$102B</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-12 overflow-hidden">
            <div 
              className="bg-slate-500 h-full flex items-center justify-end pr-4 transition-all duration-500"
              style={{ width: '100%' }}
            >
              <span className="text-white text-sm font-semibold">Aid $48B + FDI $54B</span>
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center">
          <svg width="40" height="40" className="text-gray-400">
            <path d="M20 10 L20 30 M10 20 L20 30 M30 20 L20 30" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Split: Leak vs Remainder */}
        <div className="grid grid-cols-2 gap-4">
          {/* MASSIVE LEAK (LEFT) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Leaks Out</span>
              <span className="text-xl font-bold text-gray-900">$88.6B</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-16 overflow-hidden">
              <div 
                className="bg-slate-700 h-full flex items-center justify-center transition-all duration-500"
                style={{ width: '100%' }}
              >
                <span className="text-white text-2xl font-bold">87%</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">Massive Leak</p>
          </div>

          {/* TINY REMAINDER (RIGHT) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Remains</span>
              <span className="text-xl font-bold text-gray-900">$13.4B</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-16 overflow-hidden">
              <div 
                className="bg-slate-400 h-full flex items-center justify-center transition-all duration-500"
                style={{ width: '100%' }}
              >
                <span className="text-white text-lg font-bold">13%</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">Tiny Remainder</p>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="mt-8 max-w-3xl mx-auto bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r">
        <p className="text-base text-gray-800 leading-relaxed">
          <strong className="text-gray-900">The Reverse Flow:</strong> Africa receives $102 billion annually but loses $88.6 billion through illicit financial flows. Only $13.4 billion remains—an <strong className="text-gray-900">87% leakage rate</strong>. The dominant flow is <strong>outward, not inward</strong>.
        </p>
      </div>
    </div>
  )
}

export default NetFlowLeakDiagram

