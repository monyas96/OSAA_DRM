# Pages – Streamlit views

Streamlit “pages” live here. Files are picked up by Streamlit based on their names; numeric prefixes and `pb_indicator_*` names determine order and identity.

## Organization

- **Theme/topic pages** – e.g. `2_theme_4.py`, `3_topic_4_1.py`, `4_topic_4_2.py` … `7_data_availability.py`. These are the main navigation views (Theme 4, topics, data availability).
- **Policy-brief indicator pages** – `pb_indicator_4_1_1_1.py`, `pb_indicator_4_1_2_1.py`, … Each renders a single chart for embedding in the React app. The mapping from indicator ID (e.g. `4.4.2.1`) to page name is documented in the React–Streamlit interface doc (see repo `docs/` or React app).
- **`pb_graph_helpers.py`** – Shared chart-rendering functions used by the `pb_indicator_*` pages. Each indicator page imports one or more `render_*` functions from here.
- **`pb_shared.py`** – Shared setup for policy-brief pages: path setup, CSS, data loading, Africa filtering, iframe-height script. Policy-brief pages should use this to avoid duplication.
- **`_archive/`** – Old or unused page implementations, kept for reference.

## Conventions

- Policy-brief pages aim for “chart-only” output suitable for iframes: minimal UI, consistent error handling, and PostMessage for height.
- Data loading and styling should go through `pb_shared` and `pb_graph_helpers` where possible.
