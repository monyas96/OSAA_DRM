import React from 'react'
import { Home, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BreadcrumbNavigation = ({ 
  currentView, 
  onBackToIntroduction, 
  onBackToFramework,
  onViewSwitch 
}) => {
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 py-4 shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Breadcrumb */}
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <button 
                onClick={onBackToIntroduction}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                aria-label="Back to introduction"
              >
                <Home size={16} />
                <span className="hidden md:inline">Introduction</span>
              </button>
            </li>
            <ChevronRight size={16} className="text-gray-400" />
            <li>
              <button 
                onClick={onBackToFramework}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Framework Dashboard
              </button>
            </li>
            {currentView && (
              <>
                <ChevronRight size={16} className="text-gray-400" />
                <li className="text-gray-700 font-medium capitalize">
                  {currentView} View
                </li>
              </>
            )}
          </ol>

          {/* View Switcher - Only show Explanatory button */}
          {currentView && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewSwitch('explanatory')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'explanatory'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Explanatory View"
              >
                Explanatory
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default BreadcrumbNavigation

