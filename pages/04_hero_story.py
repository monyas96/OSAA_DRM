"""
Design 4: The Hero Story
Full-screen hero sections with background images and narrative flow.
"""
import streamlit as st
import streamlit.components.v1 as components
import sys
from pathlib import Path

# set_page_config MUST be the first Streamlit command
st.set_page_config(
    page_title="DRM Framework - Hero Story",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Add parent directory to path
parent_dir = str(Path(__file__).resolve().parent.parent)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

# Import navigation component
try:
    from app_core.components.navigation import render_navigation_buttons, render_page_logo
    render_page_logo("top-right")
    render_navigation_buttons()
except ImportError:
    pass

# --- Load OSAA CSS ---
try:
    with open("app_core/styles/style_osaa.css") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
except Exception:
    pass

# Hide sidebar completely
st.markdown("""
<style>
    [data-testid="stSidebar"] {
        display: none !important;
    }
    header[data-testid="stHeader"] {
        display: none !important;
    }
</style>
""", unsafe_allow_html=True)

# === Custom Styling ===
st.markdown("""
<style>
    .hero-section {
        position: relative;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 4rem 2rem;
        background: linear-gradient(135deg, rgba(0, 43, 127, 0.85) 0%, rgba(0, 114, 188, 0.85) 100%),
                    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23002B7F" width="1200" height="600"/><path d="M0,300 Q300,200 600,300 T1200,300" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"/></svg>');
        background-size: cover;
        background-position: center;
        color: white;
        position: relative;
        border-radius: 0;
        margin: -1rem -1rem 0 -1rem;
    }
    
    .hero-title {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 1rem;
        text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        color: white;
    }
    
    .hero-subtitle {
        font-size: 1.8rem;
        font-weight: 400;
        margin-bottom: 2rem;
        color: #E87722;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .scroll-indicator {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
        animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-10px); }
    }
    
    .story-section {
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 4rem 2rem;
        background: linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%);
        margin: 2rem 0;
        border-radius: 16px;
    }
    
    .story-section.alt {
        background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);
    }
    
    .story-title {
        font-size: 2.5rem;
        font-weight: 800;
        color: #002B7F;
        margin-bottom: 2rem;
        text-align: center;
    }
    
    .story-content {
        font-size: 1.2rem;
        line-height: 2;
        color: #333;
        max-width: 900px;
        margin: 0 auto;
        text-align: center;
    }
    
    .pillars-minimal {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        margin: 2rem auto;
        max-width: 1000px;
    }
    
    .pillar-mini {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        text-align: center;
        border-top: 4px solid;
    }
    
    .cta-section {
        text-align: center;
        padding: 3rem 2rem;
        background: linear-gradient(135deg, #E87722 0%, #F26C2B 100%);
        border-radius: 16px;
        color: white;
        margin: 2rem 0;
    }
    
    .cta-section h2 {
        color: white;
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .cta-section p {
        color: rgba(255, 255, 255, 0.95);
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }
    
    .hero-logo {
        position: absolute;
        top: 2rem;
        left: 2rem;
        z-index: 1000;
        max-width: 200px;
        max-height: 80px;
    }
    .hero-logo img {
        max-width: 200px;
        max-height: 80px;
        width: auto;
        height: auto;
        display: block;
    }
    @media (max-width: 768px) {
        .hero-logo {
            max-width: 150px;
            max-height: 60px;
            top: 1rem;
            left: 1rem;
        }
        .hero-logo img {
            max-width: 150px;
            max-height: 60px;
        }
    }
</style>
""", unsafe_allow_html=True)


# === Hero 1: Title ===
# Hero section with logo and title
st.markdown("""
<div class="hero-section">
    <div class="hero-logo">
        <img src="logos/OSAA identifier color.png" alt="OSAA Logo" style="max-width: 200px; max-height: 80px;">
    </div>
    <h1 class="hero-title">Evidence Policy Making in Practice</h1>
    <h2 class="hero-subtitle">The Case of DRM</h2>
    <div class="scroll-indicator">Scroll to explore ↓</div>
</div>
""", unsafe_allow_html=True)

st.markdown("---")

# === Hero 2: Context ===
PARAGRAPH_1A = """The era in which development could be financed primarily through external assistance is over. Africa’s long-term transformation can no longer be anchored in ODA expectations; it must rest on the continent’s own capacity to mobilize, manage, and govern domestic resources. Yet today, weak tax systems, inefficient public spending, illicit financial flows, and under-governed natural and financial assets drain an estimated USD 500–600 billion a year from African economies. The real fiscal crisis is not a lack of wealth, but the loss and misallocation of Africa’s own resources.

In a context of tighter global resources and rising social pressures, Domestic Resource Mobilization (DRM) is no longer a narrow technical reform. It is a central macroeconomic strategy for stability, sovereignty, and development impact—about regaining control over economic and financial flows, restoring the social contract, and financing national priorities at scale, from infrastructure and energy to education and social protection.

This is why Africa’s development rests on four interdependent pillars: durable peace, sustainable development, sustainable financing, and strong institutions. Each depends on the others. These pillars form a virtuous, dynamic system of transformation—not sequential steps, but mutually reinforcing conditions."""

PARAGRAPH_1B = """OSAA describes this tension as the Finance Paradox: Africa urgently needs resources to drive growth and meet social goals, yet its fiscal space is continually eroded by leakages and volatile, externally driven flows. When budgets depend on aid, debt, or commodity cycles, governments struggle to plan, protect social spending, or align financing with nationally defined priorities. For a fuller discussion of this paradox, see OSAA’s analysis <a href="https://www.un.org/osaa/content/solving-paradoxes-development-africa-financing-energy-and-food-systems" target="_blank">here</a>."""

PARAGRAPH_1C = """Domestic Resource Mobilization is how countries turn this paradox around. By strengthening tax systems, improving the efficiency and transparency of public spending, deepening domestic capital markets, and curbing illicit financial flows, African states can create predictable fiscal space and reclaim ownership of their policy choices. These are not technocratic tweaks; they are core instruments of state capacity and economic sovereignty.

This platform translates the DRM framework into measurable indicators and actionable evidence, so policy makers can identify leverage points, track performance across the four pillars, and ground decisions in Africa’s own financing reality."""

st.markdown(f"""
<div class="story-section">
    <h2 class="story-title">Africa and African Partners Must Internalize a Fundamental Shift…</h2>
    <div class="story-content">
        <p>{PARAGRAPH_1A.strip()}</p>
        <p style="color: #E87722; font-weight: 600; margin-top: 1rem;">Any strategy that treats them separately will fail.</p>
    </div>
</div>
""", unsafe_allow_html=True)

# Four Pillars Minimal Visualization
pillars_data = [
    {"num": 1, "title": "Durable Peace", "color": "#1B75BB"},
    {"num": 2, "title": "Sustainable Financing", "color": "#0072BC"},
    {"num": 3, "title": "Control Over Flows", "color": "#3B9C9C"},
    {"num": 4, "title": "Strong Institutions", "color": "#264653"}
]

pillars_html = '<div class="pillars-minimal">'
for p in pillars_data:
    pillars_html += f'<div class="pillar-mini" style="border-top-color: {p["color"]};"><div style="font-size: 2rem; font-weight: 800; color: {p["color"]}; margin-bottom: 0.5rem;">{p["num"]}</div><div style="color: #002B7F; font-weight: 600;">{p["title"]}</div></div>'
pillars_html += '</div>'

st.markdown(pillars_html, unsafe_allow_html=True)

st.markdown("---")

# === Hero 3: Problem ===
PARAGRAPH_2 = """As Africa pursues economic transformation, it confronts a profound financing paradox: the urgent need for resources to drive growth collides with massive financial leakages enabled by weakly governed fiscal and financial systems. Each year, Africa loses an estimated USD 500–600 billion through illicit financial flows, inefficient tax systems, poorly negotiated contracts, and misaligned incentives—resources that should be financing development from within. Sustainable development, however, can only be built on sustainable financing. No country can invest consistently in infrastructure, human capital, or institutions using funding that is volatile, externally driven, or short-term. Heavy reliance on aid, debt, and commodity cycles constrains policy space, weakens planning, and disconnects financing from national priorities. (See OSAA's analysis <a href="https://www.un.org/osaa/content/solving-paradoxes-development-africa-financing-energy-and-food-systems" target="_blank">here</a>.)"""

st.markdown(f"""
<div class="story-section alt">
    <h2 class="story-title">The Financing Paradox</h2>
    <div class="story-content">
        <p>{PARAGRAPH_2.strip()}</p>
    </div>
</div>
""", unsafe_allow_html=True)

st.markdown("---")

# === Hero 4: Solution + CTA ===
PARAGRAPH_3 = """Domestic Resource Mobilization is how countries turn this paradox around. By strengthening tax systems, improving the efficiency and transparency of public spending, deepening domestic capital markets, and curbing illicit financial flows, African states can create predictable fiscal space and reclaim ownership of their policy choices. These are not technocratic tweaks; they are core instruments of state capacity and economic sovereignty.

This platform translates the DRM framework into measurable indicators and actionable evidence, so policy makers can identify leverage points, track performance across the four pillars, and ground decisions in Africa’s own financing reality."""

st.markdown(f"""
<div class="story-section">
    <h2 class="story-title">The DRM as the Game Changer...</h2>
    <div class="story-content">
        <p>{PARAGRAPH_3.strip()}</p>
    </div>
</div>
""", unsafe_allow_html=True)

# CTA Button
col1, col2, col3 = st.columns([1, 1, 1])
with col2:
    if st.button("→ Explore the Framework", type="primary", use_container_width=True):
        st.switch_page("pages/2_theme_4.py")

