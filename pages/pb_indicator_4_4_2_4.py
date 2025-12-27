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
    st.altair_chart(bar_chart, use_container_width=True, theme=None)
    
    # Auto-trigger fullscreen using JavaScript (for Altair/Vega charts)
    st.markdown("""
    <script>
    (function() {
        function triggerFullscreen() {
            // Try multiple selectors for the fullscreen button in Vega-Altair charts
            const selectors = [
                '.vega-embed .vega-actions a[title*="fullscreen" i]',
                '.vega-embed .vega-actions a[title*="Fullscreen"]',
                '.vega-embed .vega-actions a:has-text("Fullscreen")',
                'button:contains("Fullscreen")',
                '.vega-actions a[href*="fullscreen"]'
            ];
            
            let fullscreenBtn = null;
            for (const selector of selectors) {
                try {
                    fullscreenBtn = document.querySelector(selector);
                    if (fullscreenBtn) break;
                } catch (e) {
                    // Invalid selector, try next
                }
            }
            
            // Alternative: find by text content
            if (!fullscreenBtn) {
                const allLinks = document.querySelectorAll('.vega-embed .vega-actions a');
                allLinks.forEach(function(link) {
                    const title = link.getAttribute('title') || link.textContent || '';
                    if (title.toLowerCase().includes('fullscreen')) {
                        fullscreenBtn = link;
                    }
                });
            }
            
            if (fullscreenBtn) {
                console.log('✅ Found fullscreen button, clicking...', fullscreenBtn);
                // Use a small delay to ensure button is ready
                setTimeout(function() {
                    try {
                        fullscreenBtn.click();
                        console.log('✅ Fullscreen button clicked successfully');
                    } catch (e) {
                        console.error('❌ Error clicking fullscreen button:', e);
                    }
                }, 100);
            } else {
                console.log('⚠️ Fullscreen button not found, retrying...');
                // Retry after a longer delay
                setTimeout(triggerFullscreen, 2000);
            }
        }
        
        console.log('🚀 Starting fullscreen trigger attempts...');
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

