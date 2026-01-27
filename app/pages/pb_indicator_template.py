"""
Policy Brief Graph Embed Template
Pre-configured Streamlit page for embedding individual indicator graphs in policy briefs.
Each indicator gets its own page (e.g. pb_indicator_4_4_2_4.py for indicator 4.4.2.4).

Use pb_shared for path setup, styles, data loading, Africa filtering, and iframe-height script.
Import the specific render_* function from pb_graph_helpers and call it with df_filtered, ref_data.
"""
from app.pages.pb_shared import (
    load_policy_brief_data,
    get_africa_filtered,
    apply_pb_styles,
    render_iframe_height_script,
)
# from app.pages.pb_graph_helpers import render_<your_indicator>
import streamlit as st

st.set_page_config(
    page_title="Policy Brief Graph",
    layout="wide",
    initial_sidebar_state="collapsed",
)
apply_pb_styles()

ref_data, df_main = load_policy_brief_data()
if df_main.empty or ref_data.empty:
    st.error("Failed to load data")
    st.stop()

_, _, df_filtered = get_africa_filtered(ref_data, df_main)

# INDICATOR-SPECIFIC: import render_* from pb_graph_helpers and call it
# fig_or_chart = render_<name>(df_filtered, ref_data)
# if fig_or_chart:
#     st.plotly_chart(fig_or_chart, ...) or st.altair_chart(chart, ...)
#     render_iframe_height_script()
# else:
#     st.info("No data available for ...")
