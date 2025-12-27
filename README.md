# OSAA DRM Dashboard

A comprehensive interactive dashboard for analyzing Domestic Resource Mobilization (DRM) in Africa, featuring policy briefs, exploratory data views, and evidence-based narratives.

**Developed for:** UN Office of the Special Adviser on Africa (OSAA)

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
