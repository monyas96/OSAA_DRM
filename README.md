# OSAA_DRM (The Policy View)

This repository represents the refined, "hidden complexity" version of the dashboard. It is optimized for immediate use by policy analysts focusing on Domestic Resource Mobilization.

## Project Overview

The OSAA DRM Dashboard is a specialized implementation of the Nexus Conceptual Framework, specifically focused on Theme 4: Domestic Resource Mobilization. It translates complex econometric data into policy-ready insights regarding tax effort, illicit financial flows (IFFs), and fiscal leakages across African nations.

## How to Reproduce This Work

To deploy a local instance of this dashboard:

1. **Clone the Repository**: `git clone https://github.com/monyas96/OSAA_DRM.git`

2. **Install Dependencies**: Ensure Python 3.9+ is installed, then run: `pip install -r requirements.txt`

3. **Launch the Application**: `streamlit run app/home.py`

## Technical Skills Required for Expansion

To maintain or expand this specific implementation, a user should possess:

- **Python (Streamlit & Pandas)**: Mastery of Streamlit for UI components and Pandas for managing the indicator dataframes.

- **Econometric Logic**: Understanding of the formulas used for "Tax Buoyancy" and "Tax Gap" (Stochastic Frontier Analysis) to update or refine the calculation scripts.

- **Markdown/HTML**: For updating the automated "Policy Brief" templates used in the PDF export feature.

## Repository Structure

```
OSAA_DRM/
├── app/                           # Primary Streamlit logic
│   ├── home.py                    # Main entry point
│   ├── pages/                      # Streamlit pages
│   │   ├── 2_theme_4.py           # Theme 4 overview
│   │   ├── 3_topic_4_1.py         # Topic 4.1: Public Expenditures
│   │   ├── 4_topic_4_2.py         # Topic 4.2: Budget and Tax Revenues
│   │   ├── 5_topic_4_3.py         # Topic 4.3: Capital Markets
│   │   ├── 6_topic_4_4.py         # Topic 4.4: Illicit Financial Flows
│   │   ├── 7_data_availability.py  # Data availability dashboard
│   │   ├── pb_indicator_*.py       # Policy brief indicator pages
│   │   ├── pb_graph_helpers.py     # Shared graph rendering functions
│   │   └── _archive/               # Archived pages
│   ├── app_core/                   # Reusable components and configurations
│   │   ├── components/             # UI components (navigation, cards, etc.)
│   │   ├── config/                  # Configuration files
│   │   ├── layouts/                # Layout templates
│   │   └── styles/                 # CSS styles
│   ├── special_pages/              # Special page components
│   ├── universal_viz.py           # Visualization utilities
│   └── utils.py                   # Helper utilities
│
├── data/                           # Data Mart - validated CSVs for Theme 4
│   ├── iso3_country_reference.csv
│   ├── countries_codes_and_coordinates.csv
│   ├── Pension_Fund_Asset_Allocation_by_Country.csv
│   ├── TJN_FSI.csv
│   ├── UNUWIDER_GRD.xlsx
│   └── ...
│
├── assets/                         # UI components and React frontend
│   ├── osaa-drm-app/               # React frontend application
│   │   ├── src/                    # React source code
│   │   ├── public/                  # Static assets
│   │   └── package.json
│   └── logos/                      # Logo files and graphics
│
├── scripts/                        # Reproducibility scripts
│   ├── add_missing_indicators.py   # Data processing script
│   ├── composite_indicator_methods.py  # Indicator calculation methods
│   └── indicator_module_template.py    # Template for new indicators
│
├── requirements.txt                # Python dependencies
├── runtime.txt                     # Python runtime version
├── start_streamlit.sh              # Script to start Streamlit
└── README.md                       # This file
```

## Quick Start

### Prerequisites

- Python 3.9+ 
- pip (Python package manager)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/monyas96/OSAA_DRM.git
   cd OSAA_DRM
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Launch the Streamlit application:
   ```bash
   streamlit run app/home.py
   ```

   Or use the provided script:
   ```bash
   ./start_streamlit.sh
   ```

The application will be available at `http://localhost:8501`

## Development

### Running the Application

The main entry point is `app/home.py`. Streamlit will automatically discover pages in the `app/pages/` directory.

### Data Processing Scripts

Scripts in the `scripts/` directory can be run independently:

```bash
# Add missing indicators to the dataset
python scripts/add_missing_indicators.py
```

### React Frontend

The React frontend is located in `assets/osaa-drm-app/`. To run it:

```bash
cd assets/osaa-drm-app
npm install
npm run dev
```

The React app will be available at **http://localhost:3000** (the dev server will automatically open your browser).

**Note**: Make sure the Streamlit backend is also running on `http://localhost:8501` for the React app to display embedded graphs correctly.

## Key Files

- **`app/home.py`**: Main Streamlit entry point
- **`app/pages/`**: Streamlit page files for topics and policy brief indicators
- **`app/app_core/`**: Reusable components, layouts, and styles
- **`app/universal_viz.py`**: Core visualization functions
- **`scripts/composite_indicator_methods.py`**: Calculation methods for composite indicators
- **`scripts/add_missing_indicators.py`**: Script to add calculated indicators to the dataset
- **`data/`**: Data files (CSV, Excel, Parquet)

## License

This project is part of the OSAA (Office of the Special Adviser on Africa) initiative.

## Contact

For questions or issues please contact the OSAA team.
