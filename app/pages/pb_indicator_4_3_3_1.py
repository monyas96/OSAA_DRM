"""
Policy Brief Graph: Indicator 4.3.3.1 - Pension Fund Asset Allocation
Pre-configured Streamlit page showing Pension Fund Asset Allocation
Exact same graph as exploratory view, with title and policy brief styling
"""
from app.pages.pb_shared import (
    load_policy_brief_data,
    get_africa_filtered,
    apply_pb_styles,
    render_iframe_height_script,
)
from app.pages.pb_graph_helpers import render_pension_fund_allocation
import streamlit as st

st.set_page_config(
    page_title="Pension Fund Asset Allocation",
    layout="wide",
    initial_sidebar_state="collapsed",
)
apply_pb_styles()

ref_data, df_main = load_policy_brief_data()
if df_main.empty or ref_data.empty:
    st.error("Failed to load data")
    st.stop()

_, _, df_filtered = get_africa_filtered(ref_data, df_main)

fig = render_pension_fund_allocation(df_filtered, ref_data)
if fig:
    st.plotly_chart(fig, use_container_width=True, config={
        "displayModeBar": True,
        "responsive": True,
        "autosizable": True,
        "modeBarButtonsToRemove": [],
        "toImageButtonOptions": {
            "format": "png",
            "filename": "pension_fund_chart",
            "height": 800,
            "width": 1200,
            "scale": 1,
        },
    })
    render_iframe_height_script()
else:
    st.info("No data available for Pension Fund Asset Allocation")
