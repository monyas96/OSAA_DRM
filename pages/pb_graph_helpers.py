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

def render_pefa_pi1(df_filtered, ref_data):
    """
    Render PEFA PI-1 Aggregate expenditure outturn heatmap - exact same as exploratory view (3_topic_4_1.py)
    Returns Plotly figure
    """
    indicator_label = "PEFA: PI-1 Aggregate expenditure out-turn"
    indicator_data = df_filtered[df_filtered['indicator_label'] == indicator_label].copy()
    
    if indicator_data.empty:
        return None
    
    # Use universal_viz function to create PEFA heatmap
    fig = uv.create_pefa_heatmap(
        data=indicator_data,
        x_column='year',
        y_column='country_or_area',
        value_column='value',
        title='',
        reference_data=ref_data,
        height=700
    )
    
    return fig

def render_pefa_pi2(df_filtered, ref_data):
    """
    Render PEFA PI-2 Expenditure composition outturn horizontal bar chart - exact same as exploratory view (3_topic_4_1.py)
    Returns Plotly figure
    """
    indicator_label = "PEFA: PI-2 Expenditure composition outturn"
    indicator_data = df_filtered[df_filtered['indicator_label'] == indicator_label].copy()
    
    if indicator_data.empty:
        return None
    
    # Convert values to PEFA scores (1-4)
    def convert_to_pefa_score(value):
        try:
            val = float(value)
            if 1 <= val <= 4:
                return val
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
    
    chart_data = indicator_data.copy()
    chart_data['pefa_score'] = chart_data['value'].apply(convert_to_pefa_score)
    chart_data = chart_data.dropna(subset=['pefa_score'])
    
    # Use latest year per country
    chart_data = chart_data.loc[chart_data.groupby('country_or_area')['year'].idxmax()].copy()
    
    if chart_data.empty:
        return None
    
    # PEFA Score color mapping
    score_colors = {
        4: '#003366',  # Deep Blue (A)
        3: '#3366CC',  # Medium Blue (B)
        2: '#99CCFF',  # Light Blue (C)
        1: '#F26C2B'   # Orange (D)
    }
    
    # Sort by score (descending) then alphabetically
    chart_data_sorted = chart_data.sort_values(['pefa_score', 'country_or_area'], ascending=[False, True])
    countries = sorted(chart_data_sorted['country_or_area'].unique())
    
    # Create color list for each country
    country_colors = []
    for country in countries:
        country_score = chart_data_sorted[chart_data_sorted['country_or_area'] == country]['pefa_score'].iloc[0]
        country_colors.append(score_colors[int(country_score)])
    
    fig = go.Figure()
    
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
        hovertemplate="<b>%{y}</b><br>PEFA Score: %{customdata[1]:.0f}<br>Year: %{customdata[0]}<br><extra></extra>",
        showlegend=False
    ))
    
    # Add legend traces
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
    
    fig.update_layout(
        height=700,
        xaxis_title="PEFA Score (1-4)",
        yaxis_title="Country",
        xaxis=dict(range=[0.5, 4.5], tickmode='linear', tick0=1, dtick=1),
        yaxis=dict(autorange='reversed'),
        hovermode='closest',
        legend=dict(
            orientation="v",
            yanchor="top",
            y=1,
            xanchor="left",
            x=1.02,
            title="PEFA Score"
        ),
        barmode='overlay',
        margin=dict(l=150, r=200, t=20, b=50)
    )
    
    return fig

def render_tax_gap(df_filtered, ref_data):
    """
    Render Tax Gap horizontal bar chart - exact same as exploratory view (4_topic_4_2.py)
    Returns Plotly figure
    """
    indicator_label = "Tax Gap (% of GDP)"
    indicator_data = df_filtered[df_filtered['indicator_label'] == indicator_label].copy()
    
    if indicator_data.empty:
        return None
    
    # Use latest year per country
    gap_data = indicator_data.loc[indicator_data.groupby('country_or_area')['year'].idxmax()].copy()
    
    if gap_data.empty:
        return None
    
    # Sort by tax gap (descending - largest gaps first)
    gap_data = gap_data.sort_values('value', ascending=False)
    
    # Color bars based on gap direction
    colors = ['#F26C2B' if gap >= 0 else '#0072BC' for gap in gap_data['value']]
    
    fig = go.Figure()
    
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
        height=700,
        xaxis_title="Tax Gap (% of GDP)",
        yaxis_title="Country",
        hovermode='closest',
        yaxis=dict(autorange='reversed'),
        margin=dict(l=150, r=50, t=20, b=50)
    )
    
    return fig

def render_market_capitalization(df_filtered, ref_data):
    """
    Render Market Capitalization to GDP line chart - exact same as exploratory view (2_theme_4.py)
    Returns Plotly figure
    """
    import numpy as np
    
    # Calculate Stock Market Capitalization to GDP
    required_labels = [
        'Market capitalization of listed domestic companies (current US$)',
        'GDP (current US$)'
    ]
    
    # Get data for calculation
    mcap_data = df_filtered[df_filtered['indicator_label'] == required_labels[0]].copy()
    gdp_data = df_filtered[df_filtered['indicator_label'] == required_labels[1]].copy()
    
    if mcap_data.empty or gdp_data.empty:
        return None
    
    # Merge and calculate
    merged = mcap_data.merge(
        gdp_data[['country_or_area', 'year', 'value']],
        on=['country_or_area', 'year'],
        how='inner',
        suffixes=('_mcap', '_gdp')
    )
    
    merged['value'] = (merged['value_mcap'] / merged['value_gdp']) * 100
    df_stock_cap = merged[['country_or_area', 'year', 'value']].copy()
    
    if df_stock_cap.empty:
        return None
    
    # Filter for Africa
    africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy()
    if not africa_ref_data.empty:
        africa_countries = africa_ref_data['Country or Area'].unique()
        df_stock_cap = df_stock_cap[df_stock_cap['country_or_area'].isin(africa_countries)]
    
    if df_stock_cap.empty:
        return None
    
    # Filter out outliers (>200%)
    outlier_threshold = 200
    outlier_countries = df_stock_cap.groupby('country_or_area')['value'].max()
    outlier_countries = outlier_countries[outlier_countries > outlier_threshold].index.tolist()
    filtered_main = df_stock_cap[~df_stock_cap['country_or_area'].isin(outlier_countries)].copy()
    
    if filtered_main.empty:
        return None
    
    # Calculate regional average
    regional_avg = filtered_main.groupby('year')['value'].mean().reset_index()
    regional_avg.columns = ['year', 'regional_avg']
    
    # Determine y-axis range
    y_max = min(filtered_main['value'].max() * 1.1, 200)
    y_max = max(y_max, 100)
    
    fig = go.Figure()
    
    # Add reference bands
    fig.add_shape(type="rect", xref="paper", yref="y", x0=0, y0=0, x1=1, y1=20,
                  fillcolor="#FFD34E", opacity=0.15, layer="below", line_width=0)
    fig.add_shape(type="rect", xref="paper", yref="y", x0=0, y0=20, x1=1, y1=60,
                  fillcolor="#F26C2B", opacity=0.15, layer="below", line_width=0)
    fig.add_shape(type="rect", xref="paper", yref="y", x0=0, y0=60, x1=1, y1=y_max,
                  fillcolor="#0072BC", opacity=0.15, layer="below", line_width=0)
    
    # Add regional average line
    if not regional_avg.empty:
        fig.add_trace(go.Scatter(
            x=regional_avg['year'],
            y=regional_avg['regional_avg'],
            mode='lines+markers',
            name='Africa (Region Average)',
            line=dict(color='#F26C2B', width=3, dash='dash'),
            marker=dict(color='#F26C2B', size=8),
            hovertemplate="<b>Africa (Region Average)</b><br>Year: %{x}<br>Market Cap (% of GDP): %{y:.2f}%<extra></extra>",
            showlegend=True,
            legendrank=1
        ))
    
    # Show top 10 countries by latest value
    latest_values = filtered_main.groupby('country_or_area')['value'].last().sort_values(ascending=False)
    top_countries = latest_values.head(10).index.tolist()
    
    # Get GDP per capita for tooltips
    gdp_pc_data = df_filtered[df_filtered['indicator_label'] == 'GDP per Capita Constant USD - USD - value'].copy()
    
    for country in top_countries:
        country_data = filtered_main[filtered_main['country_or_area'] == country].sort_values('year')
        if not country_data.empty:
            latest_value = country_data['value'].iloc[-1]
            if latest_value > 60:
                line_color = '#0072BC'
            elif latest_value >= 20:
                line_color = '#F26C2B'
            else:
                line_color = '#FFD34E'
            
            # Merge with GDP per capita
            country_data_merged = country_data.merge(
                gdp_pc_data[['country_or_area', 'year', 'value']],
                on=['country_or_area', 'year'],
                how='left',
                suffixes=('_mcap', '_gdppc')
            )
            
            fig.add_trace(go.Scatter(
                x=country_data_merged['year'],
                y=country_data_merged['value_mcap'],
                mode='lines+markers',
                name=country,
                line=dict(color=line_color, width=2),
                marker=dict(color=line_color, size=4),
                hovertemplate=f"<b>{country}</b><br>Year: %{{x}}<br>Market Cap (% of GDP): %{{y:.2f}}%<br>GDP per Capita: %{{customdata:,.0f}} USD<br><extra></extra>",
                customdata=country_data_merged['value_gdppc'].fillna(0),
                showlegend=True
            ))
    
    fig.update_layout(
        height=700,
        xaxis_title="Year",
        yaxis_title="Market Capitalization (% of GDP)",
        yaxis=dict(range=[0, y_max]),
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
    
    return fig

def render_portfolio_bonds(df_filtered, ref_data):
    """
    Render Portfolio Investment Bonds heatmap - exact same as exploratory view (2_theme_4.py)
    Returns Plotly figure
    """
    import numpy as np
    
    bond_indicator_label = "Portfolio investment, bonds (PPG + PNG) (NFL, current US$)"
    df_bonds = df_filtered[df_filtered['indicator_label'] == bond_indicator_label].copy()
    
    if df_bonds.empty:
        return None
    
    # Calculate % of GDP
    gdp_data = df_filtered[df_filtered['indicator_label'] == 'GDP (current US$)'].copy()
    if not gdp_data.empty:
        df_bonds_merged = df_bonds.merge(
            gdp_data[['country_or_area', 'year', 'value']],
            on=['country_or_area', 'year'],
            how='left',
            suffixes=('_bonds', '_gdp')
        )
        df_bonds_merged['value_pct_gdp'] = (df_bonds_merged['value_bonds'] / df_bonds_merged['value_gdp']) * 100
        df_bonds_merged = df_bonds_merged.dropna(subset=['value_bonds'])
        df_bonds = df_bonds_merged.copy()
    
    # Filter for Africa
    africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy()
    if not africa_ref_data.empty:
        africa_countries = africa_ref_data['Country or Area'].unique()
        df_bonds = df_bonds[df_bonds['country_or_area'].isin(africa_countries)]
    
    if df_bonds.empty:
        return None
    
    # Use normalized heatmap view
    value_col = 'value_pct_gdp'
    filtered_bonds = df_bonds[df_bonds[value_col].notna() & (df_bonds[value_col] >= 0)].copy()
    
    if filtered_bonds.empty:
        return None
    
    # Prepare heatmap data
    heatmap_df = filtered_bonds[['country_or_area', 'year', value_col]].copy()
    heatmap_df['year'] = pd.to_numeric(heatmap_df['year'], errors='coerce')
    heatmap_df = heatmap_df.dropna(subset=['year'])
    heatmap_df = heatmap_df[(heatmap_df['year'] >= 1970) & (heatmap_df['year'] <= 2030)]
    heatmap_df['year'] = heatmap_df['year'].round().astype(int).astype(str)
    heatmap_df[value_col] = pd.to_numeric(heatmap_df[value_col], errors='coerce')
    heatmap_df = heatmap_df.dropna(subset=[value_col])
    heatmap_df = heatmap_df[heatmap_df[value_col] >= 0]
    
    # Cap values above 1% to 1%
    zmax = 1.0
    heatmap_df.loc[heatmap_df[value_col] > zmax, value_col] = zmax
    
    if heatmap_df.empty:
        return None
    
    # Create pivot table
    sorted_countries = heatmap_df.groupby('country_or_area')[value_col].apply(lambda x: (~pd.isna(x)).sum()).sort_values(ascending=False).index.tolist()
    sorted_years = sorted(heatmap_df['year'].unique())
    
    heatmap_pivot = heatmap_df.pivot_table(
        index='country_or_area',
        columns='year',
        values=value_col,
        aggfunc='first'
    )
    
    heatmap_pivot = heatmap_pivot.reindex(sorted_countries)
    heatmap_pivot = heatmap_pivot.reindex(columns=sorted_years)
    
    if heatmap_pivot.empty:
        return None
    
    # Create heatmap
    z_values = heatmap_pivot.values
    z_values = pd.DataFrame(z_values).apply(pd.to_numeric, errors='coerce').values
    
    fig = go.Figure(data=go.Heatmap(
        z=z_values,
        x=heatmap_pivot.columns.tolist(),
        y=heatmap_pivot.index.tolist(),
        colorscale="Blues",
        showscale=True,
        zmin=0.0,
        zmax=zmax,
        xgap=1,
        ygap=1,
        hoverongaps=False,
        hovertemplate="Country: %{y}<br>Year: %{x}<br>Value: %{z:.2f}%<br><extra></extra>",
        colorbar=dict(
            title=dict(text="% of GDP", font=dict(size=11)),
            tickfont=dict(size=10)
        )
    ))
    
    fig.update_layout(
        height=700,
        xaxis_title="Year",
        yaxis_title="Country",
        margin=dict(l=150, r=50, t=20, b=50)
    )
    
    return fig

def render_private_sector_credit(df_filtered, ref_data):
    """
    Render Private Sector Credit to GDP line chart - exact same as exploratory view (2_theme_4.py)
    Returns Plotly figure
    """
    import numpy as np
    
    credit_indicator_label = "Domestic credit provided by financial sector (% of GDP)"
    df_credit = df_filtered[df_filtered['indicator_label'] == credit_indicator_label].copy()
    
    if df_credit.empty:
        return None
    
    # Filter for Africa
    africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy()
    if not africa_ref_data.empty:
        africa_countries = africa_ref_data['Country or Area'].unique()
        df_credit = df_credit[df_credit['country_or_area'].isin(africa_countries)]
    
    if df_credit.empty:
        return None
    
    filtered_credit = df_credit.copy()
    filtered_credit_sorted = filtered_credit.sort_values(['country_or_area', 'year'])
    
    fig = go.Figure()
    
    y_max = max(filtered_credit['value'].max() * 1.1, 200) if not filtered_credit.empty else 200
    
    # Add reference bands
    fig.add_shape(type="rect", xref="paper", yref="y", x0=0, y0=0, x1=1, y1=40,
                  fillcolor="#F26C2B", opacity=0.2, layer="below", line_width=0)
    fig.add_shape(type="rect", xref="paper", yref="y", x0=0, y0=40, x1=1, y1=80,
                  fillcolor="#FFD34E", opacity=0.2, layer="below", line_width=0)
    fig.add_shape(type="rect", xref="paper", yref="y", x0=0, y0=80, x1=1, y1=y_max,
                  fillcolor="#0072BC", opacity=0.2, layer="below", line_width=0)
    
    # Add reference lines
    fig.add_hline(y=40, line_dash="dash", line_color="#F26C2B", line_width=1, opacity=0.5,
                  annotation_text="40%", annotation_position="right", annotation_font_size=9)
    fig.add_hline(y=80, line_dash="dash", line_color="#0072BC", line_width=1, opacity=0.5,
                  annotation_text="80%", annotation_position="right", annotation_font_size=9)
    
    # Calculate change since 2000
    baseline_2000 = filtered_credit_sorted[filtered_credit_sorted['year'] == 2000].set_index('country_or_area')['value']
    filtered_credit_sorted['change_since_2000'] = filtered_credit_sorted.apply(
        lambda row: row['value'] - baseline_2000.get(row['country_or_area'], np.nan) if row['country_or_area'] in baseline_2000.index else np.nan,
        axis=1
    )
    
    # Limit to top 15 countries
    countries_list = sorted(filtered_credit_sorted['country_or_area'].dropna().unique())
    if len(countries_list) > 15:
        latest_values = filtered_credit_sorted.groupby('country_or_area')['value'].last().sort_values(ascending=False)
        countries_list = latest_values.head(15).index.tolist()
    
    for country in countries_list:
        country_data = filtered_credit_sorted[filtered_credit_sorted['country_or_area'] == country].sort_values('year')
        country_data = country_data.dropna(subset=['value'])
        
        if not country_data.empty:
            latest_value = country_data['value'].iloc[-1]
            if latest_value > 80:
                line_color = '#0072BC'
            elif latest_value >= 40:
                line_color = '#FFD34E'
            else:
                line_color = '#F26C2B'
            
            hover_texts = []
            for idx, row in country_data.iterrows():
                change = row.get('change_since_2000', np.nan)
                change_str = f"{change:+.1f}%" if not pd.isna(change) else "N/A"
                hover_text = (
                    f"<b>{country}</b><br>" +
                    f"Year: {int(row['year'])}<br>" +
                    f"Domestic Credit: {row['value']:.2f}% of GDP<br>" +
                    f"Change since 2000: {change_str}<br>" +
                    "<extra></extra>"
                )
                hover_texts.append(hover_text)
            
            fig.add_trace(go.Scatter(
                x=country_data['year'],
                y=country_data['value'],
                mode='lines+markers',
                name=country,
                line=dict(color=line_color, width=2),
                marker=dict(color=line_color, size=4),
                hovertemplate='%{text}',
                text=hover_texts,
                showlegend=True
            ))
    
    fig.update_layout(
        height=700,
        xaxis_title="Year",
        yaxis_title="Domestic Credit Provided by Financial Sector (% of GDP)",
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
    
    return fig

def render_trade_mispricing(df_filtered, ref_data):
    """
    Render Trade Mispricing horizontal bar chart - exact same as exploratory view (2_theme_4.py)
    Returns Plotly figure
    """
    indicator_label = "The Sums of the Value Gaps Identified in Trade Between 134 Developing Countries and all of their Global Trading Partners, 2009–2018 in USD Millions"
    chart_data = df_filtered[df_filtered['indicator_label'] == indicator_label].copy()
    
    if chart_data.empty:
        return None
    
    # Filter for Africa
    africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy()
    if not africa_ref_data.empty:
        africa_countries = africa_ref_data['Country or Area'].unique()
        chart_data = chart_data[chart_data['country_or_area'].isin(africa_countries)]
    
    if chart_data.empty:
        return None
    
    # Get latest year data
    latest_year = chart_data['year'].max()
    year_data = chart_data[chart_data['year'] == latest_year].copy()
    
    if year_data.empty:
        return None
    
    # Sort by value and take top 15
    year_data_sorted = year_data.sort_values('value', ascending=False).head(15)
    
    fig = go.Figure()
    fig.add_trace(go.Bar(
        y=year_data_sorted['country_or_area'],
        x=year_data_sorted['value'],
        orientation='h',
        marker_color='#F26C2B',
        hovertemplate="<b>%{y}</b><br>Year: " + str(int(latest_year)) + "<br>Value: %{x:,.0f} USD Millions<br><extra></extra>"
    ))
    
    fig.update_layout(
        height=700,
        xaxis_title="Value Gap (USD Millions)",
        yaxis_title="Country",
        yaxis=dict(categoryorder='total ascending'),
        hovermode='closest',
        margin=dict(l=150, r=50, t=20, b=50)
    )
    
    return fig

def render_tax_evasion(df_filtered, ref_data):
    """
    Render Tax Evasion grouped bar chart - exact same as exploratory view (2_theme_4.py)
    Returns Plotly figure
    """
    tax_type_indicators = {
        "Active taxpayers on PIT register as percentage of Labor Force": {"color": "#0072BC", "type": "PIT"},
        "On CIT register": {"color": "#00A1A1", "type": "CIT"},
        "On VAT register": {"color": "#F26C2B", "type": "VAT"}
    }
    
    # Filter to only available indicators
    available_tax_indicators = {
        k: v for k, v in tax_type_indicators.items()
        if k in df_filtered['indicator_label'].unique()
    }
    
    if not available_tax_indicators:
        return None
    
    # Get latest year
    chart_data = df_filtered[df_filtered['indicator_label'].isin(available_tax_indicators.keys())].copy()
    latest_year = chart_data['year'].max() if not chart_data.empty else None
    
    if latest_year is None:
        return None
    
    year_data = chart_data[chart_data['year'] == latest_year].copy()
    
    # Filter for Africa
    africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy()
    if not africa_ref_data.empty:
        africa_countries = africa_ref_data['Country or Area'].unique()
        year_data = year_data[year_data['country_or_area'].isin(africa_countries)]
    
    if year_data.empty:
        return None
    
    # Create grouped bar chart
    fig = go.Figure()
    
    countries = sorted(year_data['country_or_area'].unique())
    for tax_label in available_tax_indicators.keys():
        tax_data = year_data[year_data['indicator_label'] == tax_label]
        tax_color = available_tax_indicators[tax_label]["color"]
        
        country_values = []
        for country in countries:
            country_row = tax_data[tax_data['country_or_area'] == country]
            if len(country_row) > 0:
                country_values.append(country_row['value'].values[0])
            else:
                country_values.append(0)
        
        fig.add_trace(go.Bar(
            name=tax_label,
            x=countries,
            y=country_values,
            marker_color=tax_color,
            hovertemplate=f"<b>{tax_label}</b><br>%{{x}}<br>Value: %{{y:.2f}}%<br><extra></extra>"
        ))
    
    fig.update_layout(
        height=700,
        xaxis_title="Country",
        yaxis_title="Percentage",
        barmode='group',
        hovermode='closest',
        legend=dict(orientation="v", yanchor="top", y=1, xanchor="left", x=1.02),
        margin=dict(l=50, r=180, t=20, b=50)
    )
    
    return fig

def render_criminal_activities(df_filtered, ref_data):
    """
    Render Criminal Activities bar chart - exact same as exploratory view (2_theme_4.py)
    Returns Plotly figure
    """
    unodc_indicator_label = "Monetary losses (in USD) to drug sales. Amount of drugs seized in kilograms multiplied by the drug price in kilograms. Excludes all seizures not measured in grams or kilograms."
    
    # Try by label first
    chart_data = df_filtered[df_filtered['indicator_label'] == unodc_indicator_label].copy()
    
    # Try by code if available
    if chart_data.empty and 'indicator_code' in df_filtered.columns:
        chart_data = df_filtered[df_filtered['indicator_code'].astype(str).str.strip() == 'UNODC.DPS.losses'].copy()
    
    if chart_data.empty:
        return None
    
    # Filter for Africa
    africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy()
    if not africa_ref_data.empty:
        africa_countries = africa_ref_data['Country or Area'].unique()
        chart_data = chart_data[chart_data['country_or_area'].isin(africa_countries)]
    
    if chart_data.empty:
        return None
    
    # Get latest year
    latest_year = chart_data['year'].max()
    year_data = chart_data[chart_data['year'] == latest_year].copy()
    
    if year_data.empty:
        return None
    
    # Sort by value and take top 15
    year_data_sorted = year_data.sort_values('value', ascending=False).head(15)
    
    fig = go.Figure()
    fig.add_trace(go.Bar(
        x=year_data_sorted['country_or_area'],
        y=year_data_sorted['value'],
        marker=dict(
            color=year_data_sorted['value'],
            colorscale='Reds',
            showscale=True
        ),
        hovertemplate="<b>%{x}</b><br>Year: " + str(int(latest_year)) + "<br>Value: $%{y:,.0f}<br><extra></extra>"
    ))
    
    fig.update_layout(
        height=700,
        xaxis_title="Country",
        yaxis_title="Value (USD)",
        xaxis={'categoryorder': 'total descending'},
        hovermode='closest',
        margin=dict(l=50, r=50, t=20, b=100)
    )
    
    return fig

def render_control_of_corruption(df_filtered, ref_data):
    """
    Render Control of Corruption bar chart - exact same as exploratory view (2_theme_4.py)
    Returns Plotly figure
    """
    corruption_indicator_label = "Control of Corruption: Estimate"
    chart_data = df_filtered[df_filtered['indicator_label'] == corruption_indicator_label].copy()
    
    if chart_data.empty:
        return None
    
    # Filter for Africa
    africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy()
    if not africa_ref_data.empty:
        africa_countries = africa_ref_data['Country or Area'].unique()
        chart_data = chart_data[chart_data['country_or_area'].isin(africa_countries)]
    
    if chart_data.empty:
        return None
    
    # Get latest year
    latest_year = chart_data['year'].max()
    year_data = chart_data[chart_data['year'] == latest_year].copy()
    
    if year_data.empty:
        return None
    
    # Sort by value (lower is worse for corruption) and take top 20
    year_data_sorted = year_data.sort_values('value', ascending=True).head(20)
    
    fig = go.Figure()
    fig.add_trace(go.Bar(
        x=year_data_sorted['country_or_area'],
        y=year_data_sorted['value'],
        marker=dict(
            color=year_data_sorted['value'],
            colorscale='RdYlGn',
            reversescale=True,
            showscale=True,
            cmin=-2.5,
            cmax=2.5
        ),
        hovertemplate="<b>%{x}</b><br>Year: " + str(int(latest_year)) + "<br>Control of Corruption: %{y:.2f}<br><extra></extra>"
    ))
    
    fig.update_layout(
        height=700,
        xaxis_title="Country",
        yaxis_title="Control of Corruption Score",
        xaxis={'categoryorder': 'total ascending'},
        hovermode='closest',
        margin=dict(l=50, r=50, t=20, b=100)
    )
    
    return fig

def render_financial_secrecy(df_filtered, ref_data):
    """
    Render Financial Secrecy Index line chart - exact same as exploratory view (6_topic_4_4.py)
    Returns Plotly figure
    """
    # Financial Secrecy Index data uses format: fsi_YYYY_value
    fsi_data = df_filtered[df_filtered['indicator_label'].str.startswith('fsi_', na=False) & 
                           df_filtered['indicator_label'].str.endswith('_value', na=False)].copy()
    
    if fsi_data.empty:
        return None
    
    # Extract year from indicator label
    fsi_data['fsi_year'] = fsi_data['indicator_label'].str.extract(r'fsi_(\d{4})_value')[0].astype(float)
    fsi_data = fsi_data.dropna(subset=['fsi_year'])
    
    if fsi_data.empty:
        return None
    
    # Filter for Africa
    africa_ref_data = ref_data[ref_data['Region Name'] == 'Africa'].copy()
    if not africa_ref_data.empty:
        africa_countries = africa_ref_data['Country or Area'].unique()
        fsi_data = fsi_data[fsi_data['country_or_area'].isin(africa_countries)]
    
    if fsi_data.empty:
        return None
    
    # Normalize values to 0-100 per year
    fsi_chart_data = fsi_data.copy()
    for year in fsi_chart_data['fsi_year'].unique():
        year_mask = fsi_chart_data['fsi_year'] == year
        year_values = fsi_chart_data.loc[year_mask, 'value']
        if len(year_values) > 0:
            min_val = year_values.min()
            max_val = year_values.max()
            if max_val > min_val:
                fsi_chart_data.loc[year_mask, 'value'] = ((year_values - min_val) / (max_val - min_val)) * 100
            else:
                fsi_chart_data.loc[year_mask, 'value'] = 50  # Default to middle if all same
    
    fig = go.Figure()
    
    # Add reference bands
    fig.add_shape(type="rect", xref="paper", yref="y", x0=0, y0=0, x1=1, y1=40,
                  fillcolor="#1B75BB", opacity=0.15, layer="below", line_width=0)
    fig.add_shape(type="rect", xref="paper", yref="y", x0=0, y0=40, x1=1, y1=70,
                  fillcolor="#F4B183", opacity=0.15, layer="below", line_width=0)
    fig.add_shape(type="rect", xref="paper", yref="y", x0=0, y0=70, x1=1, y1=100,
                  fillcolor="#E87722", opacity=0.15, layer="below", line_width=0)
    
    # Add reference lines
    fig.add_hline(y=40, line_dash="dash", line_color="#1B75BB", line_width=1, opacity=0.5,
                  annotation_text="40", annotation_position="right", annotation_font_size=9)
    fig.add_hline(y=70, line_dash="dash", line_color="#E87722", line_width=1, opacity=0.5,
                  annotation_text="70", annotation_position="right", annotation_font_size=9)
    
    # Country colors
    country_colors = [
        '#003366', '#0072BC', '#66A7DC', '#1B75BB', '#009D8C', '#7C4DFF',
        '#F26C2B', '#FFD34E', '#B6E1DC', '#A7C6ED', '#B30000', '#007B33'
    ]
    
    countries = sorted(fsi_chart_data['country_or_area'].unique())
    for idx, country in enumerate(countries):
        country_data = fsi_chart_data[fsi_chart_data['country_or_area'] == country].sort_values('fsi_year')
        country_color = country_colors[idx % len(country_colors)]
        
        fig.add_trace(go.Scatter(
            x=country_data['fsi_year'],
            y=country_data['value'],
            mode='lines+markers',
            name=country,
            line=dict(color=country_color, width=2.5),
            marker=dict(size=7, color=country_color),
            hovertemplate=f"<b>{country}</b><br>Year: %{{x}}<br>Normalized Secrecy Score (0-100): %{{y:.1f}}<extra></extra>",
            showlegend=True
        ))
    
    fig.update_layout(
        height=700,
        xaxis_title="Year",
        yaxis_title="Normalized Financial Secrecy Score (0-100)",
        hovermode='closest',
        legend=dict(orientation="v", yanchor="top", y=1, xanchor="left", x=1.02),
        xaxis=dict(tickmode='linear', dtick=2),
        yaxis=dict(range=[0, 100]),
        margin=dict(l=50, r=180, t=20, b=50)
    )
    
    return fig
