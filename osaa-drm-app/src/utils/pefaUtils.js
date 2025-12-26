/**
 * PEFA Score Conversion Utilities
 * Replicates the logic from universal_viz.py create_pefa_heatmap
 */

/**
 * Convert percentage value to PEFA score (1-4)
 * A (4): 95-105%, B (3): 90-110%, C (2): 85-115%, D (1): <85% or >115%
 */
export const convertToPefaScore = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return null
  }
  
  const percent = parseFloat(value)
  
  // If value is already 1-4, return as is
  if (percent >= 1 && percent <= 4) {
    return Math.round(percent)
  }
  
  // Convert from percentage to PEFA score
  if (percent >= 95 && percent <= 105) {
    return 4 // A
  } else if ((percent >= 90 && percent < 95) || (percent > 105 && percent <= 110)) {
    return 3 // B
  } else if ((percent >= 85 && percent < 90) || (percent > 110 && percent <= 115)) {
    return 2 // C
  } else {
    return 1 // D
  }
}

/**
 * Get PEFA letter grade from score
 */
export const getPefaLetter = (score) => {
  const mapping = { 4: 'A', 3: 'B', 2: 'C', 1: 'D' }
  return mapping[score] || 'N/A'
}

/**
 * Get PEFA color from score
 */
export const getPefaColor = (score) => {
  const colors = {
    4: '#003366',  // Deep Blue (A)
    3: '#3366CC',  // Medium Blue (B)
    2: '#99CCFF',  // Light Blue (C)
    1: '#F26C2B'   // Orange (D)
  }
  return colors[score] || '#CCCCCC'
}

/**
 * Convert array of data to PEFA scores
 */
export const convertDataToPefaScores = (data) => {
  return data.map(row => ({
    ...row,
    pefa_score: convertToPefaScore(row.value),
    pefa_letter: getPefaLetter(convertToPefaScore(row.value))
  })).filter(row => row.pefa_score !== null)
}

