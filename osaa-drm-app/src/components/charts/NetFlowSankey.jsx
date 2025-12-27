import React from 'react'
import Plot from 'react-plotly.js'

/**
 * Vertical Leak Diagram showing the Net Flow Reality:
 * - Total Inflow ($102B: Aid $48B + FDI $54B) at TOP
 * - Africa in MIDDLE (small passthrough node)
 * - MASSIVE side leak to IFFs ($88.6B) going RIGHT (DOMINANT)
 * - Tiny drip down to Net Benefit ($13.4B) at BOTTOM
 * 
 * Visual metaphor: Bucket with massive leak
 * The red IFF leak should DOMINATE visually (thickest, most prominent)
 */
const NetFlowSankey = ({ height = 700 }) => {
  // Node definitions: [Total Inflow, Aid, FDI, Africa, IFFs, Net Benefit]
  // Vertical layout: Top (inflows) → Middle (Africa) → Right (IFF leak) + Bottom (Net)
  const nodes = {
    label: [
      'Total Inflow\n$102B',
      'Aid\n$48B',
      'FDI\n$54B',
      'Africa',
      'IFFs\n$88.6B\n(87% LEAK)',
      'Net Benefit\n$13.4B\n(13% only)'
    ],
    color: [
      '#10B981',  // Green for Total Inflow
      '#10B981',  // Green for Aid
      '#10B981',  // Green for FDI
      '#3B82F6',  // Blue for Africa (small, passthrough)
      '#DC2626',  // BRIGHT RED for IFFs (DOMINANT - alarming)
      '#F59E0B'   // Yellow/Orange for Net Benefit (small)
    ],
    // Vertical layout: Top to Bottom, with side leak
    x: [0.5, 0.3, 0.7, 0.5, 0.85, 0.5],  // X positions: Center for main flow, right for leak
    y: [0.05, 0.15, 0.15, 0.5, 0.5, 0.9]  // Y positions: Top to bottom
  }

  // Link definitions: [Total→Aid, Total→FDI, Aid→Africa, FDI→Africa, Africa→IFFs (MASSIVE), Africa→Net (tiny)]
  // Flow values determine thickness - $88.6B should be visually DOMINANT
  const links = {
    source: [0, 0, 1, 2, 3, 3],  // Source nodes
    target: [1, 2, 3, 3, 4, 5],  // Target nodes
    value: [48, 54, 48, 54, 88.6, 13.4],  // Flow values (billions) - IFFs is MASSIVE
    color: [
      'rgba(16, 185, 129, 0.6)',   // Green for Total→Aid
      'rgba(16, 185, 129, 0.6)',   // Green for Total→FDI
      'rgba(16, 185, 129, 0.6)',   // Green for Aid→Africa
      'rgba(16, 185, 129, 0.6)',   // Green for FDI→Africa
      'rgba(220, 38, 38, 0.9)',    // BRIGHT RED for Africa→IFFs (DOMINANT, most opaque)
      'rgba(245, 158, 11, 0.5)'    // Yellow for Africa→Net (small)
    ]
  }

  const data = [{
    type: 'sankey',
    orientation: 'v',  // VERTICAL flow: Top → Bottom (with side leak)
    arrangement: 'snap',
    node: {
      pad: 15,
      thickness: 20,
      line: {
        color: 'rgba(0, 0, 0, 0.4)',
        width: 2
      },
      label: nodes.label,
      color: nodes.color,
      x: nodes.x,
      y: nodes.y
    },
    link: {
      source: links.source,
      target: links.target,
      value: links.value,
      color: links.color,
      hovertemplate: '<b>%{source.label}</b> → <b>%{target.label}</b><br>' +
                     'Flow: $%{value}B<br>' +
                     '<extra></extra>'
    }
  }]

  const layout = {
    title: {
      text: '',
      font: {
        size: 18,
        color: '#003366',
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }
    },
    font: {
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      size: 14,
      color: '#000000',  // Black for maximum contrast
      weight: 'bold'
    },
    height: height,
    paper_bgcolor: 'white',
    plot_bgcolor: 'white',
    margin: {
      l: 50,
      r: 150,  // Extra space on right for IFF leak
      t: 20,
      b: 50
    }
  }

  const config = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    responsive: true,
    toImageButtonOptions: {
      format: 'png',
      filename: 'net_flow_reality',
      height: height,
      width: 1200,
      scale: 2
    }
  }

  return (
    <div className="w-full">
      <Plot
        data={data}
        layout={layout}
        config={config}
        style={{ width: '100%', height: `${height}px` }}
        useResizeHandler={true}
      />
      
      {/* Key Metrics Summary - MUCH LARGER */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded shadow-sm">
          <div className="text-base font-semibold text-gray-800 mb-2">TOTAL IN</div>
          <div className="text-4xl font-bold text-green-700 mb-2">$102B</div>
          <div className="text-sm text-gray-700">Aid ($48B) + FDI ($54B)</div>
        </div>
        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded shadow-sm">
          <div className="text-base font-semibold text-gray-800 mb-2">TOTAL OUT</div>
          <div className="text-4xl font-bold text-red-700 mb-2">$88.6B</div>
          <div className="text-lg font-bold text-red-800 mt-2">⚠️ 87% OF INFLOWS ⚠️</div>
          <div className="text-sm text-gray-700 mt-1">PROBLEM!</div>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded shadow-sm">
          <div className="text-base font-semibold text-gray-800 mb-2">NET BENEFIT</div>
          <div className="text-4xl font-bold text-yellow-800 mb-2">$13.4B ⚠️</div>
          <div className="text-lg font-bold text-yellow-900 mt-2">ONLY 13% REMAINS</div>
          <div className="text-sm text-gray-700 mt-1">Tiny remainder</div>
        </div>
      </div>

      {/* Key Insight Box - Prominent */}
      <div className="mt-6 bg-red-50 border-l-4 border-red-600 p-5 rounded-r shadow-sm">
        <p className="text-base font-bold text-red-900 mb-2">
          🚨 THE REVERSE FLOW PROBLEM 🚨
        </p>
        <p className="text-sm text-gray-800 leading-relaxed">
          <strong>For every $100 flowing into Africa, $87 flows back out through illicit channels.</strong> The continent has become a net exporter of capital to the rest of the world. The dominant flow is <strong>outward, not inward</strong>.
        </p>
      </div>
    </div>
  )
}

export default NetFlowSankey

