import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
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
  Library,
  Book,
  FileText,
  ExternalLink,
  Bell,
  Database
} from 'lucide-react'

const ResourcePanel = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const handleFrameworkClick = () => {
    navigate('/streamlit/theme-4')
    onClose()
  }

  const resources = [
    {
      icon: Database,
      title: 'Explore DRM Framework',
      type: 'Interactive Dashboard',
      onClick: handleFrameworkClick,
      isInternal: true
    },
    {
      icon: FileDown,
      title: 'Full Planning Guide',
      type: 'PDF Download',
      href: '#'
    },
    {
      icon: GraduationCap,
      title: 'Online Course',
      type: 'Learning Platform',
      href: '#'
    },
    {
      icon: BarChart3,
      title: 'Related Reports',
      type: 'Data & Analysis',
      href: '#'
    },
    {
      icon: Globe,
      title: 'OSAA Homepage',
      type: 'Official Website',
      href: 'https://www.un.org/osaa'
    }
  ]

  const publications = [
    { icon: Book, title: 'DRM Framework Overview', author: 'OSAA', year: '2024' },
    { icon: FileText, title: 'Policy Brief: Financing Development', author: 'OSAA', year: '2024' },
    { icon: BarChart3, title: 'Data Dashboard Guide', author: 'OSAA', year: '2024' }
  ]

  const externalLinks = [
    { name: 'African Union', url: 'https://au.int' },
    { name: 'UNECA', url: 'https://www.uneca.org' },
    { name: 'World Bank', url: 'https://www.worldbank.org' }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            data-tour="resource-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 border-b sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Library className="w-6 h-6 text-osaa-blue" />
                  <h2 className="text-2xl font-bold text-osaa-blue">Additional Resources</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Quick Resources */}
              <section>
                <h3 className="text-lg font-semibold text-osaa-blue mb-4">Quick Resources</h3>
                <div className="space-y-3">
                  {resources.map((resource, index) => {
                    const Icon = resource.icon
                    const Component = resource.isInternal ? motion.button : motion.a
                    const props = resource.isInternal
                      ? { onClick: resource.onClick }
                      : { href: resource.href, target: resource.href?.startsWith('http') ? '_blank' : undefined, rel: resource.href?.startsWith('http') ? 'noopener noreferrer' : undefined }
                    
                    return (
                      <Component
                        key={index}
                        {...props}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-4 p-4 bg-osaa-light-gray rounded-lg hover:bg-osaa-blue/10 transition-colors group w-full text-left"
                      >
                        <div className="w-12 h-12 bg-osaa-blue rounded-lg flex items-center justify-center group-hover:bg-osaa-orange transition-colors">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{resource.title}</p>
                          <p className="text-sm text-gray-500">{resource.type}</p>
                        </div>
                        {!resource.isInternal && <ExternalLink className="w-5 h-5 text-gray-400" />}
                      </Component>
                    )
                  })}
                </div>
              </section>

              {/* Related Publications */}
              <section>
                <h3 className="text-lg font-semibold text-osaa-blue mb-4">Related Publications</h3>
                <div className="space-y-3">
                  {publications.map((pub, index) => {
                    const Icon = pub.icon
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-osaa-blue transition-colors"
                      >
                        <Icon className="w-6 h-6 text-osaa-teal mt-1" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 mb-1">{pub.title}</p>
                          <p className="text-sm text-gray-500">{pub.author} • {pub.year}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* External Links */}
              <section>
                <h3 className="text-lg font-semibold text-osaa-blue mb-4">External Links</h3>
                <div className="space-y-2">
                  {externalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 text-osaa-blue hover:bg-osaa-light-gray rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </section>

              {/* Newsletter Signup */}
              <section className="bg-osaa-light-gray rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="w-6 h-6 text-osaa-orange" />
                  <h3 className="text-lg font-semibold text-osaa-blue">Newsletter Signup</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Stay updated with the latest DRM insights and policy updates
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-osaa-blue"
                  />
                  <button
                    type="submit"
                    className="w-full bg-osaa-blue text-white py-2 rounded-lg font-semibold hover:bg-osaa-teal transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </section>

              {/* Share Section */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Share2 className="w-6 h-6 text-osaa-blue" />
                  <h3 className="text-lg font-semibold text-osaa-blue">Share</h3>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                    <span className="text-sm">Twitter</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Link2 className="w-5 h-5" />
                    <span className="text-sm">Copy</span>
                  </button>
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ResourcePanel

