import React from 'react'
import SectionHeader from './SectionHeader'
import StreamlitGraphDirectEmbed from '../../../components/StreamlitGraphDirectEmbed''

const CoreInsightSection44 = () => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Why the Flow Runs Backward"
          subtitle="Institutional Weakness Across Four Dimensions"
          color="orange"
        />
        <div className="prose max-w-none">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            The reverse flow is not inevitable—it results from systematic institutional failures that create vulnerabilities across four dimensions that reinforce each other.
          </p>

          {/* Dimension 1: Weak Customs and Tax Capacity */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-[#003366] mb-2">1. Weak Customs and Tax Capacity</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Trade mispricing succeeds because customs officials lack tools to verify invoice values. No regional benchmark price databases exist to flag suspicious transactions. Pre-shipment inspection remains limited. Penalties for detected mispricing are weak and rarely enforced. When a mining company under-invoices gold exports by $40 million, customs officials have no reference price to challenge the declared value. Even when suspicious transactions are identified, resource constraints prevent thorough investigation.
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              <strong>Result:</strong> $57 billion flows out annually through trade manipulation that customs systems cannot detect or stop.
            </p>
          </div>

          {/* Dimension 2: Governance Failures */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-[#003366] mb-2">2. Governance Failures</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Corruption thrives in environments of weak rule of law where asset declaration enforcement is limited, procurement processes are opaque, and anti-corruption agencies operate under-resourced and politically constrained. When public officials face no consequences for unexplained wealth, corruption becomes systematic rather than exceptional. Most African countries score below 0.4 on rule of law indices, creating permissive environments where corrupt officials operate with impunity.
            </p>

            {/* Graph 2A: Institutional Weakness */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">Graph 2A: Institutional Weakness - Three Dimensions</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h5 className="font-bold text-[#003366] mb-2">Rule of Law (WJP Factor 6)</h5>
                  <StreamlitGraphDirectEmbed
                    indicator="4.4.4.1"
                    height={400}
                  />
                </div>
                <div>
                  <h5 className="font-bold text-[#003366] mb-2">Control of Corruption (World Bank WGI)</h5>
                  <StreamlitGraphDirectEmbed
                    indicator="4.4.3.1"
                    height={400}
                  />
                </div>
                <div>
                  <h5 className="font-bold text-[#003366] mb-2">CPIA Transparency & Accountability</h5>
                  <StreamlitGraphDirectEmbed
                    indicator="4.4.4.1"
                    height={400}
                  />
                </div>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm text-gray-800">
                  <strong>Key Insight:</strong> Institutional capacity remains weak across three dimensions. Most countries score below adequate thresholds on rule of law, corruption control, and transparency—creating compounding vulnerabilities that enable IFF flows.
                </p>
              </div>
            </div>
          </div>

          {/* Dimension 3: Limited Financial Intelligence */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-[#003366] mb-2">3. Limited Financial Intelligence</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Criminal networks operate because financial intelligence units remain under-resourced with weak suspicious transaction reporting systems. Cross-border cooperation is limited. Money laundering prosecutions are rare. A drug trafficking organization can move millions through the banking system because transaction monitoring is weak, suspicious activity goes unreported, and even when flagged, rarely leads to prosecution.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Banks file minimal suspicious transaction reports because penalties for non-compliance are weak and privacy laws protect criminals. Financial intelligence units lack staff and technology to analyze patterns. Regional cooperation remains nascent, allowing criminals to exploit jurisdictional gaps.
            </p>

            {/* Graph 2B: Tax System Coverage Gaps */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">Graph 2B: Tax System Coverage Gaps</h4>
              <StreamlitGraphDirectEmbed
                indicator="4.4.2.2"
                height={500}
              />
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
                <p className="text-sm text-gray-800">
                  <strong>Key Insight:</strong> Taxpayer registration coverage remains low and stagnant, creating expanding opportunities for evasion. Financial intelligence systems lack the capacity to detect and prosecute money laundering effectively.
                </p>
              </div>
            </div>
          </div>

          {/* Dimension 4: Transparency Deficits */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-[#003366] mb-2">4. Transparency Deficits</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Secrecy enables all channels because beneficial ownership registries remain limited. Automatic tax information exchange is weak. Offshore centers offer easy anonymity. Asset recovery becomes nearly impossible without transparency about who owns what and where wealth is held.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              When a corrupt official steals $50 million and moves it offshore through shell companies, the lack of beneficial ownership information makes recovery impossible. The money disappears into anonymous corporate structures. Even when criminal activity is proven, identifying and freezing assets requires transparency that doesn't exist.
            </p>
          </div>

          {/* The Compounding Effect */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 p-6 rounded-xl mt-8">
            <h3 className="text-lg font-bold text-orange-900 mb-3">The Compounding Effect</h3>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              These failures reinforce each other in a vicious cycle. Weak customs enable trade fraud. Low detection rates mean criminals operate freely. Corruption means officials facilitate IFFs rather than combat them. Secrecy ensures stolen wealth disappears. Without accountability, the cycle continues and intensifies.
            </p>
            <p className="text-sm text-gray-800 leading-relaxed">
              A customs official who might detect trade fraud accepts bribes to ignore it. A financial intelligence unit that might identify suspicious transactions lacks resources and political support. A prosecutor who might charge criminals faces political interference. Each institutional weakness compounds the others.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoreInsightSection44

