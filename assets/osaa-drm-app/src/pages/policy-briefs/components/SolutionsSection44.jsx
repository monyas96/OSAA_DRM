import React from 'react'
import SectionHeader from './SectionHeader'
import SolutionsBanner from '../shared/SolutionsBanner'
import StrategyCard from '../shared/StrategyCard'
import SubsectionCard from '../shared/SubsectionCard'

const SolutionsSection44 = () => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SolutionsBanner
          title="Solutions: Reversing the Flow"
          subtitle="Strategic Priorities to Stop the Hemorrhage"
          color="teal"
        />
        <div className="prose max-w-none">
          <p className="text-base text-slate-700 leading-relaxed mb-8">
            Stopping the reverse flow requires comprehensive institutional strengthening across all four channels simultaneously. Addressing one channel while ignoring others simply redirects the flow rather than stopping it. The strategy must be integrated and sustained.
          </p>

          {/* Strategic Priority 1: Close the Trade Channel */}
          <StrategyCard
            number="1"
            title="Close the Trade Channel"
            target="Reduce trade mispricing by 50%, recovering approximately $28 billion annually"
            description="Trade-based IFFs represent the largest channel at roughly $57 billion annually. Reducing this by half requires transforming customs capacity, implementing transfer pricing transparency, and establishing beneficial ownership disclosure."
            color="blue"
          >
            <SubsectionCard number="1" title="Customs Capacity Transformation" color="blue">
              <p>
                Customs authorities need advanced valuation training to identify suspicious invoicing patterns. Risk-based targeting systems must flag high-risk transactions for detailed examination. Pre-shipment inspection for extractive sector exports should verify quantities and qualities before goods leave ports. Regional benchmark price databases provide reference values for major commodities, making under-invoicing immediately visible.
              </p>
            </SubsectionCard>

            <SubsectionCard number="2" title="Transfer Pricing Transparency" color="blue">
              <p>
                Transfer pricing transparency requires country-by-country reporting from multinationals showing revenue, profit, employees, and taxes paid in each jurisdiction. Transfer pricing documentation requirements force companies to justify intra-group pricing. Regional information sharing allows tax authorities to compare declarations across countries and identify inconsistencies.
              </p>
            </SubsectionCard>

            <SubsectionCard number="3" title="Beneficial Ownership Disclosure" color="blue">
              <p>
                Beneficial ownership disclosure establishes central registries identifying the natural persons who ultimately own and control companies. Cross-referencing trade with ownership data reveals when the same individuals control both exporting and importing entities, a common trade fraud structure. Public access to ownership information enables civil society and journalism to identify suspicious patterns.
              </p>
            </SubsectionCard>
          </StrategyCard>

          {/* Strategic Priority 2: Combat Corruption */}
          <StrategyCard
            number="2"
            title="Combat Corruption"
            target="Reduce corruption-related outflows by 60%"
            description="Corruption enables and facilitates other IFF channels. Reducing corruption requires enforcement with consequences, procurement reform, and effective asset recovery."
            color="red"
          >
            <SubsectionCard number="1" title="Enforcement with Consequences" color="red">
              <p>
                Enforcement must include high-level prosecutions demonstrating that no one is above the law. Mandatory asset declarations for public officials create baseline data for lifestyle audits that flag unexplained wealth. Whistleblower protection encourages reporting from inside corrupt networks. Each successful prosecution creates deterrence and signals political commitment.
              </p>
            </SubsectionCard>

            <SubsectionCard number="2" title="Procurement Reform" color="red">
              <p>
                Procurement reform implements open contracting where all tender documents, bids, awards, and contracts are publicly accessible. Independent oversight bodies monitor major contracts. Digital platforms reduce opportunities for manipulation. Civil society monitoring provides external scrutiny. When procurement is transparent, corruption becomes visible and costly.
              </p>
            </SubsectionCard>

            <SubsectionCard number="3" title="Asset Recovery" color="red">
              <p>
                Asset recovery requires dedicated units with forensic accountants and international cooperation networks. Non-conviction based forfeiture allows asset seizure even when criminal conviction proves difficult. Visible reuse of recovered assets—funding schools or hospitals—builds public support for anti-corruption efforts.
              </p>
            </SubsectionCard>
          </StrategyCard>

          {/* Strategic Priority 3: Disrupt Criminal Networks */}
          <StrategyCard
            number="3"
            title="Disrupt Criminal Networks"
            target="Reduce criminal outflows by 40%"
            description="Criminal networks generate billions that must be laundered and moved offshore. Disruption requires strengthened financial intelligence, aggressive anti-money laundering enforcement, and regional cooperation."
            color="orange"
          >
            <SubsectionCard number="1" title="Strengthened Financial Intelligence" color="orange">
              <p>
                Financial intelligence units need adequate resources—staff, technology, training—to analyze transaction patterns. Transaction monitoring systems should flag suspicious activity automatically. Banks and other financial institutions must file suspicious transaction reports knowing penalties for non-compliance are real. Regional intelligence sharing allows tracking of funds across borders.
              </p>
            </SubsectionCard>

            <SubsectionCard number="2" title="Anti-Money Laundering Enforcement" color="orange">
              <p>
                Anti-money laundering enforcement requires beneficial ownership information for all bank accounts, enhanced due diligence for high-risk transactions, and systems to detect trade-based money laundering where criminals manipulate trade invoices to move funds. Aggressive prosecution sends the message that laundering carries real consequences.
              </p>
            </SubsectionCard>

            <SubsectionCard number="3" title="Regional Cooperation" color="orange">
              <p>
                Regional cooperation enables joint operations targeting trafficking networks, intelligence sharing about routes and methods, coordinated border control to prevent smuggling, and extradition agreements ensuring criminals cannot escape to neighboring countries. Criminal networks operate regionally; the response must be equally coordinated.
              </p>
            </SubsectionCard>
          </StrategyCard>

          {/* Strategic Priority 4: End Financial Secrecy */}
          <StrategyCard
            number="4"
            title="End Financial Secrecy"
            target="All countries achieve transparency (Financial Secrecy Index below 40)"
            description="Financial secrecy enables all other channels. Ending secrecy requires beneficial ownership transparency, automatic information exchange, country-by-country reporting, and sanctions on secrecy jurisdictions."
            color="teal"
          >
            <SubsectionCard number="1" title="Beneficial Ownership Transparency" color="teal">
              <p>
                Beneficial ownership transparency means public central registries with no anonymous shell companies permitted. Verification of ownership information ensures accuracy. Real-time updates prevent companies from hiding behind outdated records. When every company's ownership is public, shell companies useful only for hiding wealth become worthless.
              </p>
            </SubsectionCard>

            <SubsectionCard number="2" title="Automatic Information Exchange" color="teal">
              <p>
                Automatic information exchange implements the OECD Common Reporting Standard where countries share tax information without requests. Tax information exchange with all jurisdictions closes gaps. Access to leak databases helps authorities identify offshore accounts.
              </p>
            </SubsectionCard>

            <SubsectionCard number="3" title="Country-by-Country Reporting" color="teal">
              <p>
                Country-by-country reporting requires multinationals to disclose revenue, profit, and tax per country publicly. This data enables transfer pricing audits by revealing where profits are declared relative to where economic activity occurs. A company showing huge profits in tax havens but losses where it actually operates faces scrutiny.
              </p>
            </SubsectionCard>

            <SubsectionCard number="4" title="Sanctioning Secrecy Jurisdictions" color="teal">
              <p>
                Sanctioning secrecy jurisdictions means identifying non-cooperative jurisdictions that refuse transparency. Withholding taxes on payments to tax havens reduces the benefit of profit shifting. Market access restrictions for financial institutions in secrecy jurisdictions create incentives for reform.
              </p>
            </SubsectionCard>
          </StrategyCard>
        </div>
      </div>
    </section>
  )
}

export default SolutionsSection44

