import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, BarChart, Zap } from 'lucide-react'

const HeroSection42 = () => {
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-b from-blue-900 via-blue-800 to-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -30, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
      </div>

      {/* Header with Logo and Title */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/logos/OSAA identifier white.svg" 
              alt="UN OSAA Logo" 
              className="h-14 w-auto"
              onError={(e) => {
                const img = e.target
                img.src = '/logos/OSAA identifier color.png'
                img.style.filter = 'brightness(0) invert(1)'
                img.style.height = '3.5rem'
              }}
            />
          </div>
          <div className="text-right text-white">
            <p className="text-sm uppercase tracking-wide opacity-90">Policy Brief 4.2</p>
            <p className="text-lg font-semibold">Budget and Tax Revenues</p>
          </div>
        </div>
      </div>

      {/* Hero Title */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            Closing the Tap: Africa's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              $120-145 Billion
            </span>{' '}
            Tax Leakage Crisis
          </h1>
          <p className="text-base md:text-lg text-blue-200 mt-4 max-w-3xl mx-auto">
            Why domestic resource mobilization is no longer optional—it's the pathway to economic sovereignty
          </p>
        </motion.div>
      </div>

      {/* Three Info Boxes */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl w-full">
          {/* THE CHALLENGE - Blue */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
            <AlertCircle className="w-6 h-6 mb-2 opacity-90" />
            <div className="text-xs font-bold mb-2 opacity-90 tracking-wide">The Challenge</div>
            <p className="text-sm leading-relaxed relative z-10">
              African countries collect only <strong>$340-400 billion of $480-545 billion</strong> in potential tax revenue annually. This <strong>$120-145 billion leakage</strong>—revenue that should reach government coffers but never does—flows through cracks in weak tax systems, inefficient administration, and porous enforcement. The leak contributes to the continent's <strong>$500-600 billion total resource drain</strong> and perpetuates fiscal dependency.
            </p>
          </motion.div>

          {/* THE EVIDENCE - Orange */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
            <BarChart className="w-6 h-6 mb-2 opacity-90" />
            <div className="text-xs font-bold mb-2 opacity-90 tracking-wide">The Evidence</div>
            <p className="text-sm leading-relaxed relative z-10">
              Tax performance data reveals systematic leakage: Countries collect only <strong>65-75% of their tax capacity</strong> (tax effort averages 0.72). Tax systems are structurally inelastic—<strong>buoyancy averages 0.71</strong>, meaning revenues grow at just 71% the rate of GDP. The <strong>tax gap averages 5-7% of GDP</strong> across African countries, with the largest leaks in countries with the weakest institutions.
            </p>
          </motion.div>

          {/* THE IMPACT - Teal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative bg-gradient-to-br from-teal-600 to-teal-700 p-4 rounded-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
            <Zap className="w-6 h-6 mb-2 opacity-90" />
            <div className="text-xs font-bold mb-2 opacity-90 tracking-wide">The Impact</div>
            <p className="text-sm leading-relaxed relative z-10">
              <strong>$120-145 billion annual leakage</strong> equals 2-2.5× total development aid to Africa. The hemorrhage creates: chronic underfunding of essential services, forced reliance on volatile external financing, limited fiscal space for countercyclical policy, weakened state-citizen social contract, reduced economic sovereignty, and perpetual vulnerability to external shocks and conditionalities.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection42

