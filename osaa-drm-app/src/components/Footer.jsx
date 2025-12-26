import React from 'react'
import {
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Globe,
  Shield,
  Eye,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

const Footer = () => {
  const footerSections = [
    {
      title: 'Navigation',
      links: [
        { label: 'Introduction', href: '#hero' },
        { label: 'Four Pillars', href: '#pillars' },
        { label: 'Financing Paradox', href: '#paradox' },
        { label: 'Game Changer', href: '#gamechanger' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Planning Guide', href: '#' },
        { label: 'Online Course', href: '#' },
        { label: 'Reports', href: '#' },
        { label: 'Data Dashboard', href: '#' }
      ]
    },
    {
      title: 'About',
      links: [
        { label: 'OSAA', href: 'https://www.un.org/osaa' },
        { label: 'DRM Framework', href: '#' },
        { label: 'Contact', href: '#contact' },
        { label: 'Privacy Policy', href: '#' }
      ]
    }
  ]

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Facebook, href: '#', label: 'Facebook' }
  ]

  return (
    <footer className="bg-osaa-blue text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4" />
                <span>osaa@un.org</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (212) 963-1234</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4" />
                <span>New York, USA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>© 2024 OSAA. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>English</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Accessibility</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

