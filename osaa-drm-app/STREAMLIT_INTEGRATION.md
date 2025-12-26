# Streamlit Integration Guide

## Overview

The React landing page now integrates with your Streamlit dashboard. When users click "Explore the Framework", they navigate to embedded Streamlit pages within the React app.

## How It Works

1. **React Landing Page** (`/`) - Beautiful interactive landing page
2. **Streamlit Pages** (`/streamlit/:page`) - Embedded Streamlit dashboards

## Routes

- `/` - Landing page (React)
- `/streamlit/theme-4` - Main Theme 4 page (Exploratory View)
- `/streamlit/topic-4-1` - Topic 4.1: Public Expenditures
- `/streamlit/topic-4-2` - Topic 4.2: Budget and Tax Revenues
- `/streamlit/topic-4-3` - Topic 4.3: Capital Markets
- `/streamlit/topic-4-4` - Topic 4.4: Illicit Financial Flows

## Running Both Apps

### 1. Start Streamlit (Terminal 1)

**IMPORTANT: Use `app_streamlit.py` for React integration**

```bash
cd /Users/moneerayassien/theme4/nexus_dashboard_v.2
streamlit run app_streamlit.py
```

Streamlit will run on **http://localhost:8501**

**Why `app_streamlit.py`?**
- `app.py` runs the prototype switcher as the main page, which can interfere with direct page routing
- `app_streamlit.py` allows direct access to pages like `/2_theme_4` (Theme 4: Domestic Resource Mobilization)
- This ensures the React app navigates directly to Theme 4, not the prototype switcher

**If you use `app.py` instead:**
- The React app might redirect to the prototype switcher page
- Direct page access may not work correctly

### 2. Start React App (Terminal 2)
```bash
cd /Users/moneerayassien/theme4/nexus_dashboard_v.2/osaa-drm-app
npm run dev
```
React will run on **http://localhost:3000**

## Navigation Flow

1. User visits **http://localhost:3000** (React landing page)
2. User scrolls through the interactive sections
3. User clicks **"Explore the Framework"** button
4. React navigates to `/streamlit/theme-4`
5. StreamlitEmbed component loads the Streamlit page in an iframe
6. User can navigate within Streamlit or click "Back to Landing Page"

## Configuration

The Streamlit routes are mapped in `src/components/StreamlitEmbed.jsx`:

```javascript
const streamlitRoutes = {
  'theme-4': '2_theme_4',
  'topic-4-1': '3_topic_4_1',
  'topic-4-2': '4_topic_4_2',
  'topic-4-3': '5_topic_4_3',
  'topic-4-4': '6_topic_4_4',
}
```

## Troubleshooting

### Streamlit page not loading?
- Make sure Streamlit is running on port 8501
- Check the browser console for CORS errors
- Verify the Streamlit route name matches the file name

### Iframe connection issues?
- Ensure both apps are running simultaneously
- Check that Streamlit allows iframe embedding (default: yes)
- Verify the URL format: `http://localhost:8501/{page_name}`

## Future Enhancements

- Add direct links to topics from the Four Pillars section
- Implement two-way communication between React and Streamlit
- Add loading states and error handling
- Create a unified navigation bar

