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
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 0;
        height: auto; /* Auto height to match chart */
        overflow: hidden;
    }
    .main .block-container {
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        max-width: 100%;
        width: 100%;
        height: auto; /* Auto height to match chart */
        display: flex;
        flex-direction: column;
    }
    /* Make charts full width - height will be auto based on chart size */
    .stPlotlyChart, .vega-embed {
        width: 100% !important;
        height: auto !important;
    }
    /* Hide any markdown elements (titles, etc.) */
    .stMarkdown {
        display: none !important;
    }
    /* Show only chart containers */
    [data-testid="stVerticalBlock"] {
        padding: 0 !important;
        margin: 0 !important;
    }
    [data-testid="stVerticalBlock"] > [style*="flex-direction: column"] {
        height: 100%;
    }
    /* Ensure Plotly fullscreen button is visible */
    .js-plotly-plot .plotly .modebar {
        opacity: 1 !important;
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

# No title - chart-only view for clean embedding

# Render graph using shared helper (exact same as exploratory view)
fig = render_tax_effort(df_filtered, ref_data)

if fig:
    # Use full container width with responsive sizing and enable fullscreen
    # IMPORTANT: Do NOT remove fullscreen from modebar - it's a default button
    # The fullscreen button is NOT in modeBarButtonsToRemove list
    st.plotly_chart(fig, use_container_width=True, config={
        'displayModeBar': True,
        'responsive': True,
        'autosizable': True,
        # Do not remove fullscreen - it's a default button that should always be available
        'modeBarButtonsToRemove': [],  # Keep all default buttons including fullscreen
        'toImageButtonOptions': {
            'format': 'png',
            'filename': 'tax_effort_chart',
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
            // Wait for chart to render
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
            }, 500); // Wait for chart to render
        }
        
        // Try multiple times in case chart loads slowly
        sendHeightToParent();
        setTimeout(sendHeightToParent, 1000);
        setTimeout(sendHeightToParent, 2000);
    })();
    </script>
    """, unsafe_allow_html=True)
else:
    st.info("No data available for Tax Effort indicator")
