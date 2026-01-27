import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, X } from 'lucide-react'

/**
 * Multi-select component that mimics Streamlit's multiselect behavior
 */
const MultiSelect = ({ 
  label, 
  options = [], 
  value = [], 
  onChange, 
  placeholder = "Choose options",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggle = (option) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option]
    onChange(newValue)
  }

  const handleRemove = (option, e) => {
    e.stopPropagation()
    onChange(value.filter(v => v !== option))
  }

  const displayText = value.length > 0 
    ? `${value.length} selected` 
    : placeholder

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 border rounded-md cursor-pointer bg-white text-gray-900 flex items-center justify-between ${
          isOpen 
            ? 'border-blue-500 ring-2 ring-blue-500' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <span className={value.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
          {displayText}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-gray-500 text-sm">No options available</div>
          ) : (
            <>
              {options.map((option) => {
                const isSelected = value.includes(option)
                return (
                  <div
                    key={option}
                    onClick={() => handleToggle(option)}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-50 flex items-center justify-between ${
                      isSelected ? 'bg-blue-50' : ''
                    }`}
                  >
                    <span className="text-sm text-gray-900">{option}</span>
                    {isSelected && (
                      <span className="text-blue-600 text-sm">✓</span>
                    )}
                  </div>
                )
              })}
            </>
          )}
        </div>
      )}

      {/* Selected tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map((option) => (
            <span
              key={option}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
            >
              {option}
              <button
                type="button"
                onClick={(e) => handleRemove(option, e)}
                className="hover:text-blue-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiSelect

