import React, { useState, useEffect } from 'react'

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      
      // Only show after scrolling past hero section
      if (scrollTop > windowHeight * 0.8) {
        setShowProgress(true)
        const progressValue = (scrollTop / (documentHeight - windowHeight)) * 100
        setProgress(Math.min(progressValue, 100))
      } else {
        setShowProgress(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!showProgress) return null

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-[#003366] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ScrollProgress
