import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Shield, 
  TrendingUp, 
  ArrowRightLeft, 
  Building2,
  ArrowRight,
  Link2,
  ExternalLink
} from 'lucide-react'

const FourPillars = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const pillars = [
    {
      id: 1,
      number: '1',
      title: 'Durable Peace',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-500',
      description: 'Foundation for stability and development',
      details: 'Sustainable peace creates the environment necessary for economic growth and resource mobilization.'
    },
    {
      id: 2,
      number: '2',
      title: 'Sustainable Financing',
      icon: TrendingUp,
      color: 'from-teal-500 to-teal-600',
      borderColor: 'border-teal-500',
      description: 'Predictable and adequate revenue streams',
      details: 'Building robust financial systems that can support long-term development goals.'
    },
    {
      id: 3,
      number: '3',
      title: 'Control Over Flows',
      icon: ArrowRightLeft,
      color: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-500',
      description: 'Managing economic and financial movements',
      details: 'Regulating capital flows, trade, and financial transactions to maximize development impact.'
    },
    {
      id: 4,
      number: '4',
      title: 'Strong Institutions',
      icon: Building2,
      color: 'from-orange-500 to-orange-600',
      borderColor: 'border-orange-500',
      description: 'Effective governance and accountability',
      details: 'Building capable institutions that can implement policies and ensure transparency.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section
      id="pillars"
      data-tour="four-pillars"
      ref={ref}
      className="py-20 px-4 bg-gray-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#003366] mb-4">
            Four Interdependent Pillars
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each pillar depends on the others, forming a virtuous cycle of transformation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 relative"
        >
          {pillars.map((pillar, index) => (
            <React.Fragment key={pillar.id}>
              <PillarCard
                pillar={pillar}
                variants={cardVariants}
              />
              {/* Connecting Arrow - Desktop only */}
              {index < pillars.length - 1 && (
                <div className="hidden lg:block absolute top-1/2" style={{ left: `${(index + 1) * 25}%`, transform: 'translate(-50%, -50%)' }}>
                  <ArrowRight className="w-8 h-8 text-gray-300" />
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Interdependence Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-200">
            <Link2 className="w-6 h-6 text-teal-600" />
            <span className="text-gray-700 font-semibold text-xl">
              These pillars are interconnected and mutually reinforcing
            </span>
          </div>
          
          {/* Learn More Link */}
          <div className="mt-6">
            <a
              href="https://www.un.org/osaa/content/peace-and-development-nexus-africa-governance-financing-and-country-systems-planning-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#003366] hover:text-orange-500 font-medium transition-colors text-base"
            >
              <span>Learn more about OSAA's Peace and Development Nexus Conceptual Framework</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const PillarCard = ({ pillar, variants }) => {
  const Icon = pillar.icon

  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05, y: -8 }}
      className="relative group cursor-pointer"
    >
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border-t-4 transition-all duration-300 h-full"
           style={{ borderTopColor: pillar.borderColor.replace('border-', '') }}>
        {/* Number Badge - Larger */}
        <div className={`absolute -top-7 -left-7 w-14 h-14 rounded-full bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white font-bold text-2xl shadow-xl z-10`}>
          {pillar.number}
        </div>

        {/* Icon Container - Larger with gradient */}
        <div className="mb-6 mt-4">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white shadow-lg`}>
            <Icon className="w-12 h-12" strokeWidth={2} />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-[#003366] mb-3">
          {pillar.title}
        </h3>
        <p className="text-gray-600 text-base leading-relaxed mb-4">
          {pillar.description}
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">
          {pillar.details}
        </p>
      </div>
    </motion.div>
  )
}

export default FourPillars
