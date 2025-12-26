# Migration Guide: Streamlit to React

This guide explains how to migrate the Streamlit graph and filter logic to React, based on the extraction from `universal_viz.py`.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Data Loading Migration](#data-loading-migration)
3. [Filter Components Migration](#filter-components-migration)
4. [Data Filtering Logic Migration](#data-filtering-logic-migration)
5. [Graph Components Migration](#graph-components-migration)
6. [State Management](#state-management)
7. [Complete React Implementation Example](#complete-react-implementation-example)

---

## Architecture Overview

### Streamlit Flow
```
Load Data → Create Filters (Sidebar) → Filter Data → Create Graph → Display
```

### React Flow
```
Load Data (useEffect) → Filter Components (State) → Filter Data (useMemo) → Graph Component (Props) → Render
```

**Key Differences:**
- **Streamlit:** Imperative, widget-based, reactive by default
- **React:** Declarative, component-based, requires explicit state management

---

## Data Loading Migration

### Streamlit (Python)
```python
ref_data = uv.load_country_reference_data()
df_main = uv.load_main_data()
```

### React (JavaScript)
```javascript
// In a React component or custom hook
import { useState, useEffect } from 'react';
import { loadReferenceData, loadMainData } from './services/dataService';

function useData() {
  const [refData, setRefData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [ref, main] = await Promise.all([
          loadReferenceData(),  // API call or local JSON
          loadMainData()        // API call or local JSON
        ]);
        setRefData(ref);
        setMainData(main);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { refData, mainData, loading, error };
}
```

**Data Service Example:**
```javascript
// services/dataService.js
const API_BASE_URL = 'http://localhost:8000/api';

export const loadReferenceData = async () => {
  const response = await fetch(`${API_BASE_URL}/data/reference`);
  const result = await response.json();
  return result.data || [];
};

export const loadMainData = async () => {
  const response = await fetch(`${API_BASE_URL}/data/main`);
  const result = await response.json();
  return result.data || [];
};
```

---

## Filter Components Migration

### Streamlit Filter Widgets

```python
# Sidebar widgets
selected_region = st.sidebar.selectbox("Select Region", regions)
selected_countries = st.sidebar.multiselect("Select Countries", countries)
start_year, end_year = st.sidebar.slider("Select Year Range", min, max, (min, max))
```

### React Filter Components

```javascript
// components/Filters.jsx
import React from 'react';
import { Select, MultiSelect, RangeSlider } from './ui'; // Or use a UI library

function Filters({ refData, mainData, onFilterChange }) {
  const [selectedRegion, setSelectedRegion] = useState('Africa');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [yearRange, setYearRange] = useState([2010, 2020]);

  // Get regions from refData
  const regions = React.useMemo(() => {
    if (!refData || refData.length === 0) return [];
    return [...new Set(refData.map(r => r['Region Name']))]
      .filter(Boolean)
      .sort();
  }, [refData]);

  // Get countries in selected region
  const countriesInRegion = React.useMemo(() => {
    if (!refData || !selectedRegion) return [];
    return refData
      .filter(r => r['Region Name'] === selectedRegion)
      .map(r => r['Country or Area'])
      .filter(Boolean)
      .sort();
  }, [refData, selectedRegion]);

  // Get year range from mainData
  const yearBounds = React.useMemo(() => {
    if (!mainData || mainData.length === 0) return [1960, 2024];
    const years = mainData.map(d => d.year).filter(Boolean);
    return [Math.min(...years), Math.max(...years)];
  }, [mainData]);

  // Notify parent when filters change
  useEffect(() => {
    onFilterChange({
      selectedRegion,
      selectedCountries,
      yearRange
    });
  }, [selectedRegion, selectedCountries, yearRange, onFilterChange]);

  return (
    <div className="filters-panel">
      {/* Region Selector */}
      <div className="filter-group">
        <label>Select Region</label>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* Country Multi-Select */}
      <div className="filter-group">
        <label>Select Countries / Regional Average</label>
        <select
          multiple
          size={5}
          value={selectedCountries}
          onChange={(e) => {
            const selected = Array.from(
              e.target.selectedOptions,
              option => option.value
            );
            setSelectedCountries(selected);
          }}
        >
          {countriesInRegion.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
          <option value={`${selectedRegion} (Region Average)`}>
            {selectedRegion} (Region Average)
          </option>
        </select>
      </div>

      {/* Year Range Slider */}
      <div className="filter-group">
        <label>Select Year Range: {yearRange[0]} - {yearRange[1]}</label>
        <input
          type="range"
          min={yearBounds[0]}
          max={yearBounds[1]}
          value={yearRange[0]}
          onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
        />
        <input
          type="range"
          min={yearBounds[0]}
          max={yearBounds[1]}
          value={yearRange[1]}
          onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
        />
      </div>
    </div>
  );
}

export default Filters;
```

**Alternative: Using a UI Library (e.g., Material-UI, Ant Design)**
```javascript
import { Select, Slider } from 'antd';

// Region Selector
<Select
  value={selectedRegion}
  onChange={setSelectedRegion}
  options={regions.map(r => ({ label: r, value: r }))}
/>

// Country Multi-Select
<Select
  mode="multiple"
  value={selectedCountries}
  onChange={setSelectedCountries}
  options={countriesInRegion.map(c => ({ label: c, value: c }))}
/>

// Year Range Slider
<Slider
  range
  min={yearBounds[0]}
  max={yearBounds[1]}
  value={yearRange}
  onChange={setYearRange}
/>
```

---

## Data Filtering Logic Migration

### Streamlit Filter Function

```python
@st.cache_data
def filter_dataframe_by_selections(df, filters, ref_data):
    # Year filtering
    # Country filtering
    # Regional aggregation
    return filtered_df
```

### React Filter Hook

```javascript
// hooks/useFilteredData.js
import { useMemo } from 'react';

function useFilteredData(mainData, filters, refData) {
  const filteredData = useMemo(() => {
    if (!mainData || mainData.length === 0) return [];
    if (!filters) return mainData;

    let result = [...mainData];

    // 1. FILTER BY YEAR RANGE
    const [startYear, endYear] = filters.yearRange || [null, null];
    if (startYear !== null && endYear !== null) {
      result = result.filter(
        d => d.year >= startYear && d.year <= endYear
      );
    }

    // 2. SEPARATE INDIVIDUAL COUNTRIES FROM REGIONAL AGGREGATES
    const selectedCountries = filters.selectedCountries || [];
    const individualCountries = selectedCountries.filter(
      c => !c.endsWith(' (Region Average)')
    );
    const regionAggregateLabels = selectedCountries.filter(
      c => c.endsWith(' (Region Average)')
    );

    const results = [];

    // 3. PROCESS INDIVIDUAL COUNTRIES
    if (individualCountries.length > 0) {
      const individualData = result.filter(d =>
        individualCountries.includes(d.country_or_area)
      );
      if (individualData.length > 0) {
        results.push(...individualData);
      }
    }

    // 4. PROCESS REGIONAL AGGREGATES
    if (regionAggregateLabels.length > 0 && refData) {
      regionAggregateLabels.forEach(regionLabel => {
        const regionName = regionLabel.replace(' (Region Average)', '');
        
        // Get countries in this region
        const countriesInRegion = refData
          .filter(r => r['Region Name'] === regionName)
          .map(r => r['Country or Area'])
          .filter(Boolean);

        // Filter data for this region
        const regionData = result.filter(d =>
          countriesInRegion.includes(d.country_or_area)
        );

        if (regionData.length > 0) {
          // Calculate mean by year and indicator
          const grouped = regionData.reduce((acc, d) => {
            const key = `${d.year}_${d.indicator_label}`;
            if (!acc[key]) {
              acc[key] = { year: d.year, indicator_label: d.indicator_label, values: [] };
            }
            acc[key].values.push(d.value);
            return acc;
          }, {});

          // Create aggregated data
          const aggregated = Object.values(grouped).map(group => ({
            ...group,
            value: group.values.reduce((a, b) => a + b, 0) / group.values.length,
            country_or_area: regionLabel
          }));

          results.push(...aggregated);
        }
      });
    }

    // 5. RETURN RESULTS (or all data if no filters applied)
    if (results.length > 0) {
      return results;
    } else if (individualCountries.length === 0 && regionAggregateLabels.length === 0) {
      // No country filter applied, return year-filtered data
      return result;
    } else {
      return [];
    }
  }, [mainData, filters, refData]);

  return filteredData;
}

export default useFilteredData;
```

---

## Graph Components Migration

### 1. PEFA Heatmap Migration

#### Streamlit (Python/Plotly)
```python
fig = uv.create_pefa_heatmap(
    data=indicator_data,
    x_column='year',
    y_column='country_or_area',
    value_column='value',
    reference_data=ref_data
)
st.plotly_chart(fig, use_container_width=True)
```

#### React (JavaScript/Recharts or Plotly)
```javascript
// components/charts/PefaHeatmap.jsx
import React, { useMemo } from 'react';
import { convertToPefaScore, getPefaLetter, getPefaColor } from '../../utils/pefaUtils';

function PefaHeatmap({ 
  data, 
  refData, 
  xColumn = 'year',
  yColumn = 'country_or_area',
  valueColumn = 'value',
  intermediateRegionFilter = null,
  height = 600 
}) {
  // 1. Filter to African countries
  const africaData = useMemo(() => {
    if (!data || !refData) return [];
    
    const africaRef = refData.filter(r => r['Region Name'] === 'Africa');
    const africaCountries = africaRef.map(r => r['Country or Area']);
    
    let filtered = data.filter(d => africaCountries.includes(d[yColumn]));
    
    // Filter by intermediate region if provided
    if (intermediateRegionFilter && intermediateRegionFilter.length > 0) {
      const regionCountries = africaRef
        .filter(r => intermediateRegionFilter.includes(r['Intermediate Region Name']))
        .map(r => r['Country or Area']);
      filtered = filtered.filter(d => regionCountries.includes(d[yColumn]));
    }
    
    return filtered;
  }, [data, refData, yColumn, intermediateRegionFilter]);

  // 2. Convert values to PEFA scores
  const processedData = useMemo(() => {
    return africaData.map(row => {
      const score = convertToPefaScore(row[valueColumn]);
      return {
        ...row,
        pefa_score: score,
        pefa_letter: getPefaLetter(score)
      };
    }).filter(row => row.pefa_score !== null);
  }, [africaData, valueColumn]);

  // 3. Sort by intermediate region
  const sortedData = useMemo(() => {
    if (!refData) return processedData;
    
    const africaRef = refData.filter(r => r['Region Name'] === 'Africa');
    const countryRegionMap = new Map(
      africaRef.map(r => [r['Country or Area'], r['Intermediate Region Name']])
    );
    
    return [...processedData].sort((a, b) => {
      const regionA = countryRegionMap.get(a[yColumn]) || '';
      const regionB = countryRegionMap.get(b[yColumn]) || '';
      if (regionA !== regionB) return regionA.localeCompare(regionB);
      return a[yColumn].localeCompare(b[yColumn]);
    });
  }, [processedData, refData, yColumn]);

  // 4. Create pivot table (country x year -> pefa_score)
  const heatmapData = useMemo(() => {
    const countries = [...new Set(sortedData.map(d => d[yColumn]))];
    const years = [...new Set(sortedData.map(d => d[xColumn]))].sort((a, b) => a - b);
    
    const pivot = {};
    sortedData.forEach(row => {
      const key = `${row[yColumn]}_${row[xColumn]}`;
      pivot[key] = {
        country: row[yColumn],
        year: row[xColumn],
        score: row.pefa_score,
        letter: row.pefa_letter,
        value: row[valueColumn]
      };
    });
    
    return countries.map(country => {
      const row = { country };
      years.forEach(year => {
        const key = `${country}_${year}`;
        row[year] = pivot[key]?.score || null;
        row[`${year}_meta`] = pivot[key] || null;
      });
      return row;
    });
  }, [sortedData, xColumn, yColumn]);

  // 5. Render as HTML table (or use a charting library)
  return (
    <div className="pefa-heatmap">
      <table className="heatmap-table">
        <thead>
          <tr>
            <th className="sticky-header">Country</th>
            {[...new Set(sortedData.map(d => d[xColumn]))]
              .sort((a, b) => a - b)
              .map(year => (
                <th key={year}>{year}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {heatmapData.map((row, idx) => (
            <tr key={idx}>
              <td className="sticky-cell">{row.country}</td>
              {[...new Set(sortedData.map(d => d[xColumn]))]
                .sort((a, b) => a - b)
                .map(year => {
                  const score = row[year];
                  const meta = row[`${year}_meta`];
                  const color = score !== null ? getPefaColor(score) : '#f3f4f6';
                  const letter = meta?.letter || '';
                  
                  return (
                    <td
                      key={year}
                      style={{ backgroundColor: color }}
                      title={meta ? `${row.country} - ${year}: ${meta.letter} (${meta.value?.toFixed(1)}%)` : ''}
                    >
                      {letter}
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Legend */}
      <div className="legend">
        {[4, 3, 2, 1].map(score => (
          <div key={score} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: getPefaColor(score) }}
            />
            <span>{getPefaLetter(score)} ({score})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PefaHeatmap;
```

**PEFA Utility Functions:**
```javascript
// utils/pefaUtils.js
export const convertToPefaScore = (percent) => {
  if (percent === null || percent === undefined || isNaN(percent)) {
    return null;
  }
  
  // Check if already a score (1-4)
  if (percent >= 1 && percent <= 4 && Number.isInteger(percent)) {
    return Math.round(percent);
  }
  
  // Convert percentage to score
  if (95 <= percent && percent <= 105) return 4; // A
  if (90 <= percent && percent <= 110) return 3; // B
  if (85 <= percent && percent <= 115) return 2; // C
  return 1; // D
};

export const getPefaLetter = (score) => {
  const map = { 4: 'A', 3: 'B', 2: 'C', 1: 'D' };
  return map[score] || '';
};

export const getPefaColor = (score) => {
  const map = {
    4: '#003366',  // A - Deep Blue
    3: '#3366CC',  // B - Medium Blue
    2: '#99CCFF',  // C - Light Blue
    1: '#F26C2B'   // D - Orange
  };
  return map[score] || '#f3f4f6';
};
```

### 2. Bar Chart Migration

#### Streamlit
```python
fig = uv.create_bar_chart(data, x_column='country', y_column='value', orientation='h')
```

#### React (Recharts)
```javascript
// components/charts/BarChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function BarChartComponent({ 
  data, 
  xColumn, 
  yColumn, 
  colorColumn,
  orientation = 'vertical',
  height = 400 
}) {
  // Process data
  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // For country-based charts, show latest year
    if (xColumn === 'country_or_area' && data.some(d => d.year)) {
      const latestYear = Math.max(...data.map(d => d.year));
      return data
        .filter(d => d.year === latestYear)
        .sort((a, b) => b[yColumn] - a[yColumn]);
    }
    
    return data;
  }, [data, xColumn, yColumn]);

  if (chartData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={chartData}
        layout={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={orientation === 'horizontal' ? yColumn : xColumn}
          type={orientation === 'horizontal' ? 'number' : 'category'}
        />
        <YAxis 
          dataKey={orientation === 'horizontal' ? xColumn : yColumn}
          type={orientation === 'horizontal' ? 'category' : 'number'}
        />
        <Tooltip />
        <Bar 
          dataKey={orientation === 'horizontal' ? xColumn : yColumn}
          fill="#8884d8"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
```

### 3. Line Chart Migration

#### React (Recharts)
```javascript
// components/charts/LineChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LineChartComponent({ 
  data, 
  xColumn, 
  yColumn, 
  colorColumn,
  height = 400 
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xColumn} />
        <YAxis />
        <Tooltip />
        <Legend />
        {colorColumn ? (
          // Multiple lines (one per color value)
          [...new Set(data.map(d => d[colorColumn]))].map((colorValue, idx) => (
            <Line
              key={colorValue}
              type="monotone"
              dataKey={yColumn}
              data={data.filter(d => d[colorColumn] === colorValue)}
              name={colorValue}
              stroke={`hsl(${idx * 60}, 70%, 50%)`}
            />
          ))
        ) : (
          <Line type="monotone" dataKey={yColumn} stroke="#8884d8" />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;
```

---

## State Management

### Streamlit (Session State)
```python
# Automatic state management via widgets
selected_region = st.sidebar.selectbox(...)  # State stored automatically
```

### React (useState/useReducer)
```javascript
// Option 1: useState (Simple)
const [filters, setFilters] = useState({
  selectedRegion: 'Africa',
  selectedCountries: [],
  yearRange: [2010, 2020]
});

// Option 2: useReducer (Complex)
const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REGION':
      return { ...state, selectedRegion: action.payload };
    case 'SET_COUNTRIES':
      return { ...state, selectedCountries: action.payload };
    case 'SET_YEAR_RANGE':
      return { ...state, yearRange: action.payload };
    default:
      return state;
  }
};

const [filters, dispatch] = useReducer(filterReducer, {
  selectedRegion: 'Africa',
  selectedCountries: [],
  yearRange: [2010, 2020]
});

// Usage
dispatch({ type: 'SET_REGION', payload: 'Asia' });
```

---

## Complete React Implementation Example

```javascript
// pages/TopicPage.jsx
import React, { useState, useEffect } from 'react';
import Filters from '../components/Filters';
import PefaHeatmap from '../components/charts/PefaHeatmap';
import useData from '../hooks/useData';
import useFilteredData from '../hooks/useFilteredData';

function TopicPage() {
  // 1. Load data
  const { refData, mainData, loading, error } = useData();
  
  // 2. Filter state
  const [filters, setFilters] = useState({
    selectedRegion: 'Africa',
    selectedCountries: [],
    yearRange: [2010, 2020]
  });
  
  // 3. Filter data
  const filteredData = useFilteredData(mainData, filters, refData);
  
  // 4. Filter for specific indicator
  const indicatorLabel = "PEFA: PI-1 Aggregate expenditure out-turn";
  const indicatorData = React.useMemo(() => {
    return filteredData.filter(d => d.indicator_label === indicatorLabel);
  }, [filteredData, indicatorLabel]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="topic-page">
      <h1>Topic 4.1: Public Expenditures</h1>
      
      {/* Filters Sidebar */}
      <aside className="filters-sidebar">
        <Filters
          refData={refData}
          mainData={mainData}
          onFilterChange={setFilters}
        />
      </aside>
      
      {/* Main Content */}
      <main className="main-content">
        <PefaHeatmap
          data={indicatorData}
          refData={refData}
          xColumn="year"
          yColumn="country_or_area"
          valueColumn="value"
          height={600}
        />
      </main>
    </div>
  );
}

export default TopicPage;
```

---

## Key Migration Patterns

### 1. Widget → Component
- `st.selectbox` → `<select>` or `<Select>` component
- `st.multiselect` → `<select multiple>` or `<MultiSelect>` component
- `st.slider` → `<input type="range">` or `<Slider>` component

### 2. Function → Hook
- `@st.cache_data` → `useMemo` or `useCallback`
- Filter functions → Custom hooks (`useFilteredData`)

### 3. Graph → Component
- Plotly figures → React components using Recharts or react-plotly.js
- `st.plotly_chart()` → `<ResponsiveContainer>` with chart component

### 4. State Management
- Streamlit session state → React `useState` or `useReducer`
- Widget values → Component state or props

### 5. Data Processing
- Pandas operations → JavaScript array methods (`filter`, `map`, `reduce`)
- DataFrame operations → `useMemo` for computed values

---

## Performance Optimization

### 1. Memoization
```javascript
// Use useMemo for expensive computations
const processedData = useMemo(() => {
  return data.map(/* expensive operation */);
}, [data]);

// Use useCallback for stable function references
const handleFilterChange = useCallback((newFilters) => {
  setFilters(newFilters);
}, []);
```

### 2. Virtualization (for large lists)
```javascript
import { FixedSizeList } from 'react-window';

// For long country lists
<FixedSizeList
  height={400}
  itemCount={countries.length}
  itemSize={35}
>
  {({ index, style }) => (
    <div style={style}>{countries[index]}</div>
  )}
</FixedSizeList>
```

### 3. Code Splitting
```javascript
// Lazy load heavy components
const PefaHeatmap = React.lazy(() => import('./components/charts/PefaHeatmap'));

<Suspense fallback={<div>Loading chart...</div>}>
  <PefaHeatmap data={data} />
</Suspense>
```

---

## Testing Considerations

### 1. Unit Tests
- Test filter logic functions
- Test data transformation functions
- Test PEFA score conversion

### 2. Integration Tests
- Test filter → data → graph flow
- Test API data loading

### 3. Visual Regression Tests
- Compare React charts with Streamlit charts
- Ensure color mappings match

---

## Next Steps

1. **Create React components** for each graph type
2. **Implement filter components** matching Streamlit UI
3. **Set up API endpoints** or local data loading
4. **Add state management** for filters
5. **Implement data filtering logic** in JavaScript
6. **Style components** to match design system
7. **Add error handling** and loading states
8. **Optimize performance** with memoization
9. **Test thoroughly** against Streamlit version
10. **Deploy** React app

---

## Resources

- **Recharts:** https://recharts.org/
- **react-plotly.js:** https://plotly.com/javascript/react/
- **React Hooks:** https://react.dev/reference/react
- **Data Transformation:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

