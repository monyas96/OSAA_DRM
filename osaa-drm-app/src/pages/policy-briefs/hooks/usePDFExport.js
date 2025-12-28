import { useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Helper function to compress image data
const compressImage = (dataUrl, quality = 0.85, maxWidth = 1920) => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          // Resize if too large
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }

          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Could not get canvas context'))
            return
          }

          ctx.drawImage(img, 0, 0, width, height)

          // Convert to JPEG with compression
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
          if (compressedDataUrl && compressedDataUrl.length > 0) {
            resolve(compressedDataUrl)
          } else {
            reject(new Error('Failed to compress image'))
          }
        } catch (err) {
          reject(err)
        }
      }
      
      img.onerror = () => {
        reject(new Error('Failed to load image for compression'))
      }
      
      img.src = dataUrl
    } catch (error) {
      reject(error)
    }
  })
}

// Method 1: Browser Print API (Most Reliable)
const exportUsingPrintAPI = (filename) => {
  console.log('Using Browser Print API...')
  
  // Create print styles
  const printStyles = `
    <style>
      @media print {
        @page {
          size: A4;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
        }
        .no-print {
          display: none !important;
        }
        button, .fixed {
          display: none !important;
        }
      }
    </style>
  `
  
  // Add print styles to head
  const styleSheet = document.createElement('style')
  styleSheet.textContent = printStyles
  document.head.appendChild(styleSheet)
  
  // Trigger print dialog
  window.print()
  
  // Clean up after a delay
  setTimeout(() => {
    document.head.removeChild(styleSheet)
  }, 1000)
  
  return true
}

// Method 2: jsPDF with html() method (Newer approach)
const exportUsingJSPDFHtml = async (element, filename) => {
  console.log('Using jsPDF html() method...')
  
  try {
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    // Use html() method which is better for complex layouts
    await pdf.html(element, {
      callback: (doc) => {
        doc.save(`${filename}.pdf`)
      },
      x: 0,
      y: 0,
      width: 210, // A4 width in mm
      windowWidth: element.scrollWidth,
      html2canvas: {
        scale: 0.5, // Lower scale for better compatibility
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
      }
    })
    
    return true
  } catch (error) {
    console.error('jsPDF html() method failed:', error)
    throw error
  }
}

// Method 3: Improved html2canvas approach (Current method, enhanced)
const exportUsingHtml2Canvas = async (element, filename) => {
  console.log('Using html2canvas method...')
  
  // Scroll to top
  window.scrollTo(0, 0)
  element.scrollTop = 0
  await new Promise(resolve => setTimeout(resolve, 500))

  // Wait for all content to load
  const images = element.querySelectorAll('img')
  const imagePromises = Array.from(images).map(img => {
    if (img.complete) return Promise.resolve()
    return new Promise((resolve) => {
      img.onload = resolve
      img.onerror = resolve
      setTimeout(resolve, 3000)
    })
  })
  await Promise.all(imagePromises)

  // Wait for charts
  const charts = element.querySelectorAll('svg, canvas')
  if (charts.length > 0) {
    await new Promise(resolve => setTimeout(resolve, 3000))
  }

  // Force reflow
  element.offsetHeight

      // Hide iframes temporarily and replace with placeholder (iframes can't be captured)
      const iframes = element.querySelectorAll('iframe')
      const iframePlaceholders = []
      iframes.forEach((iframe, index) => {
        const placeholder = document.createElement('div')
        placeholder.style.width = iframe.offsetWidth + 'px'
        placeholder.style.height = iframe.offsetHeight + 'px'
        placeholder.style.backgroundColor = '#f3f4f6'
        placeholder.style.border = '1px solid #d1d5db'
        placeholder.style.display = 'flex'
        placeholder.style.alignItems = 'center'
        placeholder.style.justifyContent = 'center'
        placeholder.innerHTML = '<p style="color: #6b7280; font-size: 14px;">Chart loaded from Streamlit</p>'
        placeholder.className = 'iframe-placeholder'
        iframe.style.display = 'none'
        iframe.parentNode.insertBefore(placeholder, iframe)
        iframePlaceholders.push({ iframe, placeholder })
      })

      // Capture with html2canvas - let it calculate height automatically
  const canvas = await html2canvas(element, {
    scale: 1,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    // Don't specify dimensions - let html2canvas calculate
    removeContainer: false,
    imageTimeout: 30000,
    allowTaint: true,
    foreignObjectRendering: true,
    ignoreElements: (element) => {
      // Ignore iframes (they can't be captured)
      return element.tagName === 'IFRAME'
    },
    onclone: (clonedDoc) => {
      // Find the cloned element by its ID
      const clonedElement = clonedDoc.getElementById('policy-brief-content') || 
                           clonedDoc.querySelector('[id*="policy-brief"]') ||
                           clonedDoc.body.firstElementChild
      if (clonedElement) {
        clonedElement.style.transform = 'none'
        clonedElement.style.transition = 'none'
        clonedElement.style.animation = 'none'
        clonedElement.style.overflow = 'visible'
        clonedElement.style.height = 'auto'
        clonedElement.style.maxHeight = 'none'
        
        // Hide UI elements
        const noPrintElements = clonedElement.querySelectorAll('button, .fixed, [data-tour="export-button"]')
        noPrintElements.forEach(el => el.style.display = 'none')
        
        // Hide iframes in cloned document
        const clonedIframes = clonedElement.querySelectorAll('iframe')
        clonedIframes.forEach(iframe => {
          iframe.style.display = 'none'
        })
      }
    }
  })

  // Restore iframes
  iframePlaceholders.forEach(({ iframe, placeholder }) => {
    iframe.style.display = ''
    if (placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder)
    }
  })

  console.log('Canvas created:', canvas.width, 'x', canvas.height)

  // Convert to image
  const imgData = canvas.toDataURL('image/png', 1.0)
  
  // Create PDF
  const pdf = new jsPDF('p', 'mm', 'a4')
  const imgWidth = 210 // A4 width
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  const pageHeight = 297 // A4 height
  
  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  while (heightLeft > 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  pdf.save(`${filename}.pdf`)
  return true
}

export const usePDFExport = () => {
  const [isExporting, setIsExporting] = useState(false)

  const exportToPDF = async (elementId = 'policy-brief-content', filename = 'policy-brief', method = 'auto') => {
    setIsExporting(true)
    
    try {
      const element = document.getElementById(elementId)
      if (!element) {
        throw new Error(`Element with id "${elementId}" not found`)
      }

      console.log('Starting PDF export with method:', method)

      // Try methods in order of preference
      // Skip print API for auto method - go straight to PDF generation
      if (method === 'print') {
        try {
          console.log('Attempting Browser Print API...')
          exportUsingPrintAPI(filename)
          setIsExporting(false)
          return true
        } catch (error) {
          console.warn('Print API failed:', error)
          throw error
        }
      }

      // For auto method, try PDF generation methods first
      if (method === 'auto' || method === 'html2canvas') {
        try {
          console.log('Attempting html2canvas method (best for iframes)...')
          await exportUsingHtml2Canvas(element, filename)
          setIsExporting(false)
          return true
        } catch (error) {
          console.warn('html2canvas method failed, trying jsPDF html():', error)
          if (method === 'html2canvas') throw error
        }
      }

      if (method === 'auto' || method === 'jspdf-html') {
        try {
          console.log('Attempting jsPDF html() method...')
          await exportUsingJSPDFHtml(element, filename)
          setIsExporting(false)
          return true
        } catch (error) {
          console.warn('jsPDF html() failed:', error)
          if (method === 'jspdf-html') throw error
        }
      }

      // If all PDF methods fail, show error instead of falling back to print
      throw new Error('All PDF generation methods failed. Please try again or use browser print (Ctrl+P / Cmd+P)')

    } catch (error) {
      console.error('PDF Export Error:', error)
      setIsExporting(false)
      alert(`PDF Export Failed: ${error.message}\n\nYou can use your browser's print function (Ctrl+P / Cmd+P) and select "Save as PDF" as an alternative.`)
      throw error
    }
  }

  return { exportToPDF, isExporting }
}
