import React from 'react'
import SectionHeader from './SectionHeader'
import LeakageChannel from './LeakageChannel'
import StatsCalloutBox from './StatsCalloutBox'
import PullQuote from '../shared/PullQuote'

const CrisisSection42 = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Crisis: Where Revenue Meets Reality"
          subtitle="Why Africa's Tax Systems Bleed Money—and What It Costs"
          color="blue"
        />
      <div className="prose max-w-none">
        <p className="text-base text-slate-700 leading-relaxed mb-6">
          Domestic resource mobilization (DRM) is no longer a technical reform agenda. It is <strong>the central macroeconomic strategy</strong> for stability, sovereignty, and development impact. Yet Africa faces a critical reality: tax systems leak an estimated <strong>$120-145 billion annually</strong>—revenue that should finance hospitals, schools, infrastructure, and social protection, but instead flows out through weak collection, narrow enforcement, and structural inefficiency.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-6">
          This leakage is not the result of economic poverty—it stems from <strong>institutional weakness</strong>. The gap between what African countries collect and what they could collect represents a failure of state capacity that undermines development financing, weakens government credibility, and perpetuates dependence on external resources.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-8">
          <strong>The stakes are existential.</strong> Strengthening DRM means regaining control over economic and financial flows, restoring the social contract, and financing priorities at scale—from infrastructure and energy to education and social protection. The question is no longer whether Africa can afford DRM reform, but <strong>whether it can afford not to</strong>.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-8">
          Tax leakage operates through three primary channels:
        </p>

        {/* Leakage Channel 1 */}
        <LeakageChannel 
          number="1" 
          title="The Collection Leak: Inefficiency in Enforcement"
          color="red"
        >
          <p className="mb-4">
            Despite decades of tax reform, most African countries collect only <strong>65-75% of their estimated tax capacity</strong>. Tax effort—the ratio of actual revenue to potential revenue—averages just <strong>0.72</strong> across the continent. This means that even when tax laws exist, even when economic activity is taxable, <strong>28% of potential revenue simply leaks out</strong> through weak administration, insufficient enforcement, corruption, and compliance failures.
          </p>
          <p className="mb-4">
            <strong>Evidence:</strong> Tax effort data shows the majority of African countries operate between 0.50 and 0.80, meaning they collect between half and four-fifths of what comparable economies achieve. The leak isn't random—it's systematic. Countries with weak revenue authorities, high corruption, and political interference consistently show the largest collection gaps.
          </p>
          <p className="mb-4">
            <strong>The cost:</strong> If African countries improved tax effort from 0.72 to 0.90 (still below perfect efficiency), they would capture an additional <strong>$60-80 billion annually</strong> without changing a single tax rate or introducing new taxes. The money exists; the systems to collect it do not.
          </p>
        </LeakageChannel>

        {/* Leakage Channel 2 */}
        <LeakageChannel 
          number="2" 
          title="The Elasticity Leak: Systems That Can't Scale"
          color="orange"
        >
          <p className="mb-4">
            Even when countries collect efficiently, their tax systems <strong>don't grow with their economies</strong>. Tax buoyancy—the responsiveness of revenue to GDP growth—averages just <strong>0.71</strong> in Africa. This means for every 1% increase in GDP, tax revenue increases by only 0.71%. Economic expansion doesn't translate to fiscal expansion.
          </p>
          <p className="mb-4">
            <strong>Evidence:</strong> Buoyancy analysis reveals <strong>77% of African countries</strong> have tax systems with buoyancy below 1.0. The problem is structural: tax bases are concentrated in slow-growing or volatile sectors (formal employment, imports, commodities), while fast-growing sectors (informal economy, services, digital) remain largely untaxed.
          </p>
          <p className="mb-4">
            <strong>The cost:</strong> Between 2000-2020, African GDP grew by an average of 4% annually, but tax-to-GDP ratios improved only modestly from 12% to 15%. Had tax systems been fully buoyant (buoyancy = 1.0), the continent would have an additional <strong>$40-60 billion in annual revenue</strong> today. The elasticity leak compounds over time—<strong>every year of growth without revenue buoyancy widens the gap</strong>.
          </p>
        </LeakageChannel>

        {/* Leakage Channel 3 */}
        <LeakageChannel 
          number="3" 
          title="The Capacity Leak: The Combined Hemorrhage"
          color="blue"
        >
          <p className="mb-4">
            The <strong>tax gap</strong>—the difference between potential and actual revenue—represents the total leakage when collection inefficiency and structural inelasticity combine. Across Africa, the tax gap averages <strong>5-7% of GDP</strong>, but ranges from near-zero in high-performing countries like Seychelles and Morocco to over <strong>20% of GDP</strong> in fragile states like Libya and Equatorial Guinea.
          </p>
          <p className="mb-4">
            <strong>Evidence:</strong> Tax gap analysis reveals 82% of African countries appear in the under-collection zone (positive gaps). Only a handful of countries achieve negative gaps (over-collection relative to capacity). The regional average gap of 5-7% translates to <strong>$120-145 billion in annual leakage</strong>.
          </p>
          <p className="mb-4">
            <strong>The cost:</strong> The tax gap is not static—it grows. As economies expand but tax systems remain inelastic and inefficient, the leak widens. The gap also creates <strong>perverse incentives</strong>: citizens see governments failing to collect from powerful actors, so compliance falls further. The leak becomes a flood.
          </p>
        </LeakageChannel>

        {/* Sidebar Callout Box */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-8">
          <div>
            <PullQuote 
              quote="This isn't about tax policy—it's about state capacity. Africa's tax systems leak $120-145 billion annually not because the laws are wrong, but because the institutions are weak, the enforcement is absent, and the political will is missing."
              color="blue"
            />
          </div>
          <div>
            <StatsCalloutBox
              title="$120-145 Billion Annual Tax Leakage"
              stats={[
                { value: '72%', label: 'average tax effort' },
                { value: '0.71', label: 'average tax buoyancy' },
                { value: '5-7%', label: 'average tax gap (% of GDP)' }
              ]}
              equivalents={[
                '2-2.5× total development aid to Africa',
                '40% of Africa\'s total healthcare spending',
                '80% of Africa\'s infrastructure financing gap'
              ]}
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default CrisisSection42

