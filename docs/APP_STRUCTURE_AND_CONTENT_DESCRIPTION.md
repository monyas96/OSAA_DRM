# DRM Dashboard App: Complete Structure and Content Description

**Purpose:** This document provides a comprehensive description of the DRM Dashboard application structure, content, and data visualizations to assist in building narrative policy briefs for the Explanatory View that align with the landing page's DRM narrative.

---

## 1. APPLICATION ARCHITECTURE

### 1.1 Technology Stack
- **Frontend (Landing Page):** React with Vite, Tailwind CSS, Framer Motion
- **Data Visualization (Exploratory View):** Streamlit (Python) embedded in React via iframe
- **Data Source:** Pre-processed Parquet files (`data/nexus.parquet`)
- **Visualization Libraries:** Plotly, Altair, Recharts (for React components)

### 1.2 Application Structure
```
React App (Port 3000)
├── Landing Page (/)
│   ├── Hero Section
│   ├── Fundamental Shift Section
│   ├── Four Pillars Section
│   ├── Financing Paradox Section
│   ├── DRM Game Changer Section
│   └── Transition Section (Entry Point Selector)
│
├── Exploratory View (/exploratory)
│   └── Embedded Streamlit Theme 4 Page (localhost:8501/2_theme_4)
│
└── Explanatory View (/explanatory)
    └── Policy Briefs (To be developed)

Streamlit App (Port 8501)
├── Theme 4: Domestic Resource Mobilization (2_theme_4.py)
├── Topic 4.1: Public Expenditures (3_topic_4_1.py)
├── Topic 4.2: Budget and Tax Revenues (4_topic_4_2.py)
├── Topic 4.3: Capital Markets (5_topic_4_3.py)
└── Topic 4.4: Illicit Financial Flows (6_topic_4_4.py)
```

### 1.3 Navigation Flow
1. User lands on **React Landing Page** → Scrolls through narrative sections
2. User clicks **"Go to Exploratory View"** or **"Go to Explanatory View"** in Transition Section
3. **Exploratory View:** Shows embedded Streamlit dashboard with interactive data exploration
4. **Explanatory View:** Shows policy briefs (currently under development)

---

## 2. LANDING PAGE NARRATIVE

### 2.1 Hero Section
**Title:** "Evidence Policy Making in Practice: The Case of DRM"
**Subtitle:** "The Case of DRM"
**Key Message:** Scroll to explore the framework

### 2.2 Section 1: "Africa and African Partners Must Internalize a Fundamental Shift…"

**Core Narrative:**
- The era of development financed primarily through external assistance is over
- Financing for Development can no longer be anchored in ODA expectations
- Must be built on Africa's own capacity to mobilize, manage, and govern domestic resources

**Key Statistics:**
- African countries mobilize the majority of their development financing domestically
- **USD 500-600 billion annually** drained from African economies due to:
  - Weak tax systems
  - Inefficient public spending
  - Illicit financial flows
  - Under-governed natural and financial assets

**Central Message:**
- DRM is no longer a technical reform agenda
- It is the **central macroeconomic strategy** for stability, sovereignty, and development impact
- Strengthening DRM means:
  - Regaining control over economic and financial flows
  - Restoring the social contract
  - Financing priorities at scale (infrastructure, energy, education, social protection)

**Four Interdependent Pillars:**
1. Durable peace requires sustainable development
2. Sustainable development requires sustainable financing
3. Sustainable financing requires control over economic flows
4. Control over economic flows requires strong institutions

**Critical Callout:** "Any strategy that treats them separately will fail."

### 2.3 Section 2: Four Interdependent Pillars

**Pillar 1: Durable Peace**
- Foundation for stability and development
- Sustainable peace creates environment for economic growth and resource mobilization

**Pillar 2: Sustainable Financing**
- Predictable and adequate revenue streams
- Building robust financial systems for long-term development goals

**Pillar 3: Control Over Flows**
- Managing economic and financial movements
- Regulating capital flows, trade, and financial transactions

**Pillar 4: Strong Institutions**
- Effective governance and accountability
- Building capable institutions for policy implementation and transparency

**Key Message:** "These pillars are interconnected and mutually reinforcing"

### 2.4 Section 3: The Financing Paradox

**The Paradox:**
Africa has significant financial resources, yet these are undermined by systemic problems.

**Financial Resources:**
- $100B - Remittances
- $427B - Private Savings
- $24B - Sovereign Wealth Funds
- $1.3T - Pension Funds
- $483B - Public Revenue

**BUT - Three Key Problems:**
1. **Illicit Financial Flows:** Trade mispricing and capital flight
2. **Tax Inefficiencies:** Redundant incentives and revenue losses
3. **Weak Institutions & Policy Gaps:** Limited enforcement and regulatory frameworks

**Impact:**
- **$500-600B not mobilized annually**
- Increasing debt stress
- Constraining development financing

**Reference:** OSAA's analysis on solving paradoxes of development in Africa

### 2.5 Section 4: The DRM as the Game Changer

**Core Message:**
Domestic Resource Mobilization is how countries turn this paradox around.

**Key Mechanisms:**
- Strengthening tax systems
- Improving efficiency and transparency of public spending
- Deepening domestic capital markets
- Curbing illicit financial flows

**Outcomes:**
- Create predictable fiscal space
- Reclaim ownership of policy choices
- Core instruments of state capacity and economic sovereignty

**Platform Purpose:**
Translates the DRM framework into:
- Measurable indicators
- Actionable evidence
- Enables policymakers to:
  - Identify leverage points
  - Track performance across four pillars
  - Ground decisions in Africa's own financing reality

---

## 3. EXPLORATORY VIEW STRUCTURE

### 3.1 Overview
The Exploratory View is a **Streamlit-based interactive dashboard** embedded in the React app. It provides:
- Interactive data exploration
- Filtering by country, region, and year
- Multiple visualization types (line charts, heatmaps, bar charts, scatter plots)
- Data tables for detailed inspection

### 3.2 Theme 4: Domestic Resource Mobilization (Main Entry Point)

**Location:** `pages/2_theme_4.py`

**Structure:**
- **Topic Cards:** Visual cards linking to 4 topics:
  - Topic 4.1: Public Expenditures
  - Topic 4.2: Budget and Tax Revenues
  - Topic 4.3: Capital Markets
  - Topic 4.4: Illicit Financial Flows

**Features:**
- Sidebar filters (Country, Region, Year)
- Data availability heatmaps
- "Understanding the Framework" expandable section

---

## 4. TOPICS, SUBTOPICS, AND INDICATORS

### 4.1 TOPIC 4.1: PUBLIC EXPENDITURES

**Description:** Public expenditures focus on how governments allocate resources to essential services such as education, health, and infrastructure. Effective public expenditure management ensures that resources are not wasted and are directed toward development priorities.

**Subtopics:**

#### **Sub-topic 4.1.1 – Public Expenditure Efficiency**

**Indicator 4.1.1.1 – Public Expenditure Efficiency Index**
- **Proxy Indicator:** Aggregate Expenditure Outturn
- **Analytical Focus Question:** How efficiently are governments spending public resources relative to budgeted amounts?
- **Graph Types:**
  - Line chart with regional average overlay
  - Heatmap (country × year)
  - Data table
- **Filters:** Year, Country, Region
- **Data Source:** PEFA assessments, budget execution data

#### **Sub-topic 4.1.2 – Expenditure Quality**

**Indicator 4.1.2.1 – Expenditure Quality Score**
- **Proxy Indicator:** Expenditure Composition Outturn
- **Analytical Focus Question:** Are public expenditures aligned with development priorities and efficiently allocated?
- **Graph Types:**
  - Composition charts (stacked bar/area)
  - Comparison charts
  - Data table
- **Filters:** Year, Country, Region
- **Data Source:** PEFA assessments, budget classification data

---

### 4.2 TOPIC 4.2: BUDGET AND TAX REVENUES

**Description:** Budget and tax revenues are crucial for ensuring that governments have the financial resources necessary to fund essential services and development initiatives. Efficient and effective management of tax revenues helps reduce dependency on external financing, enhance fiscal stability, and direct resources toward national priorities.

**Subtopics:**

#### **Sub-topic 4.2.1 – Tax Revenue Collection**

**Indicator 4.2.1.1 – Tax Revenue as Percentage of GDP**
- **Proxy Indicator:** Tax Revenue - % of GDP (GRD)
- **Analytical Focus Question:** How much revenue are countries collecting from taxes relative to their economic output?
- **Graph Types:**
  - Line chart with regional average (orange line)
  - Toggle: Absolute numbers vs. Growth rates
  - Map view (choropleth)
  - Data table
- **Filters:** Year, Country, Region
- **Data Source:** Global Revenue Database (GRD), World Bank
- **Key Features:**
  - "How to Read This Graph" tooltip
  - Regional benchmark overlay
  - Country-specific trend lines

**Indicator 4.2.1.2 – Taxpayer Base Expansion**
- **Sub-indicator 4.2.1.2.a:** Tax Revenue Composition (Taxes excluding vs. including social contributions)
- **Sub-indicator 4.2.1.2.b:** Domestic Revenue (Taxes on Income, Profits, and Capital Gains) - **PLACEHOLDER**
- **Analytical Focus Question:** Is the tax base expanding and diversifying?
- **Graph Types:**
  - Comparison line charts (excluding vs. including social contributions)
  - Composition analysis
  - Data table
- **Filters:** Year, Country, Region
- **Data Source:** GRD

#### **Sub-topic 4.2.2 – Tax Administration Efficiency**

**Indicator 4.2.2.1 – Tax Collection Efficiency Score**
- **Proxy Indicator:** Tax Effort (Actual / Capacity)
- **Analytical Focus Question:** How efficiently are countries collecting the taxes they are capable of collecting, given their income levels and trade structure?
- **Graph Types:**
  - **View 1: Scatter Plot with Regression**
    - X-axis: GDP per Capita (Log Scale)
    - Y-axis: Tax Effort (Actual / Capacity)
    - Regression line with R²
    - Reference line at Tax Effort = 1 (efficient collection zone)
    - Shaded zone around Tax Effort = 1 (±0.1)
  - **View 2: Time Trend**
    - Multi-country line chart
    - Reference line at Tax Effort = 1
  - Data table
- **Filters:** Year, Country
- **Data Source:** Calculated from GRD and WDI (Stochastic Frontier Analysis)
- **Data Availability:** 1,620 Africa records

**Indicator 4.2.2.2 – Reduction in Tax Evasion**

**Sub-indicator 4.2.2.2.a – Tax Buoyancy**
- **Proxy Indicator:** Tax Buoyancy (Elasticity)
- **Analytical Focus Question:** Are tax systems responsive to economic growth and closing the gap between potential and actual revenue collection?
- **Graph Types:**
  - **View 1: Bar Chart by Country**
    - Color-coded by buoyancy level:
      - ≥1.5: Teal (Over-responsive)
      - ≥1.0: Blue (Responsive)
      - ≥0.5: Orange (Weakly responsive)
      - <0.5: Red (Unresponsive)
    - Reference lines at 1.0 and 0.5
  - **View 2: Distribution Analysis**
    - Histogram with distribution
    - Reference lines at 1.0 and 0.5
  - **View 3: Time Trend**
    - Multi-country line chart
    - Reference line at Buoyancy = 1.0
  - Data table
- **Filters:** Year, Country
- **Data Source:** Calculated from GRD and WDI (Log-log regression)
- **Data Availability:** 1,832 Africa records
- **Interpretation:**
  - Buoyancy = 1.0: Tax revenue grows at same rate as GDP (balanced)
  - <1.0: Tax revenues lagging behind economic expansion (inefficiencies/leakages)
  - >1.0: Over-responsive systems

**Sub-indicator 4.2.2.2.b – Tax Capacity & Gap**
- **Proxy Indicator:** Tax Capacity & Gap
- **Analytical Focus Question:** Are tax systems responsive to economic growth and closing the gap between potential and actual revenue collection?
- **Graph Types:**
  - **Divergent Bar Chart (Horizontal)**
    - X-axis: Tax Gap (% of GDP)
    - Y-axis: Countries
    - Color coding:
      - Orange (#F26C2B): Positive gap (under-collection)
      - Blue (#0072BC): Negative gap (overperformance)
    - Reference line at 0 (full capacity)
    - Regional average line
    - Tooltips show: Actual Revenue, Capacity, Tax Gap
  - Data table
- **Filters:** Year, Country (multi-select)
- **Data Source:** Calculated from GRD and WDI (SFA model)
- **Data Availability:** 1,620 Africa records
- **Interpretation:**
  - Bars to the right (orange): Missed potential (under-collection)
  - Bars to the left (blue): Countries collecting at or above capacity
  - Smaller gaps = stronger tax administration

---

### 4.3 TOPIC 4.3: CAPITAL MARKETS

**Description:** Capital markets are essential for mobilizing domestic financial resources and channeling savings into productive investments. A well-developed capital market reduces reliance on foreign financing, supports sustainable economic growth, and strengthens financial stability. Effective management of capital markets ensures that resources are directed toward areas that maximize national development.

**Subtopics:**

#### **Sub-topic 4.3.1 – Market Capitalization**

**Indicator 4.3.1.1 – Market Capitalization to GDP**
- **Proxy Indicator:** Stock Market Cap to GDP (%)
- **Analytical Focus Question:** How deep are African capital markets relative to economic size?
- **Graph Types:**
  - **Line Chart with Reference Bands:**
    - Shallow Markets (0-20%): Yellow band
    - Developing (20-60%): Orange band
    - Deep Markets (>60%): Blue band
    - Regional average line (orange)
    - Country-specific lines
    - Outlier handling (e.g., Seychelles >200%)
  - Map view
  - Data table
- **Filters:** Year, Country, Region
- **Data Source:** World Bank, stock market data
- **Interpretation:**
  - Higher values = deeper, more developed markets
  - Reference bands indicate market maturity levels

**Indicator 4.3.1.2 – Portfolio Investment Bonds**
- **Proxy Indicator:** Portfolio Investment Bonds (Current US$)
- **Analytical Focus Question:** How much foreign portfolio investment is flowing into African bond markets?
- **Graph Types:**
  - Heatmap (country × year)
  - Line chart
  - Data table
- **Filters:** Year, Country, Region
- **Data Source:** World Bank, IMF

**Indicator 4.3.1.3 – Adequacy of International Reserves**
- **Proxy Indicator:** Adequacy of International Reserves
- **Analytical Focus Question:** Do countries have sufficient reserves to manage external shocks?
- **Graph Types:**
  - Line chart with thresholds
  - Comparison charts
  - Data table
- **Filters:** Year, Country, Region
- **Data Source:** IMF, central bank data

#### **Sub-topic 4.3.2 – Financial Intermediation**

**Indicator 4.3.2.1 – Banking Sector Development Index**
- **Proxy Indicator:** Banking Sector Development Index
- **Analytical Focus Question:** How developed and efficient are banking sectors in mobilizing savings?
- **Graph Types:**
  - Composite index visualization
  - Component breakdown
  - Data table
- **Filters:** Year, Country, Region
- **Data Source:** World Bank, financial sector data

**Indicator 4.3.2.2 – Private Sector Credit to GDP**
- **Proxy Indicator:** Private Sector Credit to GDP (%)
- **Analytical Focus Question:** How much credit is available to the private sector relative to economic output?
- **Graph Types:**
  - Line chart with regional average
  - Comparison charts
  - Data table
- **Filters:** Year, Country, Region
- **Data Source:** World Bank

#### **Sub-topic 4.3.3 – Investment from Institutional Investors**

**Indicator 4.3.3.1 – Pension Fund Assets**
- **Proxy Indicator:** Pension Fund Assets
- **Analytical Focus Question:** How much capital is available from institutional investors like pension funds?
- **Graph Types:**
  - Country profiles with flags
  - Comparison charts
  - Asset allocation breakdowns
  - Data table
- **Filters:** Year, Country
- **Data Source:** Pension fund data, country-specific sources
- **Featured Countries:** South Africa, Nigeria, Kenya, Rwanda, Ghana

---

### 4.4 TOPIC 4.4: ILLICIT FINANCIAL FLOWS (IFFs)

**Description:** This section analyzes illicit financial flows (IFFs) in Africa, including their magnitude, types, and enforcement measures. IFFs undermine domestic resource mobilization, erode trust in institutions, and hinder sustainable development. Understanding and combating IFFs is crucial for achieving fiscal stability and development goals.

**Subtopics:**

#### **Sub-topic 4.4.1 – Magnitude of IFFs**

**Indicator 4.4.1.1 – Total IFF Outflows**
- **Proxy Indicator:** IFF estimates (various methodologies)
- **Analytical Focus Question:** How much capital is leaving Africa through illicit channels?
- **Graph Types:**
  - Time series line charts
  - Country comparison
  - Regional aggregates
  - Data table
- **Filters:** Year, Country, Region
- **Data Source:** Global Financial Integrity (GFI), UNODC

**Indicator 4.4.1.2 – IFF as Percentage of GDP**
- **Proxy Indicator:** IFF / GDP ratio
- **Analytical Focus Question:** What is the relative magnitude of IFFs compared to economic output?
- **Graph Types:**
  - Bar charts
  - Heatmaps
  - Data table
- **Filters:** Year, Country, Region
- **Data Source:** GFI, UNODC, World Bank

#### **Sub-topic 4.4.2 – Channels of IFFs**

**Indicator 4.4.2.1 – Trade Mispricing**
- **Proxy Indicator:** Trade mispricing estimates
- **Analytical Focus Question:** How much revenue is lost through trade misinvoicing?
- **Graph Types:**
  - Sector-specific breakdowns
  - Country comparisons
  - Time trends
  - Data table
- **Filters:** Year, Country, Region, Sector
- **Data Source:** GFI, trade data

**Indicator 4.4.2.2 – Transfer Pricing**
- **Proxy Indicator:** Transfer pricing indicators
- **Analytical Focus Question:** Are multinational corporations shifting profits out of Africa?
- **Graph Types:**
  - Company/sector analysis
  - Country comparisons
  - Data table
- **Filters:** Year, Country, Sector
- **Data Source:** Tax authority data, company reports

#### **Sub-topic 4.4.3 – Detection & Enforcement**

**Indicator 4.4.3.1 – Financial Secrecy Index**
- **Proxy Indicator:** Financial Secrecy Index (FSI) scores
- **Analytical Focus Question:** Which jurisdictions facilitate financial secrecy that enables IFFs?
- **Graph Types:**
  - Index scores over time
  - Country/jurisdiction rankings
  - Data table
- **Filters:** Year, Jurisdiction
- **Data Source:** Tax Justice Network (TJN_FSI.csv)
- **Available Years:** 2011, 2013, 2015, 2018, 2020, 2022, 2025

**Indicator 4.4.3.2 – Anti-Money Laundering (AML) Effectiveness**
- **Proxy Indicator:** AML framework assessments
- **Analytical Focus Question:** How effective are countries at detecting and preventing money laundering?
- **Graph Types:**
  - Compliance scores
  - Framework components
  - Data table
- **Filters:** Year, Country
- **Data Source:** FATF, country assessments

#### **Sub-topic 4.4.4 – Transparency & Accountability**

**Indicator 4.4.4.1 – Beneficial Ownership Transparency**
- **Proxy Indicator:** Beneficial ownership registry assessments
- **Analytical Focus Question:** Are countries maintaining transparent registries of company ownership?
- **Graph Types:**
  - Registry quality scores
  - Coverage indicators
  - Data table
- **Filters:** Year, Country
- **Data Source:** Open Ownership, country assessments

#### **Sub-topic 4.4.5 – Financing Resilience**

**Indicator 4.4.5.1 – Tax Buoyancy**
- **Proxy Indicator:** Tax Buoyancy (Elasticity)
- **Analytical Focus Question:** Are tax systems responsive to economic growth, and how does this relate to IFF leakage?
- **Graph Types:**
  - **View 1: Bar Chart by Country**
    - Color-coded by responsiveness level
  - **View 2: Distribution Analysis**
    - Histogram showing distribution of buoyancy values
  - **View 3: Time Trend**
    - Multi-country trends over time
  - Data table
- **Filters:** Year, Country
- **Data Source:** Calculated from GRD and WDI
- **Data Availability:** 1,832 Africa records
- **Note:** This is the same indicator as 4.2.2.2.a, shown here in IFF context

**Indicator 4.4.5.2 – Social Impact of Lost Tax** - **PLACEHOLDER**
- **Description:** Shows the social impact of lost tax revenue (calculated from Tax Gap)
- **Status:** Needs implementation
- **Data Source:** Tax Gap data + social spending indicators

#### **Sub-topic 4.4.6 – Sector-Specific Analysis**

**Indicator 4.4.6.1.a – Specific Sectors** - **PLACEHOLDER**
- **Description:** Sector-specific IFF analysis
- **Status:** Needs implementation

**Indicator 4.4.6.1.b – Rent Sharing** - **PLACEHOLDER**
- **Description:** Resource rent sharing analysis
- **Status:** Needs implementation

---

## 5. DATA SOURCES AND METHODOLOGY

### 5.1 Primary Data Sources
- **Global Revenue Database (GRD):** Tax revenue data
- **World Bank Development Indicators (WDI):** GDP, economic indicators
- **PEFA Assessments:** Public expenditure management
- **Global Financial Integrity (GFI):** IFF estimates
- **UNODC:** Crime and corruption data
- **Tax Justice Network (TJN):** Financial Secrecy Index
- **IMF ISORA Database:** Revenue administration
- **World Justice Project:** Rule of law indicators

### 5.2 Calculated Indicators
- **Tax Effort:** Stochastic Frontier Analysis (SFA) regression
- **Tax Capacity:** Predicted frontier tax-to-GDP ratio from SFA
- **Tax Gap:** Capacity - Actual revenue
- **Tax Buoyancy:** Log-log regression of tax revenue on GDP

### 5.3 Data Filtering
- **Default Filter:** Africa region only
- **Available Filters:** Country, Region (Intermediate), Year
- **Regional Aggregates:** Calculated as mean across selected countries

---

## 6. VISUALIZATION TYPES AND FEATURES

### 6.1 Common Graph Types
1. **Line Charts:** Time series with regional average overlay
2. **Heatmaps:** Country × Year matrices with color intensity
3. **Bar Charts:** Horizontal/vertical, color-coded by value ranges
4. **Scatter Plots:** With regression lines and reference zones
5. **Choropleth Maps:** Country-level color coding
6. **Distribution Charts:** Histograms, box plots
7. **Composition Charts:** Stacked bars, pie charts

### 6.2 Interactive Features
- **Hover Tooltips:** Detailed information on data points
- **Zoom and Pan:** For detailed exploration
- **Toggle Views:** Absolute numbers vs. growth rates, different chart types
- **Reference Lines/Bands:** Benchmark values, thresholds, performance zones
- **Multi-select Filters:** Countries, regions, years
- **Data Tables:** Exportable, sortable, filterable

### 6.3 Design Elements
- **Color Scheme:**
  - Primary Blue: #0072BC / #003366
  - Orange Accent: #F26C2B / #F58220
  - Teal: #008B8B / #009D8C
  - Status Colors: Green (good), Orange (warning), Red (critical)
- **Reference Bands:** Shaded areas indicating performance zones
- **Regional Averages:** Orange lines as benchmarks
- **Outlier Handling:** Identification and optional exclusion

---

## 7. KEY NARRATIVE THEMES FOR EXPLANATORY VIEW

### 7.1 Connecting Landing Page to Data

The landing page narrative establishes these key themes that should be reflected in policy briefs:

1. **The Fiscal Crisis:** USD 500-600 billion annually drained from African economies
2. **The Financing Paradox:** Rich in resources but undermined by systemic problems
3. **The Four Pillars:** Interdependent systems requiring integrated approaches
4. **DRM as Game Changer:** Technical reforms as instruments of state capacity

### 7.2 Policy Brief Structure Recommendations

Each topic's policy brief should:

1. **Open with Context:**
   - Connect to the USD 500-600B drain narrative
   - Link to the specific pillar(s) it addresses
   - Reference the Financing Paradox where relevant

2. **Present Key Findings:**
   - Use data from the Exploratory View graphs
   - Highlight regional patterns and outliers
   - Show trends over time

3. **Explain Implications:**
   - Connect findings to development financing gaps
   - Link to institutional capacity
   - Relate to control over economic flows

4. **Recommend Actions:**
   - Specific, evidence-based policy recommendations
   - Leverage points identified in data
   - Integrated approaches (reflecting pillar interdependence)

5. **Close with Vision:**
   - Connect back to DRM as game changer
   - Emphasize sovereignty and state capacity
   - Link to sustainable development outcomes

### 7.3 Topic-Specific Narrative Hooks

**Topic 4.1 (Public Expenditures):**
- Link to "inefficient public spending" from landing page
- Connect to Pillar 4 (Strong Institutions)
- Emphasize efficiency and quality as foundations for trust

**Topic 4.2 (Budget and Tax Revenues):**
- Direct connection to "weak tax systems" narrative
- Core of the USD 500-600B drain
- Tax Gap and Tax Effort show the magnitude of the problem
- Tax Buoyancy shows responsiveness (or lack thereof)

**Topic 4.3 (Capital Markets):**
- Connect to "under-governed natural and financial assets"
- Link to Pillar 3 (Control Over Flows)
- Emphasize domestic resource mobilization vs. external dependency

**Topic 4.4 (Illicit Financial Flows):**
- Direct connection to "illicit financial flows" drain
- Shows the leakage mechanisms
- Links to Pillar 3 (Control Over Flows) and Pillar 4 (Strong Institutions)
- Detection and enforcement show institutional capacity gaps

---

## 8. DATA AVAILABILITY SUMMARY

### 8.1 Fully Implemented Indicators (46 total)
- All indicators have graphs implemented
- Data available for Africa region
- Interactive filters and visualizations working

### 8.2 Placeholders (5 total)
1. **4.2.1.2.b** - Domestic Revenue (data available, needs implementation)
2. **4.2.2.2.a** - Tax Buoyancy (duplicate, redirects to 4.4.5.1)
3. **4.4.5.2** - Social Impact of Lost Tax (needs data investigation)
4. **4.4.6.1.a** - Specific Sectors (needs sector-specific IFF data)
5. **4.4.6.1.b** - Rent Sharing (needs rent sharing data)

---

## 9. TECHNICAL NOTES FOR NARRATIVE DEVELOPMENT

### 9.1 Data Interpretation Guidelines
- **Regional Averages:** Use as benchmarks, not targets
- **Outliers:** Acknowledge but explain context (e.g., Seychelles for market cap)
- **Trends:** Emphasize direction and pace of change
- **Gaps:** Highlight where data is missing as an indicator of institutional capacity

### 9.2 Evidence-Based Storytelling
- Always ground claims in specific data points from graphs
- Use comparative analysis (country vs. regional average)
- Show progress where it exists
- Acknowledge challenges honestly

### 9.3 Integration Across Topics
- Show how topics interconnect (e.g., tax efficiency affects IFFs)
- Reference other topics where relevant
- Build cumulative narrative across all four topics
- Reinforce the "interdependent pillars" message

---

## 10. APPENDICES

### 10.1 File Structure Reference
- Landing Page Components: `osaa-drm-app/src/components/`
- Streamlit Pages: `pages/`
- Data: `data/nexus.parquet`
- Utilities: `universal_viz.py`, `composite_indicator_methods.py`

### 10.2 Key Code Locations
- Landing Page Narrative: `osaa-drm-app/src/components/FundamentalShift.jsx`, `FinancingParadox.jsx`, `FourPillars.jsx`, `DRMGameChanger.jsx`
- Exploratory View: `pages/2_theme_4.py` (main entry), topic pages in `pages/`
- Explanatory View: `pages/2_theme_4.py` (policy brief sections - under development)

---

**END OF DOCUMENT**

This description provides the comprehensive context needed to develop policy brief narratives for the Explanatory View that align with the landing page's DRM framework and leverage the data visualizations in the Exploratory View.

