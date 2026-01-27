"""
Policy Brief Graph: Indicator 4.2.2.2.b - Tax Gap
Pre-configured Streamlit page showing Uncollected Tax Revenue
Exact same graph as exploratory view, with title and policy brief styling
"""
from app.pages.pb_shared import (
    load_policy_brief_data,
    get_africa_filtered,
    apply_pb_styles,
    render_iframe_height_script,
)
from app.pages.pb_graph_helpers import render_tax_gap
import streamlit as st

st.set_page_config(
    page_title="Uncollected Tax Revenue",
    layout="wide",
    initial_sidebar_state="collapsed",
)
apply_pb_styles()

ref_data, df_main = load_policy_brief_data()
if df_main.empty or ref_data.empty:
    st.error("Failed to load data")
    st.stop()

_, _, df_filtered = get_africa_filtered(ref_data, df_main)

fig = render_tax_gap(df_filtered, ref_data)
if fig:
    st.plotly_chart(fig, use_container_width=True, config={
        "displayModeBar": True,
        "responsive": True,
        "autosizable": True,
        "modeBarButtonsToRemove": [],
        "toImageButtonOptions": {
            "format": "png",
            "filename": "tax_gap_chart",
            "height": 800,
            "width": 1200,
            "scale": 1,
        },
    })
    render_iframe_height_script()
else:
    st.info("No data available for Tax Gap indicator")
