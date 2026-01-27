import React from 'react'
import { motion } from 'framer-motion'

const PathForwardSection = () => {
  const timelines = [
    {
      period: '0-12',
      unit: 'MONTHS',
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      badgeBg: 'bg-red-500',
      actions: [
        {
          title: 'Improve Transparency',
          items: [
            { label: 'Actions:', text: '• Publish execution summaries\n• Disclose reallocations' },
            { label: 'Rationale:', text: 'Transparency constrains discretion' }
          ]
        },
        {
          title: 'Protect Priorities',
          items: [
            { label: 'Actions:', text: '• Define priority sectors' },
            { label: 'Rationale:', text: 'Composition stability' }
          ]
        },
        {
          title: 'Strengthen Ex-Ante Controls',
          items: [
            { label: 'Actions:', text: '• No spending without budget cover' },
            { label: 'Rationale:', text: 'Weak controls drive variance' }
          ]
        }
      ]
    },
    {
      period: '1-3',
      unit: 'YEARS',
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-500',
      badgeBg: 'bg-orange-500',
      actions: [
        {
          title: 'PFM System Strengthening',
          items: [
            { label: 'Actions:', text: '• Expand IFMIS\n• Introduce commitment controls\n• Strengthen TSA' },
            { label: 'Rationale:', text: 'Stronger systems reduce discretionary reallocations' }
          ]
        },
        {
          title: 'Sectoral Budget Safeguards',
          items: [
            { label: 'Actions:', text: '• Formal approval for major shifts\n• Ministry-level accountability' },
            { label: 'Rationale:', text: 'Protects policy intent' }
          ]
        }
      ]
    },
    {
      period: '3-5',
      unit: 'YEARS',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      badgeBg: 'bg-green-500',
      actions: [
        {
          title: 'Regional Maturity',
          items: [
            { label: 'Outcome:', text: '• More predictable budgets\n• Fewer extreme execution deviations' },
            { label: 'Analytical Signal:', text: 'Sustained improvements in execution and composition stability' }
          ]
        },
        {
          title: 'Stable Fiscal Space',
          items: [
            { label: 'Outcome:', text: '• Credible multi-year planning' }
          ]
        },
        {
          title: 'Trust & Confidence',
          items: [
            { label: 'Outcome:', text: '• Stronger citizen confidence' }
          ]
        }
      ]
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#003366] mb-10"
        >
          THE PATH FORWARD: Evidence-Based Recommendations
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {timelines.map((timeline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border-l-4 ${timeline.borderColor} ${timeline.bgColor} p-6 rounded-r-xl`}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className={`${timeline.badgeBg} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm`}>
                  {timeline.period}
                </div>
                <div className="text-sm font-semibold text-gray-700">{timeline.unit}</div>
              </div>

              <div className="space-y-6">
                {timeline.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className={actionIndex < timeline.actions.length - 1 ? 'mb-6 pb-6 border-b border-gray-300' : ''}>
                    <div className="font-bold text-base text-[#003366] mb-3">{action.title}</div>
                    <div className="space-y-3 text-sm">
                      {action.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-gray-700">
                          {item.label && <strong className="text-[#003366]">{item.label} </strong>}
                          <div className="mt-1 whitespace-pre-line">{item.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PathForwardSection

