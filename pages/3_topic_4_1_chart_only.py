"""
Minimal Streamlit page that only shows the chart for Indicator 4.1.1.1
This is designed to be embedded in React iframes - no navigation, filters, or text
"""
import streamlit as st
import pandas as pd
import sys
from pathlib import Path

# Add parent directory to path for module imports
parent_dir = str(Path(__file__).resolve().parent.parent)
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

# Import the universal visualization module
import universal_viz as uv

# Hide Streamlit UI elements for clean embedding
st.set_page_config(
    page_title="Indicator 4.1.1.1 Chart",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit menu and footer
hide_streamlit_style = """
<style>
#MainMenu {visibility: hidden;}
footer {visibility: hidden;}
header {visibility: hidden;}
.stDeployButton {visibility: hidden;}
</style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

# Load data
@st.cache_data
def load_main_data(file_path="data/nexus.parquet"):
    """Loads the main dataset from a parquet file."""
    try:
        df = pd.read_parquet(file_path)
        return df
    except Exception as e:
        st.error(f"Error loading data: {e}")
        return pd.DataFrame()

@st.cache_data
def load_reference_data():
    """Loads reference data."""
    try:
        return uv.load_country_reference_data()
    except Exception as e:
        return pd.DataFrame()

# Load data
ref_data = load_reference_data()
df_main = load_main_data()

if df_main.empty:
    st.error("Failed to load data.")
    st.stop()

# Filter for Indicator 4.1.1.1
indicator_label = "PEFA: PI-1 Aggregate expenditure out-turn"
indicator_data = df_main[df_main['indicator_label'] == indicator_label].copy()

if indicator_data.empty:
    st.warning(f"No data found for indicator: {indicator_label}")
    st.stop()

# Render the chart - minimal styling for embedding
st.markdown("""
<style>
    .main .block-container {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    h3 {
        margin-bottom: 0.5rem;
    }
</style>
""", unsafe_allow_html=True)

# Create and display the heatmap
fig = uv.create_pefa_heatmap(
    data=indicator_data,
    x_column='year',
    y_column='country_or_area',
    value_column='value',
    title='',  # No title - React will provide it
    reference_data=ref_data,
    height=600
)

st.plotly_chart(fig, use_container_width=True, config={'displayModeBar': True})

