import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Database, FileText, Settings, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const EntryPointSelector = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const navigate = useNavigate()

  const entryPoints = [
    {
      icon: Database,
      title: 'Explore the data myself',
      description: 'Start with the Exploratory View',
      actions: [
        '→ Pick a topic below (4.1, 4.2, 4.3, 4.4)',
        '→ Filter, compare, validate your hypotheses'
      ],
      buttonText: 'Go to Exploratory View',
      buttonAction: () => navigate('/exploratory'),
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'Understand the policy implications',
      description: 'Start with the Explanatory View (Policy Brief)',
      actions: [
        '→ Read strategic question framing',
        '→ Review synthesized evidence',
        '→ Click through to explore underlying data'
      ],
      buttonText: 'View Policy Brief',
      buttonAction: () => navigate('/explanatory'),
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      icon: Settings,
      title: 'Understand the methodology',
      description: 'See how we built this system',
      actions: [
        '→ View data sources and ETL pipeline',
        '→ Check indicator calculation logic',
        '→ Review quality and coverage stats'
      ],
      buttonText: 'View Evidence Process',
      buttonAction: () => navigate('/evidence-process'),
      gradient: 'from-orange-500 to-orange-600'
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section
      id="entry-points"
      ref={ref}
      className="py-20 px-4 bg-white"
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-[#003366] mb-4">
            Choose Your Entry Point
          </h2>
          <p className="text-xl text-gray-600">
            I want to...
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {entryPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border-2 border-orange-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${point.gradient} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-[#003366] mb-3">
                  {point.title}
                </h3>
                
                <p className="text-gray-600 mb-6 text-base">
                  {point.description}
                </p>

                <ul className="space-y-2 mb-8 flex-grow">
                  {point.actions.map((action, idx) => (
                    <li key={idx} className="text-gray-700 text-sm">
                      {action}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={point.buttonAction}
                  className={`bg-gradient-to-r ${point.gradient} text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mt-auto`}
                >
                  <span>{point.buttonText}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default EntryPointSelector

