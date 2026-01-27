# App – Streamlit dashboard

This folder contains the main Streamlit application for the OSAA DRM (Domestic Resource Mobilization) dashboard.

## Layout

- **`home.py`** – Entry point. Run from repo root: `streamlit run app/home.py`
- **`pages/`** – Streamlit “pages”: theme/topic views and policy-brief indicator pages (`pb_indicator_*.py`). Each page is a separate Python file; Streamlit discovers them by name.
- **`app_core/`** – Shared components, config, layouts, and styles used across pages.
- **`special_pages/`** – Multi-tab or special-purpose pages (e.g. tab_4_3_3, tab_4_4_1).
- **`universal_viz.py`** – Shared visualization and data-loading utilities (e.g. `load_country_reference_data`, `load_main_data`).
- **`utils.py`** – General helpers used by the app.

## Naming conventions

- **`pb_indicator_X_Y_Z_W.py`** – Policy-brief chart-only pages embedded by the React app. Each corresponds to one indicator ID (e.g. `4.1.1.1` → `pb_indicator_4_1_1_1`). See `docs/` or the React app for the full indicator–page mapping.
- **`N_topic_4_K.py`**, **`N_theme_4.py`** – Numbered prefixes control Streamlit’s sidebar order.

## Running

From the repository root:

```bash
streamlit run app/home.py
```

Config (CORS, theme, server) is in `.streamlit/config.toml` at the repo root.
