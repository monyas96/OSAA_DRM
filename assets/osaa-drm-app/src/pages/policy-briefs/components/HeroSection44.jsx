import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, BarChart, Zap } from 'lucide-react'

const HeroSection44 = () => {
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-b from-purple-900 via-purple-800 to-white overflow-hidden">
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
          className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
            <p className="text-sm uppercase tracking-wide opacity-90">Policy Brief 4.4</p>
            <p className="text-lg font-semibold">Illicit Financial Flows</p>
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
            The Reverse Flow: How Africa Sends{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              $88.6 Billion More Than It Receives
            </span>
          </h1>
          <p className="text-base md:text-lg text-purple-200 mt-4 max-w-3xl mx-auto">
            Why stopping the outflow matters more than increasing the inflow
          </p>
        </motion.div>
      </div>

      {/* Three Info Boxes */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl w-full">
          {/* THE CHALLENGE - Purple */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
            <AlertCircle className="w-6 h-6 mb-2 opacity-90" />
            <div className="text-xs font-bold mb-2 opacity-90 tracking-wide">The Challenge</div>
            <p className="text-sm leading-relaxed relative z-10">
              Africa receives <strong>$102 billion annually</strong> in aid ($48B) and foreign direct investment ($54B), but loses <strong>$88.6 billion to illicit financial flows</strong>. The net benefit is only $13.4 billion—an <strong>87% leakage rate</strong>. For every $100 flowing into Africa, $87 flows back out illicitly. The continent averages <strong>3.7% of GDP lost to IFFs annually</strong>, with West Africa losing 10.3% of GDP—among the highest rates globally.
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
              <strong>Trade-based IFFs</strong> account for approximately 65% of total outflows through invoice manipulation and profit shifting. The <strong>extractive sector alone loses $40 billion annually</strong> to under-invoicing, with gold representing 77% of this mispricing. <strong>Nigeria ($41B), Egypt ($17.5B), and South Africa ($14.1B)</strong> account for 82% of total IFF outflows. Weak institutions enable the flow: most African countries score below 0.4 on rule of law indices, corruption control remains weak, and financial transparency gaps persist.
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
              The reverse flow creates perpetual aid dependency. Countries improve tax systems, but criminals extract more through illicit channels. Donors provide aid, but corrupt officials siphon funds offshore. From <strong>2000-2015, cumulative IFF losses reached $836 billion</strong>—exceeding total aid received during the same period. If Africa retained even half of the <strong>$88.6B annual outflow</strong>, it would mobilize $43B annually without external support. The solution is not more inflows—it's stopping the reverse flow through systematic institutional strengthening.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection44

