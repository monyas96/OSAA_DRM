"""
Navigation Tooltip Component for Streamlit
Extends the existing tooltip system to provide navigation guidance
"""
import streamlit as st

def render_navigation_help_button(page_type="main"):
    """
    Renders a navigation help button with tooltip, similar to "How to Read This Graph" buttons.
    
    Args:
        page_type: Type of page - "main", "topic", "indicator" to show relevant navigation tips
    """
    
    # Define navigation tips based on page type (plain text, no HTML)
    navigation_tips = {
        "main": "Navigation Guide:\n\n• Sidebar Filters: Use dropdowns to select countries, regions, and years\n• View Tabs: Switch between Graph, Map, and Data Table views\n• Topic Navigation: Click topic cards (4.1, 4.2, 4.3, 4.4) to explore specific indicators\n• Back Button: Use '← Back to Theme 4' at the top to return to main dashboard\n• Info Icons: Hover over ℹ️ icons for detailed explanations\n• Expanders: Click to see definitions, methodology, and additional information",
        "topic": "Topic Page Navigation:\n\n• Back to Theme 4: Click the button at the top to return to the main dashboard\n• Sidebar: Use sidebar links to navigate to other topics or views\n• Indicators: Scroll down to explore all indicators in this topic\n• Filters: Each indicator has its own filters for country, region, and year\n• View Tabs: Switch between Graph, Map, and Data Table for each indicator\n• How to Read: Click 'How to Read This Graph' buttons for guidance\n• Learn More: Expand sections below graphs for detailed information",
        "indicator": "Indicator Navigation:\n\n• Filters: Select countries, regions, and years from dropdown menus\n• View Tabs: Switch between Graph, Map, and Data Table views\n• How to Read: Hover over 'How to Read This Graph' for interpretation guide\n• Info Icons: Hover over ℹ️ icons for quick definitions\n• Expanders: Click to see full definitions, methodology, and proxy justifications\n• Back Navigation: Use browser back button or sidebar to return"
    }
    
    tip_content = navigation_tips.get(page_type, navigation_tips["main"])
    # Escape quotes and newlines for HTML attribute
    tip_content_escaped = tip_content.replace('"', '&quot;').replace('\n', '<br>')
    
    st.markdown(f"""
    <div style="display: flex; align-items: center; margin-bottom: 1rem; margin-top: 0.5rem;">
        <button type="button" class="nav-help-btn" data-tooltip="{tip_content_escaped}" 
                style="background: none; border: 1px solid #0072BC; cursor: help; font-size: 0.9em; color: #0072BC; padding: 0.5rem 1rem; border-radius: 6px; transition: all 0.3s ease; font-weight: 500;">
            🧭 Navigation Help <span style="font-size: 0.8em;">ℹ️</span>
        </button>
    </div>
    <style>
        .nav-help-btn {{
            position: relative;
        }}
        .nav-help-btn:hover {{
            background-color: #0072BC !important;
            color: white !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 114, 188, 0.3);
        }}
        .nav-help-btn::after {{
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            white-space: normal;
            width: 400px;
            max-width: 90vw;
            font-size: 0.9em;
            line-height: 1.6;
            z-index: 1000;
            box-shadow: 0 4px 16px rgba(0,0,0,0.3);
            margin-bottom: 12px;
            text-align: left;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }}
        .nav-help-btn:hover::after {{
            opacity: 1;
        }}
        .nav-help-btn::before {{
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 8px solid transparent;
            border-top-color: #333;
            margin-bottom: 4px;
            z-index: 1001;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }}
        .nav-help-btn:hover::before {{
            opacity: 1;
        }}
    </style>
    """, unsafe_allow_html=True)


def render_quick_nav_tips():
    """
    Renders quick navigation tips as a collapsible section at the top of the page.
    """
    with st.expander("🧭 Quick Navigation Tips", expanded=False):
        st.markdown("""
        **How to Navigate:**
        - **Filters:** Use sidebar dropdowns to select countries, regions, and years
        - **Views:** Switch between Graph, Map, and Data Table tabs
        - **Topics:** Click topic cards or use sidebar to explore different topics
        - **Back:** Use "← Back to Theme 4" button or browser back button
        - **Help:** Hover over ℹ️ icons for quick explanations
        - **Details:** Expand sections below graphs for full information
        """)


def render_navigation_guide_floating():
    """
    Renders a floating navigation guide button in the bottom right corner.
    Similar style to the React tour button but for Streamlit.
    """
    st.markdown("""
    <style>
        .floating-nav-help {{
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999;
            background: #0072BC;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0, 114, 188, 0.3);
            transition: all 0.3s ease;
        }}
        .floating-nav-help:hover {{
            background: #005a9e;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 114, 188, 0.4);
        }}
        .nav-guide-modal {{
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            justify-content: center;
            align-items: center;
        }}
        .nav-guide-content {{
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }}
        .nav-guide-content h3 {{
            margin-top: 0;
            color: #0072BC;
        }}
        .nav-guide-content ul {{
            line-height: 1.8;
        }}
        .close-nav-guide {{
            float: right;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }}
    </style>
    
    <button class="floating-nav-help" onclick="showNavGuide()">🧭 Navigation Help</button>
    
    <div id="navGuideModal" class="nav-guide-modal" onclick="closeNavGuide(event)">
        <div class="nav-guide-content" onclick="event.stopPropagation()">
            <button class="close-nav-guide" onclick="closeNavGuide(event)">×</button>
            <h3>Navigation Guide</h3>
            <ul>
                <li><strong>Sidebar Filters:</strong> Select countries, regions, and years</li>
                <li><strong>View Tabs:</strong> Switch between Graph, Map, and Data Table</li>
                <li><strong>Topic Navigation:</strong> Click topic cards or use sidebar</li>
                <li><strong>Back Button:</strong> Use "← Back to Theme 4" at the top</li>
                <li><strong>Info Icons:</strong> Hover over ℹ️ for explanations</li>
                <li><strong>Expanders:</strong> Click to see detailed information</li>
                <li><strong>How to Read:</strong> Click buttons for graph interpretation</li>
            </ul>
        </div>
    </div>
    
    <script>
        function showNavGuide() {{
            document.getElementById('navGuideModal').style.display = 'flex';
        }}
        function closeNavGuide(event) {{
            document.getElementById('navGuideModal').style.display = 'none';
        }}
    </script>
    """, unsafe_allow_html=True)

