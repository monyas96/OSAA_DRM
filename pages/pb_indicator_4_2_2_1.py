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
    }
    .main .block-container {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        max-width: 100%;
        width: 100%;
    }
    /* Make charts full width */
    .stPlotlyChart, .vega-embed {
        width: 100% !important;
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

# Title (matching policy brief) - compact styling
st.markdown("### Tax Effort Over Time")
st.markdown("**Indicator 4.2.2.1 - Tax Collection Efficiency Score**")
st.markdown("<div style='margin-bottom: 0.5rem;'></div>", unsafe_allow_html=True)

# Render graph using shared helper (exact same as exploratory view)
fig = render_tax_effort(df_filtered, ref_data)

if fig:
    # Use full container width with responsive sizing and enable fullscreen
    st.plotly_chart(fig, use_container_width=True, config={
        'displayModeBar': True,
        'responsive': True,
        'autosizable': True,
        'modeBarButtonsToAdd': ['toggleSpikelines'],
        'toImageButtonOptions': {
            'format': 'png',
            'filename': 'tax_effort_chart',
            'height': 800,
            'width': 1200,
            'scale': 1
        }
    })
    
    # Auto-trigger fullscreen using JavaScript (for Plotly charts)
    st.markdown("""
    <script>
    (function() {
        function logToParent(message) {
            if (window.parent !== window) {
                window.parent.postMessage({
                    type: 'STREAMLIT_FULLSCREEN_DEBUG',
                    message: message
                }, '*');
            }
            console.log(message);
        }
        
        logToParent('🚀 Starting Plotly fullscreen trigger attempts...');
        
        function triggerFullscreen() {
            // Send debug messages to parent
            function logToParent(message) {
                if (window.parent !== window) {
                    window.parent.postMessage({
                        type: 'STREAMLIT_FULLSCREEN_DEBUG',
                        message: message
                    }, '*');
                }
                console.log(message);
            }
            
            logToParent('🔍 Searching for Plotly fullscreen button...');
            
            // Find Plotly chart container
            const plotlyDiv = document.querySelector('.js-plotly-plot');
            if (!plotlyDiv) {
                logToParent('⚠️ Plotly chart not found, retrying...');
                setTimeout(triggerFullscreen, 1000);
                return;
            }
            
            logToParent('✅ Found Plotly chart container');
            const modebar = plotlyDiv.querySelector('.modebar');
            if (!modebar) {
                logToParent('⚠️ Plotly modebar not found, retrying...');
                setTimeout(triggerFullscreen, 1000);
                return;
            }
            
            logToParent('✅ Found Plotly modebar');
            const allButtons = modebar.querySelectorAll('.modebar-btn');
            logToParent('Found ' + allButtons.length + ' modebar buttons');
            
            let fullscreenBtn = null;
            
            // Check all buttons for fullscreen
            allButtons.forEach(function(btn) {
                const title = btn.getAttribute('data-title') || btn.getAttribute('title') || '';
                const className = btn.className || '';
                const dataAttr = btn.getAttribute('data-attr') || '';
                
                logToParent('Button - title: "' + title + '", class: "' + className + '", data-attr: "' + dataAttr + '"');
                
                if (title.toLowerCase().includes('fullscreen') || 
                    className.toLowerCase().includes('fullscreen') ||
                    dataAttr.toLowerCase().includes('fullscreen')) {
                    fullscreenBtn = btn;
                    logToParent('✅ Found Plotly fullscreen button by title/attr');
                }
            });
            
            if (fullscreenBtn) {
                logToParent('✅ Found fullscreen button, clicking in 100ms...');
                setTimeout(function() {
                    try {
                        fullscreenBtn.click();
                        logToParent('✅ Fullscreen button clicked successfully');
                    } catch (e) {
                        logToParent('❌ Error clicking fullscreen button: ' + e.message);
                    }
                }, 100);
            } else {
                logToParent('⚠️ Fullscreen button not found in modebar, retrying...');
                setTimeout(triggerFullscreen, 1000);
            }
        }
        
        // Wait for Plotly chart to render
        setTimeout(triggerFullscreen, 2000);
        // Also try after longer delay in case chart loads slowly
        setTimeout(triggerFullscreen, 4000);
        setTimeout(triggerFullscreen, 6000);
        setTimeout(triggerFullscreen, 8000);
    })();
    </script>
    """, unsafe_allow_html=True)
else:
    st.info("No data available for Tax Effort indicator")
