import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  FileText, 
  Target, 
  TrendingDown, 
  Zap, 
  BookOpen,
  Menu,
  X,
  FileDown,
  GraduationCap,
  BarChart3,
  Globe,
  Mail,
  Share2,
  Linkedin,
  Twitter,
  Link2,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Database,
  Search,
  FileCheck,
  Home
} from 'lucide-react'

const SidebarNavigation = ({ alwaysVisible = false }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(alwaysVisible)
  const [isSidebarHidden, setIsSidebarHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [showResources, setShowResources] = useState(false)

  useEffect(() => {
    // If alwaysVisible is true, show sidebar immediately and don't listen to scroll
    if (alwaysVisible) {
      setShowSidebar(true)
      return
    }

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const scrollTop = window.scrollY
      
      // Only show sidebar after scrolling past hero section
      if (scrollTop > windowHeight * 0.8) {
        setShowSidebar(true)
      } else {
        setShowSidebar(false)
      }

      // Determine active section
      const sections = [
        { id: 'hero', elementId: 'hero' },
        { id: 'introduction', elementId: 'introduction' },
        { id: 'pillars', elementId: 'pillars' },
        { id: 'paradox', elementId: 'paradox' },
        { id: 'gamechanger', elementId: 'gamechanger' },
        { id: 'explore-data', elementId: 'transition-to-dashboard' }
      ]
      for (const section of sections) {
        const element = document.getElementById(section.elementId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [alwaysVisible])

  // Get current pathname to determine which nav items to show
  const currentPath = location.pathname
  const isStreamlitPage = currentPath.startsWith('/streamlit/') || currentPath.startsWith('/exploratory') || currentPath.startsWith('/explanatory')
  const isLandingPage = currentPath === '/'
  
  const navItems = [
    // Landing Page link - show on all pages except landing page itself
    ...(!isLandingPage ? [
      { icon: Home, label: 'Landing Page', href: '/', id: 'landing-page', isExternal: true }
    ] : []),
    // Only show landing page sections on landing page
    ...(isLandingPage ? [
      { icon: FileText, label: 'Introduction', href: '#introduction', id: 'introduction' },
      { icon: Target, label: 'Four Pillars', href: '#pillars', id: 'pillars' },
      { icon: TrendingDown, label: 'Financing Paradox', href: '#paradox', id: 'paradox' },
      { icon: Zap, label: 'Game Changer', href: '#gamechanger', id: 'gamechanger' },
      { icon: Database, label: 'Explore Data', href: '#transition-to-dashboard', id: 'explore-data' },
    ] : []),
    // Always show view navigation
    { icon: Search, label: 'Exploratory View', href: '/exploratory', id: 'exploratory-view', isExternal: true },
    { icon: FileCheck, label: 'Explanatory View', href: '/explanatory', id: 'explanatory-view', isExternal: true },
    { icon: BarChart3, label: 'Data Availability', href: '/streamlit/data-availability', id: 'data-availability', isExternal: true },
    // Show resources on all pages
    { icon: BookOpen, label: 'Resources', href: '#resources', id: 'resources' }
  ]
  
  // Check for showResources query parameter and expand resources
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    if (searchParams.get('showResources') === 'true') {
      setShowResources(true)
      // Remove the query parameter from URL without reload
      window.history.replaceState({}, '', location.pathname)
    }
  }, [location.pathname, location.search])

  const handleClick = (e, href, id, isExternal = false) => {
    // Prevent default behavior
    e.preventDefault()
    e.stopPropagation()
    
    // Special handling for Resources - toggle on all pages
    if (id === 'resources') {
      setShowResources(prev => !prev)
      // Don't close mobile sidebar when toggling resources - user might want to see the list
      return
    }
    
    // Handle external navigation (e.g., to Streamlit pages, landing page)
    if (isExternal) {
      navigate(href)
      setIsOpen(false)
      return
    }
    
    // Handle transition section scroll
    if (id === 'explore-data') {
      const section = document.getElementById('transition-to-dashboard')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      setIsOpen(false)
      return
    }
    
    // Only scroll if it's not a hash link to resources
    if (href && href !== '#resources') {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    // Could add toast notification here
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showSidebar ? 1 : 0 }}
        className="fixed top-4 right-4 z-50 lg:hidden bg-[#003366] text-white p-3 rounded-full shadow-xl w-12 h-12 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Desktop Sidebar Toggle Button (when hidden) */}
      {showSidebar && isSidebarHidden && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 bg-[#003366] text-white p-3 rounded-r-full shadow-xl hover:bg-[#004080] transition-colors"
          onClick={() => setIsSidebarHidden(false)}
          aria-label="Show sidebar"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      )}

      {/* Desktop Sidebar */}
      <AnimatePresence>
        {showSidebar && !isSidebarHidden && (
          <motion.aside
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -120, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="hidden lg:block fixed left-5 top-20 bottom-20 z-50"
          >
            <nav data-tour="sidebar" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 border-r-4 border-r-teal-500 w-56 h-full overflow-y-auto max-h-[calc(100vh-10rem)] flex flex-col">
              {/* Hide Sidebar Button - Top in separate column */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsSidebarHidden(true)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Hide sidebar"
                >
                  <ChevronLeft className="w-4 h-4 text-[#003366]" />
                </button>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  const isResources = item.id === 'resources'
                  return (
                    <li key={item.id}>
                      <motion.button
                        whileHover={{ x: 4 }}
                        onClick={(e) => handleClick(e, item.href, item.id, item.isExternal)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors w-full text-left ${
                          isActive || (isResources && showResources)
                            ? 'bg-blue-50 border-l-4 border-blue-500' 
                            : 'hover:bg-gray-50'
                        }`}
                        aria-label={item.label}
                      >
                        <Icon className="w-5 h-5 text-[#003366]" />
                        <span className="text-sm font-medium text-gray-700 hover:text-[#003366] flex-1">
                          {item.label}
                        </span>
                        {isResources && (
                          <motion.div
                            animate={{ rotate: showResources ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </motion.div>
                        )}
                        {item.isExternal && (
                          <Link2 className="w-4 h-4 text-gray-400" />
                        )}
                      </motion.button>
                    </li>
                  )
                })}
              </ul>

              {/* Resource Links - Collapsible */}
              {showResources && (
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="space-y-2">
                    {[
                      { 
                        icon: BarChart3, 
                        label: 'Solving Paradoxes of Development', 
                        href: 'https://www.un.org/osaa/content/solving-paradoxes-development-africa-financing-energy-and-food-systems' 
                      },
                      { 
                        icon: GraduationCap, 
                        label: 'Online Course: Peace & Development Nexus', 
                        href: 'https://www.un.org/osaa/peace-development-course' 
                      },
                      { 
                        icon: FileDown, 
                        label: 'Planning Guide', 
                        href: 'https://www.un.org/osaa/content/peace-and-development-nexus-africa-governance-financing-and-country-systems-planning-guide' 
                      },
                      { 
                        icon: FileText, 
                        label: 'Challenging Global Narrative on Debt', 
                        href: 'https://www.un.org/osaa/content/challenging-global-narrative-on-africas-debt' 
                      }
                    ].map((resource, idx) => {
                      const Icon = resource.icon
                      return (
                        <a
                          key={idx}
                          href={resource.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-gray-600 hover:text-orange-500 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span>{resource.label}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Share Panel */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Share2 className="w-4 h-4 text-gray-400" />
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Share
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" aria-label="Share on LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors" aria-label="Share on Twitter">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors" aria-label="Email">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button onClick={copyLink} className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors" aria-label="Copy link">
                    <Link2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6 border-b">
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-auto block p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4">
                <ul className="space-y-2 mb-6">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.id
                    const isResources = item.id === 'resources'
                    return (
                      <li key={item.id}>
                        <button
                          onClick={(e) => handleClick(e, item.href, item.id, item.isExternal)}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-colors w-full text-left ${
                            isActive || (isResources && showResources)
                              ? 'bg-blue-50 border-l-4 border-blue-500' 
                              : 'hover:bg-gray-50'
                          }`}
                          aria-label={item.label}
                        >
                          <Icon className="w-5 h-5 text-[#003366]" />
                          <span className="text-sm font-medium text-gray-700 hover:text-[#003366] flex-1">{item.label}</span>
                          {isResources && (
                            <motion.div
                              animate={{ rotate: showResources ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </motion.div>
                          )}
                          {item.isExternal && (
                            <Link2 className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>

                {/* Resource Links - Collapsible */}
                {showResources && (
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="space-y-2">
                      {[
                        { 
                          icon: BarChart3, 
                          label: 'Solving Paradoxes of Development', 
                          href: 'https://www.un.org/osaa/content/solving-paradoxes-development-africa-financing-energy-and-food-systems' 
                        },
                        { 
                          icon: GraduationCap, 
                          label: 'Online Course: Peace & Development Nexus', 
                          href: 'https://www.un.org/osaa/peace-development-course' 
                        },
                        { 
                          icon: FileDown, 
                          label: 'Planning Guide', 
                          href: 'https://www.un.org/osaa/content/peace-and-development-nexus-africa-governance-financing-and-country-systems-planning-guide' 
                        },
                        { 
                          icon: FileText, 
                          label: 'Challenging Global Narrative on Debt', 
                          href: 'https://www.un.org/osaa/content/challenging-global-narrative-on-africas-debt' 
                        }
                      ].map((resource, idx) => {
                        const Icon = resource.icon
                        return (
                          <a
                            key={idx}
                            href={resource.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-gray-600 hover:text-orange-500 transition-colors"
                          >
                            <Icon className="w-4 h-4 text-gray-400" />
                            <span>{resource.label}</span>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                )}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default SidebarNavigation
