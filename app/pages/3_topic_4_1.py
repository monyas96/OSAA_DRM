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
    st.query_params["topic"] = "4.1"
except Exception:
    pass  # If query_params not available, continue without it

# Notify React parent of current page (for navigation sync)
st.markdown("""
<script>
    // Notify parent window of current page on load
    if (window.parent !== window) {
        window.parent.postMessage({
            type: 'STREAMLIT_NAVIGATION',
            pagePath: '3_topic_4_1'
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
filters = uv.setup_sidebar_filters(ref_data, df_main, key_prefix="topic4_1")
df_filtered = uv.filter_dataframe_by_selections(df_main, filters, ref_data)

# ========================================
# SECTION: Topic Header with Home Button
# ========================================
# Home button styling - horizontal text in light gray box
st.markdown("""
<style>
    button[key="nav_home_topic_4_1"] {
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
    button[key="nav_home_topic_4_1"]:hover {
        background: #F3F4F6 !important;
        background-color: #F3F4F6 !important;
        border-color: #D1D5DB !important;
    }
</style>
""", unsafe_allow_html=True)

# Back to Theme 4 button - placed above the topic card
st.markdown("""
<style>
    button[key="back_to_theme_4_1"] {
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
    button[key="back_to_theme_4_1"]:hover {
        background: linear-gradient(135deg, #E85A1F 0%, #D1490F 100%) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 8px rgba(242, 108, 43, 0.3) !important;
    }
</style>
""", unsafe_allow_html=True)

if st.button("← Back to Theme 4", key="back_to_theme_4_1", use_container_width=False):
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
    <h1>Topic 4.1: Public Expenditures</h1>
    <p>Topic 4.1 tracks "expenditure leakages"—where public money is lost after it is collected. Use this view to see (1) whether spending matches the approved budget, and (2) whether spending stays aligned with stated priorities.</p>
</div>
""", unsafe_allow_html=True)

# Use filtered data directly (no global filters)
df_display = df_filtered.copy()
display_filters = filters.copy()

# ========================================
# SECTION: Key Indicators (2 columns)
# ========================================
# Add orange divider before indicators
st.markdown("""
<div style="border-top: 2px solid #F26C2B; margin: 1.5rem 0;"></div>
""", unsafe_allow_html=True)

st.markdown("### Key Indicators Overview")

# Create tabs for each sub-topic
tab_subtopic_1, tab_subtopic_2 = st.tabs([
    "Sub-topic 4.1.1 – Public Expenditure Efficiency",
    "Sub-topic 4.1.2 – Expenditure Quality"
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
# SUB-TOPIC 4.1.1 – Public Expenditure Efficiency
# ========================================
with tab_subtopic_1:
    with st.container():
        # A. Indicator Header
        indicator_tab1 = "PEFA: PI-1 Aggregate expenditure out-turn"
        st.markdown("""
        <div class='indicator-card'>
            <h4>
                Indicator 4.1.1.1 – Budget Execution Credibility (PEFA PI-1)
                <button type="button" class="info-icon-btn" data-tooltip="Measures how closely actual aggregate expenditures align with the original budget. This is a proxy for Public Expenditure Efficiency Index and indicates budget credibility." style="background: none; border: none; cursor: help; font-size: 0.8em; color: #666; margin-left: 0.5rem; padding: 0;">ℹ️</button>
            </h4>
            <p style="color: #888; font-size: 0.9em; margin-bottom: 0.5rem;">
                <em>Proxied by: Aggregate Expenditure Outturn</em>
            </p>
            <p style="color: #555; line-height: 1.5; margin-bottom: 0.75rem;">
                <strong>Leakage diagnostic question:</strong> How large are the gaps between approved budgets and actual spending—and are these gaps persistent over time?
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
        # Initialize session state for local filters if not exists
        if 'ind_4_1_1_year' not in st.session_state:
            st.session_state.ind_4_1_1_year = None
        if 'ind_4_1_1_countries' not in st.session_state:
            st.session_state.ind_4_1_1_countries = []
        if 'ind_4_1_1_view' not in st.session_state:
            st.session_state.ind_4_1_1_view = "Stacked Bar"
        
        # Get indicator data for filter options
        indicator_data = df_display[df_display['indicator_label'] == indicator_tab1].copy()
        africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy() if not ref_data.empty else pd.DataFrame()
        africa_countries = sorted(africa_ref_data['Country or Area'].unique()) if not africa_ref_data.empty else []
        available_years_ind = sorted(indicator_data['year'].dropna().unique()) if not indicator_data.empty else []
        available_regions = sorted(africa_ref_data['Intermediate Region Name'].dropna().unique()) if not africa_ref_data.empty else []
        
        # Filter row
        filter_col1, filter_col2, filter_col3, filter_col4 = st.columns([1.5, 1.5, 1.5, 0.7])
        
        with filter_col1:
            selected_year_ind = st.selectbox(
                "Select Year(s)",
                options=["All Years"] + available_years_ind,
                index=0,
                key="ind_4_1_1_year_filter"
            )
        
        with filter_col2:
            selected_countries_ind = st.multiselect(
                "Select Country",
                options=africa_countries,
                default=[],
                key="ind_4_1_1_country_filter"
            )
        
        with filter_col3:
            selected_regions_ind = st.multiselect(
                "Select Region",
                options=available_regions,
                default=[],
                key="ind_4_1_1_region_filter"
            )
        
        with filter_col4:
            st.markdown("<br>", unsafe_allow_html=True)
            if st.button("Reset", key="ind_4_1_1_reset", use_container_width=True):
                # Delete session state keys to reset widgets to defaults
                if 'ind_4_1_1_year_filter' in st.session_state:
                    del st.session_state.ind_4_1_1_year_filter
                if 'ind_4_1_1_country_filter' in st.session_state:
                    del st.session_state.ind_4_1_1_country_filter
                if 'ind_4_1_1_region_filter' in st.session_state:
                    del st.session_state.ind_4_1_1_region_filter
                st.rerun()
        
        # Prepare filtered data for this indicator
        filtered_ind_data = indicator_data.copy()
        if selected_year_ind != "All Years":
            filtered_ind_data = filtered_ind_data[filtered_ind_data['year'] == selected_year_ind]
        if selected_countries_ind:
            filtered_ind_data = filtered_ind_data[filtered_ind_data['country_or_area'].isin(selected_countries_ind)]
        if selected_regions_ind:
            # Filter by intermediate region
            region_countries = africa_ref_data[
                africa_ref_data['Intermediate Region Name'].isin(selected_regions_ind)
            ]['Country or Area'].unique()
            filtered_ind_data = filtered_ind_data[filtered_ind_data['country_or_area'].isin(region_countries)]
        
        # C. Visualization Panel with Multi-View Tabs
        tab_graph, tab_map, tab_data = st.tabs(["Graph View", "Map View", "Data Table"])
        
        with tab_graph:
            # Add "How to Read This Graph" hover button
            st.markdown("""
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                <button type="button" class="how-to-read-btn" data-tooltip="Each cell shows how closely a country's actual total spending matched the original approved budget in that year. A = close to plan (about 95–105% of budget). B/C = moderate deviations. D = large deviations (<85% or >115%), suggesting weak budget credibility and higher risk of waste, arrears, or ad-hoc reallocations." style="background: none; border: none; cursor: help; font-size: 0.9em; color: #666; padding: 0.25rem 0.5rem; margin-left: auto;">
                    How to Read This Graph <span style="font-size: 0.8em;">ℹ️</span>
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
            
            # Render heatmap chart (per spec)
            if not filtered_ind_data.empty:
                # Use selected regions if provided, otherwise use all
                intermediate_regions = selected_regions_ind if selected_regions_ind else None
                
                uv.render_indicator_section(
                    df=filtered_ind_data,
                    indicator_label=indicator_tab1,
                    title="",
                    description="",
                    chart_type="heatmap",
                    selected_countries=selected_countries_ind if selected_countries_ind else None,
                    year_range=(selected_year_ind, selected_year_ind) if selected_year_ind != "All Years" else None,
                    chart_options={
                        'x': 'year',
                        'y': 'country_or_area',
                        'reference_data': ref_data,
                        'intermediate_region_filter': intermediate_regions,
                        'height': 500
                    },
                    show_data_table=False,
                    container_key="topic4_1_ind1_chart"
                )
        
                # PEFA Score Legend - Directly under the graph
                st.markdown("""
                <div style="background-color: #f8f9fa; padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;">
                    <p style="color: #666; font-size: 0.85em; margin-bottom: 0.5rem;"><em>Lower credibility = higher expenditure leakage risk.</em></p>
                    <h5 style="color: #002B7F; margin-bottom: 0.5rem;">PEFA Score Legend</h5>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;">
                        <div style="text-align: center;">
                            <div style="width: 30px; height: 30px; background-color: #003366; margin: 0 auto; border-radius: 4px;"></div>
                            <strong>A (4)</strong><br><small>95–105%</small>
                        </div>
                        <div style="text-align: center;">
                            <div style="width: 30px; height: 30px; background-color: #3366CC; margin: 0 auto; border-radius: 4px;"></div>
                            <strong>B (3)</strong><br><small>90–110%</small>
                        </div>
                        <div style="text-align: center;">
                            <div style="width: 30px; height: 30px; background-color: #99CCFF; margin: 0 auto; border-radius: 4px;"></div>
                            <strong>C (2)</strong><br><small>85–115%</small>
                        </div>
                        <div style="text-align: center;">
                            <div style="width: 30px; height: 30px; background-color: #F26C2B; margin: 0 auto; border-radius: 4px;"></div>
                            <strong>D (1)</strong><br><small>&lt;85% or &gt;115%</small>
                        </div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
            else:
                st.info("No data available for the selected filters.")
        
        with tab_map:
            # Map View - Convert to PEFA scores to match heatmap
            if not filtered_ind_data.empty:
                # Prepare map data with PEFA scores
                map_data = filtered_ind_data.copy()
                
                # Convert values to PEFA scores (same logic as heatmap)
                map_data['value'] = pd.to_numeric(map_data['value'], errors='coerce')
                map_data = map_data.dropna(subset=['value'])
                
                if not map_data.empty:
                    # Check if values are already PEFA scores (1-4) or percentages that need conversion
                    # Use same logic as create_pefa_heatmap
                    max_val = map_data['value'].max()
                    min_val = map_data['value'].min()
                    
                    if max_val <= 4 and min_val >= 1:
                        # Values are already PEFA scores (1-4)
                        map_data['pefa_score'] = map_data['value'].round().astype(int).clip(1, 4)
                    else:
                        # Values are likely percentages - convert to PEFA scores
                        # A (4): 95-105%, B (3): 90-110%, C (2): 85-115%, D (1): <85% or >115%
                        def convert_to_pefa_score(percent):
                            if pd.isna(percent):
                                return None
                            if 95 <= percent <= 105:
                                return 4  # A
                            elif 90 <= percent <= 110:
                                return 3  # B
                            elif 85 <= percent <= 115:
                                return 2  # C
                            else:
                                return 1  # D
                        
                        map_data['pefa_score'] = map_data['value'].apply(convert_to_pefa_score)
                        map_data = map_data.dropna(subset=['pefa_score'])
                        map_data['pefa_score'] = map_data['pefa_score'].astype(int)
                    
                    if not map_data.empty:
                        # Use the latest year if multiple years, or selected year
                        if selected_year_ind != "All Years":
                            map_data = map_data[map_data['year'] == selected_year_ind]
                        else:
                            # Use latest year per country
                            map_data = map_data.loc[map_data.groupby('country_or_area')['year'].idxmax()]
                        
                        # Create custom map with PEFA colors
                        import plotly.express as px
                        import plotly.graph_objects as go
                        
                        # Merge with reference data to get ISO codes
                        africa_ref = ref_data[ref_data['Region Name'] == 'Africa'].copy()
                        if not africa_ref.empty and 'Country or Area' in africa_ref.columns:
                            map_data_merged = map_data.merge(
                                africa_ref[['Country or Area', 'iso3']],
                                left_on='country_or_area',
                                right_on='Country or Area',
                                how='inner'
                            )
                            
                            if not map_data_merged.empty:
                                # Add PEFA letter to the data for hover
                                def get_pefa_letter(score):
                                    return {4: 'A', 3: 'B', 2: 'C', 1: 'D'}.get(score, 'N/A')
                                
                                map_data_merged['pefa_letter'] = map_data_merged['pefa_score'].apply(get_pefa_letter)
                                
                                # Determine the correct ISO column name after merge
                                iso_col = 'iso3_y' if 'iso3_y' in map_data_merged.columns else ('iso3_x' if 'iso3_x' in map_data_merged.columns else 'iso3')
                                
                                # If we have iso3_y or iso3_x, rename it to iso3 for the choropleth
                                if iso_col != 'iso3' and iso_col in map_data_merged.columns:
                                    map_data_merged['iso3'] = map_data_merged[iso_col]
                                
                                # Create custom colorscale for discrete PEFA scores
                                # Map each score to a specific color
                                pefa_colorscale = [
                                    [0.0, '#F26C2B'],    # D (1) - Orange
                                    [0.249, '#F26C2B'],  # D (1) - Orange
                                    [0.25, '#99CCFF'],   # C (2) - Light Blue
                                    [0.499, '#99CCFF'], # C (2) - Light Blue
                                    [0.5, '#3366CC'],   # B (3) - Medium Blue
                                    [0.749, '#3366CC'], # B (3) - Medium Blue
                                    [0.75, '#003366'],  # A (4) - Deep Blue
                                    [1.0, '#003366']    # A (4) - Deep Blue
                                ]
                                
                                # Normalize PEFA scores to 0-1 range for colorscale
                                # PEFA scores are 1-4, so normalize: (score - 1) / 3
                                map_data_merged['pefa_normalized'] = (map_data_merged['pefa_score'] - 1) / 3.0
                                
                                # Create choropleth using go.Figure for better control
                                fig = go.Figure(data=go.Choropleth(
                                    locations=map_data_merged['iso3'],
                                    z=map_data_merged['pefa_normalized'],
                                    locationmode='ISO-3',
                                    colorscale=pefa_colorscale,
                                    showscale=False,  # We'll use custom legend below
                                    text=map_data_merged.apply(
                                        lambda row: f"{row['country_or_area']}<br>PEFA Score: {row['pefa_score']} ({row['pefa_letter']})<br>Value: {row['value']:.1f}%<br>Year: {row['year']}",
                                        axis=1
                                    ),
                                    hovertemplate='%{text}<extra></extra>',
                                    zmin=0,
                                    zmax=1
                                ))
                                
                                fig.update_layout(
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
                                
                                st.plotly_chart(fig, use_container_width=True)
                                
                                # PEFA Score Legend for Map
                                st.markdown("""
                                <div style="background-color: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                                    <h5 style="color: #002B7F; margin-bottom: 0.5rem;">PEFA Score Legend</h5>
                                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;">
                                        <div style="text-align: center;">
                                            <div style="width: 30px; height: 30px; background-color: #003366; margin: 0 auto; border-radius: 4px;"></div>
                                            <strong>A (4)</strong><br><small>95–105%</small>
                                        </div>
                                        <div style="text-align: center;">
                                            <div style="width: 30px; height: 30px; background-color: #3366CC; margin: 0 auto; border-radius: 4px;"></div>
                                            <strong>B (3)</strong><br><small>90–110%</small>
                                        </div>
                                        <div style="text-align: center;">
                                            <div style="width: 30px; height: 30px; background-color: #99CCFF; margin: 0 auto; border-radius: 4px;"></div>
                                            <strong>C (2)</strong><br><small>85–115%</small>
                                        </div>
                                        <div style="text-align: center;">
                                            <div style="width: 30px; height: 30px; background-color: #F26C2B; margin: 0 auto; border-radius: 4px;"></div>
                                            <strong>D (1)</strong><br><small>&lt;85% or &gt;115%</small>
                                        </div>
                                    </div>
                                </div>
                                """, unsafe_allow_html=True)
                            else:
                                st.info("No data available after merging with reference data.")
                        else:
                            st.info("No data available after filtering.")
                    else:
                        st.info("No valid PEFA score data available.")
                else:
                    st.info("No valid numeric data available for the map.")
            else:
                st.info("No data available for the selected filters.")
        
        with tab_data:
            # Data Table
            if not filtered_ind_data.empty:
                cols_to_show = ['country_or_area', 'year', 'value']
                display_df = filtered_ind_data[[col for col in cols_to_show if col in filtered_ind_data.columns]].copy()
                if 'value' in display_df.columns:
                    display_df = display_df.rename(columns={'value': 'Actual Expenditure (%)'})
                st.dataframe(display_df, use_container_width=True)
                
                # Export options
                csv = display_df.to_csv(index=False)
                st.download_button(
                    label="Download CSV",
                    data=csv,
                    file_name=f"indicator_4_1_1_1_{selected_year_ind if selected_year_ind != 'All Years' else 'all_years'}.csv",
                    mime="text/csv",
                    key="ind_4_1_1_download_csv"
                )
            else:
                st.info("No data available for the selected filters.")
        
        # D. Supporting Information Layers (collapsible, in order)
        # 1. Learn more about this indicator
        with st.expander("Learn more about this indicator", expanded=False):
            tab_def, tab_proxy = st.tabs(["Definition", "Proxy Justification"])
            with tab_def:
                st.markdown("""
                PI-1 is a budget credibility signal. When spending deviates sharply from the approved budget, governments are more likely to cut priorities mid-year, accumulate arrears, or rely on inefficient emergency spending. Use the time pattern to see whether credibility is improving or deteriorating.
                
                **Source:** [PEFA Framework - PI-1](https://www.pefa.org/node/4762)
                """)
            with tab_proxy:
                st.markdown("""
                PEFA standard indicator, globally recognized as a measure of budget credibility and public financial management quality.
                """)

# ========================================
# SUB-TOPIC 4.1.2 – Expenditure Quality
# ========================================
with tab_subtopic_2:
    with st.container():
        # A. Indicator Header
        indicator_tab2 = "PEFA: PI-2 Expenditure composition outturn"
        st.markdown("""
        <div class='indicator-card'>
            <h4>
                Indicator 4.1.2.1 – Spending Alignment with Priorities (PEFA PI-2)
                <button type="button" class="info-icon-btn" data-tooltip="Measures the variance between budgeted and actual expenditure composition. Shows strategic allocation adherence and predictability of sector funding." style="background: none; border: none; cursor: help; font-size: 0.8em; color: #666; margin-left: 0.5rem; padding: 0;">ℹ️</button>
            </h4>
            <p style="color: #888; font-size: 0.9em; margin-bottom: 0.5rem;">
                <em>Proxied by: Expenditure Composition Outturn</em>
            </p>
            <p style="color: #555; line-height: 1.5; margin-bottom: 0.75rem;">
                <strong>Leakage diagnostic question:</strong> When spending happens, does it stay aligned with the budget's intended priorities—or does it drift during execution?
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
        indicator_data_2 = df_display[df_display['indicator_label'] == indicator_tab2].copy()
        africa_ref_data_2 = ref_data[ref_data['Region Name'] == 'Africa'].copy() if not ref_data.empty else pd.DataFrame()
        africa_countries_2 = sorted(africa_ref_data_2['Country or Area'].unique()) if not africa_ref_data_2.empty else []
        available_years_ind_2 = sorted(indicator_data_2['year'].dropna().unique()) if not indicator_data_2.empty else []
        available_regions_2 = sorted(africa_ref_data_2['Intermediate Region Name'].dropna().unique()) if not africa_ref_data_2.empty else []
        
        # Filter row
        filter_col1, filter_col2, filter_col3, filter_col4 = st.columns([1.5, 1.5, 1.5, 0.7])
        
        with filter_col1:
            selected_year_ind_2 = st.selectbox(
                "Select Year(s)",
                options=["All Years"] + available_years_ind_2,
                index=0,
                key="ind_4_1_2_year_filter"
            )
        
        with filter_col2:
            selected_countries_ind_2 = st.multiselect(
                "Select Country",
                options=africa_countries_2,
                default=[],
                key="ind_4_1_2_country_filter"
            )
        
        with filter_col3:
            selected_regions_ind_2 = st.multiselect(
                "Select Region",
                options=available_regions_2,
                default=[],
                key="ind_4_1_2_region_filter"
            )
        
        with filter_col4:
            st.markdown("<br>", unsafe_allow_html=True)
            if st.button("Reset", key="ind_4_1_2_reset", use_container_width=True):
                # Delete session state keys to reset widgets to defaults
                if 'ind_4_1_2_year_filter' in st.session_state:
                    del st.session_state.ind_4_1_2_year_filter
                if 'ind_4_1_2_country_filter' in st.session_state:
                    del st.session_state.ind_4_1_2_country_filter
                if 'ind_4_1_2_region_filter' in st.session_state:
                    del st.session_state.ind_4_1_2_region_filter
                st.rerun()
        
        # Prepare filtered data for this indicator
        filtered_ind_data_2 = indicator_data_2.copy()
        if selected_year_ind_2 != "All Years":
            filtered_ind_data_2 = filtered_ind_data_2[filtered_ind_data_2['year'] == selected_year_ind_2]
        if selected_countries_ind_2:
            filtered_ind_data_2 = filtered_ind_data_2[filtered_ind_data_2['country_or_area'].isin(selected_countries_ind_2)]
        if selected_regions_ind_2:
            # Filter by intermediate region
            region_countries_2 = africa_ref_data_2[
                africa_ref_data_2['Intermediate Region Name'].isin(selected_regions_ind_2)
            ]['Country or Area'].unique()
            filtered_ind_data_2 = filtered_ind_data_2[filtered_ind_data_2['country_or_area'].isin(region_countries_2)]
        
        # C. Visualization Panel with Multi-View Tabs
        tab_graph_2, tab_map_2, tab_data_2 = st.tabs(["Graph View", "Map View", "Data Table"])
        
        with tab_graph_2:
            # Add "How to Read This Graph" hover button
            st.markdown("""
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                <button type="button" class="how-to-read-btn" data-tooltip="Each cell shows how closely a country's actual total spending matched the original approved budget in that year. A = close to plan (about 95–105% of budget). B/C = moderate deviations. D = large deviations (<85% or >115%), suggesting weak budget credibility and higher risk of waste, arrears, or ad-hoc reallocations." style="background: none; border: none; cursor: help; font-size: 0.9em; color: #666; padding: 0.25rem 0.5rem; margin-left: auto;">
                    How to Read This Graph <span style="font-size: 0.8em;">ℹ️</span>
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
            
            # Radio selector for PEFA indicator views
            selected_view = st.radio(
                "Select Indicator View",
                options=[
                    "PEFA: PI-2 Expenditure Composition Outturn",
                    "PEFA: Expenditure Composition Outturn by Function",
                    "PEFA: Expenditure Composition Outturn by Economic Type"
                ],
                index=0,  # Default to PI-2
                key="ind_4_1_2_pefa_view",
                horizontal=True
            )
            st.markdown("""
            <p style="color: #666; font-size: 0.9em; margin-top: 0.5rem; margin-bottom: 1rem;">
                <em>These views show whether the <strong>composition</strong> of spending matches the approved budget (overall, by function, or by economic type).</em>
            </p>
            """, unsafe_allow_html=True)
            
            # Load data based on selected view
            import plotly.graph_objects as go
            import plotly.express as px
            
            # Define indicator labels
            pi2_main_label = "PEFA: PI-2 Expenditure composition outturn"
            pi2_function_label = "PEFA: Expenditure composition outturn by function"
            pi2_economic_label = "PEFA: Expenditure composition outturn by economic type"
            
            # Get data for selected view and determine view type
            if selected_view == "PEFA: PI-2 Expenditure Composition Outturn":
                chart_data = df_display[df_display['indicator_label'] == pi2_main_label].copy()
                view_type = "pi2"
            elif selected_view == "PEFA: Expenditure Composition Outturn by Function":
                chart_data = df_display[df_display['indicator_label'].str.contains('expenditure composition outturn by function', case=False, na=False)].copy()
                view_type = "function"
            else:  # By Economic Type
                chart_data = df_display[df_display['indicator_label'].str.contains('expenditure composition outturn by economic type', case=False, na=False)].copy()
                view_type = "economic"
            
            # Store view_type in session state for use in other tabs
            st.session_state['ind_4_1_2_view_type'] = view_type
            
            # Apply filters
            if not chart_data.empty:
                if selected_year_ind_2 != "All Years":
                    chart_data = chart_data[chart_data['year'] == selected_year_ind_2]
                if selected_countries_ind_2:
                    chart_data = chart_data[chart_data['country_or_area'].isin(selected_countries_ind_2)]
                if selected_regions_ind_2:
                    region_countries = africa_ref_data_2[
                        africa_ref_data_2['Intermediate Region Name'].isin(selected_regions_ind_2)
                    ]['Country or Area'].unique()
                    chart_data = chart_data[chart_data['country_or_area'].isin(region_countries)]
            
            # Convert values to PEFA scores (1-4) if needed
            def convert_to_pefa_score(value):
                """Convert percentage or raw value to PEFA score (1-4)"""
                try:
                    val = float(value)
                    # If value is already 1-4, return as is
                    if 1 <= val <= 4:
                        return val
                    # Otherwise, convert from percentage to PEFA score
                    # For expenditure composition, lower variance = higher score
                    # A (4): 95-105%, B (3): 90-110%, C (2): 85-115%, D (1): <85% or >115%
                    if 95 <= val <= 105:
                        return 4  # A
                    elif (90 <= val < 95) or (105 < val <= 110):
                        return 3  # B
                    elif (85 <= val < 90) or (110 < val <= 115):
                        return 2  # C
                    else:
                        return 1  # D
                except:
                    return None
            
            # Render horizontal bar chart based on view type
            if not chart_data.empty:
                chart_data = chart_data.copy()
                chart_data['pefa_score'] = chart_data['value'].apply(convert_to_pefa_score)
                chart_data = chart_data.dropna(subset=['pefa_score'])
                
                # Get latest year per country (or use selected year)
                if selected_year_ind_2 != "All Years":
                    chart_data = chart_data[chart_data['year'] == selected_year_ind_2]
                else:
                    # Use latest year per country
                    chart_data = chart_data.loc[chart_data.groupby('country_or_area')['year'].idxmax()]
                
                if not chart_data.empty:
                    fig = go.Figure()
                    
                    # PEFA Score color mapping
                    score_colors = {
                        4: '#003366',  # Deep Blue (A)
                        3: '#3366CC',  # Medium Blue (B)
                        2: '#99CCFF',  # Light Blue (C)
                        1: '#F26C2B'   # Orange (D)
                    }
                    
                    # Sort by score (descending) then alphabetically
                    chart_data_sorted = chart_data.sort_values(['pefa_score', 'country_or_area'], ascending=[False, True])
                    
                    # Get unique countries
                    countries = sorted(chart_data_sorted['country_or_area'].unique())
                    
                    # Create color list for each country based on their score
                    country_colors = []
                    for country in countries:
                        country_score = chart_data_sorted[chart_data_sorted['country_or_area'] == country]['pefa_score'].iloc[0]
                        country_colors.append(score_colors[int(country_score)])
                    
                    # Create one trace with all countries
                    fig.add_trace(go.Bar(
                        x=chart_data_sorted['pefa_score'],
                        y=chart_data_sorted['country_or_area'],
                        orientation='h',
                        marker=dict(
                            color=country_colors,
                            line=dict(width=1, color='white')
                        ),
                        text=chart_data_sorted['pefa_score'].astype(int),
                        textposition='outside',
                        customdata=chart_data_sorted[['year', 'pefa_score']].values,
                        hovertemplate="<b>%{y}</b><br>" +
                                    "PEFA Score: %{customdata[1]:.0f}<br>" +
                                    "Year: %{customdata[0]}<br>" +
                                    "<extra></extra>",
                        showlegend=False
                    ))
                    
                    # Add legend manually - always show all scores 1-4 (static)
                    # Create invisible traces for legend only
                    for score in [4, 3, 2, 1]:
                        score_label = 'A' if score == 4 else 'B' if score == 3 else 'C' if score == 2 else 'D'
                        fig.add_trace(go.Bar(
                            x=[None],
                            y=[None],
                            name=f"Score {int(score)} ({score_label})",
                            marker=dict(color=score_colors[score]),
                            showlegend=True,
                            legendgroup=f"score_{score}"
                        ))
                    
                    # Determine title based on view
                    if view_type == "pi2":
                        title_text = "PEFA: PI-2 Expenditure Composition Outturn"
                    elif view_type == "function":
                        title_text = "PEFA: Expenditure Composition Outturn by Function"
                    else:
                        title_text = "PEFA: Expenditure Composition Outturn by Economic Type"
                    
                    # Get display year for subtitle
                    if selected_year_ind_2 != "All Years":
                        display_year = selected_year_ind_2
                    else:
                        display_year = int(chart_data['year'].max())
                    
                    fig.update_layout(
                        title=f"{title_text}<br><sub>{display_year if selected_year_ind_2 != 'All Years' else 'Latest Available Year'}</sub>",
                        xaxis_title="PEFA Score (1-4)",
                        yaxis_title="Country",
                        xaxis=dict(range=[0.5, 4.5], tickmode='linear', tick0=1, dtick=1),
                        yaxis=dict(autorange='reversed'),  # Reverse so highest scores appear at top
                        height=max(400, len(countries) * 30),  # Dynamic height based on number of countries
                        hovermode='closest',
                        legend=dict(
                            orientation="v",
                            yanchor="top",
                            y=1,
                            xanchor="left",
                            x=1.02,
                            title="PEFA Score"
                        ),
                        barmode='overlay',  # Single bar per country
                        margin=dict(l=150, r=200, t=80, b=50)
                    )
                    
                    st.plotly_chart(fig, use_container_width=True)
                else:
                    st.info("No valid data available for the selected view and filters.")
            else:
                st.info("No data available for the selected indicator view.")
        
        with tab_map_2:
            # Map View - Use selected view to determine which data to show
            # Get data based on selected view (same as graph view)
            if selected_view == "PEFA: PI-2 Expenditure Composition Outturn":
                map_data = df_display[df_display['indicator_label'] == pi2_main_label].copy()
            elif selected_view == "PEFA: Expenditure Composition Outturn by Function":
                map_data = df_display[df_display['indicator_label'].str.contains('expenditure composition outturn by function', case=False, na=False)].copy()
            else:  # By Economic Type
                map_data = df_display[df_display['indicator_label'].str.contains('expenditure composition outturn by economic type', case=False, na=False)].copy()
            
            # Apply filters
            if not map_data.empty:
                if selected_year_ind_2 != "All Years":
                    map_data = map_data[map_data['year'] == selected_year_ind_2]
                if selected_countries_ind_2:
                    map_data = map_data[map_data['country_or_area'].isin(selected_countries_ind_2)]
                if selected_regions_ind_2:
                    region_countries = africa_ref_data_2[
                        africa_ref_data_2['Intermediate Region Name'].isin(selected_regions_ind_2)
                    ]['Country or Area'].unique()
                    map_data = map_data[map_data['country_or_area'].isin(region_countries)]
            
            if not map_data.empty:
                # Prepare map data
                map_data_2 = map_data.copy()
                
                # Use the latest year if multiple years, or selected year
                if selected_year_ind_2 != "All Years":
                    map_data_2 = map_data_2[map_data_2['year'] == selected_year_ind_2]
                else:
                    # Use latest year per country
                    map_data_2 = map_data_2.loc[map_data_2.groupby('country_or_area')['year'].idxmax()]
                
                # Convert values to numeric
                map_data_2['value'] = pd.to_numeric(map_data_2['value'], errors='coerce')
                map_data_2 = map_data_2.dropna(subset=['value'])
                
                if not map_data_2.empty:
                    # Merge with reference data to get ISO codes
                    africa_ref_2 = ref_data[ref_data['Region Name'] == 'Africa'].copy()
                    if not africa_ref_2.empty and 'Country or Area' in africa_ref_2.columns:
                        map_data_merged_2 = map_data_2.merge(
                            africa_ref_2[['Country or Area', 'iso3']],
                            left_on='country_or_area',
                            right_on='Country or Area',
                            how='inner'
                        )
                        
                        if not map_data_merged_2.empty:
                            # Determine the correct ISO column name after merge
                            iso_col_2 = 'iso3_y' if 'iso3_y' in map_data_merged_2.columns else ('iso3_x' if 'iso3_x' in map_data_merged_2.columns else 'iso3')
                            if iso_col_2 != 'iso3' and iso_col_2 in map_data_merged_2.columns:
                                map_data_merged_2['iso3'] = map_data_merged_2[iso_col_2]
                            
                            # Create choropleth map
                            import plotly.graph_objects as go
                            
                            fig_map_2 = go.Figure(data=go.Choropleth(
                                locations=map_data_merged_2['iso3'],
                                z=map_data_merged_2['value'],
                                locationmode='ISO-3',
                                colorscale='Blues',
                                showscale=True,
                                text=map_data_merged_2.apply(
                                    lambda row: f"{row['country_or_area']}<br>Value: {row['value']:.2f}<br>Year: {row['year']}",
                                    axis=1
                                ),
                                hovertemplate='%{text}<extra></extra>',
                                colorbar=dict(title="Variance")
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
                            
                            st.plotly_chart(fig_map_2, use_container_width=True)
                        else:
                            st.info("No data available after merging with reference data.")
                    else:
                        st.info("No reference data available for map.")
                else:
                    st.info("No valid numeric data available for the map.")
            else:
                st.info("No data available for the selected filters.")
        
        with tab_data_2:
            # Data Table - Use selected view to determine which data to show
            # Get data based on selected view (same as graph view)
            if selected_view == "PEFA: PI-2 Expenditure Composition Outturn":
                table_data = df_display[df_display['indicator_label'] == pi2_main_label].copy()
            elif selected_view == "PEFA: Expenditure Composition Outturn by Function":
                table_data = df_display[df_display['indicator_label'].str.contains('expenditure composition outturn by function', case=False, na=False)].copy()
            else:  # By Economic Type
                table_data = df_display[df_display['indicator_label'].str.contains('expenditure composition outturn by economic type', case=False, na=False)].copy()
            
            # Apply filters
            if not table_data.empty:
                if selected_year_ind_2 != "All Years":
                    table_data = table_data[table_data['year'] == selected_year_ind_2]
                if selected_countries_ind_2:
                    table_data = table_data[table_data['country_or_area'].isin(selected_countries_ind_2)]
                if selected_regions_ind_2:
                    region_countries_table = africa_ref_data_2[
                        africa_ref_data_2['Intermediate Region Name'].isin(selected_regions_ind_2)
                    ]['Country or Area'].unique()
                    table_data = table_data[table_data['country_or_area'].isin(region_countries_table)]
                
                if not table_data.empty:
                    # Prepare display dataframe
                    display_df_2 = table_data[['country_or_area', 'year', 'value']].copy()
                    
                    # Convert to PEFA score for display
                    def convert_to_pefa_score(value):
                        try:
                            val = float(value)
                            if 1 <= val <= 4:
                                return int(val)
                            if val >= 95 and val <= 105:
                                return 4
                            elif (val >= 90 and val < 95) or (val > 105 and val <= 110):
                                return 3
                            elif (val >= 85 and val < 90) or (val > 110 and val <= 115):
                                return 2
                            else:
                                return 1
                        except:
                            return None
                    
                    display_df_2['PEFA Score'] = display_df_2['value'].apply(convert_to_pefa_score)
                    display_df_2 = display_df_2.dropna(subset=['PEFA Score'])
                    
                    # Rename columns based on view (get from session state or recalculate)
                    current_view_type = st.session_state.get('ind_4_1_2_view_type', 'pi2')
                    if current_view_type == "pi2":
                        display_df_2 = display_df_2.rename(columns={'value': 'Expenditure Composition Outturn (%)'})
                    elif current_view_type == "function":
                        display_df_2 = display_df_2.rename(columns={'value': 'Expenditure Composition by Function (%)'})
                    else:  # economic
                        display_df_2 = display_df_2.rename(columns={'value': 'Expenditure Composition by Economic Type (%)'})
        
                    # Reorder columns
                    value_col = [col for col in display_df_2.columns if 'Expenditure Composition' in col][0]
                    display_df_2 = display_df_2[['country_or_area', 'year', value_col, 'PEFA Score']]
                    
                    st.dataframe(display_df_2, use_container_width=True, height=400)
                    
                    # CSV download
                    csv_2 = display_df_2.to_csv(index=False)
                    view_name = selected_view.replace("PEFA: ", "").replace(" ", "_").lower()
                    st.download_button(
                        label="Download data as CSV",
                        data=csv_2,
                        file_name=f"indicator_4_1_2_1_{view_name}_{selected_year_ind_2 if selected_year_ind_2 != 'All Years' else 'all_years'}.csv",
                        mime="text/csv",
                        key="download_csv_ind_4_1_2"
                    )
                else:
                    st.info("No data available for the selected view and filters.")
            else:
                st.info("No data available for the selected indicator view.")
        
        # D. Supporting Information Layers (collapsible, in order)
        # 1. Learn more about this indicator
        with st.expander("Learn more about this indicator", expanded=False):
            tab_def, tab_proxy = st.tabs(["Definition", "Proxy Justification"])
            with tab_def:
                st.markdown("""
                PI-2 shows whether spending shifts away from planned priorities during execution. High composition variance can signal weak planning, ad-hoc reallocations, and reduced value-for-money—another pathway for expenditure leakages.
                
                **Source:** [PEFA Framework - PI-2](https://www.pefa.org/)
                """)
            with tab_proxy:
                st.markdown("""
                PEFA standard indicator, globally recognized as a measure of budget composition credibility and public financial management quality.
                """)

# Orange divider before Data Availability
    st.markdown("""
<div style="border-top: 2px solid #F26C2B; margin: 1.5rem 0; clear: both;"></div>
    """, unsafe_allow_html=True)

# ========================================
# SECTION: Data Gaps / Availability
# ========================================
all_indicators_4_1 = {
    "Public Expenditure Efficiency Index (4.1.1.1)": "PEFA: PI-1 Aggregate expenditure out-turn",
    "Expenditure Quality Score (4.1.2.1)": "PEFA: PI-2 Expenditure composition outturn"
}
africa_countries = ref_data[ref_data['Region Name'] == 'Africa']['Country or Area'].unique()
df_africa = df_main[df_main['country_or_area'].isin(africa_countries)]

