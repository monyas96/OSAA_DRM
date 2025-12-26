#!/bin/bash
# Script to start Streamlit with the correct entry point for React integration

cd /Users/moneerayassien/theme4/nexus_dashboard_v.2

echo "Starting Streamlit..."
echo "Default page: Theme 4 (pages/2_theme_4.py)"
echo "Supports query parameter navigation: ?topic=4.1, ?topic=4.2, etc."
echo ""
echo "Streamlit will be available at: http://localhost:8501"
echo ""

streamlit run app_streamlit.py

