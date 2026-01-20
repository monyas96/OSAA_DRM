import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RotateCcw, Lightbulb, Target } from 'lucide-react'

const DRMGameChanger = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const benefits = [
    {
      icon: RotateCcw,
      title: 'Transform Systems',
      description: 'Turn the paradox around through systematic reform',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovate Approaches',
      description: 'Leverage technology and data for better outcomes',
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      icon: Target,
      title: 'Achieve Goals',
      description: 'Finance national priorities at scale',
      gradient: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <section
      id="gamechanger"
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#003366] mb-8">
            The DRM as the Game Changer...
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            Domestic Resource Mobilization is how countries turn this paradox around. By strengthening 
            tax systems, improving the efficiency and transparency of public spending, deepening domestic 
            capital markets, and curbing illicit financial flows, African states can create predictable 
            fiscal space and reclaim ownership of their policy choices.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            These are not technocratic tweaks; they are core instruments of state capacity and economic 
            sovereignty. This platform translates the DRM framework into measurable indicators and 
            actionable evidence, so policy makers can identify leverage points, track performance across 
            the four pillars, and ground decisions in Africa's own financing reality.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#003366] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default DRMGameChanger
