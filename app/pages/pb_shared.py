"""
Shared setup and helpers for policy-brief indicator pages (pb_indicator_*.py).

Provides: path setup, shared CSS, data loading, Africa filtering,
and iframe-height script so each indicator page only handles its chart logic.
"""
import sys
from pathlib import Path

# Ensure repo root and scripts are on path (for app.* and scripts.* imports)
_root = Path(__file__).resolve().parent.parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))
_scripts = _root / "scripts"
if str(_scripts) not in sys.path:
    sys.path.insert(0, str(_scripts))

import streamlit as st
from app.universal_viz import load_country_reference_data, load_main_data

# Shared CSS for policy-brief chart-only embedding (hide Streamlit chrome, match OSAA styling)
SHARED_PB_CSS = """
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
"""

# JavaScript sent to parent via postMessage for iframe height (Plotly and Altair)
IFRAME_HEIGHT_SCRIPT = """
<script>
(function() {
    function sendHeightToParent() {
        setTimeout(function() {
            var el = document.querySelector('.js-plotly-plot') || document.querySelector('.vega-embed');
            if (el) {
                var h = el.offsetHeight || el.scrollHeight;
                if (h > 0 && window.parent !== window) {
                    window.parent.postMessage({ type: 'STREAMLIT_CHART_HEIGHT', height: h }, '*');
                }
            }
        }, 500);
    }
    sendHeightToParent();
    window.addEventListener('resize', sendHeightToParent);
})();
</script>
"""


@st.cache_data
def load_policy_brief_data():
    """Load reference and main data for policy-brief views. Returns (ref_data, df_main)."""
    ref_data = load_country_reference_data()
    df_main = load_main_data()
    return ref_data, df_main


def get_africa_filtered(ref_data, df_main):
    """
    Filter reference and main data to Africa (policy-brief scope).
    Returns (africa_ref_data, africa_countries, df_filtered).
    """
    africa_ref_data = ref_data[ref_data["Region Name"] == "Africa"].copy()
    africa_countries = africa_ref_data["Country or Area"].unique()
    df_filtered = df_main[df_main["country_or_area"].isin(africa_countries)].copy()
    return africa_ref_data, africa_countries, df_filtered


def apply_pb_styles():
    """Apply shared policy-brief CSS (hide Streamlit UI, match OSAA styling)."""
    st.markdown(SHARED_PB_CSS, unsafe_allow_html=True)


def render_iframe_height_script():
    """Inject the iframe-height PostMessage script (call after rendering a chart)."""
    st.markdown(IFRAME_HEIGHT_SCRIPT, unsafe_allow_html=True)
