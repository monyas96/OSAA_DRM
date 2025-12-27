# Testing Direct Streamlit Graph Embedding

## Overview
This approach embeds Streamlit graphs directly in React policy briefs via iframe, without using the API. Each indicator has its own pre-configured Streamlit page that shows only the graph with title.

## Implemented Indicators (Ready for Testing)

### 1. Indicator 4.4.2.4 - Corruption Losses
- **Page**: `pages/pb_indicator_4_4_2_4.py`
- **Location**: Policy Brief 4.4 → Crisis Section → Graph 1C
- **Graph Type**: Altair bar chart with color gradient
- **URL**: `http://localhost:8501/pb_indicator_4_4_2_4?embed=true&hide_header=true`

### 2. Indicator 4.2.2.1 - Tax Effort
- **Page**: `pages/pb_indicator_4_2_2_1.py`
- **Location**: Policy Brief 4.2 → Evidence Section → Graph 1
- **Graph Type**: Plotly line chart with regional average
- **URL**: `http://localhost:8501/pb_indicator_4_2_2_1?embed=true&hide_header=true`

## How to Test

### Step 1: Start Streamlit
```bash
cd /Users/moneerayassien/theme4/nexus_dashboard_v.2
streamlit run app_streamlit.py
```

### Step 2: Start React App
```bash
cd osaa-drm-app
npm run dev
```

### Step 3: Test the Graphs

#### Test Indicator 4.4.2.4 (Corruption Losses):
1. Navigate to: `http://localhost:3000/policy-brief/4.4`
2. Scroll to "Graph 1C: Corruption Loss Distribution"
3. You should see:
   - Title: "Estimated Annual Corruption Loss"
   - Subtitle: "Indicator 4.4.2.4 - Corruption and Bribery"
   - Bar chart with countries sorted by corruption loss
   - Color gradient (red-yellow-green) matching exploratory view

#### Test Indicator 4.2.2.1 (Tax Effort):
1. Navigate to: `http://localhost:3000/policy-brief/4.2`
2. Scroll to "Indicator 4.2.2.1 – Tax Collection Efficiency Score"
3. You should see:
   - Title: "Tax Effort Over Time"
   - Subtitle: "Indicator 4.2.2.1 - Tax Collection Efficiency Score"
   - Line chart showing tax effort over time
   - Regional average line (dashed orange)
   - Reference line at 1.0 (efficient collection)

### Step 4: Verify Direct Access
You can also test the Streamlit pages directly:
- Corruption Losses: `http://localhost:8501/pb_indicator_4_4_2_4`
- Tax Effort: `http://localhost:8501/pb_indicator_4_2_2_1`

## What to Check

✅ **Graph appears correctly** - Should match exploratory view exactly
✅ **Title and subtitle visible** - Shown in Streamlit page
✅ **No Streamlit UI chrome** - No menu, footer, or header
✅ **Styling matches policy brief** - Colors and fonts match
✅ **Graph is interactive** - Hover tooltips work
✅ **No API dependency** - Works without API server running

## Expected Behavior

- Graphs load in iframe within policy brief
- Title appears above graph (from Streamlit page)
- Graph matches exploratory view exactly
- No filters or controls visible (pre-configured)
- Styling matches policy brief design system

## Troubleshooting

**If graph doesn't load:**
1. Check Streamlit is running: `http://localhost:8501`
2. Check browser console for iframe errors
3. Verify page exists: `ls pages/pb_indicator_*.py`
4. Check Streamlit logs for errors

**If graph looks different from exploratory view:**
1. Compare rendering logic in `pages/pb_graph_helpers.py`
2. Verify same data is being used
3. Check if helper function matches exploratory view code

**If styling doesn't match:**
1. Check CSS in Streamlit page matches policy brief colors
2. Verify font family and sizes
3. Check padding and margins

## Next Steps (After Testing)

Once these 2 indicators work correctly, we can:
1. Implement remaining 14 indicators using the same pattern
2. Add more helper functions to `pb_graph_helpers.py`
3. Update all policy brief sections to use `StreamlitGraphDirectEmbed`

