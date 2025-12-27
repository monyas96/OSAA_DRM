"""
Policy Brief Graph: Indicator 4.4.2.4 - Corruption and Bribery
Pre-configured Streamlit page showing Estimated Annual Corruption Loss
Exact same graph as exploratory view, with title and policy brief styling
"""
import sys
from pathlib import Path
parent_dir = str(Path(__file__).resolve().parent.parent)
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

import streamlit as st
import pandas as pd
import altair as alt
import composite_indicator_methods as cim
import universal_viz as uv
from pages.pb_graph_helpers import render_corruption_losses

# Hide Streamlit UI elements for clean embedding
st.set_page_config(
    page_title="Estimated Annual Corruption Loss",
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
    /* Auto-trigger fullscreen for charts */
    .vega-embed {
        position: relative;
    }
    .vega-embed .vega-actions {
        opacity: 1 !important;
    }
    /* Auto-click fullscreen button on load */
    .vega-embed .vega-actions a[title*="fullscreen"], 
    .vega-embed .vega-actions a[title*="Fullscreen"] {
        display: inline-block !important;
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
st.markdown("### Estimated Annual Corruption Loss")
st.markdown("**Indicator 4.4.2.4 - Corruption and Bribery**")
st.markdown("<div style='margin-bottom: 0.5rem;'></div>", unsafe_allow_html=True)

# Render graph using shared helper (exact same as exploratory view)
bar_chart = render_corruption_losses(df_filtered, ref_data)

if bar_chart:
    # Use full container width and enable responsive sizing
    # Note: Altair charts in Streamlit automatically include action buttons (fullscreen, export, etc.)
    st.altair_chart(bar_chart, use_container_width=True, theme=None)
    
    # Auto-trigger fullscreen using JavaScript (for Altair/Vega charts)
    # Note: Console logs from iframe won't show in parent window, so we use postMessage
    st.markdown("""
    <script>
    (function() {
        // Send messages to parent window for debugging
        function logToParent(message) {
            if (window.parent !== window) {
                window.parent.postMessage({
                    type: 'STREAMLIT_FULLSCREEN_DEBUG',
                    message: message
                }, '*');
            }
            console.log(message); // Also log in iframe console
        }
        
        function triggerFullscreen() {
            logToParent('🔍 Searching for fullscreen button...');
            
            // Check if vega-embed exists
            const vegaEmbeds = document.querySelectorAll('.vega-embed');
            logToParent('Found ' + vegaEmbeds.length + ' vega-embed elements');
            
            if (vegaEmbeds.length === 0) {
                logToParent('⚠️ No vega-embed found, retrying...');
                setTimeout(triggerFullscreen, 2000);
                return;
            }
            
            // Try to find the fullscreen button in vega-actions
            let fullscreenBtn = null;
            
            // Method 1: Look for button with "Fullscreen" text
            const allButtons = document.querySelectorAll('.vega-embed button, .vega-embed a');
            logToParent('Found ' + allButtons.length + ' buttons/links in vega-embed');
            
            allButtons.forEach(function(btn) {
                const text = btn.textContent || btn.innerText || '';
                const title = btn.getAttribute('title') || btn.getAttribute('aria-label') || '';
                const className = btn.className || '';
                
                logToParent('Button text: "' + text + '", title: "' + title + '", class: "' + className + '"');
                
                if (text.toLowerCase().includes('fullscreen') || 
                    title.toLowerCase().includes('fullscreen') ||
                    className.toLowerCase().includes('fullscreen')) {
                    fullscreenBtn = btn;
                    logToParent('✅ Found fullscreen button by text/title: ' + text);
                }
            });
            
            // Method 2: Look for the specific fullscreen icon/button in vega-actions
            if (!fullscreenBtn) {
                const vegaActions = document.querySelectorAll('.vega-actions a, .vega-actions button');
                logToParent('Found ' + vegaActions.length + ' vega-actions elements');
                
                vegaActions.forEach(function(action) {
                    const href = action.getAttribute('href') || '';
                    const title = action.getAttribute('title') || '';
                    const text = action.textContent || '';
                    
                    logToParent('Vega action - href: "' + href + '", title: "' + title + '", text: "' + text + '"');
                    
                    if (href.includes('fullscreen') || 
                        title.toLowerCase().includes('fullscreen') ||
                        text.toLowerCase().includes('fullscreen')) {
                        fullscreenBtn = action;
                        logToParent('✅ Found fullscreen button in vega-actions');
                    }
                });
            }
            
            // Method 3: Fallback - use browser native fullscreen API on the chart container
            if (!fullscreenBtn) {
                logToParent('⚠️ Fullscreen button not found in vega-actions');
                logToParent('🔄 Attempting browser native fullscreen API as fallback...');
                const vegaEmbed = document.querySelector('.vega-embed');
                if (vegaEmbed) {
                    try {
                        if (vegaEmbed.requestFullscreen) {
                            vegaEmbed.requestFullscreen();
                            logToParent('✅ Triggered browser native fullscreen');
                            return;
                        } else if (vegaEmbed.webkitRequestFullscreen) {
                            vegaEmbed.webkitRequestFullscreen();
                            logToParent('✅ Triggered browser native fullscreen (webkit)');
                            return;
                        } else if (vegaEmbed.mozRequestFullScreen) {
                            vegaEmbed.mozRequestFullScreen();
                            logToParent('✅ Triggered browser native fullscreen (moz)');
                            return;
                        } else {
                            logToParent('❌ Browser native fullscreen API not available');
                        }
                    } catch (e) {
                        logToParent('❌ Error triggering native fullscreen: ' + e.message);
                    }
                }
            }
            
            if (fullscreenBtn) {
                logToParent('✅ Found fullscreen button, clicking in 100ms...');
                // Use a small delay to ensure button is ready
                setTimeout(function() {
                    try {
                        fullscreenBtn.click();
                        logToParent('✅ Fullscreen button clicked successfully');
                    } catch (e) {
                        logToParent('❌ Error clicking fullscreen button: ' + e.message);
                        // Fallback to native API
                        const vegaEmbed = document.querySelector('.vega-embed');
                        if (vegaEmbed) {
                            try {
                                if (vegaEmbed.requestFullscreen) {
                                    vegaEmbed.requestFullscreen();
                                    logToParent('✅ Fallback: Triggered browser native fullscreen');
                                }
                            } catch (e2) {
                                logToParent('❌ Fallback also failed: ' + e2.message);
                            }
                        }
                    }
                }, 100);
            } else {
                logToParent('⚠️ Fullscreen button not found after all methods, retrying...');
                // Retry after a longer delay
                setTimeout(triggerFullscreen, 2000);
            }
        }
        
        logToParent('🚀 Starting fullscreen trigger attempts...');
        // Wait for chart to render (Vega-Altair charts take time to initialize)
        setTimeout(triggerFullscreen, 2000);
        // Also try after longer delay in case chart loads slowly
        setTimeout(triggerFullscreen, 4000);
        setTimeout(triggerFullscreen, 6000);
        setTimeout(triggerFullscreen, 8000);
    })();
    </script>
    """, unsafe_allow_html=True)
else:
    st.info("No data available for Control of Corruption indicator")

