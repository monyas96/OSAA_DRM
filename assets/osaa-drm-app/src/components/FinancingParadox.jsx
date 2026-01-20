import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  TrendingDown,
  Info,
  ExternalLink,
  DollarSign,
  Wallet,
  Building2,
  TrendingUp,
  Shield,
  AlertTriangle,
  XCircle,
  FileX
} from 'lucide-react'

const FinancingParadox = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const resources = [
    { amount: '$100B', label: 'Remittances', icon: Wallet },
    { amount: '$427B', label: 'Private Savings', icon: DollarSign },
    { amount: '$24B', label: 'Sovereign Wealth Funds', icon: Building2 },
    { amount: '$1.3T', label: 'Pension Funds', icon: TrendingUp },
    { amount: '$483B', label: 'Public Revenue', icon: Shield }
  ]

  const problems = [
    {
      label: 'Illicit Financial Flows',
      description: 'Trade mispricing and capital flight'
    },
    {
      label: 'Tax Inefficiencies',
      description: 'Redundant incentives and revenue losses'
    },
    {
      label: 'Weak Institutions & Policy Gaps',
      description: 'Limited enforcement and regulatory frameworks'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section
      id="paradox"
      ref={ref}
      className="py-20 px-4 bg-white"
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#003366] mb-4">
            The Financing Paradox
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Africa has significant financial resources, yet these are undermined by systemic problems
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Financial Resources - Clean Cards */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {resources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200"
                  >
                    <Icon className="w-6 h-6 text-[#003366] mx-auto mb-3" />
                    <div className="text-2xl font-bold text-[#003366] mb-1">
                      {resource.amount}
                    </div>
                    <div className="text-xs text-gray-600">
                      {resource.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* BUT Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center my-12"
          >
            <div className="bg-orange-500 rounded-full px-10 py-3">
              <span className="text-white text-lg font-semibold">BUT</span>
            </div>
          </motion.div>

          {/* Problems - Clean Cards */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
                >
                  <h4 className="text-base font-semibold text-[#003366] mb-2">
                    {problem.label}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {problem.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Impact Callout - Interactive */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-10 mb-12 shadow-xl text-center"
          >
            <div className="flex flex-col items-center justify-center mb-4">
              <TrendingDown className="w-12 h-12 text-white mb-3" />
              <AnimatedCounter target={600} suffix="B" />
            </div>
            <p className="text-white/90 text-xl font-semibold mb-3">
              Not mobilized annually
            </p>
            <p className="text-white/80 text-base">
              Increasing debt stress and constraining development financing
            </p>
          </motion.div>

          {/* OSAA Link */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <a
              href="https://www.un.org/osaa/content/solving-paradoxes-development-africa-financing-energy-and-food-systems"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#003366] hover:text-orange-500 font-medium transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>For a fuller discussion of this paradox, see OSAA's analysis</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = React.useState(0)
  const counterRef = React.useRef(null)
  const isInView = useInView(counterRef, { once: true })

  React.useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = target / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={counterRef} className="text-5xl font-bold text-white">
      ${count.toLocaleString()}{suffix}
    </span>
  )
}

export default FinancingParadox
