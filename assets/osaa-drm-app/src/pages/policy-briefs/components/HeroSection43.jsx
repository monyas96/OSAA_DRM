import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, BarChart, Zap } from 'lucide-react'

const HeroSection43 = () => {
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
            <p className="text-sm uppercase tracking-wide opacity-90">Policy Brief 4.3</p>
            <p className="text-lg font-semibold">Capital Markets</p>
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
            The Capital Drain: How Shallow Markets Force{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Billions to Leak Abroad
            </span>
          </h1>
          <p className="text-base md:text-lg text-purple-200 mt-4 max-w-3xl mx-auto">
            Why African savings escape to foreign markets—then countries borrow the same money back at premium rates
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
              African capital markets are too shallow to capture domestic savings. <strong>Market capitalization averages only 20% of GDP</strong>—less than one-third the depth of emerging market peers. This forces billions to leak abroad while Africa faces a <strong>$130-170 billion annual infrastructure gap</strong>.¹ Countries borrow externally at premium rates—often the same capital that leaked out.
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
              <strong>Pension funds</strong> hold trillions but invest abroad—can't find viable domestic investments. <strong>Portfolio flows</strong> are extremely volatile—surge during booms, collapse during crises (2008, 2014-16, 2020). <strong>75% of countries</strong> have market cap under 30% of GDP. <strong>Banking credit</strong> averages just 35% of GDP versus an 80-120% benchmark. The paradox: Africa has capital but can't capture it.
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
              The capital drain creates a vicious cycle: <strong>Lost returns</strong> (savings earn returns for foreign economies), <strong>premium borrowing</strong> (countries borrow back the same capital at higher rates), <strong>infrastructure underfunded</strong> (the <strong>$130-170B</strong> gap persists), <strong>external dependency</strong> (reliance on volatile flows). If markets captured even 50% of outflows, Africa would mobilize billions—without external borrowing.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection43

