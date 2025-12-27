"""
Shared helper functions for policy brief graph rendering
These functions extract the exact rendering logic from exploratory view pages
"""
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
import altair as alt
import composite_indicator_methods as cim
import universal_viz as uv

def render_corruption_losses(df_filtered, ref_data):
    """
    Render corruption losses graph - exact same as exploratory view (6_topic_4_4.py)
    Returns Altair chart
    """
    corruption_indicator = "Control of Corruption"
    corruption_data = df_filtered[df_filtered['indicator_label'] == corruption_indicator].copy()
    
    if corruption_data.empty:
        return None
    
    # Calculate corruption losses using the function
    latest_corruption = cim.calculate_corruption_losses(corruption_data)
    
    # Filter out invalid values (NaN, Infinity)
    import numpy as np
    latest_corruption = latest_corruption[
        (latest_corruption['corruption_loss_billion_usd'].notna()) &
        (np.isfinite(latest_corruption['corruption_loss_billion_usd']))
    ].copy()
    
    if latest_corruption.empty:
        return None
    
    # Sort by corruption loss (descending)
    latest_corruption_sorted = latest_corruption.sort_values('corruption_loss_billion_usd', ascending=False)
    
    # Use Altair bar chart - exact same as exploratory view, full width
    # Enable actions (including fullscreen) in the chart
    bar_chart = alt.Chart(latest_corruption_sorted).mark_bar().encode(
        x=alt.X('country_or_area', sort='-y', title='Country'),
        y=alt.Y('corruption_loss_billion_usd', title='Estimated Corruption Loss (Billion USD, out of 148)'),
        tooltip=['country_or_area', 'corruption_loss_billion_usd', 'value', 'normalized_score', 'inverted_score'],
        color=alt.Color('corruption_loss_billion_usd', scale=alt.Scale(scheme='redyellowgreen', reverse=True))
    ).properties(
        title='',
        width='container',  # Use full container width
        height=700  # Larger height for fullscreen-like view (will be constrained by CSS to viewport)
    )
    
    # Return chart with actions enabled (fullscreen, export, etc.)
    return bar_chart

def render_tax_effort(df_filtered, ref_data):
    """
    Render Tax Effort graph - exact same as exploratory view (4_topic_4_2.py)
    Returns Plotly figure
    """
    indicator_label = "Tax Effort (Actual / Capacity)"
    indicator_data = df_filtered[df_filtered['indicator_label'] == indicator_label].copy()
    
    if indicator_data.empty:
        return None
    
    # Pre-configured: Show all countries, all years, with regional average
    filtered_ind_data = indicator_data.copy()
    
    # Calculate regional average
    regional_avg = filtered_ind_data.groupby('year')['value'].mean().reset_index()
    regional_avg.columns = ['year', 'regional_avg']
    
    # Create figure
    fig = go.Figure()
    
    # Add regional average line
    if not regional_avg.empty:
        fig.add_trace(go.Scatter(
            x=regional_avg['year'],
            y=regional_avg['regional_avg'],
            mode='lines+markers',
            name='Africa (Region Average)',
            line=dict(color='#F26C2B', width=3, dash='dash'),
            marker=dict(color='#F26C2B', size=8),
            hovertemplate="<b>Africa (Region Average)</b><br>Year: %{x}<br>Tax Effort: %{y:.2f}<br><extra></extra>",
            showlegend=True,
            legendrank=1
        ))
    
    # Add country lines (top 10 by average value to avoid overcrowding)
    if not filtered_ind_data.empty:
        country_averages = filtered_ind_data.groupby('country_or_area')['value'].mean().sort_values(ascending=False)
        top_countries = country_averages.head(10).index.tolist()
        
        countries_list = sorted([c for c in filtered_ind_data['country_or_area'].unique() if c in top_countries])
        for country in countries_list:
            country_data = filtered_ind_data[filtered_ind_data['country_or_area'] == country].sort_values('year')
            if not country_data.empty:
                fig.add_trace(go.Scatter(
                    x=country_data['year'],
                    y=country_data['value'],
                    mode='lines+markers',
                    name=country,
                    line=dict(color='#0072BC', width=2),
                    marker=dict(color='#0072BC', size=4),
                    hovertemplate=f"<b>{country}</b><br>Year: %{{x}}<br>Tax Effort: %{{y:.2f}}<br><extra></extra>",
                    showlegend=True
                ))
    
    # Add reference line at 1 (efficient collection)
    if not filtered_ind_data.empty:
        years = sorted(filtered_ind_data['year'].unique())
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
    
    # Update layout - fullscreen-like view (will be constrained by CSS to viewport height)
    fig.update_layout(
        height=700,  # Larger height for fullscreen-like view
        autosize=True,  # Make responsive - will fill container
        xaxis_title="Year",
        yaxis_title="Tax Effort (Actual / Capacity)",
        hovermode='closest',
        showlegend=True,
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
        margin=dict(l=50, r=180, t=10, b=40)
    )
    
    return fig

def render_pension_fund_allocation(df_filtered, ref_data):
    """
    Render Pension Fund Asset Allocation stacked bar chart - exact same as exploratory view (5_topic_4_3.py)
    Returns Plotly figure
    """
    import numpy as np
    try:
        # Load pension fund data from CSV
        df_pension = pd.read_csv('data/Pension_Fund_Asset_Allocation_by_Country.csv')
        country_col = 'Country or Area' if 'Country or Area' in df_pension.columns else 'Country'
        
        # Filter for Africa countries only
        africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy()
        africa_countries = africa_ref_data['Country or Area'].unique()
        df_pension = df_pension[df_pension[country_col].isin(africa_countries)].copy()
        
        if df_pension.empty:
            return None
        
        asset_cols = [
            'Domestic_Equities (%)',
            'Domestic_Bonds (%)',
            'Real_Estate (%)',
            'Private_Equity (%)',
            'Cash & Deposits (%)',
            'Foreign_Assets (%)'
        ]
        
        # Check which columns exist
        available_cols = [col for col in asset_cols if col in df_pension.columns]
        if not available_cols:
            return None
        
        # Prepare data for stacked bar chart
        chart_data = df_pension.set_index(country_col)[available_cols].fillna(0)
        countries = chart_data.index.tolist()
        
        # Color mapping for asset classes using OSAA theme colors
        color_map = {
            'Cash & Deposits (%)': '#003366',  # Deep Blue (OSAA)
            'Domestic_Bonds (%)': '#0072BC',  # Mid Blue (OSAA)
            'Domestic_Equities (%)': '#F26C2B',  # Orange (OSAA)
            'Foreign_Assets (%)': '#FFD34E',  # Yellow (OSAA)
            'Private_Equity (%)': '#007B33',  # Green (OSAA)
            'Real_Estate (%)': '#009D8C'  # Teal (OSAA)
        }
        
        # Create stacked bar chart
        fig = go.Figure()
        
        for col in available_cols:
            fig.add_trace(go.Bar(
                x=countries,
                y=chart_data[col].values,
                name=col.replace(' (%)', ''),
                marker_color=color_map.get(col, '#999999'),
                hovertemplate=f"<b>%{{x}}</b><br>{col.replace(' (%)', '')}: %{{y:.1f}}%<extra></extra>"
            ))
        
        fig.update_layout(
            barmode='stack',
            height=700,  # Larger height for fullscreen-like view
            autosize=True,
            xaxis_title="Country",
            yaxis_title="Percentage (%)",
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
            hovermode='x unified'
        )
        
        return fig
    except Exception as e:
        return None

def render_banking_sector_development(df_filtered, ref_data):
    """
    Render Banking Sector Development Index graph - exact same as exploratory view (2_theme_4.py)
    Returns Plotly figure
    """
    import numpy as np
    try:
        # Calculate Banking Sector Development Index
        df_bsdi = cim.calculate_banking_sector_development_index(df_filtered)
        if df_bsdi.empty:
            return None
        
        df_bsdi = df_bsdi.rename(columns={'Banking Sector Development Index': 'value'})
        df_bsdi['indicator_label'] = 'Banking Sector Development Index'
        
        # Filter for Africa
        africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy()
        if not africa_ref_data.empty:
            africa_countries = africa_ref_data['Country or Area'].unique()
            df_bsdi = df_bsdi[df_bsdi['country_or_area'].isin(africa_countries)]
        
        if df_bsdi.empty:
            return None
        
        # Use all data (no filters for policy brief)
        filtered_bsdi = df_bsdi.copy()
        
        # Create line chart with reference bands
        fig = go.Figure()
        
        # Add reference bands (shaded areas) for development tiers
        fig.add_shape(
            type="rect",
            xref="paper", yref="y",
            x0=0, y0=0, x1=1, y1=0.4,
            fillcolor="#F26C2B",
            opacity=0.2,
            layer="below",
            line_width=0,
        )
        fig.add_shape(
            type="rect",
            xref="paper", yref="y",
            x0=0, y0=0.4, x1=1, y1=0.7,
            fillcolor="#FFD34E",
            opacity=0.2,
            layer="below",
            line_width=0,
        )
        fig.add_shape(
            type="rect",
            xref="paper", yref="y",
            x0=0, y0=0.7, x1=1, y1=1.0,
            fillcolor="#0072BC",
            opacity=0.2,
            layer="below",
            line_width=0,
        )
        
        # Add reference lines at boundaries
        fig.add_hline(y=0.4, line_dash="dash", line_color="#F26C2B", line_width=1, opacity=0.5)
        fig.add_hline(y=0.7, line_dash="dash", line_color="#0072BC", line_width=1, opacity=0.5)
        
        # Get component data for tooltips
        capital_data = df_filtered[df_filtered['indicator_label'] == 'Bank capital to assets ratio (%)'].copy()
        liquidity_data = df_filtered[df_filtered['indicator_label'] == 'Bank liquid reserves to bank assets ratio (%)'].copy()
        credit_data = df_filtered[df_filtered['indicator_label'] == 'Domestic credit provided by financial sector (% of GDP)'].copy()
        
        # Add country lines (limit to top 15 for readability)
        countries_list = sorted(filtered_bsdi['country_or_area'].dropna().unique())
        if len(countries_list) > 15:
            latest_values = filtered_bsdi.groupby('country_or_area')['value'].last().sort_values(ascending=False)
            countries_list = latest_values.head(15).index.tolist()
        
        for country in countries_list:
            country_data = filtered_bsdi[filtered_bsdi['country_or_area'] == country].sort_values('year')
            country_data = country_data.dropna(subset=['value'])
            
            if not country_data.empty:
                # Color encoding based on latest value tier
                latest_value = country_data['value'].iloc[-1]
                if latest_value >= 0.7:
                    line_color = '#0072BC'  # High development
                elif latest_value >= 0.4:
                    line_color = '#FFD34E'  # Moderate development
                else:
                    line_color = '#F26C2B'  # Weak development
                
                # Merge with component data for tooltips
                capital_data_renamed = capital_data[['country_or_area', 'year', 'value']].rename(columns={'value': 'value_capital'})
                liquidity_data_renamed = liquidity_data[['country_or_area', 'year', 'value']].rename(columns={'value': 'value_liquidity'})
                credit_data_renamed = credit_data[['country_or_area', 'year', 'value']].rename(columns={'value': 'value_credit'})
                
                country_data_merged = country_data.merge(capital_data_renamed, on=['country_or_area', 'year'], how='left')
                country_data_merged = country_data_merged.merge(liquidity_data_renamed, on=['country_or_area', 'year'], how='left')
                country_data_merged = country_data_merged.merge(credit_data_renamed, on=['country_or_area', 'year'], how='left')
                
                hovertemplate = (
                    f"<b>{country}</b><br>" +
                    "Year: %{x}<br>" +
                    "BSDI Value: %{y:.3f}<br>" +
                    "Capital Ratio: %{customdata[0]:.2f}%<br>" +
                    "Liquidity Ratio: %{customdata[1]:.2f}%<br>" +
                    "Credit Ratio: %{customdata[2]:.2f}%<br>" +
                    "<extra></extra>"
                )
                
                fig.add_trace(go.Scatter(
                    x=country_data_merged['year'],
                    y=country_data_merged['value'],
                    mode='lines+markers',
                    name=country,
                    line=dict(color=line_color, width=2),
                    marker=dict(color=line_color, size=4),
                    hovertemplate=hovertemplate,
                    customdata=np.column_stack([
                        country_data_merged['value_capital'].fillna(0),
                        country_data_merged['value_liquidity'].fillna(0),
                        country_data_merged['value_credit'].fillna(0)
                    ]),
                    showlegend=True
                ))
        
        fig.update_layout(
            height=700,  # Larger height for fullscreen-like view
            autosize=True,
            xaxis_title="Year",
            yaxis_title="Banking Sector Development Index (0-1)",
            hovermode='closest',
            yaxis=dict(range=[0, 1]),
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
        
        return fig
    except Exception as e:
        return None

def render_tax_buoyancy(df_filtered, ref_data):
    """
    Render Tax Buoyancy bar chart - exact same as exploratory view (4_topic_4_2.py)
    Returns Plotly figure
    """
    indicator_label = "Tax Buoyancy (Elasticity)"
    indicator_data = df_filtered[df_filtered['indicator_label'] == indicator_label].copy()
    
    if indicator_data.empty:
        return None
    
    # Use latest year per country (matching policy brief requirement)
    year_data = indicator_data.loc[indicator_data.groupby('country_or_area')['year'].idxmax()].copy()
    
    if year_data.empty:
        return None
    
    # Color function for buoyancy levels
    def get_buoyancy_color(buoyancy):
        if buoyancy >= 1.5:
            return '#009D8C'  # Teal - Over-responsive
        elif buoyancy >= 1.0:
            return '#0072BC'  # Blue - Responsive
        elif buoyancy >= 0.5:
            return '#F26C2B'  # Orange - Weakly responsive
        else:
            return '#D32F2F'  # Red - Unresponsive
    
    # Sort by buoyancy value (descending)
    year_data_sorted = year_data.sort_values('value', ascending=False)
    colors = [get_buoyancy_color(x) for x in year_data_sorted['value'].values]
    
    fig = go.Figure()
    
    fig.add_trace(go.Bar(
        x=year_data_sorted['country_or_area'],
        y=year_data_sorted['value'],
        marker=dict(color=colors),
        hovertemplate="<b>%{x}</b><br>Tax Buoyancy: %{y:.2f}<br>Year: %{customdata}<extra></extra>",
        customdata=year_data_sorted['year'].values,
        name='Tax Buoyancy',
        showlegend=False
    ))
    
    # Add reference lines
    fig.add_hline(y=1.0, line_dash="dash", line_color="#1B75BB", 
                  annotation_text="Buoyancy = 1.0 (Balanced)", annotation_position="right")
    fig.add_hline(y=0.5, line_dash="dash", line_color="#E87722", 
                  annotation_text="Buoyancy = 0.5 (Weak)", annotation_position="right")
    
    chart_year = int(year_data_sorted['year'].max()) if not year_data_sorted.empty else None
    
    fig.update_layout(
        height=700,  # Larger height for fullscreen-like view
        autosize=True,
        xaxis_title="Country",
        yaxis_title="Tax Buoyancy (Elasticity)",
        hovermode='closest',
        xaxis=dict(tickangle=-45),
        margin=dict(l=50, r=50, t=20, b=100)
    )
    
    return fig

