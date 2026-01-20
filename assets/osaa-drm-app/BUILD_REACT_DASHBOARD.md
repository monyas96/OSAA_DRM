# Building the Dashboard in React

## Current Status

I've created a basic React structure for Topic 4.1 page (`src/pages/Topic41Page.jsx`) with:
- Page layout and navigation
- Filter UI (Year, Countries, Regions)
- Tab structure for sub-topics
- Indicator card structure
- Placeholder for charts

## What's Needed to Complete

### 1. Data Loading
**Option A: Python Backend API (Recommended)**
- Create a FastAPI/Flask backend that:
  - Loads parquet files using existing Python code
  - Exposes REST endpoints for data
  - Handles filtering server-side
- React calls API endpoints to get data

**Option B: Convert Data to JSON**
- Convert parquet files to JSON format
- Load JSON files directly in React
- Simpler but less efficient for large datasets

**Option C: Apache Arrow (Limited)**
- Use Apache Arrow to load parquet in browser
- More complex, limited browser support

### 2. Chart Rendering
- Install `react-plotly.js` (already done)
- Port chart rendering logic from Streamlit
- Recreate heatmaps, bar charts, line charts
- Handle Plotly chart configurations

### 3. Filtering Logic
- Port filtering logic from `universal_viz.py`
- Handle country, region, year filtering
- Handle regional aggregations

### 4. Indicator Rendering
- Port each indicator's rendering function
- Handle different chart types
- Handle data transformations

## Recommended Approach

**Phase 1: Create Python API Backend**
```python
# api/main.py (FastAPI)
from fastapi import FastAPI
import pandas as pd
import universal_viz as uv

app = FastAPI()

@app.get("/api/data/main")
def get_main_data():
    df = uv.load_main_data()
    return df.to_dict('records')

@app.get("/api/data/indicator/{indicator_label}")
def get_indicator_data(indicator_label: str, countries: str = None, years: str = None):
    # Filter and return indicator data
    pass
```

**Phase 2: Connect React to API**
- Update `dataService.js` to call API endpoints
- Load data in React components
- Display in UI

**Phase 3: Port Charts**
- Start with one indicator (e.g., 4.1.1.1)
- Port the heatmap rendering
- Test and refine
- Repeat for other indicators

## Quick Start

The basic structure is ready. To complete it:

1. **Set up data loading** (choose one approach above)
2. **Connect to data source** in `Topic41Page.jsx`
3. **Port first indicator chart** as proof of concept
4. **Iterate** on remaining indicators

The React page structure matches the Streamlit layout, so porting should be straightforward once data loading is set up.

