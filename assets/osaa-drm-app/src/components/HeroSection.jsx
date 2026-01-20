import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const HeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <motion.section
      id="hero"
      data-tour="hero-section"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #003366 0%, #004080 50%, #0059b3 100%)',
      }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* OSAA Identifier White - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-8 z-20"
      >
        <img 
          src="/logos/OSAA identifier white.svg" 
          alt="OSAA Identifier"
          className="h-16 w-auto"
          onError={(e) => {
            console.error('OSAA identifier white not found')
            e.target.style.display = 'none'
          }}
        />
      </motion.div>

      {/* OSAA Additional Graphic - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-8 right-8 z-20"
      >
        <img 
          src="/logos/OSAA additional graphic (1).png" 
          alt="United Nations Office of the Special Adviser on Africa"
          className="h-14 w-auto"
          onError={(e) => {
            console.error('OSAA additional graphic not found')
            e.target.style.display = 'none'
          }}
        />
      </motion.div>

      {/* Main Content with Parallax - Centered */}
      <motion.div 
        style={{ y }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Title - One Line */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl lg:text-5xl font-bold text-white mb-8 drop-shadow-lg leading-tight whitespace-nowrap"
        >
          Evidence Policy Making in Practice
        </motion.h1>
        
        {/* Subtitle - Orange */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl lg:text-5xl font-semibold text-orange-500 drop-shadow-md mb-12"
        >
          The Case of DRM
        </motion.h2>

        {/* Scroll to explore - Under subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-2 text-white/90"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" aria-label="Scroll down" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default HeroSection
