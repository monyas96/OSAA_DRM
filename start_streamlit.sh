#!/bin/bash
# Script to start Streamlit with the correct entry point for React integration

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "Starting Streamlit..."
echo "Default page: Theme 4 (app/pages/2_theme_4.py)"
echo "Supports query parameter navigation: ?topic=4.1, ?topic=4.2, etc."
echo ""
echo "Streamlit will be available at: http://localhost:8501"
echo ""

streamlit run app/home.py

