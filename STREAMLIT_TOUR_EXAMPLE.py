"""
Example: How to add a navigation tour to a Streamlit page

This shows how to integrate the tour component into your Streamlit pages.
"""
import streamlit as st
from app_core.components.streamlit_tour import render_tour_button, add_tour_step_attributes

# Add tour step attributes helper (call this early in your page)
add_tour_step_attributes()

# Define tour steps for this page
tour_steps = [
    {
        "element": "h1",  # Target the main heading
        "intro": "Welcome! This is the main page title. Scroll down to explore the dashboard.",
        "position": "bottom"
    },
    {
        "element": ".stSelectbox",  # Target selectbox filters
        "intro": "Use these filters to select countries, regions, and years. The data will update automatically.",
        "position": "right"
    },
    {
        "element": ".stTabs",  # Target tabs
        "intro": "Switch between Graph, Map, and Data Table views using these tabs.",
        "position": "bottom"
    },
    {
        "element": "button[data-tooltip]",  # Target info buttons
        "intro": "Hover over the info icon (ℹ️) to see detailed explanations about each indicator.",
        "position": "left"
    },
    {
        "element": ".streamlit-expanderHeader",  # Target expanders
        "intro": "Click these expanders to see detailed information about indicators, definitions, and methodology.",
        "position": "bottom"
    }
]

# Render the tour button (floating button in bottom right)
render_tour_button(tour_steps, tour_id="main-dashboard-tour")

# Your regular Streamlit content here
st.title("Theme 4: Domestic Resource Mobilization")

# Example filters
country = st.selectbox("Select Country", ["All", "Nigeria", "South Africa", "Kenya"])

# Example tabs
tab1, tab2, tab3 = st.tabs(["Graph View", "Map View", "Data Table"])

with tab1:
    st.write("Graph content here")

with tab2:
    st.write("Map content here")

with tab3:
    st.write("Data table content here")

