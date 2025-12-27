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
        height: 100vh;
        overflow: hidden;
    }
    .main .block-container {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        max-width: 100%;
        width: 100%;
        height: calc(100vh - 1rem);
        display: flex;
        flex-direction: column;
    }
    /* Make charts full width and height - fullscreen-like view */
    .stPlotlyChart, .vega-embed {
        width: 100% !important;
        height: calc(100vh - 2rem) !important;
        min-height: 600px !important;
    }
    /* Make chart containers fill available space */
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

# Title (matching policy brief) - compact styling
st.markdown("### Tax Effort Over Time")
st.markdown("**Indicator 4.2.2.1 - Tax Collection Efficiency Score**")
st.markdown("<div style='margin-bottom: 0.5rem;'></div>", unsafe_allow_html=True)

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
            const allButtons = modebar.querySelectorAll('.modebar-btn, .modebar-btn--hover');
            logToParent('Found ' + allButtons.length + ' modebar buttons');
            
            let fullscreenBtn = null;
            
            // Method 1: Check all buttons for fullscreen by data-title (Plotly's standard)
            allButtons.forEach(function(btn) {
                const title = btn.getAttribute('data-title') || btn.getAttribute('title') || '';
                const className = btn.className || '';
                const dataAttr = btn.getAttribute('data-attr') || '';
                const dataVal = btn.getAttribute('data-val') || '';
                
                logToParent('Button - title: "' + title + '", class: "' + className + '", data-attr: "' + dataAttr + '"');
                
                // Plotly fullscreen button typically has data-title="Toggle fullscreen" or similar
                if (title.toLowerCase().includes('fullscreen') || 
                    title.toLowerCase().includes('full screen') ||
                    className.toLowerCase().includes('fullscreen') ||
                    dataAttr.toLowerCase().includes('fullscreen')) {
                    fullscreenBtn = btn;
                    logToParent('✅ Found Plotly fullscreen button by title/attr');
                }
            });
            
            // Method 2: If not found, try to find by icon class or data attribute
            if (!fullscreenBtn) {
                // Plotly fullscreen button might have specific class or data attribute
                const possibleFullscreen = modebar.querySelector('[data-title*="fullscreen" i], [data-title*="Fullscreen"], [title*="fullscreen" i]');
                if (possibleFullscreen) {
                    fullscreenBtn = possibleFullscreen;
                    logToParent('✅ Found Plotly fullscreen button by attribute selector');
                }
            }
            
            // Method 3: Fallback - use browser native fullscreen API on the chart container
            if (!fullscreenBtn) {
                logToParent('⚠️ Fullscreen button not found in modebar');
                logToParent('🔄 Attempting browser native fullscreen API as fallback...');
                try {
                    if (plotlyDiv.requestFullscreen) {
                        plotlyDiv.requestFullscreen();
                        logToParent('✅ Triggered browser native fullscreen');
                        return;
                    } else if (plotlyDiv.webkitRequestFullscreen) {
                        plotlyDiv.webkitRequestFullscreen();
                        logToParent('✅ Triggered browser native fullscreen (webkit)');
                        return;
                    } else if (plotlyDiv.mozRequestFullScreen) {
                        plotlyDiv.mozRequestFullScreen();
                        logToParent('✅ Triggered browser native fullscreen (moz)');
                        return;
                    } else {
                        logToParent('❌ Browser native fullscreen API not available');
                    }
                } catch (e) {
                    logToParent('❌ Error triggering native fullscreen: ' + e.message);
                }
            }
            
            if (fullscreenBtn) {
                logToParent('✅ Found fullscreen button, clicking in 100ms...');
                setTimeout(function() {
                    try {
                        fullscreenBtn.click();
                        logToParent('✅ Fullscreen button clicked successfully');
                    } catch (e) {
                        logToParent('❌ Error clicking fullscreen button: ' + e.message);
                        // Fallback to native API
                        try {
                            if (plotlyDiv.requestFullscreen) {
                                plotlyDiv.requestFullscreen();
                                logToParent('✅ Fallback: Triggered browser native fullscreen');
                            }
                        } catch (e2) {
                            logToParent('❌ Fallback also failed: ' + e2.message);
                        }
                    }
                }, 100);
            } else {
                logToParent('⚠️ Fullscreen button not found after all methods, retrying...');
                setTimeout(triggerFullscreen, 2000);
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
