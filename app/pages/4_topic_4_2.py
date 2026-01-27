import streamlit as st
import pandas as pd
import sys
from pathlib import Path

# Add parent directory to path for module imports
parent_dir = str(Path(__file__).resolve().parent.parent)
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

# Set topic in URL parameters (for React navigation support)
# This allows the React app to track which topic is currently displayed
try:
    st.query_params["topic"] = "4.2"
except Exception:
    pass  # If query_params not available, continue without it

# Notify React parent of current page (for navigation sync)
st.markdown("""
<script>
    // Notify parent window of current page on load
    if (window.parent !== window) {
        window.parent.postMessage({
            type: 'STREAMLIT_NAVIGATION',
            pagePath: '4_topic_4_2'
        }, '*');
    }
</script>
""", unsafe_allow_html=True)

# Import the universal visualization module
import universal_viz as uv

# Navigation - Home button and logo
try:
    from app_core.components.navigation import render_page_logo
    render_page_logo("top-right")
except ImportError:
    pass  # Navigation not critical

# --- Load OSAA CSS ---
try:
    with open("app_core/styles/style_osaa.css") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
except Exception:
        pass

# --- Data Loading ---
@st.cache_data
def load_main_data(file_path="data/nexus.parquet"):
    """Loads the main dataset from a parquet file."""
    try:
        df = pd.read_parquet(file_path)
        required_cols = ['indicator_label', 'country_or_area', 'year', 'value', 'iso3']
        if not all(col in df.columns for col in required_cols):
             st.warning(f"Warning: Main data might be missing some expected columns ({required_cols}).")
        return df
    except FileNotFoundError:
        st.error(f"Error: The main data file was not found at {file_path}")
        return pd.DataFrame()
    except Exception as e:
        st.error(f"An error occurred while loading the main data: {e}")
        return pd.DataFrame()

# --- Page Setup & Initial Data Load ---
ref_data = uv.load_country_reference_data()
df_main = load_main_data()

if df_main.empty or ref_data.empty:
    st.error("Failed to load essential data (main data or reference data). Page rendering stopped.")
    st.stop()

# --- Sidebar Filters ---
filters = uv.setup_sidebar_filters(ref_data, df_main, key_prefix="topic4_2")
df_filtered = uv.filter_dataframe_by_selections(df_main, filters, ref_data)

# ========================================
# SECTION: Topic Header with Home Button
# ========================================
# Home button styling - horizontal text in light gray box
st.markdown("""
<style>
    button[key="nav_home_topic_4_2"] {
        background: #F9FAFB !important;
        background-color: #F9FAFB !important;
        color: #555 !important;
        border: 1px solid #E5E7EB !important;
        border-radius: 8px !important;
        padding: 0.5rem 1rem !important;
        font-weight: 600 !important;
        font-size: 0.9rem !important;
        line-height: 1.4 !important;
        min-height: 40px !important;
        transition: all 0.3s ease !important;
        white-space: nowrap !important;
    }
    button[key="nav_home_topic_4_2"]:hover {
        background: #F3F4F6 !important;
        background-color: #F3F4F6 !important;
        border-color: #D1D5DB !important;
    }
</style>
""", unsafe_allow_html=True)

# Back to Theme 4 button - placed above the topic card
st.markdown("""
<style>
    button[key="back_to_theme_4_2"] {
        background: linear-gradient(135deg, #F26C2B 0%, #E85A1F 100%) !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 0.6rem 1.5rem !important;
        font-weight: 600 !important;
        font-size: 0.9rem !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 2px 4px rgba(242, 108, 43, 0.2) !important;
        white-space: nowrap !important;
        line-height: 1.2 !important;
        min-height: 40px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
    button[key="back_to_theme_4_2"]:hover {
        background: linear-gradient(135deg, #E85A1F 0%, #D1490F 100%) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 8px rgba(242, 108, 43, 0.3) !important;
    }
</style>
""", unsafe_allow_html=True)

if st.button("← Back to Theme 4", key="back_to_theme_4_2", use_container_width=False):
    # Notify React parent before switching
    st.markdown("""
    <script>
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'STREAMLIT_NAVIGATION',
                pagePath: '2_theme_4'
            }, '*');
        }
    </script>
    """, unsafe_allow_html=True)
    st.switch_page("app_streamlit.py")

st.markdown("<br>", unsafe_allow_html=True)

# Topic header (full width)
st.markdown("""
<div class="section-header">
    <h1>Topic 4.2: Budget and Tax Revenues</h1>
    <p>Budget and tax revenues are crucial for ensuring that governments have the financial resources necessary to fund essential services and development initiatives. Efficient and effective management of tax revenues helps reduce dependency on external financing, enhance fiscal stability, and direct resources toward national priorities.</p>
</div>
""", unsafe_allow_html=True)

# Use filtered data directly (no global filters)
df_display = df_filtered.copy()
display_filters = filters.copy()

# ========================================
# SECTION: Key Indicators (Tabs)
# ========================================
# Add orange divider before indicators
st.markdown("""
<div style="border-top: 2px solid #F26C2B; margin: 1.5rem 0; clear: both;"></div>
    """, unsafe_allow_html=True)
    
st.markdown("### Key Indicators Overview")

# Create tabs for each sub-topic
tab_subtopic_1, tab_subtopic_2 = st.tabs([
    "Sub-topic 4.2.1 – Tax Revenue Collection",
    "Sub-topic 4.2.2 – Tax Administration Efficiency"
])

# Add CSS to remove white space
st.markdown("""
<style>
    /* Remove excessive margins and padding */
    .element-container {
        margin-bottom: 0.25rem !important;
        padding-bottom: 0.25rem !important;
    }
    
    /* Remove white space between markdown elements */
    .stMarkdown {
        margin-bottom: 0.15rem !important;
        margin-top: 0.15rem !important;
    }
    
    /* Ensure indicator cards have minimal spacing */
    .indicator-card {
        margin-bottom: 0.5rem !important;
        padding-bottom: 0.25rem !important;
    }
    
    .indicator-card h4 {
        margin-bottom: 0.5rem !important;
    }
    
    .indicator-card p {
        margin-bottom: 0.75rem !important;
    }
    
    /* Ensure tabs have minimal spacing */
    .stTabs [data-baseweb="tab-list"] {
        gap: 0.5rem !important;
        margin-bottom: 0.5rem !important;
    }
    
    /* Reduce spacing in expanders */
    .streamlit-expanderHeader {
        margin-bottom: 0.25rem !important;
    }
    
    /* Make charts fill available space */
    .js-plotly-plot {
        margin: 0 !important;
    }
</style>
""", unsafe_allow_html=True)

# ========================================
# SUB-TOPIC 4.2.1 – Tax Revenue Collection
# ========================================
with tab_subtopic_1:
    # Create tabs for indicators under 4.2.1
    tab_ind_4_2_1_1, tab_ind_4_2_1_2 = st.tabs([
        "Indicator 4.2.1.1 – Tax Revenue as Percentage of GDP",
        "Indicator 4.2.1.2 – Taxpayer Base Expansion"
    ])
    
    # ========================================
    # TAB 1: Indicator 4.2.1.1 – Tax Revenue as Percentage of GDP
    # ========================================
    with tab_ind_4_2_1_1:
        with st.container():
            # A. Indicator Header
            indicator_tab1 = "Tax Revenue - % of GDP - value"
            st.markdown("""
            <div class='indicator-card'>
                <h4>
                    Indicator 4.2.1.1 – Tax Revenue as Percentage of GDP
                    <button type="button" class="info-icon-btn" data-tooltip="Measures total tax revenue collected as a proportion of GDP. Shows how effectively countries mobilize domestic revenue relative to the size of their economy." style="background: none; border: none; cursor: help; font-size: 0.8em; color: #666; margin-left: 0.5rem; padding: 0;">i</button>
                </h4>
                <p style="color: #555; line-height: 1.5; margin-bottom: 0.75rem;">
                    <strong>Analytical Focus Question:</strong> How effectively do countries mobilize domestic revenue relative to the size of their economy?
                </p>
            </div>
            <style>
                .info-icon-btn {
                    position: relative;
                }
                .info-icon-btn:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #333;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    white-space: normal;
                    width: 250px;
                    font-size: 0.9em;
                    z-index: 1000;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    margin-bottom: 5px;
                }
            </style>
            """, unsafe_allow_html=True)
            
            # B. Local Filter Row (scoped to this indicator)
            # Get indicator data for filter options
            indicator_data_1 = df_display[df_display['indicator_label'] == indicator_tab1].copy()
            africa_ref_data_1 = ref_data[ref_data['Region Name'] == 'Africa'].copy() if not ref_data.empty else pd.DataFrame()
            africa_countries_1 = sorted(africa_ref_data_1['Country or Area'].unique()) if not africa_ref_data_1.empty else []
            available_years_ind_1 = sorted(indicator_data_1['year'].dropna().unique()) if not indicator_data_1.empty else []
            available_regions_1 = sorted(africa_ref_data_1['Intermediate Region Name'].dropna().unique()) if not africa_ref_data_1.empty else []
            
            # Filter row
            filter_col1, filter_col2, filter_col3, filter_col4 = st.columns([1.5, 1.5, 1.5, 0.7])
            
            with filter_col1:
                # Year range selector (dropdown for now, can be slider)
                if available_years_ind_1:
                    year_options = ["All Years"] + [f"{min(available_years_ind_1)}-{max(available_years_ind_1)}"] + available_years_ind_1
                    selected_year_ind_1 = st.selectbox(
                        "Select Year(s)",
                        options=["All Years"] + available_years_ind_1,
                        index=0,
                        key="ind_4_2_1_year_filter"
                    )
                else:
                    selected_year_ind_1 = "All Years"
            
            with filter_col2:
                selected_countries_ind_1 = st.multiselect(
                    "Select Country",
                    options=africa_countries_1,
                    default=[],
                    key="ind_4_2_1_country_filter"
                )
            
            with filter_col3:
                selected_regions_ind_1 = st.multiselect(
                    "Select Region",
                    options=available_regions_1,
                    default=[],
                    key="ind_4_2_1_region_filter"
                )
            
            with filter_col4:
                st.markdown("<br>", unsafe_allow_html=True)
                if st.button("Reset", key="ind_4_2_1_reset", use_container_width=True):
                    # Delete session state keys to reset widgets to defaults
                    if 'ind_4_2_1_year_filter' in st.session_state:
                        del st.session_state.ind_4_2_1_year_filter
                    if 'ind_4_2_1_country_filter' in st.session_state:
                        del st.session_state.ind_4_2_1_country_filter
                    if 'ind_4_2_1_region_filter' in st.session_state:
                        del st.session_state.ind_4_2_1_region_filter
                    st.rerun()
            
            # Prepare filtered data for this indicator
            # By default, show no countries (only regional average)
            # Only show countries if explicitly selected
            filtered_ind_data_1 = pd.DataFrame()  # Start with empty dataframe
            if selected_countries_ind_1 or selected_regions_ind_1:
                # Only filter if countries or regions are explicitly selected
                filtered_ind_data_1 = indicator_data_1.copy()
                if selected_year_ind_1 != "All Years":
                    filtered_ind_data_1 = filtered_ind_data_1[filtered_ind_data_1['year'] == selected_year_ind_1]
                if selected_countries_ind_1:
                    filtered_ind_data_1 = filtered_ind_data_1[filtered_ind_data_1['country_or_area'].isin(selected_countries_ind_1)]
                if selected_regions_ind_1:
                    # Filter by intermediate region
                    region_countries_1 = africa_ref_data_1[
                        africa_ref_data_1['Intermediate Region Name'].isin(selected_regions_ind_1)
                    ]['Country or Area'].unique()
                    filtered_ind_data_1 = filtered_ind_data_1[filtered_ind_data_1['country_or_area'].isin(region_countries_1)]
            elif selected_year_ind_1 != "All Years":
                # If only year is selected (but no countries/regions), still keep empty
                # Regional average will use all years anyway
                filtered_ind_data_1 = pd.DataFrame()
            
            # C. Visualization Panel with Multi-View Tabs
            tab_graph_1, tab_map_1, tab_data_1 = st.tabs(["Graph View", "Map View", "Data Table"])
        
            with tab_graph_1:
                # Add "How to Read This Graph" hover button
                st.markdown("""
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <button type="button" class="how-to-read-btn" data-tooltip="Each line shows a country's tax revenue as a share of GDP over time. The orange line is the regional average — a reference for fiscal performance across peers. Stable or rising lines show improving domestic resource mobilization." style="background: none; border: none; cursor: help; font-size: 0.9em; color: #666; padding: 0.25rem 0.5rem; margin-left: auto;">
                        How to Read This Graph <span style="font-size: 0.8em;">i</span>
                    </button>
                </div>
                <style>
                .how-to-read-btn {
                    position: relative;
                }
                .how-to-read-btn:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 100%;
                    right: 0;
                    transform: translateX(0);
                    background-color: #333;
                    color: white;
                    padding: 12px 16px;
                    border-radius: 6px;
                    white-space: normal;
                    width: 350px;
                    max-width: 90vw;
                    font-size: 0.9em;
                    line-height: 1.5;
                    z-index: 1000;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    margin-bottom: 8px;
                    text-align: left;
                }
                .how-to-read-btn:hover::before {
                    content: '';
                    position: absolute;
                    bottom: 100%;
                    right: 20px;
                    border: 6px solid transparent;
                    border-top-color: #333;
                    margin-bottom: 2px;
                    z-index: 1001;
                }
                </style>
                """, unsafe_allow_html=True)
                
                # Toggle button for view type
                toggle_col1, toggle_col2 = st.columns([1, 4])
                with toggle_col1:
                    view_type = st.radio(
                        "View:",
                        options=["Absolute numbers", "Growth rates"],
                        index=0,
                        key="ind_4_2_1_view_toggle",
                        horizontal=True
                    )
                
                # Render interactive line chart with regional benchmark overlay
                import plotly.graph_objects as go
                import numpy as np
                
                # Calculate regional average (Africa average) from all available data
                # Use the full indicator data, not just filtered, to get accurate regional average
                all_africa_data = indicator_data_1[indicator_data_1['country_or_area'].isin(africa_countries_1)].copy()
                regional_avg = pd.DataFrame()
                if not all_africa_data.empty:
                    regional_avg = all_africa_data.groupby('year')['value'].mean().reset_index()
                    regional_avg.columns = ['year', 'regional_avg']
                
                # Prepare data based on view type
                if view_type == "Growth rates":
                    # Calculate year-over-year growth rates
                    chart_data = filtered_ind_data_1.copy() if not filtered_ind_data_1.empty else pd.DataFrame()
                    if not chart_data.empty:
                        chart_data = chart_data.sort_values(['country_or_area', 'year'])
                        chart_data['growth_rate'] = chart_data.groupby('country_or_area')['value'].pct_change() * 100
                        chart_data = chart_data.dropna(subset=['growth_rate'])
                    y_col = 'growth_rate'
                    y_title = "Growth Rate (%)"
                    
                    # Calculate growth rate for regional average
                    if not regional_avg.empty:
                        regional_avg = regional_avg.sort_values('year')
                        regional_avg['growth_rate'] = regional_avg['regional_avg'].pct_change() * 100
                        regional_avg = regional_avg.dropna(subset=['growth_rate'])
                else:
                    chart_data = filtered_ind_data_1.copy() if not filtered_ind_data_1.empty else pd.DataFrame()
                    y_col = 'value'
                    y_title = "Tax Revenue (% of GDP)"
                
                # Always create figure if regional average exists (even if no country data)
                # Regional average should always be visible by default
                # Check if regional_avg has data (either regional_avg column for absolute, or growth_rate for growth rates)
                has_regional_data = not regional_avg.empty and (
                    'regional_avg' in regional_avg.columns or 
                    (view_type == "Growth rates" and 'growth_rate' in regional_avg.columns)
                )
                if has_regional_data:
                    
                    # Create figure
                    fig = go.Figure()
                    
                    # Color definitions
                    color_selected = '#003366'  # Deep blue for selected
                    color_regional = '#F26C2B'  # Orange for regional average
                    color_other = '#3366CC'  # Medium blue for other countries
                    
                    # Get selected countries (if any)
                    selected_countries_list = selected_countries_ind_1 if selected_countries_ind_1 else []
                    
                    # ALWAYS add regional average line first (so it appears at top of legend)
                    if not regional_avg.empty:
                        # Use all years from regional average (don't filter by chart_data years)
                        # This ensures regional average always shows even when no countries are selected
                        regional_y_col = 'growth_rate' if view_type == "Growth rates" else 'regional_avg'
                        if regional_y_col in regional_avg.columns:
                            fig.add_trace(go.Scatter(
                                x=regional_avg['year'],
                                y=regional_avg[regional_y_col],
                                mode='lines+markers',
                                name='Africa (Region Average)',
                                line=dict(color=color_regional, width=3, dash='dash'),
                                marker=dict(color=color_regional, size=8),
                                hovertemplate="<b>Africa (Region Average)</b><br>Year: %{x}<br>" + 
                                            (f"{y_title}: %{{y:.2f}}<br>" if view_type == "Growth rates" else "Tax Revenue (% of GDP): %{y:.2f}<br>") +
                                            "<extra></extra>",
                                showlegend=True,
                                legendrank=1  # Ensure it appears first in legend
                            ))
                    
                    # Add country lines (only if there's chart data)
                    if not chart_data.empty:
                        countries_list = sorted(chart_data['country_or_area'].unique())
                        for country in countries_list:
                            country_data = chart_data[chart_data['country_or_area'] == country].sort_values('year')
                            if not country_data.empty:
                                # Use selected color if country is selected, otherwise use other color
                                line_color = color_selected if country in selected_countries_list else color_other
                                line_width = 3 if country in selected_countries_list else 2
                                
                                # Calculate deviation from regional mean for tooltip (only for absolute numbers)
                                if view_type == "Absolute numbers" and not regional_avg.empty:
                                    country_data_merged = country_data.merge(regional_avg, on='year', how='left')
                                    country_data_merged['deviation_pct'] = ((country_data_merged['value'] - country_data_merged['regional_avg']) / country_data_merged['regional_avg'].replace(0, np.nan)) * 100
                                    country_data_merged['deviation_pct'] = country_data_merged['deviation_pct'].fillna(0)
                                    
                                    hovertemplate = (
                                        f"<b>{country}</b><br>" +
                                        "Year: %{x}<br>" +
                                        f"{y_title}: %{{y:.2f}}<br>" +
                                        "Deviation from Regional Avg: %{customdata:.2f}%<br>" +
                                        "<extra></extra>"
                                    )
                                    customdata = country_data_merged['deviation_pct'].values
                                else:
                                    hovertemplate = (
                                        f"<b>{country}</b><br>" +
                                        "Year: %{x}<br>" +
                                        f"{y_title}: %{{y:.2f}}<br>" +
                                        "<extra></extra>"
                                    )
                                    customdata = None
                                
                                fig.add_trace(go.Scatter(
                                    x=country_data['year'],
                                    y=country_data[y_col],
                                    mode='lines+markers',
                                    name=country,
                                    line=dict(color=line_color, width=line_width),
                                    marker=dict(color=line_color, size=6 if country in selected_countries_list else 4),
                                    hovertemplate=hovertemplate,
                                    customdata=customdata,
                                    showlegend=True
                                ))
                    
                    # Highlight last available year
                    if not chart_data.empty:
                        last_year = chart_data['year'].max()
                        last_year_data = chart_data[chart_data['year'] == last_year]
                        
                        # Add annotations for last year
                        for idx, row in last_year_data.iterrows():
                            if row['country_or_area'] in selected_countries_list:
                                fig.add_annotation(
                                    x=row['year'],
                                    y=row[y_col],
                                    text=row['country_or_area'],
                                    showarrow=True,
                                    arrowhead=2,
                                    arrowsize=1,
                                    arrowwidth=2,
                                    arrowcolor=color_selected,
                                    ax=0,
                                    ay=-30,
                                    font=dict(size=10, color=color_selected)
                                )
                    
                    # Update layout
                    fig.update_layout(
                        height=500,
                        xaxis_title="Year",
                        yaxis_title=y_title,
                        hovermode='closest',
                        legend=dict(
                            orientation="v",
                            yanchor="top",
                            y=1,
                            xanchor="left",
                            x=1.02,
                            font=dict(size=10),
                            bgcolor="rgba(255,255,255,0.8)",
                            bordercolor="rgba(0,0,0,0.2)",
                            borderwidth=1
                        ),
                        margin=dict(l=50, r=180, t=20, b=50)
                    )
                    
                    st.plotly_chart(fig, use_container_width=True, key="plot_4_2_1_1_graph")
                else:
                    st.info("No data available for the selected filters.")
            
            with tab_map_1:
                # Map View
                if not filtered_ind_data_1.empty:
                    # Prepare map data
                    map_data_1 = filtered_ind_data_1.copy()
                
                    # Use the latest year if multiple years, or selected year
                    if selected_year_ind_1 != "All Years":
                        map_data_1 = map_data_1[map_data_1['year'] == selected_year_ind_1]
                    else:
                        # Use latest year per country
                        map_data_1 = map_data_1.loc[map_data_1.groupby('country_or_area')['year'].idxmax()]
                    
                    # Convert values to numeric
                    map_data_1['value'] = pd.to_numeric(map_data_1['value'], errors='coerce')
                    map_data_1 = map_data_1.dropna(subset=['value'])
                    
                    if not map_data_1.empty:
                        # Merge with reference data to get ISO codes
                        africa_ref_1 = ref_data[ref_data['Region Name'] == 'Africa'].copy()
                        if not africa_ref_1.empty and 'Country or Area' in africa_ref_1.columns:
                            map_data_merged_1 = map_data_1.merge(
                                africa_ref_1[['Country or Area', 'iso3']],
                                left_on='country_or_area',
                                right_on='Country or Area',
                                how='inner'
                            )
                            
                            if not map_data_merged_1.empty:
                                # Determine the correct ISO column name after merge
                                iso_col_1 = 'iso3_y' if 'iso3_y' in map_data_merged_1.columns else ('iso3_x' if 'iso3_x' in map_data_merged_1.columns else 'iso3')
                                if iso_col_1 != 'iso3' and iso_col_1 in map_data_merged_1.columns:
                                    map_data_merged_1['iso3'] = map_data_merged_1[iso_col_1]
                                
                                # Create choropleth map
                                fig_map_1 = go.Figure(data=go.Choropleth(
                                    locations=map_data_merged_1['iso3'],
                                    z=map_data_merged_1['value'],
                                    locationmode='ISO-3',
                                    colorscale='Blues',
                                    showscale=True,
                                    text=map_data_merged_1.apply(
                                        lambda row: f"{row['country_or_area']}<br>Tax Revenue (% of GDP): {row['value']:.2f}<br>Year: {row['year']}",
                                        axis=1
                                    ),
                                    hovertemplate='%{text}<extra></extra>',
                                    colorbar=dict(title="Tax Revenue (% of GDP)")
                                ))
                                
                                fig_map_1.update_layout(
                                    height=500,
                                    geo=dict(
                                        bgcolor='rgba(0,0,0,0)',
                                        lakecolor='rgba(0,0,0,0)',
                                        landcolor='rgba(217, 217, 217, 1)',
                                        subunitcolor='white',
                                        scope='africa',
                                        showframe=False,
                                        showcoastlines=True,
                                        projection_type='natural earth'
                                    ),
                                    margin={"r":0,"t":0,"l":0,"b":0}
                                )
                                
                                st.plotly_chart(fig_map_1, use_container_width=True, key="plot_4_2_1_1_map")
                            else:
                                st.info("No data available after merging with reference data.")
                        else:
                            st.info("No reference data available for map.")
                    else:
                        st.info("No valid numeric data available for the map.")
                else:
                    st.info("No data available for the selected filters.")
            
            with tab_data_1:
                # Data Table
                if not filtered_ind_data_1.empty:
                    cols_to_show = ['country_or_area', 'year', 'value']
                    display_df_1 = filtered_ind_data_1[[col for col in cols_to_show if col in filtered_ind_data_1.columns]].copy()
                    if 'value' in display_df_1.columns:
                        display_df_1 = display_df_1.rename(columns={'value': 'Tax Revenue (% of GDP)'})
                    st.dataframe(display_df_1, use_container_width=True)
                    
                    # Export options
                    csv_1 = display_df_1.to_csv(index=False)
                    st.download_button(
                        label="Download CSV",
                        data=csv_1,
                        file_name=f"indicator_4_2_1_{selected_year_ind_1 if selected_year_ind_1 != 'All Years' else 'all_years'}.csv",
                        mime="text/csv",
                        key="ind_4_2_1_download_csv"
                    )
                else:
                    st.info("No data available for the selected filters.")
            
            # D. Supporting Information Layers (collapsible, in order)
            # 1. Learn more about this indicator
            with st.expander("Learn more about this indicator", expanded=False):
                tab_def, tab_proxy = st.tabs(["Definition", "Proxy Justification"])
                with tab_def:
                    st.markdown("""
                    Taxes are compulsory, unrequited payments, in cash or in kind, made by institutional units to government units. 
                    This indicator is expressed as a percentage of Gross Domestic Product (GDP) which is the total income earned 
                    through the production of goods and services in an economic territory during an accounting period.
                    
                    **Source:** [World Bank - Tax Revenue (% of GDP)](https://data.worldbank.org/indicator/GC.TAX.TOTL.GD.ZS)
                    """)
                with tab_proxy:
                    st.markdown("""
                    This World Bank indicator is standard, widely used, and globally comparable. It provides a consistent measure 
                    of domestic resource mobilization capacity across countries and over time.
                    """)

    # ========================================
    # TAB 2: Indicator 4.2.1.2 – Taxpayer Base Expansion
    # ========================================
    with tab_ind_4_2_1_2:
        # Create sub-tabs for 4.2.1.2.a and 4.2.1.2.b
        tab_4_2_1_2_a, tab_4_2_1_2_b = st.tabs([
            "4.2.1.2.a – Number of Taxpayers",
            "4.2.1.2.b – Domestic Revenue"
        ])
        
        # ========================================
        # SUB-TAB 1: 4.2.1.2.a – Number of Taxpayers
        # ========================================
        with tab_4_2_1_2_a:
            # Indicator header for 4.2.1.2.a
            st.markdown("""
            <div class='indicator-card'>
                <h4>
                    4.2.1.2.a – Number of Taxpayers
                    <button type="button" class="info-icon-btn" data-tooltip="Shows the composition of tax revenue by type (% of GDP). Displays how different tax categories (Income Taxes, CIT, VAT, Excise Taxes, Trade Taxes, Other Taxes) contribute to total tax revenue over time. This serves as a proxy for taxpayer base expansion." style="background: none; border: none; cursor: help; font-size: 0.8em; color: #666; margin-left: 0.5rem; padding: 0;">i</button>
                </h4>
                <p style="color: #888; font-size: 0.9em; margin-bottom: 0.5rem;">
                    <em>Proxied by: Tax Revenue Composition (% of GDP)</em>
                </p>
                <p style="color: #555; line-height: 1.5; margin-bottom: 0.75rem;">
                    <strong>Analytical Focus Question:</strong> How diversified and expanding is the taxpayer base? What is the composition of tax revenue by type?
                </p>
            </div>
            """, unsafe_allow_html=True)
            
            # B. Local Filter Row
            # Define tax type indicators
            tax_type_indicators = {
                "Income Taxes": "Income Taxes - % of GDP - Tax Revenue Percent",
                "CIT": "CIT - % of GDP - Tax Revenue Percent",
                "VAT": "VAT - % of GDP - Tax Revenue Percent",
                "Excise Taxes": "Excise Taxes - % of GDP - Tax Revenue Percent",
                "Trade Taxes": "Trade Taxes - % of GDP - Tax Revenue Percent",
                "Other Taxes": "Other Taxes - % of GDP - Tax Revenue Percent"
            }
            
            # Get all tax type data
            all_tax_data = df_display[df_display['indicator_label'].isin(tax_type_indicators.values())].copy()
            africa_ref_data_2 = ref_data[ref_data['Region Name'] == 'Africa'].copy() if not ref_data.empty else pd.DataFrame()
            africa_countries_2 = sorted(africa_ref_data_2['Country or Area'].unique()) if not africa_ref_data_2.empty else []
            available_years_ind_2 = sorted(all_tax_data['year'].dropna().unique()) if not all_tax_data.empty else []
            available_regions_2 = sorted(africa_ref_data_2['Intermediate Region Name'].dropna().unique()) if not africa_ref_data_2.empty else []
            
            # Filter row
            filter_col1, filter_col2, filter_col3, filter_col4 = st.columns([1.5, 1.5, 1.5, 0.7])
            
            with filter_col1:
                selected_year_ind_2 = st.selectbox(
                    "Select Year(s)",
                    options=["All Years"] + available_years_ind_2,
                    index=0,
                    key="ind_4_2_1_2_a_year_filter"
                )
            
            with filter_col2:
                selected_countries_ind_2 = st.multiselect(
                    "Select Country",
                    options=africa_countries_2,
                    default=[],
                    key="ind_4_2_1_2_a_country_filter"
                )
            
            with filter_col3:
                selected_regions_ind_2 = st.multiselect(
                    "Select Region",
                    options=available_regions_2,
                    default=[],
                    key="ind_4_2_1_2_a_region_filter"
                )
            
            with filter_col4:
                st.markdown("<br>", unsafe_allow_html=True)
                if st.button("Reset", key="ind_4_2_1_2_a_reset", use_container_width=True):
                    if 'ind_4_2_1_2_a_year_filter' in st.session_state:
                        del st.session_state.ind_4_2_1_2_a_year_filter
                    if 'ind_4_2_1_2_a_country_filter' in st.session_state:
                        del st.session_state.ind_4_2_1_2_a_country_filter
                    if 'ind_4_2_1_2_a_region_filter' in st.session_state:
                        del st.session_state.ind_4_2_1_2_a_region_filter
                    st.rerun()
            
            # Prepare filtered data
            filtered_tax_data = all_tax_data.copy()
            if selected_year_ind_2 != "All Years":
                filtered_tax_data = filtered_tax_data[filtered_tax_data['year'] == selected_year_ind_2]
            if selected_countries_ind_2:
                filtered_tax_data = filtered_tax_data[filtered_tax_data['country_or_area'].isin(selected_countries_ind_2)]
            if selected_regions_ind_2:
                region_countries_2 = africa_ref_data_2[
                    africa_ref_data_2['Intermediate Region Name'].isin(selected_regions_ind_2)
                ]['Country or Area'].unique()
                filtered_tax_data = filtered_tax_data[filtered_tax_data['country_or_area'].isin(region_countries_2)]
            
            # C. Visualization Panel with Multi-View Tabs
            tab_graph_2, tab_map_2, tab_data_2 = st.tabs(["Graph View", "Map View", "Data Table"])
            
            with tab_graph_2:
                # Add "How to Read This Graph" hover button
                st.markdown("""
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <button type="button" class="how-to-read-btn" data-tooltip="This stacked area chart shows the composition of tax revenue by type (% of GDP) over time. Each colored area represents a different tax category: Income Taxes (blue), CIT (light blue), VAT (red), Excise Taxes (pink), Trade Taxes (teal), and Other Taxes (light green). The total height at any point shows the combined tax revenue from all categories. A more diversified tax base shows multiple colors with balanced proportions, while concentration in one or two categories suggests a narrower tax base." style="background: none; border: none; cursor: help; font-size: 0.9em; color: #666; padding: 0.25rem 0.5rem; margin-left: auto;">
                        How to Read This Graph <span style="font-size: 0.8em;">i</span>
                    </button>
                </div>
                <style>
                    .how-to-read-btn {
                        position: relative;
                    }
                    .how-to-read-btn:hover::after {
                        content: attr(data-tooltip);
                        position: absolute;
                        bottom: 100%;
                        right: 0;
                        transform: translateX(0);
                        background-color: #333;
                        color: white;
                        padding: 12px 16px;
                        border-radius: 6px;
                        white-space: normal;
                        width: 350px;
                        max-width: 90vw;
                        font-size: 0.9em;
                        line-height: 1.5;
                        z-index: 1000;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                        margin-bottom: 8px;
                        text-align: left;
                    }
                    .how-to-read-btn:hover::before {
                        content: '';
                        position: absolute;
                        bottom: 100%;
                        right: 20px;
                        border: 6px solid transparent;
                        border-top-color: #333;
                        margin-bottom: 2px;
                        z-index: 1001;
                    }
                </style>
                """, unsafe_allow_html=True)
                
                # Render stacked area chart
                if not filtered_tax_data.empty:
                    import plotly.graph_objects as go
                    
                    # Color mapping
                    tax_colors = {
                        "Income Taxes": "#003366",  # Deep blue
                        "CIT": "#0072BC",  # Light blue
                        "VAT": "#DC143C",  # Red
                        "Excise Taxes": "#FF69B4",  # Pink
                        "Trade Taxes": "#20B2AA",  # Teal/Green
                        "Other Taxes": "#90EE90"  # Light green
                    }
                    
                    # Prepare data for stacked area chart
                    # If single country selected, show time series
                    # If multiple countries or all, show by country
                    if len(selected_countries_ind_2) == 1:
                        # Time series for single country
                        country = selected_countries_ind_2[0]
                        country_data = filtered_tax_data[filtered_tax_data['country_or_area'] == country].copy()
                        
                        if not country_data.empty:
                            fig = go.Figure()
                            
                            # Sort by year
                            country_data = country_data.sort_values('year')
                            
                            # Create stacked area chart
                            for tax_type, indicator_label in tax_type_indicators.items():
                                tax_type_data = country_data[country_data['indicator_label'] == indicator_label].sort_values('year')
                                if not tax_type_data.empty:
                                    fig.add_trace(go.Scatter(
                                        x=tax_type_data['year'],
                                        y=tax_type_data['value'],
                                        mode='lines',
                                        name=tax_type,
                                        stackgroup='one',
                                        fillcolor=tax_colors.get(tax_type, "#999999"),
                                        line=dict(color=tax_colors.get(tax_type, "#999999"), width=0),
                                        hovertemplate=f"<b>{tax_type}</b><br>Year: %{{x}}<br>% of GDP: %{{y:.2f}}%<br><extra></extra>"
                                    ))
                            
                            fig.update_layout(
                                height=500,
                                xaxis_title="Year",
                                yaxis_title="Tax Revenue (% of GDP)",
                                hovermode='x unified',
                                legend=dict(
                                    orientation="v",
                                    yanchor="top",
                                    y=1,
                                    xanchor="left",
                                    x=1.02,
                                    font=dict(size=10),
                                    bgcolor="rgba(255,255,255,0.8)",
                                    bordercolor="rgba(0,0,0,0.2)",
                                    borderwidth=1
                                ),
                                margin=dict(l=50, r=180, t=20, b=50),
                                title=f"Tax Revenue Composition by Type - {country}"
                            )
                            
                            st.plotly_chart(fig, use_container_width=True, key=f"plot_4_2_1_2_graph_{country}")
                        else:
                            st.info(f"No data available for {country}.")
                    else:
                        # Bar chart by country for selected year or latest year
                        if selected_year_ind_2 != "All Years":
                            year_data = filtered_tax_data[filtered_tax_data['year'] == selected_year_ind_2].copy()
                        else:
                            # Use latest year per country
                            year_data = filtered_tax_data.loc[filtered_tax_data.groupby(['country_or_area', 'indicator_label'])['year'].idxmax()].copy()
                        
                        if not year_data.empty:
                            # Get unique countries
                            countries = sorted(year_data['country_or_area'].unique())
                            
                            fig = go.Figure()
                            
                            # Create stacked bar chart
                            for tax_type, indicator_label in tax_type_indicators.items():
                                tax_values = []
                                for country in countries:
                                    country_tax_data = year_data[
                                        (year_data['country_or_area'] == country) & 
                                        (year_data['indicator_label'] == indicator_label)
                                    ]
                                    if not country_tax_data.empty:
                                        tax_values.append(country_tax_data['value'].iloc[0])
                                    else:
                                        tax_values.append(0)
                                
                                fig.add_trace(go.Bar(
                                    x=countries,
                                    y=tax_values,
                                    name=tax_type,
                                    marker_color=tax_colors.get(tax_type, "#999999"),
                                    hovertemplate=f"<b>{tax_type}</b><br>Country: %{{x}}<br>% of GDP: %{{y:.2f}}%<br><extra></extra>"
                                ))
                            
                            fig.update_layout(
                                height=500,
                                xaxis_title="Country",
                                yaxis_title="Tax Revenue (% of GDP)",
                                barmode='stack',
                                hovermode='x unified',
                                legend=dict(
                                    orientation="v",
                                    yanchor="top",
                                    y=1,
                                    xanchor="left",
                                    x=1.02,
                                    font=dict(size=10),
                                    bgcolor="rgba(255,255,255,0.8)",
                                    bordercolor="rgba(0,0,0,0.2)",
                                    borderwidth=1
                                ),
                                margin=dict(l=50, r=180, t=20, b=50),
                                xaxis=dict(tickangle=-45)
                            )
                            
                            st.plotly_chart(fig, use_container_width=True, key="plot_4_2_1_2_graph_bar")
                        else:
                            st.info("No data available for the selected filters.")
                else:
                    st.info("No data available for the selected filters.")
            
            with tab_map_2:
                # Map View - Show total tax revenue by type (could show one type at a time)
                if not filtered_tax_data.empty:
                    st.info("Map view for tax revenue composition - Select a specific tax type to view on map.")
                    
                    # Allow selection of tax type for map
                    selected_tax_type_map = st.selectbox(
                        "Select Tax Type for Map:",
                        options=list(tax_type_indicators.keys()),
                        key="ind_4_2_1_2_a_map_tax_type"
                    )
                    
                    map_indicator = tax_type_indicators[selected_tax_type_map]
                    map_data_2 = filtered_tax_data[filtered_tax_data['indicator_label'] == map_indicator].copy()
                    
                    if selected_year_ind_2 != "All Years":
                        map_data_2 = map_data_2[map_data_2['year'] == selected_year_ind_2]
                    else:
                        map_data_2 = map_data_2.loc[map_data_2.groupby('country_or_area')['year'].idxmax()]
                    
                    map_data_2['value'] = pd.to_numeric(map_data_2['value'], errors='coerce')
                    map_data_2 = map_data_2.dropna(subset=['value'])
                    
                    if not map_data_2.empty:
                        africa_ref_2 = ref_data[ref_data['Region Name'] == 'Africa'].copy()
                        if not africa_ref_2.empty and 'Country or Area' in africa_ref_2.columns:
                            map_data_merged_2 = map_data_2.merge(
                                africa_ref_2[['Country or Area', 'iso3']],
                                left_on='country_or_area',
                                right_on='Country or Area',
                                how='inner'
                            )
                            
                            if not map_data_merged_2.empty:
                                iso_col_2 = 'iso3_y' if 'iso3_y' in map_data_merged_2.columns else ('iso3_x' if 'iso3_x' in map_data_merged_2.columns else 'iso3')
                                if iso_col_2 != 'iso3' and iso_col_2 in map_data_merged_2.columns:
                                    map_data_merged_2['iso3'] = map_data_merged_2[iso_col_2]
                                
                                import plotly.graph_objects as go
                                fig_map_2 = go.Figure(data=go.Choropleth(
                                    locations=map_data_merged_2['iso3'],
                                    z=map_data_merged_2['value'],
                                    locationmode='ISO-3',
                                    colorscale='Blues',
                                    showscale=True,
                                    text=map_data_merged_2.apply(
                                        lambda row: f"{row['country_or_area']}<br>{selected_tax_type_map}: {row['value']:.2f}% of GDP<br>Year: {row['year']}",
                                        axis=1
                                    ),
                                    hovertemplate='%{text}<extra></extra>',
                                    colorbar=dict(title=f"{selected_tax_type_map} (% of GDP)")
                                ))
                                
                                fig_map_2.update_layout(
                                    height=500,
                                    geo=dict(
                                        bgcolor='rgba(0,0,0,0)',
                                        lakecolor='rgba(0,0,0,0)',
                                        landcolor='rgba(217, 217, 217, 1)',
                                        subunitcolor='white',
                                        scope='africa',
                                        showframe=False,
                                        showcoastlines=True,
                                        projection_type='natural earth'
                                    ),
                                    margin={"r":0,"t":0,"l":0,"b":0}
                                )
                                
                                st.plotly_chart(fig_map_2, use_container_width=True, key="plot_4_2_1_2_map")
                else:
                    st.info("No data available for the selected filters.")
            
            with tab_data_2:
                # Data Table
                if not filtered_tax_data.empty:
                    # Add tax type name column
                    display_df_2 = filtered_tax_data.copy()
                    display_df_2['Tax Type'] = display_df_2['indicator_label'].map({v: k for k, v in tax_type_indicators.items()})
                    display_df_2 = display_df_2[['country_or_area', 'year', 'Tax Type', 'value']].copy()
                    display_df_2 = display_df_2.rename(columns={'value': 'Tax Revenue (% of GDP)'})
                    st.dataframe(display_df_2, use_container_width=True)
                    
                    csv_2 = display_df_2.to_csv(index=False)
                    st.download_button(
                        label="Download data as CSV",
                        data=csv_2,
                        file_name=f"indicator_4_2_1_2_a_{selected_year_ind_2 if selected_year_ind_2 != 'All Years' else 'all_years'}.csv",
                        mime="text/csv",
                        key="ind_4_2_1_2_a_download_csv"
                    )
                else:
                    st.info("No data available for the selected filters.")
            
            # D. Supporting Information Layers
            with st.expander("Learn more about this indicator", expanded=False):
                tab_def, tab_proxy = st.tabs(["Definition", "Proxy Justification"])
            with tab_def:
                    st.markdown("""
                    This indicator shows the composition of tax revenue by type as a percentage of GDP. It breaks down total tax revenue into:
                    - **Income Taxes**: Taxes on income, profits, and capital gains
                    - **CIT (Corporate Income Tax)**: Taxes on corporate profits
                    - **VAT (Value Added Tax)**: Consumption tax on goods and services
                    - **Excise Taxes**: Taxes on specific goods (e.g., tobacco, alcohol, fuel)
                    - **Trade Taxes**: Taxes on imports and exports
                    - **Other Taxes**: All other tax categories
                    
                    **Source:** World Bank WDI - Tax Revenue by Type
                    """)
            with tab_proxy:
                st.markdown("""
                Tax revenue composition by type serves as a proxy for taxpayer base expansion. Countries with a more diversified tax structure typically have a broader taxpayer base, as different tax types target different segments of the economy (corporations, individuals, consumers, traders).
                """)
                st.markdown("""
                **Efficiency:** A balanced stack (diversified tax types) indicates efficient mobilization. Countries that can raise revenue from multiple sources without over-reliance on any single category demonstrate more efficient tax systems. Over-concentration in one tax type (e.g., trade taxes or resource taxes) suggests vulnerability to economic shocks.
                
                **Effectiveness:** Countries expanding taxpayer coverage across categories (e.g., from trade taxes to VAT and income taxes) demonstrate stronger institutional capacity and inclusiveness. A wider tax base strengthens equity and fiscal resilience by reducing dependence on narrow, volatile revenue streams.
                """)
        
        # ========================================
        # SUB-TAB 2: 4.2.1.2.b – Domestic Revenue
        # ========================================
        with tab_4_2_1_2_b:
            # A. Indicator Header
            st.markdown("""
            <div class='indicator-card'>
                <h4>
                    4.2.1.2.b – Domestic Revenue
                    <button type="button" class="info-icon-btn" data-tooltip="Shows domestic revenue composition (taxes on income, profits, and capital gains) as a share of GDP over time." style="background: none; border: none; cursor: help; font-size: 0.8em; color: #666; margin-left: 0.5rem; padding: 0;">i</button>
                </h4>
                <p style="color: #888; font-size: 0.9em; margin-bottom: 0.5rem;">
                    <em>Proxy Indicator: Taxes on Income, Profits, and Capital Gains (GRD)</em>
                </p>
                <p style="color: #555; line-height: 1.5; margin-bottom: 0.75rem;">
                    <strong>Analytical Focus Question:</strong> What share of national income comes from direct and resource-based revenues, and how does it evolve over time?
                </p>
            </div>
            <style>
                .info-icon-btn {
                    position: relative;
                }
                .info-icon-btn:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #333;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    white-space: normal;
                    width: 250px;
                    font-size: 0.9em;
                    z-index: 1000;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    margin-bottom: 5px;
                }
            </style>
            """, unsafe_allow_html=True)
            
            # Load GRD tax revenue data (proxy for income, profits, and capital gains)
            grd_tax_data = df_main[df_main['indicator_label'].str.contains('Tax Revenue.*GRD', case=False, na=False)].copy()
            
            # Filter for Africa only
            if not ref_data.empty and not grd_tax_data.empty:
                africa_countries = ref_data[ref_data['Region Name'] == 'Africa']['Country or Area'].unique()
                grd_tax_data = grd_tax_data[grd_tax_data['country_or_area'].isin(africa_countries)]
            
            if not grd_tax_data.empty:
                # B. Local Filter Row (scoped to this indicator)
                africa_ref_data_4_2_1_2_b = ref_data[ref_data['Region Name'] == 'Africa'].copy() if not ref_data.empty else pd.DataFrame()
                africa_countries_4_2_1_2_b = sorted(africa_ref_data_4_2_1_2_b['Country or Area'].unique()) if not africa_ref_data_4_2_1_2_b.empty else []
                available_years_4_2_1_2_b = sorted(grd_tax_data['year'].dropna().unique()) if not grd_tax_data.empty else []
                available_regions_4_2_1_2_b = sorted(africa_ref_data_4_2_1_2_b['Intermediate Region Name'].dropna().unique()) if not africa_ref_data_4_2_1_2_b.empty else []
                
                # Filter row
                filter_col1, filter_col2, filter_col3, filter_col4 = st.columns([1.5, 1.5, 1.5, 0.7])
                
                with filter_col1:
                    selected_year_4_2_1_2_b = st.selectbox(
                        "Select Year(s)",
                        options=["All Years"] + available_years_4_2_1_2_b,
                        index=0,
                        key="ind_4_2_1_2_b_year_filter"
                    )
                
                with filter_col2:
                    selected_countries_4_2_1_2_b = st.multiselect(
                        "Select Country",
                        options=africa_countries_4_2_1_2_b,
                        default=[],
                        key="ind_4_2_1_2_b_country_filter"
                    )
                
                with filter_col3:
                    selected_regions_4_2_1_2_b = st.multiselect(
                        "Select Region",
                        options=available_regions_4_2_1_2_b,
                        default=[],
                        key="ind_4_2_1_2_b_region_filter"
                    )
                
                with filter_col4:
                    st.markdown("<br>", unsafe_allow_html=True)
                    if st.button("Reset", key="ind_4_2_1_2_b_reset", use_container_width=True):
                        # Delete session state keys to reset widgets to defaults
                        if 'ind_4_2_1_2_b_year_filter' in st.session_state:
                            del st.session_state.ind_4_2_1_2_b_year_filter
                        if 'ind_4_2_1_2_b_country_filter' in st.session_state:
                            del st.session_state.ind_4_2_1_2_b_country_filter
                        if 'ind_4_2_1_2_b_region_filter' in st.session_state:
                            del st.session_state.ind_4_2_1_2_b_region_filter
                        st.rerun()
                
                # Prepare filtered data
                filtered_grd_data = grd_tax_data.copy()
                if selected_year_4_2_1_2_b != "All Years":
                    filtered_grd_data = filtered_grd_data[filtered_grd_data['year'] == selected_year_4_2_1_2_b]
                if selected_countries_4_2_1_2_b:
                    filtered_grd_data = filtered_grd_data[filtered_grd_data['country_or_area'].isin(selected_countries_4_2_1_2_b)]
                if selected_regions_4_2_1_2_b:
                    region_countries_4_2_1_2_b = africa_ref_data_4_2_1_2_b[
                        africa_ref_data_4_2_1_2_b['Intermediate Region Name'].isin(selected_regions_4_2_1_2_b)
                    ]['Country or Area'].unique()
                    filtered_grd_data = filtered_grd_data[filtered_grd_data['country_or_area'].isin(region_countries_4_2_1_2_b)]
                
                # C. Visualization Panel with Multi-View Tabs
                tab_graph_4_2_1_2_b, tab_map_4_2_1_2_b, tab_data_4_2_1_2_b = st.tabs(["Graph View", "Map View", "Data Table"])
                
                with tab_graph_4_2_1_2_b:
                    # Add "How to Read This Graph" hover button
                    st.markdown("""
                    <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                        <button type="button" class="how-to-read-btn" data-tooltip="This bar chart shows domestic revenue from taxes (excluding and including social contributions) as a share of GDP. Each bar represents a country's tax revenue percentage. Higher values indicate stronger domestic revenue mobilization. The difference between the two measures shows the contribution of social contributions to total tax revenue. Use the filters to explore different years and countries." style="background: none; border: none; cursor: help; font-size: 0.9em; color: #666; padding: 0.25rem 0.5rem; margin-left: auto;">
                            How to Read This Graph <span style="font-size: 0.8em;">i</span>
                        </button>
                    </div>
                    <style>
                    .how-to-read-btn {
                        position: relative;
                    }
                    .how-to-read-btn:hover::after {
                        content: attr(data-tooltip);
                        position: absolute;
                        bottom: 100%;
                        right: 0;
                        transform: translateX(0);
                        background-color: #333;
                        color: white;
                        padding: 12px 16px;
                        border-radius: 6px;
                        white-space: normal;
                        width: 350px;
                        max-width: 90vw;
                        font-size: 0.9em;
                        line-height: 1.5;
                        z-index: 1000;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                        margin-bottom: 8px;
                        text-align: left;
                    }
                    .how-to-read-btn:hover::before {
                        content: '';
                        position: absolute;
                        bottom: 100%;
                        right: 20px;
                        border: 6px solid transparent;
                        border-top-color: #333;
                        margin-bottom: 2px;
                        z-index: 1001;
                    }
                    </style>
                    """, unsafe_allow_html=True)
                    
                    if not filtered_grd_data.empty:
                        import plotly.graph_objects as go
                        
                        # For time series, use the selected year or all years
                        if selected_year_4_2_1_2_b == "All Years":
                            # Time series view
                            fig = go.Figure()
                            countries_to_plot = selected_countries_4_2_1_2_b if selected_countries_4_2_1_2_b else filtered_grd_data['country_or_area'].unique()[:10]
                            
                            for country in countries_to_plot:
                                country_data = filtered_grd_data[filtered_grd_data['country_or_area'] == country].sort_values('year')
                                for indicator in country_data['indicator_label'].unique():
                                    ind_data = country_data[country_data['indicator_label'] == indicator]
                                    indicator_name = indicator.replace('Tax Revenue ', '').replace(' (% of GDP) - GRD', '')
                                    fig.add_trace(go.Scatter(
                                        x=ind_data['year'],
                                        y=ind_data['value'],
                                        mode='lines+markers',
                                        name=f"{country} - {indicator_name}",
                                        hovertemplate="<b>%{fullData.name}</b><br>Year: %{x}<br>% of GDP: %{y:.2f}%<br><extra></extra>"
                                    ))
                            
                            fig.update_layout(
                                title="Domestic Revenue (GRD Tax Revenue) Over Time",
                                xaxis_title="Year",
                                yaxis_title="Tax Revenue (% of GDP)",
                                height=600,
                                hovermode='closest',
                                legend=dict(orientation="v", yanchor="top", y=1, xanchor="left", x=1.02)
                            )
                        else:
                            # Bar chart for single year
                            year_data = filtered_grd_data[filtered_grd_data['year'] == selected_year_4_2_1_2_b].copy()
                            fig = go.Figure()
                            
                            for indicator in year_data['indicator_label'].unique():
                                ind_data = year_data[year_data['indicator_label'] == indicator].sort_values('value', ascending=False)
                                indicator_name = indicator.replace('Tax Revenue ', '').replace(' (% of GDP) - GRD', '')
                                fig.add_trace(go.Bar(
                                    x=ind_data['country_or_area'],
                                    y=ind_data['value'],
                                    name=indicator_name,
                                    hovertemplate="<b>%{x}</b><br>%{fullData.name}<br>% of GDP: %{y:.2f}%<br><extra></extra>"
                                ))
                            
                            fig.update_layout(
                                title=f"Domestic Revenue (GRD Tax Revenue) - {int(selected_year_4_2_1_2_b)}",
                                xaxis_title="Country",
                                yaxis_title="Tax Revenue (% of GDP)",
                                barmode='group',
                                height=600,
                                hovermode='closest',
                                legend=dict(orientation="v", yanchor="top", y=1, xanchor="left", x=1.02),
                                xaxis=dict(tickangle=-45)
                            )
                        
                        st.plotly_chart(fig, use_container_width=True, key="plot_4_2_1_2_b_grd")
                    else:
                        st.info("No data available for the selected filters.")
                
                with tab_map_4_2_1_2_b:
                    if not filtered_grd_data.empty:
                        import plotly.express as px
                        
                        # Use the most recent year if "All Years" is selected
                        if selected_year_4_2_1_2_b == "All Years":
                            map_year = filtered_grd_data['year'].max()
                        else:
                            map_year = selected_year_4_2_1_2_b
                        
                        map_data = filtered_grd_data[filtered_grd_data['year'] == map_year].copy()
                        
                        if not map_data.empty:
                            # Aggregate by country (take average if multiple indicators)
                            map_data_agg = map_data.groupby('country_or_area')['value'].mean().reset_index()
                            map_data_agg = map_data_agg.rename(columns={'country_or_area': 'Country or Area', 'value': 'Tax Revenue (% of GDP)'})
                            
                            # Merge with reference data for ISO codes
                            if not africa_ref_data_4_2_1_2_b.empty:
                                map_data_merged_4_2_1_2_b = map_data_agg.merge(
                                    africa_ref_data_4_2_1_2_b[['Country or Area', 'iso3']],
                                    on='Country or Area',
                                    how='inner'
                                )
                                
                                # Handle potential duplicate iso3 columns after merge
                                iso_col_4_2_1_2_b = 'iso3_y' if 'iso3_y' in map_data_merged_4_2_1_2_b.columns else ('iso3_x' if 'iso3_x' in map_data_merged_4_2_1_2_b.columns else 'iso3')
                                if iso_col_4_2_1_2_b != 'iso3' and iso_col_4_2_1_2_b in map_data_merged_4_2_1_2_b.columns:
                                    map_data_merged_4_2_1_2_b['iso3'] = map_data_merged_4_2_1_2_b[iso_col_4_2_1_2_b]
                                
                                # Filter out rows with missing ISO codes
                                map_data_merged_4_2_1_2_b = map_data_merged_4_2_1_2_b[map_data_merged_4_2_1_2_b['iso3'].notna()]
                                
                                if not map_data_merged_4_2_1_2_b.empty:
                                    fig_map = px.choropleth(
                                        map_data_merged_4_2_1_2_b,
                                        locations='iso3',
                                        color='Tax Revenue (% of GDP)',
                                        hover_name='Country or Area',
                                        hover_data={'Tax Revenue (% of GDP)': ':.2f'},
                                        color_continuous_scale='Blues',
                                        title=f"Domestic Revenue (GRD Tax Revenue) - {int(map_year)}",
                                        labels={'Tax Revenue (% of GDP)': 'Tax Revenue (% of GDP)'}
                                    )
                                    
                                    fig_map.update_geos(
                                        visible=False,
                                        resolution=50,
                                        showcountries=True,
                                        countrycolor="white",
                                        showcoastlines=True,
                                        coastlinecolor="white",
                                        showland=True,
                                        landcolor="lightgray"
                                    )
                                    
                                    fig_map.update_layout(
                                        height=600,
                                        margin={"r":0,"t":0,"l":0,"b":0}
                                    )
                                    
                                    st.plotly_chart(fig_map, use_container_width=True, key="plot_4_2_1_2_b_map")
                                else:
                                    st.info("No geographic data available for mapping after filtering ISO codes.")
                            else:
                                st.info("Reference data not available for map visualization.")
                        else:
                            st.info("No data available for the selected year.")
                    else:
                        st.info("No data available for the selected filters.")
                
                with tab_data_4_2_1_2_b:
                    if not filtered_grd_data.empty:
                        display_df_4_2_1_2_b = filtered_grd_data[['country_or_area', 'year', 'indicator_label', 'value']].copy()
                        display_df_4_2_1_2_b = display_df_4_2_1_2_b.rename(columns={
                            'country_or_area': 'Country',
                            'year': 'Year',
                            'indicator_label': 'Indicator',
                            'value': 'Tax Revenue (% of GDP)'
                        })
                        st.dataframe(display_df_4_2_1_2_b, use_container_width=True)
                        
                        csv_4_2_1_2_b = display_df_4_2_1_2_b.to_csv(index=False)
                        st.download_button(
                            label="Download data as CSV",
                            data=csv_4_2_1_2_b,
                            file_name=f"indicator_4_2_1_2_b_{selected_year_4_2_1_2_b if selected_year_4_2_1_2_b != 'All Years' else 'all_years'}.csv",
                            mime="text/csv",
                            key="ind_4_2_1_2_b_download_csv"
                        )
                    else:
                        st.info("No data available for the selected filters.")
                
                # D. Supporting Information Layers
                with st.expander("Learn more about this indicator", expanded=False):
                    tab_def_4_2_1_2_b, tab_proxy_4_2_1_2_b = st.tabs(["Definition", "Proxy Justification"])
                    with tab_def_4_2_1_2_b:
                        st.markdown("""
                        This indicator shows domestic revenue from taxes on income, profits, and capital gains as a share of GDP. 
                        It measures the contribution of direct taxes (taxes on income, profits, and capital gains) to total tax revenue.
                        
                        The indicator is presented in two forms:
                        - **Excluding Social Contributions**: Direct taxes only
                        - **Including Social Contributions**: Direct taxes plus social security contributions
                        
                        **Source:** Global Revenue Database (GRD) - Tax Revenue by Type
                        """)
                    with tab_proxy_4_2_1_2_b:
                        st.markdown("""
                        Taxes on income, profits, and capital gains (GRD) serve as a proxy for domestic revenue composition. 
                        This indicator shows what share of national income comes from direct and resource-based revenues, 
                        and how it evolves over time. Countries with higher shares of direct taxes typically have more 
                        progressive tax systems and broader taxpayer bases.
                        """)
            else:
                st.info("Data not available. GRD tax revenue indicators need to be added to the dataset.")
        
        # Note: The existing 4.2.1.2 implementation (Taxpayer Base Expansion with tax composition) 
        # should be moved here if it's meant to be 4.2.1.2.b, but based on the user's request,
        # 4.2.1.2.b should be a placeholder. The existing implementation might be for 4.2.1.2.a.
        # For now, I'll keep the existing implementation as a separate section below the expanders.
        
        # Existing implementation (currently labeled as 4.2.1.2) - This appears to be tax composition
        # which might be related to 4.2.1.2.a, but the user wants 4.2.1.2.a as a placeholder.
        # I'll comment this out for now and the user can clarify.

# ========================================
# SUB-TOPIC 4.2.2 – Tax Administration Efficiency
# ========================================
with tab_subtopic_2:
    # Create tabs for indicators under 4.2.2
    tab_ind_4_2_2_1, tab_ind_4_2_2_2 = st.tabs([
        "Indicator 4.2.2.1 – Tax Collection Efficiency Score",
        "Indicator 4.2.2.2 – Reduction in Tax Evasion"
    ])
    
    # ========================================
    # TAB 1: Indicator 4.2.2.1 – Tax Collection Efficiency Score
    # ========================================
    with tab_ind_4_2_2_1:
        with st.container():
            # A. Indicator Header
            indicator_tab_4_2_2_1 = "Tax Effort (Actual / Capacity)"
            st.markdown("""
            <div class='indicator-card'>
                <h4>
                    Indicator 4.2.2.1 – Tax Collection Efficiency Score
                    <button type="button" class="info-icon-btn" data-tooltip="Measures how efficiently countries collect the taxes they are capable of collecting, given their income levels and trade structure. Proxied by Tax Effort." style="background: none; border: none; cursor: help; font-size: 0.8em; color: #666; margin-left: 0.5rem; padding: 0;">i</button>
                </h4>
                <p style="color: #888; font-size: 0.9em; margin-bottom: 0.5rem;">
                    <em>Proxy Indicator:</em> Tax Effort
                </p>
                <p style="color: #555; line-height: 1.5; margin-bottom: 0.75rem;">
                    <strong>Analytical Focus Question:</strong> How efficiently are countries collecting the taxes they are capable of collecting, given their income levels and trade structure?
                </p>
            </div>
            <style>
                .info-icon-btn {
                    position: relative;
                }
                .info-icon-btn:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #333;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    white-space: normal;
                    width: 250px;
                    font-size: 0.9em;
                    z-index: 1000;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    margin-bottom: 5px;
                }
            </style>
            """, unsafe_allow_html=True)
            
            # B. Local Filter Row (scoped to this indicator)
            # Get indicator data for filter options
            indicator_data_4_2_2_1 = df_display[df_display['indicator_label'] == indicator_tab_4_2_2_1].copy()
            africa_ref_data_4_2_2_1 = ref_data[ref_data['Region Name'] == 'Africa'].copy() if not ref_data.empty else pd.DataFrame()
            africa_countries_4_2_2_1 = sorted(africa_ref_data_4_2_2_1['Country or Area'].unique()) if not africa_ref_data_4_2_2_1.empty else []
            available_years_ind_4_2_2_1 = sorted(indicator_data_4_2_2_1['year'].dropna().unique()) if not indicator_data_4_2_2_1.empty else []
            available_regions_4_2_2_1 = sorted(africa_ref_data_4_2_2_1['Intermediate Region Name'].dropna().unique()) if not africa_ref_data_4_2_2_1.empty else []
            
            # Filter row
            filter_col1, filter_col2, filter_col3, filter_col4 = st.columns([1.5, 1.5, 1.5, 0.7])
            
            with filter_col1:
                selected_year_ind_4_2_2_1 = st.selectbox(
                    "Select Year(s)",
                    options=["All Years"] + available_years_ind_4_2_2_1,
                    index=0,
                    key="ind_4_2_2_1_year_filter"
                )
            
            with filter_col2:
                selected_countries_ind_4_2_2_1 = st.multiselect(
                    "Select Country",
                    options=africa_countries_4_2_2_1,
                    default=[],
                    key="ind_4_2_2_1_country_filter"
                )
            
            with filter_col3:
                selected_regions_ind_4_2_2_1 = st.multiselect(
                    "Select Region",
                    options=available_regions_4_2_2_1,
                    default=[],
                    key="ind_4_2_2_1_region_filter"
                )
            
            with filter_col4:
                st.markdown("<br>", unsafe_allow_html=True)
                if st.button("Reset", key="ind_4_2_2_1_reset", use_container_width=True):
                    # Delete session state keys to reset widgets to defaults
                    if 'ind_4_2_2_1_year_filter' in st.session_state:
                        del st.session_state.ind_4_2_2_1_year_filter
                    if 'ind_4_2_2_1_country_filter' in st.session_state:
                        del st.session_state.ind_4_2_2_1_country_filter
                    if 'ind_4_2_2_1_region_filter' in st.session_state:
                        del st.session_state.ind_4_2_2_1_region_filter
                    st.rerun()
            
            # Prepare filtered data for this indicator
            filtered_ind_data_4_2_2_1 = indicator_data_4_2_2_1.copy()
            if selected_year_ind_4_2_2_1 != "All Years":
                filtered_ind_data_4_2_2_1 = filtered_ind_data_4_2_2_1[filtered_ind_data_4_2_2_1['year'] == selected_year_ind_4_2_2_1]
            if selected_countries_ind_4_2_2_1:
                filtered_ind_data_4_2_2_1 = filtered_ind_data_4_2_2_1[filtered_ind_data_4_2_2_1['country_or_area'].isin(selected_countries_ind_4_2_2_1)]
            if selected_regions_ind_4_2_2_1:
                # Filter by intermediate region
                region_countries_4_2_2_1 = africa_ref_data_4_2_2_1[
                    africa_ref_data_4_2_2_1['Intermediate Region Name'].isin(selected_regions_ind_4_2_2_1)
                ]['Country or Area'].unique()
                filtered_ind_data_4_2_2_1 = filtered_ind_data_4_2_2_1[filtered_ind_data_4_2_2_1['country_or_area'].isin(region_countries_4_2_2_1)]
            
            # C. Visualization Panel with Multi-View Tabs
            tab_graph_4_2_2_1, tab_map_4_2_2_1, tab_data_4_2_2_1 = st.tabs(["Graph View", "Map View", "Data Table"])
            
            with tab_graph_4_2_2_1:
                # Add "How to Read This Graph" hover button
                st.markdown("""
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <button type="button" class="how-to-read-btn" data-tooltip="Each line shows a country's tax effort over time. Tax Effort = Actual Tax Revenue / Estimated Tax Capacity. Values close to 1.0 suggest efficient collection. Values below 1.0 indicate under-collection (gap exists). The reference line at 1.0 shows the efficient collection benchmark." style="background: none; border: none; cursor: help; font-size: 0.9em; color: #666; padding: 0.25rem 0.5rem; margin-left: auto;">
                        How to Read This Graph <span style="font-size: 0.8em;">i</span>
                    </button>
                </div>
                <style>
                .how-to-read-btn {
                    position: relative;
                }
                .how-to-read-btn:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 100%;
                    right: 0;
                    transform: translateX(0);
                    background-color: #333;
                    color: white;
                    padding: 12px 16px;
                    border-radius: 6px;
                    white-space: normal;
                    width: 350px;
                    max-width: 90vw;
                    font-size: 0.9em;
                    line-height: 1.5;
                    z-index: 1000;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    margin-bottom: 8px;
                    text-align: left;
                }
                .how-to-read-btn:hover::before {
                    content: '';
                    position: absolute;
                    bottom: 100%;
                    right: 20px;
                    border: 6px solid transparent;
                    border-top-color: #333;
                    margin-bottom: 2px;
                    z-index: 1001;
                }
                </style>
                """, unsafe_allow_html=True)
                
                # Time Trend visualization
                if not filtered_ind_data_4_2_2_1.empty:
                    import plotly.graph_objects as go
                    import numpy as np
                    
                    # Calculate regional average (Africa average)
                    all_africa_data_4_2_2_1 = indicator_data_4_2_2_1[indicator_data_4_2_2_1['country_or_area'].isin(africa_countries_4_2_2_1)].copy()
                    regional_avg_4_2_2_1 = pd.DataFrame()
                    if not all_africa_data_4_2_2_1.empty:
                        regional_avg_4_2_2_1 = all_africa_data_4_2_2_1.groupby('year')['value'].mean().reset_index()
                        regional_avg_4_2_2_1.columns = ['year', 'regional_avg']
                    
                    # Create figure
                    fig = go.Figure()
                    
                    # Color definitions
                    color_selected = '#003366'  # Deep blue for selected
                    color_regional = '#F26C2B'  # Orange for regional average
                    color_other = '#3366CC'  # Medium blue for other countries
                    
                    # Get selected countries (if any)
                    selected_countries_list_4_2_2_1 = selected_countries_ind_4_2_2_1 if selected_countries_ind_4_2_2_1 else []
                    
                    # ALWAYS add regional average line first (so it appears at top of legend)
                    if not regional_avg_4_2_2_1.empty:
                        fig.add_trace(go.Scatter(
                            x=regional_avg_4_2_2_1['year'],
                            y=regional_avg_4_2_2_1['regional_avg'],
                            mode='lines+markers',
                            name='Africa (Region Average)',
                            line=dict(color=color_regional, width=3, dash='dash'),
                            marker=dict(color=color_regional, size=8),
                            hovertemplate="<b>Africa (Region Average)</b><br>Year: %{x}<br>Tax Effort: %{y:.2f}<br><extra></extra>",
                            showlegend=True,
                            legendrank=1
                        ))
                    
                    # Add country lines (only if there's filtered data)
                    if not filtered_ind_data_4_2_2_1.empty:
                        countries_list_4_2_2_1 = sorted(filtered_ind_data_4_2_2_1['country_or_area'].unique())
                        for country in countries_list_4_2_2_1:
                            country_data = filtered_ind_data_4_2_2_1[filtered_ind_data_4_2_2_1['country_or_area'] == country].sort_values('year')
                            if not country_data.empty:
                                # Use selected color if country is selected, otherwise use other color
                                line_color = color_selected if country in selected_countries_list_4_2_2_1 else color_other
                                line_width = 3 if country in selected_countries_list_4_2_2_1 else 2
                                
                                fig.add_trace(go.Scatter(
                                    x=country_data['year'],
                                    y=country_data['value'],
                                    mode='lines+markers',
                                    name=country,
                                    line=dict(color=line_color, width=line_width),
                                    marker=dict(color=line_color, size=6 if country in selected_countries_list_4_2_2_1 else 4),
                                    hovertemplate=f"<b>{country}</b><br>Year: %{{x}}<br>Tax Effort: %{{y:.2f}}<br><extra></extra>",
                                    showlegend=True
                                ))
                    
                    # Add reference line at 1 (efficient collection)
                    if not regional_avg_4_2_2_1.empty:
                        years = sorted(regional_avg_4_2_2_1['year'].unique())
                    elif not filtered_ind_data_4_2_2_1.empty:
                        years = sorted(filtered_ind_data_4_2_2_1['year'].unique())
                    else:
                        years = []
                    
                    if years:
                        fig.add_trace(go.Scatter(
                            x=years,
                            y=[1.0] * len(years),
                            mode='lines',
                            name='Efficient Collection (Effort = 1)',
                            line=dict(color='#008B8B', width=2, dash='dot'),
                            opacity=0.7,
                            showlegend=True
                        ))
                    
                    # Update layout
                    fig.update_layout(
                        height=500,
                        xaxis_title="Year",
                        yaxis_title="Tax Effort (Actual / Capacity)",
                        hovermode='closest',
                        legend=dict(
                            orientation="v",
                            yanchor="top",
                            y=1,
                            xanchor="left",
                            x=1.02,
                            font=dict(size=10),
                            bgcolor="rgba(255,255,255,0.8)",
                            bordercolor="rgba(0,0,0,0.2)",
                            borderwidth=1
                        ),
                        margin=dict(l=50, r=180, t=20, b=50)
                    )
                    
                    st.plotly_chart(fig, use_container_width=True, key="plot_4_2_2_1_graph")
                else:
                    st.info("No data available for the selected filters.")
            
            with tab_map_4_2_2_1:
                # Map View
                if not filtered_ind_data_4_2_2_1.empty:
                    # Prepare map data
                    map_data_4_2_2_1 = filtered_ind_data_4_2_2_1.copy()
                
                    # Use the latest year if multiple years, or selected year
                    if selected_year_ind_4_2_2_1 != "All Years":
                        map_data_4_2_2_1 = map_data_4_2_2_1[map_data_4_2_2_1['year'] == selected_year_ind_4_2_2_1]
                    else:
                        # Use latest year per country
                        map_data_4_2_2_1 = map_data_4_2_2_1.loc[map_data_4_2_2_1.groupby('country_or_area')['year'].idxmax()]
                    
                    # Convert values to numeric
                    map_data_4_2_2_1['value'] = pd.to_numeric(map_data_4_2_2_1['value'], errors='coerce')
                    map_data_4_2_2_1 = map_data_4_2_2_1.dropna(subset=['value'])
                    
                    if not map_data_4_2_2_1.empty:
                        # Merge with reference data to get ISO codes
                        africa_ref_4_2_2_1 = ref_data[ref_data['Region Name'] == 'Africa'].copy()
                        if not africa_ref_4_2_2_1.empty and 'Country or Area' in africa_ref_4_2_2_1.columns:
                            map_data_merged_4_2_2_1 = map_data_4_2_2_1.merge(
                                africa_ref_4_2_2_1[['Country or Area', 'iso3']],
                                left_on='country_or_area',
                                right_on='Country or Area',
                                how='inner'
                            )
                            
                            if not map_data_merged_4_2_2_1.empty:
                                # Determine the correct ISO column name after merge
                                iso_col_4_2_2_1 = 'iso3_y' if 'iso3_y' in map_data_merged_4_2_2_1.columns else ('iso3_x' if 'iso3_x' in map_data_merged_4_2_2_1.columns else 'iso3')
                                if iso_col_4_2_2_1 != 'iso3' and iso_col_4_2_2_1 in map_data_merged_4_2_2_1.columns:
                                    map_data_merged_4_2_2_1['iso3'] = map_data_merged_4_2_2_1[iso_col_4_2_2_1]
                                
                                # Create choropleth map
                                import plotly.graph_objects as go
                                fig_map_4_2_2_1 = go.Figure(data=go.Choropleth(
                                    locations=map_data_merged_4_2_2_1['iso3'],
                                    z=map_data_merged_4_2_2_1['value'],
                                    locationmode='ISO-3',
                                    colorscale='Blues',
                                    showscale=True,
                                    text=map_data_merged_4_2_2_1.apply(
                                        lambda row: f"{row['country_or_area']}<br>Tax Effort: {row['value']:.2f}<br>Year: {row['year']}",
                                        axis=1
                                    ),
                                    hovertemplate='%{text}<extra></extra>',
                                    colorbar=dict(title="Tax Effort")
                                ))
                                
                                fig_map_4_2_2_1.update_layout(
                                    height=500,
                                    geo=dict(
                                        bgcolor='rgba(0,0,0,0)',
                                        lakecolor='rgba(0,0,0,0)',
                                        landcolor='rgba(217, 217, 217, 1)',
                                        subunitcolor='white',
                                        scope='africa',
                                        showframe=False,
                                        showcoastlines=True,
                                        projection_type='natural earth'
                                    ),
                                    margin={"r":0,"t":0,"l":0,"b":0}
                                )
                                
                                st.plotly_chart(fig_map_4_2_2_1, use_container_width=True, key="plot_4_2_2_1_map")
                            else:
                                st.info("No data available after merging with reference data.")
                        else:
                            st.info("No reference data available for map.")
                    else:
                        st.info("No valid numeric data available for the map.")
                else:
                    st.info("No data available for the selected filters.")
            
            with tab_data_4_2_2_1:
                # Data Table
                if not filtered_ind_data_4_2_2_1.empty:
                    cols_to_show = ['country_or_area', 'year', 'value']
                    display_df_4_2_2_1 = filtered_ind_data_4_2_2_1[[col for col in cols_to_show if col in filtered_ind_data_4_2_2_1.columns]].copy()
                    if 'value' in display_df_4_2_2_1.columns:
                        display_df_4_2_2_1 = display_df_4_2_2_1.rename(columns={'value': 'Tax Effort'})
                    st.dataframe(display_df_4_2_2_1, use_container_width=True)
                    
                    # Export options
                    csv_4_2_2_1 = display_df_4_2_2_1.to_csv(index=False)
                    st.download_button(
                        label="Download CSV",
                        data=csv_4_2_2_1,
                        file_name=f"indicator_4_2_2_1_{selected_year_ind_4_2_2_1 if selected_year_ind_4_2_2_1 != 'All Years' else 'all_years'}.csv",
                        mime="text/csv",
                        key="ind_4_2_2_1_download_csv"
                    )
                else:
                    st.info("No data available for the selected filters.")
            
            # D. Supporting Information Layers (collapsible, in order)
            # 1. Learn more about this indicator
            with st.expander("Learn more about this indicator", expanded=False):
                tab_def, tab_proxy = st.tabs(["Definition", "Proxy Justification"])
                with tab_def:
                    st.markdown("""
                    Tax Effort measures how efficiently countries collect the taxes they are capable of collecting, given their income levels and trade structure. 
                    It is calculated as the ratio of Actual Tax Revenue to Estimated Tax Capacity.
                    
                    - **Tax Effort = 1.0**: Country collects taxes at its estimated capacity
                    - **Tax Effort < 1.0**: Under-collection (gap exists between capacity and actual)
                    - **Tax Effort > 1.0**: Collection above typical capacity (may indicate strong tax administration)
                    
                    **Methodological Note:** Tax Capacity is estimated using Stochastic Frontier Analysis (SFA) regression model. 
                    The model may have low R², indicating that many factors beyond GDP and trade affect tax collection (institutions, 
                    informal economy, tax policy). These estimates should be interpreted as rough benchmarks, not precise targets.
                    
                    **Source:** Calculated from Global Revenue Database (GRD) and World Bank Development Indicators (WDI)
                    """)
                with tab_proxy:
                    st.markdown("""
                    Tax Effort is a widely used indicator in fiscal analysis, calculated using Stochastic Frontier Analysis (SFA) 
                    to estimate tax capacity based on GDP per capita and trade openness. While the model may have limitations, 
                    it provides a useful benchmark for comparing tax collection efficiency across countries.
                    """)
    
    # ========================================
    # TAB 2: Indicator 4.2.2.2 – Reduction in Tax Evasion
    # ========================================
    with tab_ind_4_2_2_2:
        # Create sub-tabs for 4.2.2.2.a and 4.2.2.2.b
        tab_4_2_2_2_a, tab_4_2_2_2_b = st.tabs([
            "4.2.2.2.a – Tax Buoyancy",
            "4.2.2.2.b – Tax Capacity & Gap"
        ])

        # ========================================
        # SUB-TAB 1: 4.2.2.2.a – Tax Buoyancy
        # ========================================
        with tab_4_2_2_2_a:
            # A. Indicator Header
            indicator_tab_4_2_2_2_a = "Tax Buoyancy (Elasticity)"
            st.markdown("""
            <div class='indicator-card'>
                <h4>
                    4.2.2.2.a – Tax Buoyancy
                    <button type="button" class="info-icon-btn" data-tooltip="Measures responsiveness of tax revenue to GDP growth. Shows how well tax systems respond to economic expansion." style="background: none; border: none; cursor: help; font-size: 0.8em; color: #666; margin-left: 0.5rem; padding: 0;">i</button>
                </h4>
                <p style="color: #888; font-size: 0.9em; margin-bottom: 0.5rem;">
                    <em>Proxy Indicator: Measures responsiveness of tax revenue to GDP growth</em>
                </p>
                <p style="color: #555; line-height: 1.5; margin-bottom: 0.75rem;">
                    <strong>Analytical Focus Question:</strong> Are tax systems responsive to economic growth and closing the gap between potential and actual revenue collection?
                </p>
            </div>
            <style>
                .info-icon-btn {
                    position: relative;
                }
                .info-icon-btn:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #333;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    white-space: normal;
                    width: 250px;
                    font-size: 0.9em;
                    z-index: 1000;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    margin-bottom: 5px;
                }
            </style>
            """, unsafe_allow_html=True)
            
            # B. Local Filter Row (scoped to this indicator)
            # Get indicator data for filter options
            indicator_data_4_2_2_2_a = df_display[df_display['indicator_label'] == indicator_tab_4_2_2_2_a].copy()
            africa_ref_data_4_2_2_2_a = ref_data[ref_data['Region Name'] == 'Africa'].copy() if not ref_data.empty else pd.DataFrame()
            africa_countries_4_2_2_2_a = sorted(africa_ref_data_4_2_2_2_a['Country or Area'].unique()) if not africa_ref_data_4_2_2_2_a.empty else []
            available_years_ind_4_2_2_2_a = sorted(indicator_data_4_2_2_2_a['year'].dropna().unique()) if not indicator_data_4_2_2_2_a.empty else []
            available_regions_4_2_2_2_a = sorted(africa_ref_data_4_2_2_2_a['Intermediate Region Name'].dropna().unique()) if not africa_ref_data_4_2_2_2_a.empty else []
            
            # Filter row
            filter_col1, filter_col2, filter_col3, filter_col4 = st.columns([1.5, 1.5, 1.5, 0.7])
            
            with filter_col1:
                selected_year_ind_4_2_2_2_a = st.selectbox(
                    "Select Year(s)",
                    options=["All Years"] + available_years_ind_4_2_2_2_a,
                    index=0,
                    key="ind_4_2_2_2_a_year_filter"
                )
            
            with filter_col2:
                selected_countries_ind_4_2_2_2_a = st.multiselect(
                    "Select Country",
                    options=africa_countries_4_2_2_2_a,
                    default=[],
                    key="ind_4_2_2_2_a_country_filter"
                )
            
            with filter_col3:
                selected_regions_ind_4_2_2_2_a = st.multiselect(
                    "Select Region",
                    options=available_regions_4_2_2_2_a,
                    default=[],
                    key="ind_4_2_2_2_a_region_filter"
                )
            
            with filter_col4:
                st.markdown("<br>", unsafe_allow_html=True)
                if st.button("Reset", key="ind_4_2_2_2_a_reset", use_container_width=True):
                    # Delete session state keys to reset widgets to defaults
                    if 'ind_4_2_2_2_a_year_filter' in st.session_state:
                        del st.session_state.ind_4_2_2_2_a_year_filter
                    if 'ind_4_2_2_2_a_country_filter' in st.session_state:
                        del st.session_state.ind_4_2_2_2_a_country_filter
                    if 'ind_4_2_2_2_a_region_filter' in st.session_state:
                        del st.session_state.ind_4_2_2_2_a_region_filter
                    st.rerun()
            
            # Prepare filtered data for this indicator
            filtered_ind_data_4_2_2_2_a = indicator_data_4_2_2_2_a.copy()
            if selected_year_ind_4_2_2_2_a != "All Years":
                filtered_ind_data_4_2_2_2_a = filtered_ind_data_4_2_2_2_a[filtered_ind_data_4_2_2_2_a['year'] == selected_year_ind_4_2_2_2_a]
            if selected_countries_ind_4_2_2_2_a:
                filtered_ind_data_4_2_2_2_a = filtered_ind_data_4_2_2_2_a[filtered_ind_data_4_2_2_2_a['country_or_area'].isin(selected_countries_ind_4_2_2_2_a)]
            if selected_regions_ind_4_2_2_2_a:
                # Filter by intermediate region
                region_countries_4_2_2_2_a = africa_ref_data_4_2_2_2_a[
                    africa_ref_data_4_2_2_2_a['Intermediate Region Name'].isin(selected_regions_ind_4_2_2_2_a)
                ]['Country or Area'].unique()
                filtered_ind_data_4_2_2_2_a = filtered_ind_data_4_2_2_2_a[filtered_ind_data_4_2_2_2_a['country_or_area'].isin(region_countries_4_2_2_2_a)]
            
            # C. Visualization Panel with Multi-View Tabs
            tab_graph_4_2_2_2_a, tab_map_4_2_2_2_a, tab_data_4_2_2_2_a = st.tabs(["Graph View", "Map View", "Data Table"])
            
            with tab_graph_4_2_2_2_a:
                # Add "How to Read This Graph" hover button
                st.markdown("""
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <button type="button" class="how-to-read-btn" data-tooltip="Tax Buoyancy is a structural parameter (one value per country calculated from all years). Bar Chart: Compare countries' structural responsiveness—higher bars mean more responsive tax systems. Colors indicate responsiveness: Teal (≥1.5) = over-responsive, Blue (≥1.0) = responsive, Orange (≥0.5) = weakly responsive, Red (<0.5) = unresponsive. Distribution: See how many countries fall into each responsiveness category. Values above 1.0 = progressive system (tax grows faster than GDP). Values below 1.0 = regressive system (tax grows slower than GDP)." style="background: none; border: none; cursor: help; font-size: 0.9em; color: #666; padding: 0.25rem 0.5rem; margin-left: auto;">
                        How to Read This Graph <span style="font-size: 0.8em;">i</span>
                    </button>
                </div>
                <style>
                .how-to-read-btn {
                    position: relative;
                }
                .how-to-read-btn:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 100%;
                    right: 0;
                    transform: translateX(0);
                    background-color: #333;
                    color: white;
                    padding: 12px 16px;
                    border-radius: 6px;
                    white-space: normal;
                    width: 350px;
                    max-width: 90vw;
                    font-size: 0.9em;
                    line-height: 1.5;
                    z-index: 1000;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    margin-bottom: 8px;
                    text-align: left;
                }
                .how-to-read-btn:hover::before {
                    content: '';
                    position: absolute;
                    bottom: 100%;
                    right: 20px;
                    border: 6px solid transparent;
                    border-top-color: #333;
                    margin-bottom: 2px;
                    z-index: 1001;
                }
                </style>
                """, unsafe_allow_html=True)
                
                # View selector - Tax Buoyancy is a structural parameter, so bar chart is more appropriate than time trend
                view_mode_buoy = st.radio(
                    "Select View",
                    options=["Bar Chart by Country", "Distribution Analysis"],
                    index=0,  # Default to Bar Chart
                    key="ind_4_2_2_2_a_view_mode",
                    horizontal=True
                )
                
                if not filtered_ind_data_4_2_2_2_a.empty:
                    import plotly.graph_objects as go
                    import numpy as np
                    
                    # Get year for bar chart (use selected year or latest)
                    if selected_year_ind_4_2_2_2_a != "All Years":
                        chart_year = selected_year_ind_4_2_2_2_a
                        year_data = filtered_ind_data_4_2_2_2_a[filtered_ind_data_4_2_2_2_a['year'] == chart_year].copy()
                    else:
                        # Use latest year per country
                        year_data = filtered_ind_data_4_2_2_2_a.loc[filtered_ind_data_4_2_2_2_a.groupby('country_or_area')['year'].idxmax()].copy()
                        chart_year = int(year_data['year'].max()) if not year_data.empty else None
                    
                    if not year_data.empty:
                        # Remove outliers
                        year_data = year_data[
                            (year_data['value'] > -2) & 
                            (year_data['value'] < 5)
                        ]
                        
                        if not year_data.empty:
                            fig = go.Figure()
                            
                            # Color code by buoyancy level
                            def get_buoyancy_color(buoyancy):
                                if pd.isna(buoyancy):
                                    return '#999999'
                                elif buoyancy >= 1.5:
                                    return '#009D8C'  # Teal - Over-responsive
                                elif buoyancy >= 1.0:
                                    return '#1B75BB'  # Blue - Responsive
                                elif buoyancy >= 0.5:
                                    return '#E87722'  # Orange - Weakly responsive
                                else:
                                    return '#D32F2F'  # Red - Unresponsive
                            
                            if view_mode_buoy == "Bar Chart by Country":
                                # Sort by buoyancy value (descending)
                                year_data_sorted = year_data.sort_values('value', ascending=False)
                                colors = [get_buoyancy_color(x) for x in year_data_sorted['value'].values]
                                
                                fig.add_trace(go.Bar(
                                    x=year_data_sorted['country_or_area'],
                                    y=year_data_sorted['value'],
                                    marker=dict(color=colors),
                                    hovertemplate="<b>%{x}</b><br>Tax Buoyancy: %{y:.2f}<br>Year: %{customdata}<extra></extra>",
                                    customdata=[chart_year] * len(year_data_sorted),
                                    name='Tax Buoyancy',
                                    showlegend=False
                                ))
                                
                                # Add reference lines
                                fig.add_hline(y=1.0, line_dash="dash", line_color="#1B75BB", 
                                            annotation_text="Buoyancy = 1.0 (Balanced)", annotation_position="right")
                                fig.add_hline(y=0.5, line_dash="dash", line_color="#E87722", 
                                            annotation_text="Buoyancy = 0.5 (Weak)", annotation_position="right")
                                
                                fig.update_layout(
                                    title=f"Tax Buoyancy by Country{f' - {chart_year}' if chart_year else ''}",
                                    xaxis_title="Country",
                                    yaxis_title="Tax Buoyancy (Elasticity)",
                                    height=max(400, len(year_data_sorted) * 25),
                                    hovermode='closest',
                                    xaxis=dict(tickangle=-45),
                                    margin=dict(l=50, r=50, t=50, b=100)
                                )
                                
                            else:  # Distribution Analysis
                                # Histogram with distribution
                                fig.add_trace(go.Histogram(
                                    x=year_data['value'],
                                    nbinsx=30,
                                    marker_color='#0072BC',
                                    opacity=0.7,
                                    name='Distribution'
                                ))
                                
                                # Add reference lines
                                fig.add_vline(x=1.0, line_dash="dash", line_color="#1B75BB", 
                                            annotation_text="Buoyancy = 1.0", annotation_position="top")
                                fig.add_vline(x=0.5, line_dash="dash", line_color="#E87722", 
                                            annotation_text="Buoyancy = 0.5", annotation_position="top")
                                
                                fig.update_layout(
                                    title=f"Tax Buoyancy Distribution{f' - {chart_year}' if chart_year else ''}",
                                    xaxis_title="Tax Buoyancy (Elasticity)",
                                    yaxis_title="Number of Countries",
                                    height=500,
                                    hovermode='closest'
                                )
                            
                            st.plotly_chart(fig, use_container_width=True, key="plot_4_2_2_2_a_graph")
                        else:
                            st.warning("No valid data available after removing outliers.")
                    else:
                        st.warning(f"No data available for the selected year.")
                else:
                    st.info("No data available for the selected filters.")
            
            with tab_map_4_2_2_2_a:
                # Map View
                if not filtered_ind_data_4_2_2_2_a.empty:
                    # Prepare map data
                    map_data_4_2_2_2_a = filtered_ind_data_4_2_2_2_a.copy()
                
                    # Use the latest year if multiple years, or selected year
                    if selected_year_ind_4_2_2_2_a != "All Years":
                        map_data_4_2_2_2_a = map_data_4_2_2_2_a[map_data_4_2_2_2_a['year'] == selected_year_ind_4_2_2_2_a]
                    else:
                        # Use latest year per country
                        map_data_4_2_2_2_a = map_data_4_2_2_2_a.loc[map_data_4_2_2_2_a.groupby('country_or_area')['year'].idxmax()]
                    
                    # Convert values to numeric
                    map_data_4_2_2_2_a['value'] = pd.to_numeric(map_data_4_2_2_2_a['value'], errors='coerce')
                    map_data_4_2_2_2_a = map_data_4_2_2_2_a.dropna(subset=['value'])
                    
                    if not map_data_4_2_2_2_a.empty:
                        # Merge with reference data to get ISO codes
                        africa_ref_4_2_2_2_a = ref_data[ref_data['Region Name'] == 'Africa'].copy()
                        if not africa_ref_4_2_2_2_a.empty and 'Country or Area' in africa_ref_4_2_2_2_a.columns:
                            map_data_merged_4_2_2_2_a = map_data_4_2_2_2_a.merge(
                                africa_ref_4_2_2_2_a[['Country or Area', 'iso3']],
                                left_on='country_or_area',
                                right_on='Country or Area',
                                how='inner'
                            )
                            
                            if not map_data_merged_4_2_2_2_a.empty:
                                # Determine the correct ISO column name after merge
                                iso_col_4_2_2_2_a = 'iso3_y' if 'iso3_y' in map_data_merged_4_2_2_2_a.columns else ('iso3_x' if 'iso3_x' in map_data_merged_4_2_2_2_a.columns else 'iso3')
                                if iso_col_4_2_2_2_a != 'iso3' and iso_col_4_2_2_2_a in map_data_merged_4_2_2_2_a.columns:
                                    map_data_merged_4_2_2_2_a['iso3'] = map_data_merged_4_2_2_2_a[iso_col_4_2_2_2_a]
                                
                                # Create choropleth map
                                import plotly.graph_objects as go
                                fig_map_4_2_2_2_a = go.Figure(data=go.Choropleth(
                                    locations=map_data_merged_4_2_2_2_a['iso3'],
                                    z=map_data_merged_4_2_2_2_a['value'],
                                    locationmode='ISO-3',
                                    colorscale='Blues',
                                    showscale=True,
                                    text=map_data_merged_4_2_2_2_a.apply(
                                        lambda row: f"{row['country_or_area']}<br>Tax Buoyancy: {row['value']:.2f}<br>Year: {row['year']}",
                                        axis=1
                                    ),
                                    hovertemplate='%{text}<extra></extra>',
                                    colorbar=dict(title="Tax Buoyancy")
                                ))
                                
                                fig_map_4_2_2_2_a.update_layout(
                                    height=500,
                                    geo=dict(
                                        bgcolor='rgba(0,0,0,0)',
                                        lakecolor='rgba(0,0,0,0)',
                                        landcolor='rgba(217, 217, 217, 1)',
                                        subunitcolor='white',
                                        scope='africa',
                                        showframe=False,
                                        showcoastlines=True,
                                        projection_type='natural earth'
                                    ),
                                    margin={"r":0,"t":0,"l":0,"b":0}
                                )
                                
                                st.plotly_chart(fig_map_4_2_2_2_a, use_container_width=True, key="plot_4_2_2_2_a_map")
                            else:
                                st.info("No data available after merging with reference data.")
                        else:
                            st.info("No reference data available for map.")
                    else:
                        st.info("No valid numeric data available for the map.")
                else:
                    st.info("No data available for the selected filters.")
            
            with tab_data_4_2_2_2_a:
                # Data Table
                if not filtered_ind_data_4_2_2_2_a.empty:
                    cols_to_show = ['country_or_area', 'year', 'value']
                    display_df_4_2_2_2_a = filtered_ind_data_4_2_2_2_a[[col for col in cols_to_show if col in filtered_ind_data_4_2_2_2_a.columns]].copy()
                    if 'value' in display_df_4_2_2_2_a.columns:
                        display_df_4_2_2_2_a = display_df_4_2_2_2_a.rename(columns={'value': 'Tax Buoyancy'})
                    st.dataframe(display_df_4_2_2_2_a, use_container_width=True)
                    
                    # Export options
                    csv_4_2_2_2_a = display_df_4_2_2_2_a.to_csv(index=False)
                    st.download_button(
                        label="Download CSV",
                        data=csv_4_2_2_2_a,
                        file_name=f"indicator_4_2_2_2_a_{selected_year_ind_4_2_2_2_a if selected_year_ind_4_2_2_2_a != 'All Years' else 'all_years'}.csv",
                        mime="text/csv",
                        key="ind_4_2_2_2_a_download_csv"
                    )
                else:
                    st.info("No data available for the selected filters.")
            
            # D. Supporting Information Layers (collapsible, in order)
            # 1. Learn more about this indicator
            with st.expander("Learn more about this indicator", expanded=False):
                tab_def, tab_proxy = st.tabs(["Definition", "Proxy Justification"])
                with tab_def:
                    st.markdown("""
                    Tax Buoyancy measures the responsiveness of tax revenue to GDP growth. It is calculated as the elasticity of tax revenue 
                    with respect to GDP using log-log regression over the entire time period per country.
                    
                    - **Tax Buoyancy > 1.0:** Tax revenue grows faster than GDP (progressive/elastic system)
                    - **Tax Buoyancy = 1.0:** Tax revenue grows at same rate as GDP (balanced system)
                    - **Tax Buoyancy < 1.0:** Tax revenue grows slower than GDP (regressive/inelastic system)
                    
                    **Methodological Note:** Tax Buoyancy is a structural parameter calculated using all available years. 
                    The same elasticity coefficient is applied to all years for each country, which is why lines may appear flat in time trends. 
                    This represents the long-run structural relationship between GDP and tax revenue, not year-to-year changes in tax policy 
                    or collection efficiency (use Tax Effort for that).
                    
                    **Source:** Calculated from Global Revenue Database (GRD) and World Bank Development Indicators (WDI)
                    """)
                with tab_proxy:
                    st.markdown("""
                    Tax Buoyancy is a widely used indicator in fiscal analysis, calculated using log-log regression to measure 
                    the elasticity of tax revenue with respect to GDP. While it represents a structural parameter rather than 
                    year-to-year changes, it provides valuable insights into the long-run responsiveness of tax systems to economic growth.
                    """)
        
        # ========================================
        # SUB-TAB 2: 4.2.2.2.b – Tax Capacity & Gap
        # ========================================
        with tab_4_2_2_2_b:
            # A. Indicator Header
            indicator_tab_4_2_2_2_b = "Tax Gap (% of GDP)"
            st.markdown("""
            <div class='indicator-card'>
                <h4>
                    4.2.2.2.b – Tax Capacity & Gap
                    <button type="button" class="info-icon-btn" data-tooltip="Shows the difference between tax capacity (maximum achievable) and actual tax revenue. Positive gap indicates under-collection; negative gap indicates overperformance." style="background: none; border: none; cursor: help; font-size: 0.8em; color: #666; margin-left: 0.5rem; padding: 0;">i</button>
                </h4>
                <p style="color: #888; font-size: 0.9em; margin-bottom: 0.5rem;">
                    <em>Proxy Indicator: Tax Capacity & Gap</em>
                </p>
                <p style="color: #555; line-height: 1.5; margin-bottom: 0.75rem;">
                    <strong>Analytical Focus Question:</strong> Are tax systems responsive to economic growth and closing the gap between potential and actual revenue collection?
                </p>
            </div>
            <style>
                .info-icon-btn {
                    position: relative;
                }
                .info-icon-btn:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: #333;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    white-space: normal;
                    width: 250px;
                    font-size: 0.9em;
                    z-index: 1000;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    margin-bottom: 5px;
                }
            </style>
            """, unsafe_allow_html=True)
            
            # B. Local Filter Row (scoped to this indicator)
            # Get indicator data for filter options
            indicator_data_4_2_2_2_b = df_display[df_display['indicator_label'] == indicator_tab_4_2_2_2_b].copy()
            africa_ref_data_4_2_2_2_b = ref_data[ref_data['Region Name'] == 'Africa'].copy() if not ref_data.empty else pd.DataFrame()
            africa_countries_4_2_2_2_b = sorted(africa_ref_data_4_2_2_2_b['Country or Area'].unique()) if not africa_ref_data_4_2_2_2_b.empty else []
            available_years_ind_4_2_2_2_b = sorted(indicator_data_4_2_2_2_b['year'].dropna().unique()) if not indicator_data_4_2_2_2_b.empty else []
            available_regions_4_2_2_2_b = sorted(africa_ref_data_4_2_2_2_b['Intermediate Region Name'].dropna().unique()) if not africa_ref_data_4_2_2_2_b.empty else []
            
            # Filter row
            filter_col1, filter_col2, filter_col3, filter_col4 = st.columns([1.5, 1.5, 1.5, 0.7])
            
            with filter_col1:
                selected_year_ind_4_2_2_2_b = st.selectbox(
                    "Select Year(s)",
                    options=["All Years"] + available_years_ind_4_2_2_2_b,
                    index=0,
                    key="ind_4_2_2_2_b_year_filter"
                )
            
            with filter_col2:
                selected_countries_ind_4_2_2_2_b = st.multiselect(
                    "Select Country",
                    options=africa_countries_4_2_2_2_b,
                    default=[],
                    key="ind_4_2_2_2_b_country_filter"
                )
            
            with filter_col3:
                selected_regions_ind_4_2_2_2_b = st.multiselect(
                    "Select Region",
                    options=available_regions_4_2_2_2_b,
                    default=[],
                    key="ind_4_2_2_2_b_region_filter"
                )
            
            with filter_col4:
                st.markdown("<br>", unsafe_allow_html=True)
                if st.button("Reset", key="ind_4_2_2_2_b_reset", use_container_width=True):
                    # Delete session state keys to reset widgets to defaults
                    if 'ind_4_2_2_2_b_year_filter' in st.session_state:
                        del st.session_state.ind_4_2_2_2_b_year_filter
                    if 'ind_4_2_2_2_b_country_filter' in st.session_state:
                        del st.session_state.ind_4_2_2_2_b_country_filter
                    if 'ind_4_2_2_2_b_region_filter' in st.session_state:
                        del st.session_state.ind_4_2_2_2_b_region_filter
                    st.rerun()
            
            # Prepare filtered data for this indicator
            filtered_ind_data_4_2_2_2_b = indicator_data_4_2_2_2_b.copy()
            if selected_year_ind_4_2_2_2_b != "All Years":
                filtered_ind_data_4_2_2_2_b = filtered_ind_data_4_2_2_2_b[filtered_ind_data_4_2_2_2_b['year'] == selected_year_ind_4_2_2_2_b]
            if selected_countries_ind_4_2_2_2_b:
                filtered_ind_data_4_2_2_2_b = filtered_ind_data_4_2_2_2_b[filtered_ind_data_4_2_2_2_b['country_or_area'].isin(selected_countries_ind_4_2_2_2_b)]
            if selected_regions_ind_4_2_2_2_b:
                # Filter by intermediate region
                region_countries_4_2_2_2_b = africa_ref_data_4_2_2_2_b[
                    africa_ref_data_4_2_2_2_b['Intermediate Region Name'].isin(selected_regions_ind_4_2_2_2_b)
                ]['Country or Area'].unique()
                filtered_ind_data_4_2_2_2_b = filtered_ind_data_4_2_2_2_b[filtered_ind_data_4_2_2_2_b['country_or_area'].isin(region_countries_4_2_2_2_b)]
            
            # C. Visualization Panel with Multi-View Tabs
            tab_graph_4_2_2_2_b, tab_map_4_2_2_2_b, tab_data_4_2_2_2_b = st.tabs(["Graph View", "Map View", "Data Table"])
            
            with tab_graph_4_2_2_2_b:
                # Add "How to Read This Graph" hover button
                st.markdown("""
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <button type="button" class="how-to-read-btn" data-tooltip="Each bar shows the tax gap (difference between capacity and actual revenue) for a country. Positive gaps (orange bars) indicate under-collection—countries collecting less than their estimated capacity. Negative gaps (blue bars) indicate overperformance—countries collecting more than typical capacity. The reference line at 0 shows full capacity utilization." style="background: none; border: none; cursor: help; font-size: 0.9em; color: #666; padding: 0.25rem 0.5rem; margin-left: auto;">
                        How to Read This Graph <span style="font-size: 0.8em;">i</span>
                    </button>
                </div>
                <style>
                .how-to-read-btn {
                    position: relative;
                }
                .how-to-read-btn:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 100%;
                    right: 0;
                    transform: translateX(0);
                    background-color: #333;
                    color: white;
                    padding: 12px 16px;
                    border-radius: 6px;
                    white-space: normal;
                    width: 350px;
                    max-width: 90vw;
                    font-size: 0.9em;
                    line-height: 1.5;
                    z-index: 1000;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    margin-bottom: 8px;
                    text-align: left;
                }
                .how-to-read-btn:hover::before {
                    content: '';
                    position: absolute;
                    bottom: 100%;
                    right: 20px;
                    border: 6px solid transparent;
                    border-top-color: #333;
                    margin-bottom: 2px;
                    z-index: 1001;
                }
                </style>
                """, unsafe_allow_html=True)
                
                # Tax Gap visualization
                if not filtered_ind_data_4_2_2_2_b.empty:
                    import plotly.graph_objects as go
                    import numpy as np
                    
                    # Use selected year or latest year
                    if selected_year_ind_4_2_2_2_b != "All Years":
                        gap_data = filtered_ind_data_4_2_2_2_b[filtered_ind_data_4_2_2_2_b['year'] == selected_year_ind_4_2_2_2_b].copy()
                    else:
                        # Use latest year per country
                        gap_data = filtered_ind_data_4_2_2_2_b.loc[filtered_ind_data_4_2_2_2_b.groupby('country_or_area')['year'].idxmax()].copy()
                    
                    if not gap_data.empty:
                        # Sort by tax gap (descending - largest gaps first)
                        gap_data = gap_data.sort_values('value', ascending=False)
                        
                        # Color bars based on gap direction
                        # Positive gap (under-collection) → Orange (#F26C2B)
                        # Negative gap (overperformance) → Blue (#0072BC)
                        colors = ['#F26C2B' if gap >= 0 else '#0072BC' for gap in gap_data['value']]
                        
                        fig = go.Figure()
                        
                        # Create horizontal bar chart
                        fig.add_trace(go.Bar(
                            x=gap_data['value'],
                            y=gap_data['country_or_area'],
                            orientation='h',
                            marker=dict(
                                color=colors,
                                line=dict(width=1, color='white')
                            ),
                            hovertemplate="<b>%{y}</b><br>Tax Gap: %{x:.2f}% of GDP<br>Year: %{customdata}<extra></extra>",
                            customdata=gap_data['year'],
                            name='Tax Gap',
                            showlegend=False
                        ))
                        
                        # Add reference line at 0 (full capacity)
                        fig.add_vline(
                            x=0,
                            line_dash="dash",
                            line_color="#666",
                            line_width=2,
                            annotation_text="Full Capacity (Gap = 0)",
                            annotation_position="top",
                            annotation_font_size=10
                        )
                        
                        # Add regional average line if multiple countries
                        if len(gap_data) > 1:
                            avg_gap = gap_data['value'].mean()
                            fig.add_vline(
                                x=avg_gap,
                                line_dash="dot",
                                line_color="#008B8B",
                                line_width=1.5,
                                annotation_text=f"Avg: {avg_gap:.2f}%",
                                annotation_position="bottom",
                                annotation_font_size=9,
                                opacity=0.7
                            )
                        
                        fig.update_layout(
                            title="Tax Gap by Country",
                            xaxis_title="Tax Gap (% of GDP)",
                            yaxis_title="Country",
                            height=max(400, len(gap_data) * 30),
                            hovermode='closest',
                            yaxis=dict(autorange='reversed'),
                            margin=dict(l=150, r=50, t=50, b=50)
                        )
                        
                        st.plotly_chart(fig, use_container_width=True, key="plot_4_2_2_2_b_graph")
                    else:
                        st.info("No data available for the selected filters.")
                else:
                    st.info("No data available for the selected filters.")
            
            with tab_map_4_2_2_2_b:
                # Map View
                if not filtered_ind_data_4_2_2_2_b.empty:
                    # Prepare map data
                    map_data_4_2_2_2_b = filtered_ind_data_4_2_2_2_b.copy()
                
                    # Use the latest year if multiple years, or selected year
                    if selected_year_ind_4_2_2_2_b != "All Years":
                        map_data_4_2_2_2_b = map_data_4_2_2_2_b[map_data_4_2_2_2_b['year'] == selected_year_ind_4_2_2_2_b]
                    else:
                        # Use latest year per country
                        map_data_4_2_2_2_b = map_data_4_2_2_2_b.loc[map_data_4_2_2_2_b.groupby('country_or_area')['year'].idxmax()]
                    
                    # Convert values to numeric
                    map_data_4_2_2_2_b['value'] = pd.to_numeric(map_data_4_2_2_2_b['value'], errors='coerce')
                    map_data_4_2_2_2_b = map_data_4_2_2_2_b.dropna(subset=['value'])
                    
                    if not map_data_4_2_2_2_b.empty:
                        # Merge with reference data to get ISO codes
                        africa_ref_4_2_2_2_b = ref_data[ref_data['Region Name'] == 'Africa'].copy()
                        if not africa_ref_4_2_2_2_b.empty and 'Country or Area' in africa_ref_4_2_2_2_b.columns:
                            map_data_merged_4_2_2_2_b = map_data_4_2_2_2_b.merge(
                                africa_ref_4_2_2_2_b[['Country or Area', 'iso3']],
                                left_on='country_or_area',
                                right_on='Country or Area',
                                how='inner'
                            )
                            
                            if not map_data_merged_4_2_2_2_b.empty:
                                # Determine the correct ISO column name after merge
                                iso_col_4_2_2_2_b = 'iso3_y' if 'iso3_y' in map_data_merged_4_2_2_2_b.columns else ('iso3_x' if 'iso3_x' in map_data_merged_4_2_2_2_b.columns else 'iso3')
                                if iso_col_4_2_2_2_b != 'iso3' and iso_col_4_2_2_2_b in map_data_merged_4_2_2_2_b.columns:
                                    map_data_merged_4_2_2_2_b['iso3'] = map_data_merged_4_2_2_2_b[iso_col_4_2_2_2_b]
                                
                                # Create choropleth map
                                import plotly.graph_objects as go
                                fig_map_4_2_2_2_b = go.Figure(data=go.Choropleth(
                                    locations=map_data_merged_4_2_2_2_b['iso3'],
                                    z=map_data_merged_4_2_2_2_b['value'],
                                    locationmode='ISO-3',
                                    colorscale='RdYlBu_r',  # Red-Yellow-Blue reversed (red for positive gaps, blue for negative)
                                    showscale=True,
                                    text=map_data_merged_4_2_2_2_b.apply(
                                        lambda row: f"{row['country_or_area']}<br>Tax Gap: {row['value']:.2f}% of GDP<br>Year: {row['year']}",
                                        axis=1
                                    ),
                                    hovertemplate='%{text}<extra></extra>',
                                    colorbar=dict(title="Tax Gap (% of GDP)")
                                ))
                                
                                fig_map_4_2_2_2_b.update_layout(
                                    height=500,
                                    geo=dict(
                                        bgcolor='rgba(0,0,0,0)',
                                        lakecolor='rgba(0,0,0,0)',
                                        landcolor='rgba(217, 217, 217, 1)',
                                        subunitcolor='white',
                                        scope='africa',
                                        showframe=False,
                                        showcoastlines=True,
                                        projection_type='natural earth'
                                    ),
                                    margin={"r":0,"t":0,"l":0,"b":0}
                                )
                                
                                st.plotly_chart(fig_map_4_2_2_2_b, use_container_width=True, key="plot_4_2_2_2_b_map")
                            else:
                                st.info("No data available after merging with reference data.")
                        else:
                            st.info("No reference data available for map.")
                    else:
                        st.info("No valid numeric data available for the map.")
                else:
                    st.info("No data available for the selected filters.")
            
            with tab_data_4_2_2_2_b:
                # Data Table
                if not filtered_ind_data_4_2_2_2_b.empty:
                    cols_to_show = ['country_or_area', 'year', 'value']
                    display_df_4_2_2_2_b = filtered_ind_data_4_2_2_2_b[[col for col in cols_to_show if col in filtered_ind_data_4_2_2_2_b.columns]].copy()
                    if 'value' in display_df_4_2_2_2_b.columns:
                        display_df_4_2_2_2_b = display_df_4_2_2_2_b.rename(columns={'value': 'Tax Gap (% of GDP)'})
                    st.dataframe(display_df_4_2_2_2_b, use_container_width=True)
                    
                    # Export options
                    csv_4_2_2_2_b = display_df_4_2_2_2_b.to_csv(index=False)
                    st.download_button(
                        label="Download CSV",
                        data=csv_4_2_2_2_b,
                        file_name=f"indicator_4_2_2_2_b_{selected_year_ind_4_2_2_2_b if selected_year_ind_4_2_2_2_b != 'All Years' else 'all_years'}.csv",
                        mime="text/csv",
                        key="ind_4_2_2_2_b_download_csv"
                    )
                else:
                    st.info("No data available for the selected filters.")
            
            # D. Supporting Information Layers (collapsible, in order)
            # 1. Learn more about this indicator
            with st.expander("Learn more about this indicator", expanded=False):
                tab_def, tab_proxy = st.tabs(["Definition", "Proxy Justification"])
                with tab_def:
                    st.markdown("""
                    Tax Gap measures the difference between tax capacity (maximum achievable) and actual tax revenue, expressed as a percentage of GDP.
                    
                    - **Tax Gap = Tax Capacity - Actual Tax Revenue (as % of GDP)**
                    - **Positive gap** (orange bars): Country collects less than estimated capacity (under-collection)
                    - **Negative gap** (blue bars): Country collects more than estimated capacity (overperformance)
                    
                    **What causes tax gaps?**
                    - Weak tax administration
                    - Large informal economy
                    - Tax evasion and avoidance
                    - Poor tax policy design
                    - Limited institutional capacity
                    
                    **Interpretation Caution:**
                    - "Capacity" is estimated from statistical model (Stochastic Frontier Analysis), not a definitive ceiling
                    - Gaps should be viewed as indicators of potential, not precise targets
                    - Context matters: some countries may have policy reasons for lower tax collection
                    
                    **Source:** Calculated from Global Revenue Database (GRD) and World Bank Development Indicators (WDI)
                    """)
                with tab_proxy:
                    st.markdown("""
                    Tax Gap is calculated using Stochastic Frontier Analysis (SFA) to estimate tax capacity based on GDP per capita 
                    and trade openness. While the model may have limitations, it provides a useful benchmark for comparing the gap between 
                    potential and actual revenue collection across countries.
                    """)

# Old tab_ind2, tab_ind3, tab_ind4 content has been removed and reorganized above

# Orange divider before Data Availability
st.markdown("""
<div style="border-top: 2px solid #F26C2B; margin: 1.5rem 0; clear: both;"></div>
    """, unsafe_allow_html=True)

# ========================================
# SECTION: Data Gaps / Availability
# ========================================
all_indicators_4_2 = {
    "Tax Revenue as % of GDP (4.2.1)": "Tax Revenue - % of GDP - value",
    "Tax Effort Ratio (4.2.2)": "Tax effort (ratio) [tax_eff]",
    "Tax Buoyancy": "Tax buoyancy [by_tax]"
}
africa_countries = ref_data[ref_data['Region Name'] == 'Africa']['Country or Area'].unique()
df_africa = df_main[df_main['country_or_area'].isin(africa_countries)]

