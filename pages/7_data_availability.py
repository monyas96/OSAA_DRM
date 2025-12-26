"""
Data Availability Dashboard - Centralized view of all indicators and their data coverage
"""
import streamlit as st
import pandas as pd
import sys
from pathlib import Path
import plotly.express as px
import plotly.graph_objects as go

# set_page_config MUST be the first Streamlit command
st.set_page_config(
    page_title="Data Availability in Africa",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Add parent directory to path
parent_dir = str(Path(__file__).resolve().parent.parent)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

# Set topic in URL parameters (for React navigation support)
try:
    st.query_params["topic"] = "data-availability"
except Exception:
    pass

# Notify React parent of current page (for navigation sync)
st.markdown("""
<script>
    // Notify parent window of current page on load
    if (window.parent !== window) {
        window.parent.postMessage({
            type: 'STREAMLIT_NAVIGATION',
            pagePath: '7_data_availability'
        }, '*');
    }
</script>
""", unsafe_allow_html=True)

# Import data loading modules
try:
    import universal_viz as uv
    DATA_AVAILABLE = True
except ImportError:
    DATA_AVAILABLE = False

# Navigation - Home button and logo
try:
    from app_core.components.navigation import render_page_logo
    render_page_logo("top-right")
except ImportError:
    pass

# --- Load OSAA CSS ---
try:
    with open("app_core/styles/style_osaa.css") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
except Exception:
    pass

# Back to Theme 4 button - placed above the page content
st.markdown("""
<style>
    button[key="back_to_theme_4_data"] {
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
    button[key="back_to_theme_4_data"]:hover {
        background: linear-gradient(135deg, #E85A1F 0%, #D1490F 100%) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 8px rgba(242, 108, 43, 0.3) !important;
    }
</style>
""", unsafe_allow_html=True)

if st.button("← Back to Theme 4", key="back_to_theme_4_data", use_container_width=False):
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

# Page Header
st.markdown("""
<div class="section-header">
    <h1>Data Availability in Africa</h1>
    <p>This page provides a comprehensive overview of data availability for all indicators across Theme 4: Domestic Resource Mobilization. Explore which countries and years have data for each indicator, identify data gaps, and understand coverage patterns.</p>
</div>
""", unsafe_allow_html=True)

# Load data
if DATA_AVAILABLE:
    try:
        ref_data = uv.load_country_reference_data()
        df_main = uv.load_main_data()
        
        if df_main.empty or ref_data.empty:
            st.error("Unable to load data. Please ensure data files are available.")
            st.stop()
        
        # Filter for Africa only
        africa_countries = ref_data[ref_data['Region Name'] == 'Africa']['Country or Area'].unique()
        df_africa = df_main[df_main['country_or_area'].isin(africa_countries)].copy()
        
        if df_africa.empty:
            st.warning("No data available for African countries.")
            st.stop()
            
    except Exception as e:
        st.error(f"Error loading data: {str(e)}")
        st.stop()
else:
    st.error("Data modules not available. Please ensure universal_viz is properly installed.")
    st.stop()

# Define indicator categories by topic
INDICATOR_CATEGORIES = {
    "Topic 4.1: Public Expenditures": {
        "4.1.1.1": {
            "name": "Budget Execution Credibility (PEFA PI-1)",
            "indicators": [
                "PEFA: PI-1 Aggregate expenditure out-turn"
            ]
        },
        "4.1.2.1": {
            "name": "Spending Alignment with Priorities (PEFA PI-2)",
            "indicators": [
                "PEFA: PI-2 Expenditure composition outturn",
                "PEFA: Expenditure composition outturn by function",
                "PEFA: Expenditure composition outturn by economic type"
            ]
        }
    },
    "Topic 4.2: Budget and Tax Revenues": {
        "4.2.1.1": {
            "name": "Tax Revenue as Percentage of GDP",
            "indicators": ["Tax Revenue - % of GDP - value"]
        },
        "4.2.1.2.a": {
            "name": "Number of Taxpayers",
            "indicators": [
                "Income Taxes - % of GDP - value",
                "CIT - % of GDP - value",
                "VAT - % of GDP - value",
                "Excise Taxes - % of GDP - value",
                "Trade Taxes - % of GDP - value",
                "Other Taxes - % of GDP - value"
            ]
        },
        "4.2.1.2.b": {
            "name": "Domestic Revenue",
            "indicators": [
                "Tax Revenue Excluding Social Contributions (% of GDP) - GRD",
                "Tax Revenue Including Social Contributions (% of GDP) - GRD"
            ]
        },
        "4.2.2.1": {
            "name": "Tax Collection Efficiency Score",
            "indicators": ["Tax Effort (Actual / Capacity)"]
        },
        "4.2.2.2.a": {
            "name": "Tax Buoyancy",
            "indicators": [
                "Corporate income tax (CIT) buoyancy [by_cit]",
                "Personal income tax (PIT) buoyancy [by_pit]",
                "Value added tax (VAT) buoyancy [by_vat]"
            ]
        },
        "4.2.2.2.b": {
            "name": "Tax Capacity & Gap",
            "indicators": [
                "CIT - % of GDP - Capacity",
                "CIT - % of GDP - Gap",
                "PIT - % of GDP - Capacity",
                "PIT - % of GDP - Gap"
            ]
        }
    },
    "Topic 4.3: Capital Markets": {
        "4.3.1.1": {
            "name": "Market Capitalization to GDP",
            "indicators": ["Stock Market Cap to GDP (%)"]
        },
        "4.3.2.1": {
            "name": "Portfolio Investment Bonds",
            "indicators": ["Portfolio investment, bonds (PPG + PNG) (NFL, current US$)"]
        },
        "4.3.3.1": {
            "name": "Foreign Exchange Reserves",
            "indicators": ["Total reserves (includes gold, current US$)"]
        },
        "4.3.4.1": {
            "name": "Banking Sector Development Index",
            "indicators": ["Banking Sector Development Index"]
        },
        "4.3.5.1": {
            "name": "Domestic Credit to Private Sector",
            "indicators": ["Domestic credit to private sector (% of GDP)"]
        }
    },
    "Topic 4.4: Illicit Financial Flows": {
        "4.4.1.1": {
            "name": "IFF Magnitude",
            "indicators": ["IFF Magnitude (% of GDP)"]
        },
        "4.4.1.2": {
            "name": "Annual IFF Volume",
            "indicators": ["Annual IFF Volume (current US$)"]
        },
        "4.4.2.1": {
            "name": "Trade Mispricing",
            "indicators": ["Trade Mispricing (current US$)"]
        },
        "4.4.2.2": {
            "name": "Tax Registration Coverage",
            "indicators": [
                "Active taxpayers on PIT register as percentage of Labor Force",
                "Active taxpayers on PIT register as percentage of Population"
            ]
        },
        "4.4.2.3": {
            "name": "Criminal Activities",
            "indicators": ["Criminal Activities IFF (current US$)"]
        },
        "4.4.3.1": {
            "name": "Corruption-Driven IFF Vulnerability",
            "indicators": ["Control of Corruption: Estimate"]
        },
        "4.4.4.1": {
            "name": "Enforcement Enablers",
            "indicators": [
                "Rule of Law",
                "Control of Corruption: Estimate",
                "CPIA transparency, accountability, and corruption in the public sector rating",
                "CPIA quality of public administration rating",
                "ID ownership, 15 to 24 years old",
                "ID ownership, 25 and older"
            ]
        },
        "4.4.4.2": {
            "name": "Audit Effectiveness",
            "indicators": [
                "Details on all audits and verifiction actions undertaken (excluding electronic compliance checks)-No. of audits completed",
                "Value of additional assessments raised from audits and verification actions by tax type (including penalties and interest) (in thousands in local currency)-Corporate income tax"
            ]
        },
        "4.4.4.3": {
            "name": "ICT Infrastructure",
            "indicators": [
                "Operational ICT solutions of the administration are…-Custom built",
                "Operational ICT solutions of the administration are…-On premises commercial off the shelf (COTS)",
                "Operational ICT solutions of the administration are…-Software-as-a-Service (SaaS, i.e. cloud based)"
            ]
        },
        "4.4.4.4": {
            "name": "Human Capital",
            "indicators": [
                "Academic qualifications (No. of staff at the end of FY)-Bachelors degree",
                "Academic qualifications (No. of staff at the end of FY)-Masters degree (or above)",
                "Total tax administration FTEs - Derived"
            ]
        },
        "4.4.4.5": {
            "name": "Financial Secrecy",
            "indicators": ["Financial Secrecy Index"]
        }
    }
}

# Get all unique indicators from the dataset
all_indicators_in_data = sorted(df_africa['indicator_label'].dropna().unique().tolist())

# Build comprehensive indicator list with metadata
def build_indicator_list():
    """Build a comprehensive list of all indicators with their metadata"""
    indicator_list = []
    processed_labels = set()  # Track which actual labels we've already processed
    
    # First, process categorized indicators
    for topic, indicators in INDICATOR_CATEGORIES.items():
        for indicator_code, indicator_info in indicators.items():
            for indicator_label_pattern in indicator_info["indicators"]:
                # Try to find matching indicators in data
                # First try exact match
                exact_matches = df_africa[df_africa['indicator_label'] == indicator_label_pattern]['indicator_label'].unique()
                
                if len(exact_matches) > 0:
                    actual_label = exact_matches[0]
                else:
                    # Try partial match (remove special chars and match core words)
                    pattern_clean = indicator_label_pattern.split('(')[0].strip().lower()
                    matching_indicators = df_africa[
                        df_africa['indicator_label'].str.contains(pattern_clean, case=False, na=False)
                    ]['indicator_label'].unique()
                    
                    if len(matching_indicators) > 0:
                        actual_label = matching_indicators[0]
                    else:
                        actual_label = None
                
                if actual_label and actual_label not in processed_labels:
                    processed_labels.add(actual_label)
                    indicator_data = df_africa[df_africa['indicator_label'] == actual_label]
                    
                    # Calculate availability metrics
                    countries_with_data = indicator_data['country_or_area'].nunique()
                    years_with_data = sorted(indicator_data['year'].dropna().unique())
                    latest_year = max(years_with_data) if years_with_data else None
                    earliest_year = min(years_with_data) if years_with_data else None
                    total_records = len(indicator_data)
                    
                    indicator_list.append({
                        "topic": topic,
                        "indicator_code": indicator_code,
                        "indicator_name": indicator_info["name"],
                        "indicator_label": actual_label,
                        "countries_with_data": countries_with_data,
                        "total_africa_countries": len(africa_countries),
                        "coverage_percent": round((countries_with_data / len(africa_countries) * 100), 1) if len(africa_countries) > 0 else 0,
                        "years_available": len(years_with_data),
                        "year_range": f"{earliest_year}-{latest_year}" if earliest_year and latest_year else "N/A",
                        "latest_year": latest_year,
                        "total_records": total_records
                    })
                elif actual_label is None:
                    # Indicator pattern not found in data
                    indicator_list.append({
                        "topic": topic,
                        "indicator_code": indicator_code,
                        "indicator_name": indicator_info["name"],
                        "indicator_label": indicator_label_pattern,
                        "countries_with_data": 0,
                        "total_africa_countries": len(africa_countries),
                        "coverage_percent": 0,
                        "years_available": 0,
                        "year_range": "No data",
                        "latest_year": None,
                        "total_records": 0
                    })
    
    # Add any remaining indicators from data that weren't categorized
    all_data_indicators = set(df_africa['indicator_label'].dropna().unique())
    uncategorized = all_data_indicators - processed_labels
    
    if uncategorized:
        # Group uncategorized indicators by topic based on keywords
        for uncat_label in sorted(uncategorized):
            # Try to infer topic from label
            topic_assigned = "Other Indicators"
            if any(keyword in uncat_label.lower() for keyword in ['tax', 'revenue', 'budget']):
                topic_assigned = "Topic 4.2: Budget and Tax Revenues"
            elif any(keyword in uncat_label.lower() for keyword in ['expenditure', 'pefa', 'spending']):
                topic_assigned = "Topic 4.1: Public Expenditures"
            elif any(keyword in uncat_label.lower() for keyword in ['market', 'capital', 'banking', 'credit', 'reserve']):
                topic_assigned = "Topic 4.3: Capital Markets"
            elif any(keyword in uncat_label.lower() for keyword in ['illicit', 'corruption', 'audit', 'ict', 'fte']):
                topic_assigned = "Topic 4.4: Illicit Financial Flows"
            
            indicator_data = df_africa[df_africa['indicator_label'] == uncat_label]
            countries_with_data = indicator_data['country_or_area'].nunique()
            years_with_data = sorted(indicator_data['year'].dropna().unique())
            latest_year = max(years_with_data) if years_with_data else None
            earliest_year = min(years_with_data) if years_with_data else None
            
            indicator_list.append({
                "topic": topic_assigned,
                "indicator_code": "Uncategorized",
                "indicator_name": "Uncategorized Indicator",
                "indicator_label": uncat_label,
                "countries_with_data": countries_with_data,
                "total_africa_countries": len(africa_countries),
                "coverage_percent": round((countries_with_data / len(africa_countries) * 100), 1) if len(africa_countries) > 0 else 0,
                "years_available": len(years_with_data),
                "year_range": f"{earliest_year}-{latest_year}" if earliest_year and latest_year else "N/A",
                "latest_year": latest_year,
                "total_records": len(indicator_data)
            })
    
    return pd.DataFrame(indicator_list)

# Build indicator list
indicator_df = build_indicator_list()

# Filters
st.markdown("### Filters")
filter_col1, filter_col2, filter_col3 = st.columns(3)

with filter_col1:
    selected_topic = st.selectbox(
        "Filter by Topic",
        options=["All Topics"] + list(INDICATOR_CATEGORIES.keys()),
        key="data_avail_topic_filter"
    )

with filter_col2:
    search_term = st.text_input(
        "Search Indicator",
        placeholder="Type to search...",
        key="data_avail_search"
    )

with filter_col3:
    coverage_threshold = st.slider(
        "Minimum Coverage (%)",
        min_value=0,
        max_value=100,
        value=0,
        key="data_avail_coverage"
    )

# Apply filters
filtered_indicators = indicator_df.copy()
if selected_topic != "All Topics":
    filtered_indicators = filtered_indicators[filtered_indicators['topic'] == selected_topic]
if search_term:
    filtered_indicators = filtered_indicators[
        filtered_indicators['indicator_name'].str.contains(search_term, case=False, na=False) |
        filtered_indicators['indicator_label'].str.contains(search_term, case=False, na=False)
    ]
filtered_indicators = filtered_indicators[filtered_indicators['coverage_percent'] >= coverage_threshold]

# Summary Statistics
st.markdown("### Summary Statistics")
stat_col1, stat_col2, stat_col3, stat_col4 = st.columns(4)

with stat_col1:
    st.metric("Total Indicators", len(filtered_indicators))
with stat_col2:
    indicators_with_data = len(filtered_indicators[filtered_indicators['total_records'] > 0])
    st.metric("Indicators with Data", indicators_with_data)
with stat_col3:
    avg_coverage = filtered_indicators['coverage_percent'].mean() if not filtered_indicators.empty else 0
    st.metric("Average Coverage", f"{avg_coverage:.1f}%")
with stat_col4:
    indicators_recent = len(filtered_indicators[
        (filtered_indicators['latest_year'] >= 2020) & (filtered_indicators['latest_year'].notna())
    ])
    st.metric("Recent Data (≥2020)", indicators_recent)

# Main content tabs
tab_overview, tab_detailed, tab_heatmap = st.tabs([
    "Overview Table",
    "Detailed View",
    "Coverage Heatmap"
])

with tab_overview:
    # Display summary table
    display_df = filtered_indicators[[
        'topic', 'indicator_code', 'indicator_name', 
        'countries_with_data', 'coverage_percent', 
        'years_available', 'year_range', 'latest_year'
    ]].copy()
    
    display_df = display_df.rename(columns={
        'topic': 'Topic',
        'indicator_code': 'Code',
        'indicator_name': 'Indicator Name',
        'countries_with_data': 'Countries',
        'coverage_percent': 'Coverage %',
        'years_available': 'Years',
        'year_range': 'Year Range',
        'latest_year': 'Latest Year'
    })
    
    # Create HTML table with color coding instead of pandas.style (avoids jinja2 dependency)
    def get_coverage_color(val):
        """Get background color based on coverage percentage"""
        if pd.isna(val) or val == 0:
            return '#f5f5f5'  # Gray for no data
        elif val >= 80:
            return '#d4edda'  # Green for high coverage
        elif val >= 50:
            return '#fff3cd'  # Yellow for medium coverage
        else:
            return '#f8d7da'  # Red for low coverage
    
    def get_text_color(val):
        """Get text color based on coverage percentage"""
        if pd.isna(val) or val == 0:
            return '#6c757d'  # Gray text
        elif val >= 80:
            return '#155724'  # Dark green text
        elif val >= 50:
            return '#856404'  # Dark yellow text
        else:
            return '#721c24'  # Dark red text
    
    # Build HTML table
    html = '<div style="max-height: 600px; overflow-y: auto;"><table style="width: 100%; border-collapse: collapse; font-size: 14px;">'
    
    # Header row
    html += '<thead><tr style="background-color: #003366; color: white; position: sticky; top: 0;">'
    for col in display_df.columns:
        html += f'<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">{col}</th>'
    html += '</tr></thead>'
    
    # Data rows
    html += '<tbody>'
    for idx, row in display_df.iterrows():
        html += '<tr>'
        for col in display_df.columns:
            val = row[col]
            # Escape HTML special characters
            if pd.isna(val):
                val_str = "N/A"
            else:
                val_str = str(val).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
            
            if col == 'Coverage %':
                bg_color = get_coverage_color(val)
                text_color = get_text_color(val)
                formatted_val = f"{val:.1f}%" if pd.notna(val) else "N/A"
                html += f'<td style="padding: 8px; border: 1px solid #ddd; background-color: {bg_color}; color: {text_color};">{formatted_val}</td>'
            else:
                html += f'<td style="padding: 8px; border: 1px solid #ddd;">{val_str}</td>'
        html += '</tr>'
    html += '</tbody></table></div>'
    
    st.markdown(html, unsafe_allow_html=True)
    
    # Download button
    csv = display_df.to_csv(index=False)
    st.download_button(
        label="Download Data Availability Summary (CSV)",
        data=csv,
        file_name="data_availability_summary.csv",
        mime="text/csv",
        key="download_summary"
    )

with tab_detailed:
    # Allow user to select an indicator for detailed view
    if not filtered_indicators.empty:
        indicator_options = [
            f"{row['indicator_code']} - {row['indicator_name']}" 
            for _, row in filtered_indicators.iterrows()
        ]
        
        selected_indicator_display = st.selectbox(
            "Select Indicator for Detailed View",
            options=indicator_options,
            key="detailed_indicator_select"
        )
        
        if selected_indicator_display:
            # Extract indicator code
            selected_code = selected_indicator_display.split(' - ')[0]
            selected_row = filtered_indicators[filtered_indicators['indicator_code'] == selected_code].iloc[0]
            selected_label = selected_row['indicator_label']
            
            st.markdown(f"### {selected_row['indicator_name']}")
            st.markdown(f"**Indicator Code:** {selected_code}")
            st.markdown(f"**Data Label:** {selected_label}")
            
            # Get data for this indicator
            indicator_data = df_africa[df_africa['indicator_label'] == selected_label].copy()
            
            if not indicator_data.empty:
                # Statistics
                col1, col2, col3, col4 = st.columns(4)
                with col1:
                    st.metric("Countries with Data", selected_row['countries_with_data'])
                with col2:
                    st.metric("Coverage", f"{selected_row['coverage_percent']}%")
                with col3:
                    st.metric("Years Available", selected_row['years_available'])
                with col4:
                    st.metric("Total Records", selected_row['total_records'])
                
                # Data availability heatmap
                st.markdown("#### Data Availability Heatmap")
                uv.render_data_availability_heatmap(
                    df_africa,
                    selected_label,
                    title=f"Data Availability: {selected_row['indicator_name']}",
                    container_key=f"heatmap_{selected_code}",
                    all_countries=africa_countries.tolist()
                )
                
                # Countries with data
                st.markdown("#### Countries with Data")
                countries_with_data_list = sorted(indicator_data['country_or_area'].unique())
                countries_without_data = sorted(set(africa_countries) - set(countries_with_data_list))
                
                col1, col2 = st.columns(2)
                with col1:
                    st.markdown(f"**Countries with data ({len(countries_with_data_list)}):**")
                    st.write(", ".join(countries_with_data_list))
                with col2:
                    st.markdown(f"**Countries without data ({len(countries_without_data)}):**")
                    st.write(", ".join(countries_without_data) if countries_without_data else "None")
                
                # Year distribution
                st.markdown("#### Year Distribution")
                year_counts = indicator_data.groupby('year').size().reset_index(name='count')
                year_counts = year_counts.sort_values('year')
                
                fig = go.Figure()
                fig.add_trace(go.Bar(
                    x=year_counts['year'],
                    y=year_counts['count'],
                    marker_color='#0072BC',
                    hovertemplate="Year: %{x}<br>Records: %{y}<extra></extra>"
                ))
                fig.update_layout(
                    title="Number of Records by Year",
                    xaxis_title="Year",
                    yaxis_title="Number of Records",
                    height=400
                )
                st.plotly_chart(fig, use_container_width=True)
            else:
                st.warning("No data available for this indicator.")
    else:
        st.info("No indicators match the current filters.")

with tab_heatmap:
    # Overall coverage heatmap - indicators vs countries
    st.markdown("### Overall Data Coverage Heatmap")
    st.markdown("This heatmap shows which indicators have data for which countries.")
    
    if not filtered_indicators.empty:
        # Create a matrix: indicators (rows) x countries (columns)
        heatmap_data = []
        
        for _, row in filtered_indicators.iterrows():
            indicator_label = row['indicator_label']
            indicator_data = df_africa[df_africa['indicator_label'] == indicator_label]
            
            if not indicator_data.empty:
                countries_with_data = set(indicator_data['country_or_area'].unique())
                row_data = {
                    'Indicator': f"{row['indicator_code']} - {row['indicator_name']}",
                    'Topic': row['topic']
                }
                
                for country in sorted(africa_countries):
                    row_data[country] = 1 if country in countries_with_data else 0
                
                heatmap_data.append(row_data)
        
        if heatmap_data:
            heatmap_df = pd.DataFrame(heatmap_data)
            heatmap_df = heatmap_df.set_index(['Indicator', 'Topic'])
            
            # Create heatmap
            fig = px.imshow(
                heatmap_df,
                labels=dict(x="Country", y="Indicator", color="Data Available"),
                color_continuous_scale=[(0, "#f0f0f0"), (1, "#0072BC")],
                aspect="auto",
                title="Data Availability Matrix: Indicators × Countries"
            )
            fig.update_xaxes(side="bottom", tickangle=-45)
            fig.update_layout(
                height=max(600, len(heatmap_df) * 20),
                margin=dict(l=200, r=0, t=60, b=100)
            )
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No data available to display in heatmap.")
    else:
        st.info("No indicators match the current filters.")

