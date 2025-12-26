"""
Streamlit Tour Component
Provides a guided tour/navigation system for Streamlit pages using intro.js
"""
import streamlit as st
import streamlit.components.v1 as components

def render_tour_button(steps_config, tour_id="streamlit-tour"):
    """
    Renders a "Take Tour" button that starts a guided tour of the Streamlit page.
    
    Args:
        steps_config: List of dicts with tour step configuration:
            [
                {
                    "element": "#element-id",  # CSS selector for target element
                    "intro": "Step description text",
                    "position": "bottom"  # Optional: top, bottom, left, right, auto
                },
                ...
            ]
        tour_id: Unique identifier for this tour instance
    """
    
    # Convert steps to JavaScript array
    steps_js = ",\n        ".join([
        f'{{element: "{step["element"]}", intro: "{step["intro"]}", position: "{step.get("position", "auto")}"}}'
        for step in steps_config
    ])
    
    tour_html = f"""
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intro.js@7.2.0/introjs.min.css">
    <script src="https://cdn.jsdelivr.net/npm/intro.js@7.2.0/intro.min.js"></script>
    
    <style>
        .tour-button {{
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            background: #0072BC;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0, 114, 188, 0.3);
            transition: all 0.3s ease;
        }}
        .tour-button:hover {{
            background: #005a9e;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 114, 188, 0.4);
        }}
        .introjs-tooltip {{
            max-width: 400px;
        }}
        .introjs-tooltipReferenceLayer {{
            z-index: 999999 !important;
        }}
    </style>
    
    <button class="tour-button" id="{tour_id}-btn" onclick="startTour_{tour_id}()">
        🎯 Take Tour
    </button>
    
    <script>
        function startTour_{tour_id}() {{
            const steps = [
                {steps_js}
            ];
            
            // Filter out steps where element doesn't exist
            const validSteps = steps.filter(step => {{
                const element = document.querySelector(step.element);
                return element !== null;
            }});
            
            if (validSteps.length === 0) {{
                alert("No tour elements found on this page.");
                return;
            }}
            
            introJs().setOptions({{
                steps: validSteps,
                showProgress: true,
                showBullets: true,
                exitOnOverlayClick: true,
                exitOnEsc: true,
                nextLabel: 'Next →',
                prevLabel: '← Back',
                skipLabel: 'Skip',
                doneLabel: 'Done',
                tooltipPosition: 'auto',
                scrollToElement: true,
                scrollPadding: 100
            }}).start();
        }}
        
        // Auto-start tour if query parameter is set
        if (window.location.search.includes('tour=true')) {{
            setTimeout(() => {{
                startTour_{tour_id}();
            }}, 1000);
        }}
    </script>
    """
    
    components.html(tour_html, height=0)


def add_tour_step_attributes():
    """
    Adds data attributes to Streamlit elements for tour targeting.
    Call this at the start of your Streamlit page.
    """
    st.markdown("""
    <script>
        // Wait for Streamlit to render
        function addTourAttributes() {
            // Add data attributes to common Streamlit elements
            const elements = document.querySelectorAll('.stButton button, .stSelectbox, .stSlider, .stTabs [role="tab"]');
            elements.forEach((el, index) => {
                if (!el.hasAttribute('data-tour-step')) {
                    el.setAttribute('data-tour-step', `step-${index}`);
                }
            });
        }
        
        // Run after page loads
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addTourAttributes);
        } else {
            addTourAttributes();
        }
        
        // Also run after Streamlit reruns
        const observer = new MutationObserver(addTourAttributes);
        observer.observe(document.body, { childList: true, subtree: true });
    </script>
    """, unsafe_allow_html=True)

