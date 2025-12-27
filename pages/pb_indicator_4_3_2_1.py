"""
Policy Brief Graph: Indicator 4.3.2.1 - Banking Sector Development Index
Pre-configured Streamlit page showing Banking Sector Development
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
import plotly.express as px
import altair as alt
import composite_indicator_methods as cim
import universal_viz as uv
import importlib
import pages.pb_graph_helpers as pb_helpers
# Force reload to pick up new functions
importlib.reload(pb_helpers)
from pages.pb_graph_helpers import render_banking_sector_development

# Hide Streamlit UI elements for clean embedding
st.set_page_config(
    page_title="Banking Sector Development",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit default UI - match policy brief styling (chart-only view)
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
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 0;
        height: auto;
        overflow: hidden;
    }
    .main .block-container {
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        max-width: 100%;
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
    }
    /* Make charts full width */
    .stPlotlyChart, .vega-embed {
        width: 100% !important;
        height: auto !important;
    }
    /* Hide any markdown elements (titles, etc.) */
    .stMarkdown {
        display: none !important;
    }
    [data-testid="stVerticalBlock"] {
        padding: 0 !important;
        margin: 0 !important;
    }
    [data-testid="stVerticalBlock"] > [style*="flex-direction: column"] {
        height: 100%;
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

# No title - chart-only view for clean embedding

# Render graph using shared helper (exact same as exploratory view)
fig = render_banking_sector_development(df_filtered, ref_data)

if fig:
    st.plotly_chart(fig, use_container_width=True, config={
        'displayModeBar': True,
        'responsive': True,
        'autosizable': True,
        'modeBarButtonsToRemove': [],
        'toImageButtonOptions': {
            'format': 'png',
            'filename': 'banking_sector_development',
            'height': 800,
            'width': 1200,
            'scale': 1
        }
    })
    
    # Send chart height to parent iframe for dynamic sizing
    st.markdown("""
    <script>
    (function() {
        function sendHeightToParent() {
            setTimeout(function() {
                const plotlyDiv = document.querySelector('.js-plotly-plot');
                if (plotlyDiv) {
                    const chartHeight = plotlyDiv.offsetHeight || plotlyDiv.scrollHeight;
                    if (chartHeight > 0) {
                        if (window.parent !== window) {
                            window.parent.postMessage({
                                type: 'STREAMLIT_CHART_HEIGHT',
                                height: chartHeight
                            }, '*');
                        }
                    }
                }
            }, 500);
        }
        sendHeightToParent();
        setTimeout(sendHeightToParent, 1000);
        setTimeout(sendHeightToParent, 2000);
    })();
    </script>
    """, unsafe_allow_html=True)
else:
    st.info("No data available for Banking Sector Development Index")
