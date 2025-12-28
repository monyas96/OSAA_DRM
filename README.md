# OSAA DRM Dashboard

A comprehensive interactive dashboard for analyzing Domestic Resource Mobilization (DRM) in Africa, featuring policy briefs, exploratory data views, and evidence-based narratives.

**Developed for:** UN Office of the Special Adviser on Africa (OSAA)

---

## What is This Dashboard? (Non-Technical Overview)

This dashboard combines two powerful tools to help policymakers understand Africa's domestic resource mobilization challenges:

### The React Interface (The Visual Design)
The **React** interface is what creates the beautiful, professional look and feel of the dashboard. Think of React as the designer and architect—it provides:

**Visual Design Capabilities**:
- **Modern, polished design** with smooth animations and professional layouts
- **Rich visual elements** like colored cards, banners, info boxes, and interactive sections that make information easy to understand
- **Custom layouts** for policy briefs—we can arrange text, graphs, and callout boxes exactly how we want
- **Visual hierarchy** through colors, fonts, and spacing to guide the reader's attention
- **Interactive elements** like expandable sections, tabs, and smooth scrolling
- **Responsive design** that works perfectly on computers, tablets, and phones
- **Professional typography and spacing** that makes content easy to read and navigate

**Why React Provides More Visual Options**: Unlike simpler tools, React gives us complete creative control. We can:
- Design custom card layouts for key findings
- Create visually distinct sections (crisis, evidence, solutions) with different styling
- Add visual emphasis through colors, borders, and backgrounds
- Create animated transitions that make the experience more engaging
- Design custom components like "The Prize" boxes, strategy cards, and outcome boxes
- Control every aspect of the layout—spacing, alignment, and visual flow

This flexibility means we can present policy briefs in a way that's both informative and visually compelling, making complex information easier to understand and more engaging for readers.

### The Streamlit Backend (The Data Visualization Engine)
**Streamlit** is the tool that creates all the charts, graphs, and data visualizations. It's excellent at:
- **Processing large amounts of data** quickly and accurately
- **Creating interactive charts** that respond when you change filters or selections
- **Handling complex calculations** needed for indicators like tax effort, tax buoyancy, and corruption losses
- **Generating consistent, accurate visualizations** every time

**Why Streamlit is important**: Streamlit is specifically designed for data visualization. It ensures all our graphs are accurate, interactive, and consistent across the dashboard.

### Why We Use Both Together

By integrating React with Streamlit, we get the **best of both worlds**:
- **React** provides the visual design flexibility and professional presentation
- **Streamlit** handles all the data processing and ensures graph accuracy
- **Together**, they create a seamless experience where beautiful design meets reliable data visualization

**The key benefit**: When you see a graph in a policy brief, it's the exact same graph from the exploratory data view. This integration ensures consistency—what you see in the narrative matches what you see in the data exploration.

---

## What Changed Recently?

We've simplified how the dashboard works to make it more reliable and easier to maintain:

### The Change
Previously, the dashboard used three separate systems working together. Now it uses just two: React (for design) and Streamlit (for data visualization). We removed the middle layer (API server) and connected React directly to Streamlit.

### Why This Matters
- **More Reliable**: Fewer systems means fewer things that can break or cause errors
- **Consistent Graphs**: All graphs come from the same source (Streamlit), so they're always identical whether you see them in a policy brief or the exploratory view
- **Easier Updates**: When we update a graph, it automatically appears correctly in both places
- **Simpler Setup**: Less technical complexity makes the dashboard easier to deploy and maintain

### The Result
You now have a dashboard that's more reliable, easier to maintain, and ensures that all visualizations are consistent across the entire application.

---

## 🎯 Overview

This dashboard translates the DRM framework into measurable indicators and actionable evidence, enabling policymakers to:
- Identify leverage points for DRM reform
- Track performance across four pillars
- Ground decisions in Africa's own financing reality
- Explore data interactively through visualizations

The application consists of two integrated views:
- **Explanatory View**: Narrative-driven policy briefs with embedded data visualizations
- **Exploratory View**: Interactive data exploration with filters and comprehensive visualizations

---

## 🏗️ Architecture

The application uses a **two-tier architecture**:

```
┌─────────────────────────────────────────┐
│   React Frontend (osaa-drm-app)        │
│   - Landing Page                        │
│   - Policy Briefs (4.1, 4.2, 4.3, 4.4) │
│   - Navigation & UI Components          │
└──────────────┬──────────────────────────┘
               │
               │ (iframes)
               │
┌──────────────▼──────────────────────────┐
│   Streamlit Backend                     │
│   - Exploratory Data Views              │
│   - Policy Brief Graph Embeddings       │
│   - All Data Visualizations             │
└─────────────────────────────────────────┘
```

**Key Design Decision**: All graphs are rendered directly from Streamlit via iframes, eliminating the need for an API server and ensuring consistency between exploratory and explanatory views.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.12+
- **pip** (Python package manager)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/monyas96/OSAA_DRM.git
   cd OSAA_DRM
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Install React dependencies**:
   ```bash
   cd osaa-drm-app
   npm install
   ```

### Running Locally

You need **two terminals** running simultaneously:

#### Terminal 1: Streamlit Backend
```bash
streamlit run app_streamlit.py
```
- Streamlit runs on `http://localhost:8501`
- This serves all data visualizations and exploratory views

#### Terminal 2: React Frontend
```bash
cd osaa-drm-app
npm run dev
```
- React app runs on `http://localhost:3000` or `http://localhost:5173`
- Open this URL in your browser to access the dashboard

**Note**: The React app will automatically connect to Streamlit running on port 8501.

---

## 📁 Project Structure

```
OSAA_DRM/
├── osaa-drm-app/                    # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx     # Landing page with DRM narrative
│   │   │   ├── ExploratoryView.jsx # Embedded Streamlit exploratory view
│   │   │   ├── ExplanatoryView.jsx # Policy briefs navigation
│   │   │   └── policy-briefs/      # Policy brief components (4.1-4.4)
│   │   ├── components/
│   │   │   ├── StreamlitEmbed.jsx           # Full Streamlit app embedding
│   │   │   └── StreamlitGraphDirectEmbed.jsx # Individual graph embedding
│   │   └── ...
│   ├── public/                      # Static assets
│   └── package.json
│
├── pages/                           # Streamlit pages
│   ├── 2_theme_4.py                # Theme 4 overview (exploratory entry)
│   ├── 3_topic_4_1.py              # Topic 4.1: Public Expenditures
│   ├── 4_topic_4_2.py              # Topic 4.2: Budget and Tax Revenues
│   ├── 5_topic_4_3.py              # Topic 4.3: Capital Markets
│   ├── 6_topic_4_4.py              # Topic 4.4: Illicit Financial Flows
│   ├── 7_data_availability.py      # Data availability dashboard
│   ├── pb_indicator_*.py           # Policy brief graph pages (16 indicators)
│   └── pb_graph_helpers.py        # Shared graph rendering functions
│
├── app_streamlit.py                # Main Streamlit entry point
├── universal_viz.py                # Universal visualization functions
├── composite_indicator_methods.py  # Composite indicator calculations
├── data/                            # Data files
│   ├── nexus.parquet               # Main dataset
│   ├── iso3_country_reference.csv # Country reference data
│   └── ...
├── requirements.txt                # Python dependencies
└── README.md                       # This file
```

---

## 📊 Features

### Explanatory View (Policy Briefs)

Four comprehensive policy briefs covering:

1. **Policy Brief 4.1: Public Expenditures**
   - Budget execution consistency
   - Expenditure composition and priority protection
   - Indicators: 4.1.1.1, 4.1.2.1

2. **Policy Brief 4.2: Budget and Tax Revenues**
   - Tax collection efficiency
   - Tax buoyancy and tax gap analysis
   - Indicators: 4.2.2.1, 4.2.2.2.a, 4.2.2.2.b

3. **Policy Brief 4.3: Capital Markets**
   - Market capitalization and portfolio investment
   - Banking sector development
   - Pension fund asset allocation
   - Indicators: 4.3.1.1, 4.3.1.2, 4.3.2.1, 4.3.2.2, 4.3.3.1

4. **Policy Brief 4.4: Illicit Financial Flows**
   - Trade mispricing and tax evasion
   - Corruption losses
   - Financial secrecy and control of corruption
   - Indicators: 4.4.2.1, 4.4.2.2, 4.4.2.3, 4.4.2.4, 4.4.3.1, 4.4.4.1

**Each policy brief includes**:
- Narrative sections (Crisis, Evidence, Core Insight, Solutions, Impact)
- Embedded Streamlit graphs matching exploratory view
- Methodology annexes and expandable sections
- PDF export functionality

### Exploratory View

Interactive data exploration with:
- **Theme 4 Overview**: Entry point with topic cards
- **Topic Pages**: Detailed views for each of the four topics
- **Data Availability Dashboard**: Comprehensive indicator coverage analysis
- **Interactive Filters**: Country, region, and year filtering
- **Multiple Visualization Types**: Line charts, heatmaps, bar charts, scatter plots
- **Reference Lines and Bands**: Benchmark values and performance zones

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **React Router** - Client-side routing

### Backend
- **Streamlit** - Data visualization and interactive dashboards
- **Python 3.12** - Backend language
- **Pandas** - Data manipulation
- **Plotly** - Interactive charts
- **Altair** - Declarative visualizations

### Data
- **Parquet files** - Efficient data storage
- **CSV files** - Reference data and supplementary datasets

---

## 🌐 Deployment

### Recommended Setup

**Streamlit Backend**: Deploy to [Streamlit Cloud](https://share.streamlit.io)
- Free hosting
- Automatic HTTPS
- Auto-deploys on git push
- No configuration needed

**React Frontend**: Deploy to [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
- Free hosting
- Automatic HTTPS
- Auto-deploys on git push
- Simple configuration

### Deployment Steps

#### 1. Deploy Streamlit (5 minutes)

1. Go to [share.streamlit.io](https://share.streamlit.io)
2. Sign in with GitHub
3. Click "New app"
4. Select repository: `monyas96/OSAA_DRM`
5. Main file: `app_streamlit.py`
6. Python version: 3.12
7. Click "Deploy"

**Save your Streamlit URL** (e.g., `https://osaa-drm.streamlit.app`)

#### 2. Deploy React Frontend (5 minutes)

**Option A: Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. "Add new site" → "Import an existing project"
4. Select repository: `monyas96/OSAA_DRM`
5. Configure:
   - **Base directory**: `osaa-drm-app`
   - **Build command**: `npm run build`
   - **Publish directory**: `osaa-drm-app/dist`
6. Add environment variable:
   - **Key**: `VITE_STREAMLIT_URL`
   - **Value**: Your Streamlit URL from Step 1
7. Deploy!

**Option B: Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. "New Project" → Import `monyas96/OSAA_DRM`
4. Configure:
   - **Root Directory**: `osaa-drm-app`
   - **Framework Preset**: Vite
5. Add environment variable:
   - **Key**: `VITE_STREAMLIT_URL`
   - **Value**: Your Streamlit URL from Step 1
6. Deploy!

---

## 📝 Environment Variables

### React App (Production)

Set these in your hosting platform (Netlify/Vercel):

- `VITE_STREAMLIT_URL` - Your Streamlit Cloud URL
  - Example: `https://osaa-drm.streamlit.app`
  - **Required** for graph embeddings to work

### Local Development

No environment variables needed! The app defaults to:
- `VITE_STREAMLIT_URL` → `http://localhost:8501` (if not set)

---

## 🔧 Development

### Running in Development Mode

1. **Start Streamlit** (Terminal 1):
   ```bash
   streamlit run app_streamlit.py
   ```

2. **Start React** (Terminal 2):
   ```bash
   cd osaa-drm-app
   npm run dev
   ```

3. **Open browser**: `http://localhost:3000` or `http://localhost:5173`

### Building for Production

```bash
cd osaa-drm-app
npm run build
```

Output will be in `osaa-drm-app/dist/`

### Streamlit Development

To test individual Streamlit pages:
- Main app: `http://localhost:8501`
- Theme 4: `http://localhost:8501/2_theme_4`
- Topic 4.1: `http://localhost:8501/3_topic_4_1`
- Policy Brief Graph: `http://localhost:8501/pb_indicator_4_1_1_1`

---

## 📚 Key Concepts

### Indicator System

The dashboard tracks **16 indicators** across 4 topics:

- **Topic 4.1** (Public Expenditures): 2 indicators
- **Topic 4.2** (Budget and Tax Revenues): 3 indicators
- **Topic 4.3** (Capital Markets): 5 indicators
- **Topic 4.4** (Illicit Financial Flows): 6 indicators

Each indicator has:
- A dedicated Streamlit page (`pb_indicator_X_X_X_X.py`)
- Graph rendering logic in `pb_graph_helpers.py`
- Embedded visualization in policy briefs
- Full interactive view in exploratory dashboard

### Graph Embedding

Policy briefs embed Streamlit graphs using `StreamlitGraphDirectEmbed`:
- Graphs are pre-configured in Streamlit pages
- No API calls needed
- Exact same graphs as exploratory view
- Automatic height adjustment via postMessage

### Data Flow

```
Data Files (Parquet/CSV)
    ↓
Streamlit Pages (load & process)
    ↓
Graph Rendering (Plotly/Altair)
    ↓
Iframe Embedding (React)
    ↓
Policy Brief Display
```

---

## 📖 Documentation

- **[APP_STRUCTURE_AND_CONTENT_DESCRIPTION.md](./APP_STRUCTURE_AND_CONTENT_DESCRIPTION.md)** - Comprehensive app structure and content guide
- **[indicator_module_template.py](./indicator_module_template.py)** - Template for creating new indicator modules
- **[policy_brief_4_2_final_text.md](./policy_brief_4_2_final_text.md)** - Example policy brief content structure

---

## 🐛 Troubleshooting

### Streamlit not loading in React
- **Check**: Streamlit is running on `http://localhost:8501`
- **Check**: `VITE_STREAMLIT_URL` environment variable is set correctly
- **Check**: Browser console for CORS or iframe errors

### Graphs not showing in policy briefs
- **Check**: Streamlit pages exist (e.g., `pages/pb_indicator_4_1_1_1.py`)
- **Check**: Indicator mapping in `StreamlitGraphDirectEmbed.jsx`
- **Check**: Streamlit logs for errors

### Build errors
- **Check**: All dependencies installed (`npm install` in `osaa-drm-app`)
- **Check**: Python dependencies installed (`pip install -r requirements.txt`)
- **Check**: Node.js version (18+ required)

### Data not loading
- **Check**: Data files exist in `data/` directory
- **Check**: `nexus.parquet` file is present
- **Check**: Streamlit logs for data loading errors

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is part of the OSAA (Office of the Special Adviser on Africa) initiative.

---

## 🔗 Links

- **Repository**: https://github.com/monyas96/OSAA_DRM
- **OSAA**: https://www.un.org/osaa/

---

## ⚠️ Important Notes

- **Data Files**: Large data files (`nexus.parquet`, etc.) are not included in the repository. Ensure data files are present in the `data/` directory.
- **Environment Variables**: Set `VITE_STREAMLIT_URL` in production deployments.
- **Streamlit Cloud**: Ensure your repository is public or Streamlit Cloud has access.
- **Browser Compatibility**: Modern browsers only (Chrome, Firefox, Safari, Edge - latest versions).

---

## 📧 Contact

For questions or issues, please open an issue on GitHub or contact the OSAA team.

---

**Last Updated**: December 2024
