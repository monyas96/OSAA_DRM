/**
 * Unified Color Scheme for Policy Briefs
 * 
 * Since Streamlit graphs have their own colors, we use a muted, neutral palette
 * to avoid visual fatigue and create a cohesive design.
 * 
 * Strategy: Single accent color (slate) with gray variations
 */

export const unifiedColors = {
  // Primary accent - muted slate (replaces all bright colors)
  primary: {
    bg: 'bg-slate-50',
    border: 'border-slate-300',
    text: 'text-slate-900',
    icon: 'text-slate-600',
    badge: 'bg-slate-600',
    gradient: 'from-slate-700 to-slate-800',
    light: 'bg-slate-100',
    medium: 'bg-slate-200'
  },
  
  // Neutral grays for variety (very subtle)
  neutral: {
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    text: 'text-gray-900',
    light: 'bg-gray-100'
  },
  
  // For emphasis only (use sparingly)
  accent: {
    bg: 'bg-slate-100',
    border: 'border-slate-400',
    text: 'text-slate-800'
  }
}

/**
 * Map old color names to unified scheme
 * All colors now map to the same muted palette
 */
export const colorMap = {
  blue: unifiedColors.primary,
  orange: unifiedColors.primary,
  teal: unifiedColors.primary,
  purple: unifiedColors.primary,
  red: unifiedColors.primary,
  gray: unifiedColors.neutral,
  default: unifiedColors.primary
}

/**
 * Get unified color classes for a component
 */
export const getUnifiedColor = (colorName = 'default') => {
  return colorMap[colorName] || unifiedColors.primary
}

