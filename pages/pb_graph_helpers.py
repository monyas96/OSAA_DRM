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
        height=500  # Increased height for better visibility
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
    
    # Update layout - full width responsive
    fig.update_layout(
        height=500,  # Increased height
        autosize=True,  # Make responsive
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

