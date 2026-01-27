"""
Policy Brief Graph: Indicator 4.4.2.4 - Corruption and Bribery
Pre-configured Streamlit page showing Estimated Annual Corruption Loss
Exact same graph as exploratory view, with title and policy brief styling
"""
from app.pages.pb_shared import (
    load_policy_brief_data,
    get_africa_filtered,
    apply_pb_styles,
    render_iframe_height_script,
)
from app.pages.pb_graph_helpers import render_corruption_losses
import streamlit as st

st.set_page_config(
    page_title="Estimated Annual Corruption Loss",
    layout="wide",
    initial_sidebar_state="collapsed",
)
apply_pb_styles()

ref_data, df_main = load_policy_brief_data()
if df_main.empty or ref_data.empty:
    st.error("Failed to load data")
    st.stop()

_, _, df_filtered = get_africa_filtered(ref_data, df_main)

chart = render_corruption_losses(df_filtered, ref_data)
if chart:
    st.altair_chart(chart, use_container_width=True, theme=None)
    render_iframe_height_script()
else:
    st.info("No data available for Control of Corruption indicator")
