"""
FastAPI backend to serve data for React dashboard
This allows React to access Streamlit data without iframe embedding
"""
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import sys
import json
import numpy as np
import traceback
import os
from pathlib import Path

# Add parent directory to path
parent_dir = str(Path(__file__).resolve().parent)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

# Import data loading modules
try:
    import universal_viz as uv
    DATA_AVAILABLE = True
except ImportError:
    DATA_AVAILABLE = False
    print("Warning: universal_viz not available")

app = FastAPI(title="DRM Dashboard API")

# Enable CORS for React app
# Get allowed origins from environment variable or use defaults
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "")
if allowed_origins_env:
    # Parse comma-separated list from environment variable
    allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",")]
else:
    # Default origins for development
    allowed_origins = [
        "http://localhost:5173",  # Vite default
        "http://localhost:3000",  # Vite custom port
        "http://localhost:3001",  # React app port
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "*"  # Allow all origins for development (remove in production)
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache data in memory
_cached_main_data = None
_cached_ref_data = None

def get_main_data():
    """Load and cache main data"""
    global _cached_main_data
    if _cached_main_data is None:
        try:
            # Load data directly (bypass Streamlit cache decorator)
            file_path = Path(__file__).parent / "data" / "nexus.parquet"
            if file_path.exists():
                _cached_main_data = pd.read_parquet(file_path)
                if _cached_main_data is not None and not _cached_main_data.empty:
                    print(f"✓ Loaded main data: {len(_cached_main_data)} rows")
                else:
                    print("⚠️  Main data is empty or None")
            else:
                print(f"❌ Data file not found: {file_path}")
                _cached_main_data = pd.DataFrame()
        except Exception as e:
            print(f"❌ Error loading main data: {e}")
            import traceback
            traceback.print_exc()
            _cached_main_data = pd.DataFrame()
    return _cached_main_data

def get_ref_data():
    """Load and cache reference data"""
    global _cached_ref_data
    if _cached_ref_data is None:
        try:
            # Load data directly from CSV (bypass Streamlit cache decorator)
            file_path = Path(__file__).parent / "data" / "iso3_country_reference.csv"
            if file_path.exists():
                _cached_ref_data = pd.read_csv(file_path)
                # Ensure essential columns exist
                required_ref_cols = ['Region Name', 'Country or Area', 'iso3']
                missing_cols = [col for col in required_ref_cols if col not in _cached_ref_data.columns]
                if missing_cols:
                    print(f"⚠️  Reference data missing columns: {missing_cols}")
                # Fill missing regions if necessary
                if 'Region Name' in _cached_ref_data.columns:
                    _cached_ref_data['Region Name'] = _cached_ref_data['Region Name'].fillna('Unknown')
                if _cached_ref_data is not None and not _cached_ref_data.empty:
                    print(f"✓ Loaded reference data: {len(_cached_ref_data)} rows")
                else:
                    print("⚠️  Reference data is empty or None")
            else:
                print(f"❌ Reference data file not found: {file_path}")
                _cached_ref_data = pd.DataFrame()
        except Exception as e:
            print(f"❌ Error loading reference data: {e}")
            import traceback
            traceback.print_exc()
            _cached_ref_data = pd.DataFrame()
    return _cached_ref_data

# Custom JSON encoder to handle numpy types and NaN/Infinity
class CustomJsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (np.integer, np.int64)):
            return int(obj)
        elif isinstance(obj, (np.floating, np.float64)):
            if np.isnan(obj) or np.isinf(obj):
                return None
            return float(obj)
        elif isinstance(obj, pd.Timestamp):
            return obj.isoformat()
        elif pd.isna(obj):  # Catch any remaining pandas NaNs
            return None
        return super(CustomJsonEncoder, self).default(obj)

@app.get("/")
def root():
    return {
        "message": "DRM Dashboard API", 
        "status": "running",
        "endpoints": {
            "main_data": "/api/data/main",
            "reference_data": "/api/data/reference",
            "indicator_data": "/api/data/indicator?indicator_label=...",
            "pension_fund_data": "/api/data/pension-funds?countries=...",
            "indicators_list": "/api/indicators/list",
            "countries_list": "/api/countries/list",
            "years_list": "/api/years/list"
        }
    }

@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    main_data = get_main_data()
    ref_data = get_ref_data()
    return {
        "status": "healthy",
        "main_data_available": main_data is not None and not main_data.empty,
        "main_data_rows": len(main_data) if main_data is not None and not main_data.empty else 0,
        "reference_data_available": ref_data is not None and not ref_data.empty,
        "reference_data_rows": len(ref_data) if ref_data is not None and not ref_data.empty else 0
    }

@app.get("/api/data/main")
def get_main_data_endpoint():
    """Get main dataset"""
    df = get_main_data()
    if df is None or df.empty:
        return JSONResponse(
            status_code=503,
            content={"error": "Data not available"}
        )
    
    # Replace NaN, Infinity, and other non-JSON values
    df_clean = df.copy()
    df_clean = df_clean.replace([float('inf'), float('-inf')], None)
    df_clean = df_clean.where(pd.notnull(df_clean), None)
    
    # Convert to JSON-serializable format
    try:
        data_dict = df_clean.to_dict('records')
        return {
            "data": data_dict,
            "columns": list(df.columns),
            "row_count": len(df)
        }
    except (ValueError, TypeError) as e:
        print(f"Error converting to JSON: {e}")
        # Fallback: convert problematic columns to string
        for col in df_clean.select_dtypes(include=['float64', 'float32']).columns:
            df_clean[col] = df_clean[col].astype(object).where(pd.notnull(df_clean[col]), None)
        data_dict = df_clean.to_dict('records')
        return {
            "data": data_dict,
            "columns": list(df.columns),
            "row_count": len(df)
        }

@app.get("/api/data/reference")
def get_reference_data_endpoint():
    """Get reference data (countries, regions)"""
    df = get_ref_data()
    if df is None or df.empty:
        return JSONResponse(
            status_code=503,
            content={"error": "Reference data not available"}
        )
    
    try:
        # Build the response row by row to avoid JSON serialization issues
        cleaned_data = []
        
        for idx, row in df.iterrows():
            cleaned_row = {}
            for col in df.columns:
                value = row[col]
                
                # Handle NaN and None
                if pd.isna(value) or value is None:
                    cleaned_row[col] = None
                # Handle numpy integer types
                elif isinstance(value, (np.integer, np.int64, np.int32, np.int16, np.int8)):
                    cleaned_row[col] = int(value)
                # Handle numpy float types
                elif isinstance(value, (np.floating, np.float64, np.float32, np.float16)):
                    if np.isinf(value) or np.isnan(value):
                        cleaned_row[col] = None
                    else:
                        try:
                            float_val = float(value)
                            if abs(float_val) > 1e308:
                                cleaned_row[col] = None
                            else:
                                cleaned_row[col] = float_val
                        except (OverflowError, ValueError):
                            cleaned_row[col] = None
                # Handle Python float
                elif isinstance(value, float):
                    if abs(value) > 1e308 or value != value:  # NaN or inf check
                        cleaned_row[col] = None
                    else:
                        cleaned_row[col] = value
                # Handle pandas Timestamp
                elif isinstance(value, pd.Timestamp):
                    cleaned_row[col] = value.isoformat()
                # Handle other types (strings, etc.)
                else:
                    cleaned_row[col] = value
            
            cleaned_data.append(cleaned_row)
        
        return JSONResponse(
            content={
                "data": cleaned_data,
                "columns": list(df.columns),
                "row_count": len(df)
            }
        )
    except (ValueError, TypeError) as e:
        print(f"Error converting reference data to JSON: {e}")
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"error": f"Internal server error during JSON serialization: {e}"}
        )

@app.get("/api/data/indicator")
def get_indicator_data(
    indicator_label: str = Query(..., description="Indicator label to filter"),
    countries: str = Query(None, description="Comma-separated country names"),
    regions: str = Query(None, description="Comma-separated region names"),
    year_start: int = Query(None, description="Start year"),
    year_end: int = Query(None, description="End year")
):
    """Get filtered data for a specific indicator
    
    Default behavior: If no countries or regions are specified, filters to Africa only.
    This matches the Streamlit app's default behavior where all topics show Africa-only data.
    """
    df_main = get_main_data()
    df_ref = get_ref_data()
    
    if df_main is None or df_main.empty:
        return JSONResponse(
            status_code=503,
            content={"error": "Main data not available"}
        )
    
    # Filter by indicator
    indicator_data = df_main[df_main['indicator_label'] == indicator_label].copy()
    
    if indicator_data.empty:
        # Try case-insensitive match as fallback
        indicator_data = df_main[df_main['indicator_label'].str.contains(indicator_label, case=False, na=False)].copy()
        if indicator_data.empty:
            # Try partial match - split by common separators and match core words
            core_words = indicator_label.replace('(', '').replace(')', '').replace('/', '').split()
            if len(core_words) >= 2:
                pattern = '|'.join(core_words[:2])  # Match first two significant words
                indicator_data = df_main[df_main['indicator_label'].str.contains(pattern, case=False, na=False, regex=True)].copy()
            if indicator_data.empty:
                return {
                    "data": [],
                    "message": f"No data found for indicator: {indicator_label}",
                    "indicator_label": indicator_label,
                    "row_count": 0
                }
    
    # Default to Africa filtering if no countries or regions specified
    # This matches Streamlit behavior where all topics default to Africa-only
    if not countries and not regions and df_ref is not None and not df_ref.empty:
        # Get all African countries as default filter
        africa_countries = df_ref[df_ref['Region Name'] == 'Africa']['Country or Area'].dropna().unique()
        indicator_data = indicator_data[indicator_data['country_or_area'].isin(africa_countries)]
    
    # Apply explicit filters if provided
    if countries:
        country_list = [c.strip() for c in countries.split(',')]
        indicator_data = indicator_data[indicator_data['country_or_area'].isin(country_list)]
    
    if year_start:
        indicator_data = indicator_data[indicator_data['year'] >= year_start]
    
    if year_end:
        indicator_data = indicator_data[indicator_data['year'] <= year_end]
    
    # Filter by regions if provided (this overrides the default Africa filter)
    if regions and df_ref is not None and not df_ref.empty:
        region_list = [r.strip() for r in regions.split(',')]
        # Check if filtering by Intermediate Region Name (for Africa sub-regions) or Region Name
        if 'Intermediate Region Name' in df_ref.columns:
            # Filter by Intermediate Region Name (e.g., "Eastern Africa", "Western Africa")
            region_countries = df_ref[
                (df_ref['Intermediate Region Name'].isin(region_list)) |
                (df_ref['Region Name'].isin(region_list))  # Fallback to Region Name if needed
            ]['Country or Area'].unique()
        else:
            # Fallback to Region Name only
            region_countries = df_ref[df_ref['Region Name'].isin(region_list)]['Country or Area'].unique()
        indicator_data = indicator_data[indicator_data['country_or_area'].isin(region_countries)]
    
    # Replace NaN, Infinity, and other non-JSON values
    # Build the response row by row to avoid JSON serialization issues
    cleaned_data = []
    
    for idx, row in indicator_data.iterrows():
        cleaned_row = {}
        for col in indicator_data.columns:
            value = row[col]
            
            # Handle NaN and None
            if pd.isna(value) or value is None:
                cleaned_row[col] = None
            # Handle numpy integer types
            elif isinstance(value, (np.integer, np.int64, np.int32, np.int16, np.int8)):
                cleaned_row[col] = int(value)
            # Handle numpy float types
            elif isinstance(value, (np.floating, np.float64, np.float32, np.float16)):
                if np.isinf(value) or np.isnan(value):
                    cleaned_row[col] = None
                else:
                    try:
                        # Check if value is within JSON range
                        float_val = float(value)
                        if abs(float_val) > 1e308:
                            cleaned_row[col] = None
                        else:
                            cleaned_row[col] = float_val
                    except (OverflowError, ValueError):
                        cleaned_row[col] = None
            # Handle Python float
            elif isinstance(value, float):
                if abs(value) > 1e308 or value != value:  # NaN or inf check
                    cleaned_row[col] = None
                else:
                    cleaned_row[col] = value
            # Handle other types (strings, etc.)
            else:
                cleaned_row[col] = value
        
        cleaned_data.append(cleaned_row)
    
    return {
        "data": cleaned_data,
        "indicator_label": indicator_label,
        "row_count": len(indicator_data)
    }

@app.get("/api/indicators/list")
def list_indicators():
    """Get list of all available indicators"""
    df = get_main_data()
    if df is None or df.empty:
        return {"indicators": []}
    
    indicators = df['indicator_label'].dropna().unique().tolist()
    return {
        "indicators": sorted(indicators),
        "count": len(indicators)
    }

@app.get("/api/countries/list")
def list_countries():
    """Get list of all countries"""
    df = get_main_data()
    if df is None or df.empty:
        return {"countries": []}
    
    countries = df['country_or_area'].dropna().unique().tolist()
    return {
        "countries": sorted(countries),
        "count": len(countries)
    }

@app.get("/api/data/pension-funds")
def get_pension_fund_data(
    countries: str = Query(None, description="Comma-separated country names")
):
    """Get pension fund asset allocation data from CSV file"""
    try:
        file_path = Path(__file__).parent / "data" / "Pension_Fund_Asset_Allocation_by_Country.csv"
        if not file_path.exists():
            return JSONResponse(
                status_code=404,
                content={"error": "Pension fund data file not found"}
            )
        
        df_pension = pd.read_csv(file_path)
        
        # Filter by countries if provided
        if countries:
            country_list = [c.strip() for c in countries.split(',')]
            country_col = 'Country or Area' if 'Country or Area' in df_pension.columns else 'Country'
            if country_col in df_pension.columns:
                df_pension = df_pension[df_pension[country_col].isin(country_list)]
        
        # Asset class columns (exact names from CSV)
        asset_cols = [
            'Domestic_Equities (%)',
            'Domestic_Bonds (%)',
            'Real_Estate (%)',
            'Private_Equity (%)',
            'Cash & Deposits (%)',
            'Foreign_Assets (%)'
        ]
        
        # Check which columns exist
        available_cols = [col for col in asset_cols if col in df_pension.columns]
        if not available_cols:
            # Fallback: try to find any column containing these keywords
            for col in df_pension.columns:
                if any(keyword in col for keyword in ['Domestic_Equities', 'Domestic_Bonds', 'Real_Estate', 'Private_Equity', 'Cash', 'Foreign_Assets']):
                    if col not in available_cols:
                        available_cols.append(col)
        country_col = 'Country or Area' if 'Country or Area' in df_pension.columns else 'Country'
        
        if not available_cols or country_col not in df_pension.columns:
            return JSONResponse(
                status_code=500,
                content={"error": "Required columns not found in pension fund data"}
            )
        
        # Build response data - one row per country with asset class percentages
        cleaned_data = []
        for idx, row in df_pension.iterrows():
            country_name = row[country_col]
            if pd.isna(country_name):
                continue
            
            country_data = {
                "country": str(country_name),
                "country_or_area": str(country_name)
            }
            
            # Add each asset class percentage
            for col in available_cols:
                value = row[col]
                # Create key: "Domestic_Equities (%)" -> "domestic_equities"
                # Handle "Cash & Deposits (%)" -> "cash_deposits"
                key = col.replace(' (%)', '').replace(' & ', '_').replace('&', '').replace(' ', '_').lower()
                if pd.isna(value) or value is None:
                    country_data[key] = 0
                else:
                    try:
                        float_val = float(value)
                        if np.isinf(float_val) or np.isnan(float_val):
                            country_data[key] = 0
                        else:
                            country_data[key] = float_val
                    except (ValueError, TypeError):
                        country_data[key] = 0
            
            cleaned_data.append(country_data)
        
        return {
            "data": cleaned_data,
            "asset_classes": [col.replace(' (%)', '') for col in available_cols],
            "row_count": len(cleaned_data)
        }
    except Exception as e:
        print(f"Error loading pension fund data: {e}")
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"error": f"Error loading pension fund data: {str(e)}"}
        )

@app.get("/api/years/list")
def list_years():
    """Get list of all available years"""
    df = get_main_data()
    if df is None or df.empty:
        return {"years": []}
    
    years = sorted(df['year'].dropna().unique().tolist())
    return {
        "years": years,
        "min_year": int(years[0]) if years else None,
        "max_year": int(years[-1]) if years else None
    }

if __name__ == "__main__":
    import uvicorn
    
    print("=" * 60)
    print("Starting DRM Dashboard API server...")
    print("=" * 60)
    
    # Pre-load data to check if it's available
    if DATA_AVAILABLE:
        print("\nLoading data...")
        main_data = get_main_data()
        ref_data = get_ref_data()
        
        if main_data is not None and not main_data.empty:
            print(f"✓ Main data ready: {len(main_data)} rows, {main_data['indicator_label'].nunique()} unique indicators")
        else:
            print("⚠️  Main data not available - check data/nexus.parquet exists")
        
        if ref_data is not None and not ref_data.empty:
            print(f"✓ Reference data ready: {len(ref_data)} rows")
        else:
            print("⚠️  Reference data not available")
    else:
        print("⚠️  universal_viz module not available - API will not have data")
        print("   Make sure universal_viz.py exists in the project root")
    
    print("\n" + "=" * 60)
    print("API Server Starting...")
    print("=" * 60)
    print("📍 API URL: http://localhost:8000")
    print("📚 API Docs: http://localhost:8000/docs")
    print("🏥 Health Check: http://localhost:8000/api/health")
    print("=" * 60)
    print("\nServer is running. Press Ctrl+C to stop.\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000)

