# Quick Start Guide - React + Streamlit Integration

## The Problem
When you click "Explore the Framework" in the React app, it should take you directly to **Theme 4: Domestic Resource Mobilization (DRM)**, not to the "DRM Landing Page Prototypes" page.

## The Solution
You need to run Streamlit using `app_streamlit.py` instead of `app.py`.

## Step-by-Step Instructions

### 1. Stop Current Streamlit (if running)
Press `Ctrl+C` in the terminal where Streamlit is running.

### 2. Start Streamlit with the Correct Entry Point
```bash
cd /Users/moneerayassien/theme4/nexus_dashboard_v.2
streamlit run app_streamlit.py
```

### 3. Verify It's Working
- Streamlit should start on **http://localhost:8501**
- The main page should show "DRM Dashboard" (not "DRM Landing Page Prototypes")
- You should be able to access pages directly:
  - `http://localhost:8501/2_theme_4` → Theme 4: Domestic Resource Mobilization
  - `http://localhost:8501/3_topic_4_1` → Topic 4.1: Public Expenditures
  - etc.

### 4. Test React Integration
- Visit **http://localhost:3000** (React app)
- Click **"Explore the Framework"** button
- You should now go directly to Theme 4, not the prototype switcher

## Why This Works

- **`app.py`** → Runs `00_prototype_switcher.py` as the main page (shows prototype selection)
- **`app_streamlit.py`** → Allows direct access to pages in the `pages/` directory (goes straight to Theme 4)

## Troubleshooting

**If you still see "DRM Landing Page Prototypes":**
1. Make sure you're running `app_streamlit.py` (check your terminal)
2. Restart Streamlit completely
3. Clear your browser cache or use an incognito window

**If pages show "Page not found":**
1. Verify the file exists: `ls pages/2_theme_4.py`
2. Check Streamlit is running: `curl http://localhost:8501/2_theme_4`
3. Make sure you're using `app_streamlit.py`, not `app.py`

