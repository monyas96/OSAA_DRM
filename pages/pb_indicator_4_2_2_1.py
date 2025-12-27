"""
Policy Brief Graph: Indicator 4.2.2.1 - Tax Collection Efficiency Score
Pre-configured Streamlit page showing Tax Effort Over Time
Exact same graph as exploratory view, with title and policy brief styling
"""
import sys
from pathlib import Path
parent_dir = str(Path(__file__).resolve().parent.parent)
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import composite_indicator_methods as cim
import universal_viz as uv
from pages.pb_graph_helpers import render_tax_effort

# Hide Streamlit UI elements for clean embedding
st.set_page_config(
    page_title="Tax Effort Over Time",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit default UI - match policy brief styling
st.markdown("""
<style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .stDeployButton {visibility: hidden;}
    .stApp > header {
        background-color: transparent;
    }
    .stApp {
        margin-top: 0;
        padding-top: 0;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .main .block-container {
        padding-top: 1rem;
        padding-bottom: 1rem;
        max-width: 100%;
    }
    /* Match policy brief styling */
    h1, h2, h3 {
        color: #003366;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 700;
    }
    h3 {
        font-size: 1.125rem;
        margin-bottom: 0.75rem;
    }
</style>
""", unsafe_allow_html=True)

# Load data
@st.cache_data
def load_data():
    ref_data = uv.load_country_reference_data()
    df_main = uv.load_main_data()
    return ref_data, df_main

ref_data, df_main = load_data()

if df_main.empty or ref_data.empty:
    st.error("Failed to load data")
    st.stop()

# Filter for Africa by default (matching policy brief scope)
africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy()
africa_countries = africa_ref_data['Country or Area'].unique()
df_filtered = df_main[df_main['country_or_area'].isin(africa_countries)].copy()

# Title (matching policy brief)
st.markdown("### Tax Effort Over Time")
st.markdown("**Indicator 4.2.2.1 - Tax Collection Efficiency Score**")

# Render graph using shared helper (exact same as exploratory view)
fig = render_tax_effort(df_filtered, ref_data)

if fig:
    st.plotly_chart(fig, use_container_width=True, config={'displayModeBar': True})
else:
    st.info("No data available for Tax Effort indicator")
