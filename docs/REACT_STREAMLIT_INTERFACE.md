# React–Streamlit interface

This document describes the contract between the React frontend and the Streamlit dashboard when embedding policy-brief charts in iframes. It applies to the React app in `assets/osaa-drm-app/` and the Streamlit app started with `streamlit run app/home.py`.

## Indicator ID → Streamlit page mapping

The React app maps indicator codes to Streamlit **page names** (filename without `.py`). If you rename or add a Streamlit page, you must update this mapping in React and in this doc.

| Indicator ID | Streamlit page |
|---------------|----------------|
| 4.1.1.1 | `pb_indicator_4_1_1_1` |
| 4.1.2.1 | `pb_indicator_4_1_2_1` |
| 4.2.2.1 | `pb_indicator_4_2_2_1` |
| 4.2.2.2.a | `pb_indicator_4_2_2_2a` |
| 4.2.2.2.b | `pb_indicator_4_2_2_2b` |
| 4.3.1.1 | `pb_indicator_4_3_1_1` |
| 4.3.1.2 | `pb_indicator_4_3_1_2` |
| 4.3.1.3 | `pb_indicator_4_3_1_3` |
| 4.3.2.1 | `pb_indicator_4_3_2_1` |
| 4.3.2.2 | `pb_indicator_4_3_2_2` |
| 4.3.3.1 | `pb_indicator_4_3_3_1` |
| 4.4.2.1 | `pb_indicator_4_4_2_1` |
| 4.4.2.2 | `pb_indicator_4_4_2_2` |
| 4.4.2.3 | `pb_indicator_4_4_2_3` |
| 4.4.2.4 | `pb_indicator_4_4_2_4` |
| 4.4.3.1 | `pb_indicator_4_4_3_1` |
| 4.4.4.1 | `pb_indicator_4_4_4_1` |

If an indicator is not in this map, React falls back to the page `8_graph_embed`.

**Where it is defined:** `assets/osaa-drm-app/src/components/StreamlitGraphDirectEmbed.jsx` — `indicatorPageMap` inside `buildStreamlitUrl()`.

## URL and query parameters

The React app builds the iframe URL as:

```
{STREAMLIT_BASE_URL}/{page}?{query}
```

`STREAMLIT_BASE_URL` comes from the env var `VITE_STREAMLIT_URL` (e.g. `http://localhost:8501` or a Streamlit Cloud URL).

### Query parameters

| Parameter | Values | Meaning |
|-----------|--------|---------|
| `embed` | `true` | Request embedded layout (hides chrome); standard for iframes. |
| `hide_header` | `true` | Ask Streamlit to hide header (used alongside `embed`). |
| `countries` | Comma-separated or single value | Restrict to given countries (if supported by the page). |
| `year` | `latest`, `all`, or a year | Time filter. |
| `year_start` / `year_end` | Year strings | Range when `year` is a range (e.g. `"2015 - 2020"` → `year_start=2015`, `year_end=2020`). |
| `view` | string | View/layout option (if supported by the page). |

Policy-brief pages (`pb_indicator_*`) are preconfigured for Africa and chart-only; they may ignore some of these params. Other Streamlit pages (e.g. exploratory views) may honor them.

## PostMessage protocol (iframe height)

Streamlit policy-brief pages run a small script that measures the chart height and sends it to the parent window so the iframe can be resized.

**Message from Streamlit (child) to React (parent):**

- **Type:** `STREAMLIT_CHART_HEIGHT`
- **Payload:** `{ type: 'STREAMLIT_CHART_HEIGHT', height: <number> }`
- **When:** After the chart (Plotly or Altair) is rendered; and on window resize.
- **Origin:** The Streamlit origin (e.g. `http://localhost:8501`). The parent listens with `window.addEventListener('message', handler)` and uses `event.data.height` (often with extra padding) to set iframe height.

**Where it is implemented:**

- **Streamlit:** Each policy-brief page calls `render_iframe_height_script()` from `app/pages/pb_shared.py`, which injects a script that posts this message. The script detects either `.js-plotly-plot` or `.vega-embed` to get the chart height.
- **React:** `assets/osaa-drm-app/src/components/StreamlitGraphDirectEmbed.jsx` listens for `event.data.type === 'STREAMLIT_CHART_HEIGHT'` and updates `iframeHeight` (e.g. `chartHeight + 20`).

## Adding or changing an indicator

1. **Add or rename the Streamlit page** under `app/pages/` (e.g. `pb_indicator_X_Y_Z_W.py`), using `pb_shared` and the right `render_*` from `pb_graph_helpers`.
2. **Update the mapping** in `StreamlitGraphDirectEmbed.jsx` (`indicatorPageMap`) so the indicator ID points to the new page name.
3. **Update this document** (table and any fallback page) so the contract stays accurate.
