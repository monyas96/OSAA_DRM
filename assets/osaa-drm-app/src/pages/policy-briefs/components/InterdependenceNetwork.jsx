import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import InfoBox from '../shared/InfoBox'
import { Network, ArrowRight } from 'lucide-react'

const InterdependenceNetwork = ({ connections }) => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous render
    d3.select(svgRef.current).selectAll('*').remove()

    const width = 800
    const height = 500
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Define nodes
    const nodes = [
      { id: 'expenditure', label: 'PUBLIC\nEXPENDITURE\n(4.1)', x: 400, y: 100, color: '#0072BC' },
      { id: 'tax', label: 'TAX\n(4.2)', x: 200, y: 300, color: '#009D8C' },
      { id: 'capital', label: 'CAPITAL\n(4.3)', x: 400, y: 400, color: '#7B68EE' },
      { id: 'iff', label: 'IFFs\n(4.4)', x: 600, y: 300, color: '#F26C2B' }
    ]

    // Define links
    const links = [
      { source: 'expenditure', target: 'tax', strength: 0.8 },
      { source: 'expenditure', target: 'capital', strength: 0.7 },
      { source: 'expenditure', target: 'iff', strength: 0.6 },
      { source: 'tax', target: 'capital', strength: 0.5 },
      { source: 'tax', target: 'iff', strength: 0.4 }
    ]

    // Create arrow markers
    svg.append('defs').selectAll('marker')
      .data(links)
      .enter()
      .append('marker')
      .attr('id', (d, i) => `arrow-${i}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#666')

    // Draw links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 2)
      .attr('marker-end', (d, i) => `url(#arrow-${i})`)
      .attr('x1', d => {
        const source = nodes.find(n => n.id === d.source)
        return source ? source.x : 0
      })
      .attr('y1', d => {
        const source = nodes.find(n => n.id === d.source)
        return source ? source.y : 0
      })
      .attr('x2', d => {
        const target = nodes.find(n => n.id === d.target)
        return target ? target.x : 0
      })
      .attr('y2', d => {
        const target = nodes.find(n => n.id === d.target)
        return target ? target.y : 0
      })

    // Draw nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')

    // Add circles
    node.append('circle')
      .attr('r', 60)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('r', 70)
      })
      .on('mouseout', function(event, d) {
        d3.select(this).attr('r', 60)
      })

    // Add labels
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text(d => d.label)

  }, [])

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#003366] mb-12 text-center"
        >
          THE INTERDEPENDENCE: CONNECTING THE FOUR PILLARS
        </motion.h2>

        {/* Network Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200"
        >
          <div className="flex justify-center">
            <svg ref={svgRef} className="border border-gray-300 rounded" />
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Click on nodes to reveal connections
          </p>
        </motion.div>

        {/* Three explanation boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <InfoBox
              icon={ArrowRight}
              title="Enables Tax Reform (Topic 4.2)"
              content="Efficient expenditure management demonstrates fiscal discipline, building the credibility needed to implement tax reforms. When citizens see budgets executed as planned, they are more willing to comply with tax obligations."
              color="teal"
            />
            <div className="mt-4 text-center">
              <span className="text-2xl font-bold text-[#009D8C]">+1-2pp</span>
              <p className="text-sm text-gray-600">tax-to-GDP potential</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <InfoBox
              icon={ArrowRight}
              title="Enables Capital Markets (4.3)"
              content="Strong budget execution signals fiscal stability to investors. Countries with predictable expenditure management can access capital markets at lower costs, enabling long-term development financing."
              color="blue"
            />
            <div className="mt-4 text-center">
              <span className="text-2xl font-bold text-[#0072BC]">-50-100bp</span>
              <p className="text-sm text-gray-600">yield reduction</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <InfoBox
              icon={ArrowRight}
              title="Reduces IFFs (Topic 4.4)"
              content="Strong commitment controls and budget oversight reduce opportunities for illicit financial flows. When expenditure is transparent and predictable, corruption and fraud are more difficult to conceal."
              color="orange"
            />
            <div className="mt-4 text-center">
              <span className="text-2xl font-bold text-[#F26C2B]">-30-40%</span>
              <p className="text-sm text-gray-600">IFF reduction potential</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default InterdependenceNetwork

