import React from 'react'
import SectionHeader from './SectionHeader'
import StreamlitGraphDirectEmbed from '../../../components/StreamlitGraphDirectEmbed'
import PullQuote from '../shared/PullQuote'
import NetFlowLeakDiagram from '../../../components/charts/NetFlowLeakDiagram'

const CrisisSection44 = () => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Crisis: The Reverse Flow"
          subtitle="Why Money Runs Backward from Africa"
          color="purple"
        />
        <div className="prose max-w-none">
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            Africa receives $48 billion in development aid and $54 billion in foreign direct investment annually—a total of $102 billion in external inflows. Yet the continent loses $88.6 billion through illicit financial flows.
          </p>

          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            The net benefit: only $13.4 billion, an <strong>87% leakage rate</strong>.
          </p>

          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            This is the <strong>reverse flow</strong>—money generated in Africa that flows backward out of the continent before it can finance development. The flow happens through systematic mechanisms: trade manipulation, corruption, criminal networks, and financial secrecy. The scale is staggering: $88.6 billion leaves annually, representing 3.7% of GDP lost. West Africa loses 10.3% of GDP, North Africa 2.7%. From 2000 to 2015, cumulative losses reached $836 billion.
          </p>

          {/* Graph 1A: The Net Flow Reality - Vertical Leak Diagram */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-[#003366] mb-3">Graph 1A: The Net Flow Reality</h3>
            <NetFlowLeakDiagram height={700} />
          </div>

          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            The reverse flow operates through <strong>four primary channels:</strong>
          </p>

          {/* Channel 1: Trade Manipulation */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#003366] mb-3">Channel 1: Trade Manipulation</h3>
            <h4 className="text-base font-semibold text-[#003366] mb-3">The Largest Channel</h4>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Companies manipulate trade invoices to shift profits out of Africa. They under-invoice exports, recording sales below true value, and over-invoice imports, claiming higher costs than actual. This allows profits to appear in low-tax jurisdictions rather than where value was created.
            </p>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Trade-based IFFs account for approximately 65% of total outflows, representing roughly $57 billion of the $88.6 billion total. The extractive sector alone loses $40 billion annually to under-invoicing, with gold representing 77% of this mispricing. A mining company might export gold worth $100 million but invoice it at $60 million, with the $40 million difference deposited in offshore accounts. The pattern repeats across oil, diamonds, copper, and agricultural commodities.
            </p>

            {/* Graph 1B: Trade Mispricing */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">Graph 1B: Trade Mispricing by Country</h4>
              <StreamlitGraphDirectEmbed
                indicator="4.4.2.1"
                height={500}
              />
              <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-lg mb-6 border-opacity-50">
                <p className="text-sm text-gray-800">
                  <strong>Key Insight:</strong> Trade mispricing represents the largest single channel of IFFs, with extractive sectors (particularly gold) showing the most significant losses. The systematic nature of these patterns indicates institutional weaknesses in customs and trade verification.
                </p>
              </div>
            </div>
          </div>

          {/* Channel 2: Corruption */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#003366] mb-3">Channel 2: Corruption</h3>
            <h4 className="text-base font-semibold text-[#003366] mb-3">Public Resources Diverted</h4>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Public officials embezzle state funds, demand bribes for contracts, and funnel public wealth into private offshore accounts. A minister awards a $200 million infrastructure contract to a company offering 20% kickbacks. The $40 million bribe flows to foreign accounts while the country gets inferior infrastructure at inflated cost.
            </p>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Corruption contributes significantly to the overall IFF total, with allocation varying by country. High-corruption countries show disproportionate IFF losses. Critically, corruption enables and facilitates other IFF channels—officials protect trade fraud and shelter criminal networks. Countries with weak governance show higher corruption-related outflows concentrated in fragile and resource-rich states.
            </p>

            {/* Graph 1C: Corruption Loss Distribution */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">Graph 1C: Corruption Loss Distribution</h4>
              <StreamlitGraphDirectEmbed
                indicator="4.4.2.4"
                caption="Estimated corruption losses show concentration in fragile and resource-rich states. The gradient reveals that corruption-related IFFs disproportionately affect countries with weak institutions and heavy resource dependence."
                height={600}
              />
              <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-lg mb-6 border-opacity-50">
                <p className="text-sm text-gray-800">
                  <strong>Key Insight:</strong> Corruption-related IFFs are concentrated in countries with weak governance and high resource dependence. The enabling role of corruption—protecting trade fraud and criminal networks—makes it particularly damaging to institutional integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Channel 3: Criminal Networks */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#003366] mb-3">Channel 3: Criminal Networks</h3>
            <h4 className="text-base font-semibold text-[#003366] mb-3">Illicit Economy Flows</h4>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Drug trafficking, smuggling, and other criminal activities generate proceeds that flow out through laundering networks. West African trafficking routes move cocaine from Latin America to Europe, generating billions in proceeds. Nigerian fraud networks operate globally. Wildlife trafficking strips resources while enriching criminals. Each activity generates cash that must be laundered and moved offshore.
            </p>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Criminal proceeds vary dramatically by country. Some countries show significant increases in criminal-related outflows. Drug trafficking routes through West and North Africa generate substantial illicit flows, with patterns shifting based on enforcement and route evolution.
            </p>

            {/* Graph 1D: Criminal Activities Trends */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">Graph 1D: Criminal Activities Trends</h4>
              <StreamlitGraphDirectEmbed
                indicator="4.4.2.3"
                height={500}
              />
              <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-lg mb-6 border-opacity-50">
                <p className="text-sm text-gray-800">
                  <strong>Key Insight:</strong> Criminal networks generate substantial proceeds that must be laundered and moved offshore. The variation across countries and time reflects shifting routes, enforcement patterns, and network adaptations.
                </p>
              </div>
            </div>
          </div>

          {/* Channel 4: Financial Secrecy */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#003366] mb-3">Channel 4: Financial Secrecy</h3>
            <h4 className="text-base font-semibold text-[#003366] mb-3">Enabling All Other Channels</h4>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Financial secrecy jurisdictions provide the infrastructure—shell companies, anonymous accounts, banking secrecy—that makes stolen wealth disappear. A corrupt official can't simply deposit $50 million in their domestic bank account. They need a shell company in a secrecy jurisdiction, a complicit bank, and layered transactions to obscure the origin. Secrecy jurisdictions ranging from traditional offshore havens to major financial centers provide these services.
            </p>

            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              The Financial Secrecy Index tracks transparency levels across African countries. Most countries show improvement with declining secrecy but remain in moderate-risk zones. Some countries experience temporary deterioration in transparency, suggesting political commitment to transparency remains fragile.
            </p>

            {/* Graph 1E: Financial Secrecy Trends */}
            <div className="mb-6">
              <h4 className="text-base font-bold text-[#003366] mb-3">Graph 1E: Financial Secrecy Trends</h4>
              <StreamlitGraphDirectEmbed
                indicator="4.4.4.1"
                height={500}
              />
              <div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-lg mb-6 border-opacity-50">
                <p className="text-sm text-gray-800 mb-3">
                  <strong>Key Insight:</strong> Financial secrecy enables all other IFF channels by providing infrastructure to hide stolen wealth. While most countries show improvement, clustering in moderate secrecy zones indicates significant work remains.
                </p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-100 p-3 rounded border border-gray-200">
                    <div className="text-sm font-semibold text-gray-800 mb-1">High Secrecy</div>
                    <p className="text-xs text-gray-600">70-100: High IFF Risk</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded border border-gray-200">
                    <div className="text-sm font-semibold text-gray-800 mb-1">Moderate Secrecy</div>
                    <p className="text-xs text-gray-600">40-70: Moderate Risk</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded border border-gray-200">
                    <div className="text-sm font-semibold text-gray-800 mb-1">Low Secrecy</div>
                    <p className="text-xs text-gray-600">0-40: Transparent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Country Concentration */}
          <div className="mb-8">
            <h4 className="text-base font-bold text-[#003366] mb-3">Country Concentration</h4>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              The reverse flow concentrates heavily in three countries. Nigeria accounts for $41 billion (47% of total), Egypt $17.5 billion (20%), and South Africa $14.1 billion (16%). Together, these three countries represent 82% of total IFF outflows. This concentration reflects both economic size and institutional weaknesses that create outsized vulnerabilities.
            </p>
          </div>

          {/* Graph 1F: Regional IFF Intensity */}
          <div className="mb-8">
            <h4 className="text-base font-bold text-[#003366] mb-3">Graph 1F: Regional IFF Intensity</h4>
            <div className="bg-slate-50 border-l-4 border-slate-300 p-6 rounded-r-lg mb-6 border-opacity-50">
              <h5 className="font-semibold text-gray-900 mb-4">IFFs as Percentage of GDP by Region</h5>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                  <div className="text-sm font-semibold text-gray-700 mb-2">West Africa</div>
                  <div className="text-2xl font-bold text-gray-900">10.3%</div>
                  <div className="text-xs text-gray-600 mt-1">of GDP</div>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Africa Average</div>
                  <div className="text-2xl font-bold text-gray-900">3.7%</div>
                  <div className="text-xs text-gray-600 mt-1">of GDP</div>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                  <div className="text-sm font-semibold text-gray-700 mb-2">North Africa</div>
                  <div className="text-2xl font-bold text-gray-900">2.7%</div>
                  <div className="text-xs text-gray-600 mt-1">of GDP</div>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Global Average</div>
                  <div className="text-2xl font-bold text-gray-900">~2.0%</div>
                  <div className="text-xs text-gray-600 mt-1">of GDP</div>
                </div>
              </div>
              <p className="text-sm text-gray-800 mt-4">
                <strong>Key Insight:</strong> Regional variation in IFF intensity reveals West Africa as the most vulnerable region, losing 10.3% of GDP annually—nearly three times the continental average. Africa's 3.7% average represents one of the highest IFF rates globally.
              </p>
            </div>
          </div>

          {/* Quote Box */}
          <div className="my-12">
            <PullQuote
              quote="Africa receives $102 billion but loses $88.6 billion to illicit flows—an 87% leakage rate. The continent is not resource-poor. It's hemorrhaging resources through institutional weaknesses that enable systematic theft. The solution is not more aid. It's stopping the reverse flow."
              color="purple"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CrisisSection44

