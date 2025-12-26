"""
Streamlit page for embedding individual indicator graphs
This page accepts query parameters to render a specific indicator with filters
Used for Policy Brief 4.3 graph embeddings
"""
import sys
from pathlib import Path
parent_dir = str(Path(__file__).resolve().parent.parent)
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

import streamlit as st
import pandas as pd
import composite_indicator_methods as cim
import universal_viz as uv

# Hide Streamlit UI elements for clean embedding
st.set_page_config(
    page_title="Indicator Graph",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit default UI
st.markdown("""
<style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .stApp > header {
        background-color: transparent;
    }
    .stApp {
        margin-top: 0;
        padding-top: 0;
    }
</style>
""", unsafe_allow_html=True)

# Get query parameters
query_params = st.query_params
indicator = query_params.get("indicator", None)
countries = query_params.get("countries", None)
years = query_params.get("years", "all")
view = query_params.get("view", "line")

# Load data
try:
    ref_data = uv.load_country_reference_data()
    df_main = uv.load_main_data()
    
    if df_main.empty or ref_data.empty:
        st.error("Failed to load data")
        st.stop()
except Exception as e:
    st.error(f"Error loading data: {str(e)}")
    st.stop()

# Apply filters
if countries:
    country_list = [c.strip() for c in countries.split(",")]
    df_filtered = df_main[df_main['country_or_area'].isin(country_list)].copy()
else:
    df_filtered = df_main.copy()

# Filter by years if specified
if years and years != "all":
    if "-" in years:
        year_start, year_end = map(int, years.split("-"))
        df_filtered = df_filtered[(df_filtered['year'] >= year_start) & (df_filtered['year'] <= year_end)]
    else:
        try:
            year = int(years)
            df_filtered = df_filtered[df_filtered['year'] == year]
        except:
            pass

# Render indicator based on code
if indicator == "4.3.1.1":
    # Market Capitalization to GDP
    df_stock_cap, missing_stock_cap = cim.calculate_indicator_with_gap(
        df_filtered, 
        "Stock Market Cap to GDP (%)",
        "Stock market capitalization (% of GDP)",
        "GDP (current US$)"
    )
    df_stock_cap['indicator_label'] = 'Stock Market Cap to GDP (%)'
    
    if not df_stock_cap.empty:
        if view == "line":
            fig = uv.create_line_chart(df_stock_cap, "Stock Market Cap to GDP (%)", "Market Capitalization (% of GDP)")
            st.plotly_chart(fig, use_container_width=True)
        elif view == "bar":
            latest_year = df_stock_cap['year'].max()
            df_latest = df_stock_cap[df_stock_cap['year'] == latest_year]
            fig = uv.create_bar_chart(df_latest, "Stock Market Cap to GDP (%)", "Market Capitalization (% of GDP)")
            st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("No data available for this indicator with selected filters")

elif indicator == "4.3.1.2":
    # Portfolio Investment Bonds
    bond_indicator_label = "Portfolio investment, bonds (PPG + PNG) (NFL, current US$)"
    df_bonds = df_filtered[df_filtered['indicator_label'] == bond_indicator_label].copy()
    
    if not df_bonds.empty:
        if view == "line":
            fig = uv.create_line_chart(df_bonds, bond_indicator_label, "Portfolio Investment Bonds (NFL, current US$)")
            st.plotly_chart(fig, use_container_width=True)
        elif view == "heatmap":
            fig = uv.create_heatmap(df_bonds, bond_indicator_label, "Portfolio Investment Bonds")
            st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("No data available for this indicator with selected filters")

elif indicator == "4.3.1.3":
    # Adequacy of International Reserves
    try:
        df_reserves = df_filtered.copy()
        df_reserves['indicator_label'] = 'Adequacy of International Reserves'
        # Calculate reserves adequacy (simplified - you may need to adjust based on actual calculation)
        # This is a placeholder - use actual calculation from your codebase
        if view == "bar":
            latest_year = df_reserves['year'].max() if 'year' in df_reserves.columns else None
            if latest_year:
                df_latest = df_reserves[df_reserves['year'] == latest_year]
                fig = uv.create_bar_chart(df_latest, 'Adequacy of International Reserves', 'Adequacy of International Reserves')
                st.plotly_chart(fig, use_container_width=True)
        else:
            fig = uv.create_line_chart(df_reserves, 'Adequacy of International Reserves', 'Adequacy of International Reserves')
            st.plotly_chart(fig, use_container_width=True)
    except Exception as e:
        st.info(f"Reserve adequacy calculation requires additional data: {str(e)}")

elif indicator == "4.3.2.1":
    # Banking Sector Development Index
    try:
        df_bsdi = df_filtered.copy()
        df_bsdi['indicator_label'] = 'Banking Sector Development Index'
        # Calculate BSDI (simplified - use actual calculation from your codebase)
        if view == "line":
            fig = uv.create_line_chart(df_bsdi, 'Banking Sector Development Index', 'Banking Sector Development Index')
            st.plotly_chart(fig, use_container_width=True)
    except Exception as e:
        st.info(f"Banking Sector Development Index calculation requires additional data: {str(e)}")

elif indicator == "4.3.2.2":
    # Private Sector Credit to GDP
    credit_indicator_label = "Domestic credit provided by financial sector (% of GDP)"
    df_credit = df_filtered[df_filtered['indicator_label'] == credit_indicator_label].copy()
    
    if not df_credit.empty:
        if view == "line":
            fig = uv.create_line_chart(df_credit, credit_indicator_label, "Private Sector Credit (% of GDP)")
            st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("No data available for this indicator with selected filters")

elif indicator == "4.3.3.1":
    # Pension Funds and Sovereign Wealth Funds
    # This would need specific data structure - placeholder
    st.info("Pension fund data visualization requires specific data structure")

else:
    st.info(f"Indicator {indicator} not yet implemented for embedding")

