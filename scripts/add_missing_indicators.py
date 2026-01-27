"""
Script to add missing indicators to nexus.parquet:
1. TJN FSI (Financial Secrecy Index) data
2. Tax Effort, Capacity, and Gap (calculated via SFA)
3. Tax Buoyancy (calculated via log-log regression)

This script should be run separately and the results saved to nexus.parquet.
"""

import pandas as pd
import numpy as np
from pathlib import Path
import sys
from scipy import stats
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import warnings
warnings.filterwarnings('ignore')

# Try to import SFA packages
HAS_SFA = False
SFA_MODULE = None

try:
    # Try pysfa (recommended package)
    from pysfa import SFA
    HAS_SFA = True
    SFA_MODULE = 'pysfa'
except ImportError:
    try:
        # Try pyStoNED (alternative)
        from pyStoNED import StoNED
        HAS_SFA = True
        SFA_MODULE = 'pyStoNED'
    except ImportError:
        try:
            # Try frontier package
            import frontier
            HAS_SFA = True
            SFA_MODULE = 'frontier'
        except ImportError:
            HAS_SFA = False
            print("⚠️  SFA package not found. Install with:")
            print("   pip install pysfa")
            print("   Will use simplified OLS as fallback.")

# Add parent directory to path for imports
parent_dir = str(Path(__file__).resolve().parent)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

try:
    import universal_viz as uv
except ImportError:
    print("Warning: universal_viz not available. Some functions may not work.")

def load_grd_data(grd_file="data/UNUWIDER_GRD.xlsx"):
    """
    Load and transform UNUWIDER GRD data from Excel to long format.
    Adds tax_ex_sc and tax_inc_sc indicators to nexus.parquet.
    """
    print(f"\n[1/7] Loading GRD data from {grd_file}...")
    
    try:
        # Read Excel file - try to detect sheet names
        excel_file = pd.ExcelFile(grd_file)
        sheet_names = excel_file.sheet_names
        print(f"✓ Found {len(sheet_names)} sheets: {sheet_names}")
        
        # Load the main data sheet - prefer 'Merged' sheet for GRD
        main_sheet = None
        for sheet in sheet_names:
            if 'merged' in sheet.lower():
                main_sheet = sheet
                break
        
        if main_sheet is None:
            # Try other common names
            for sheet in sheet_names:
                if 'data' in sheet.lower() or 'general' in sheet.lower() or sheet == 'Sheet1':
                    main_sheet = sheet
                    break
        
        if main_sheet is None:
            main_sheet = sheet_names[0]
        
        print(f"  Loading sheet: '{main_sheet}'")
        df_grd = pd.read_excel(grd_file, sheet_name=main_sheet)
        print(f"✓ Loaded {len(df_grd)} rows from sheet '{main_sheet}'")
        print(f"  Columns: {list(df_grd.columns)[:15]}...")
        
        # Load reference data to match country names
        ref_data = pd.DataFrame()
        try:
            if 'uv' in sys.modules:
                ref_data = uv.load_country_reference_data()
            else:
                ref_file = Path("data/iso3_country_reference.csv")
                if ref_file.exists():
                    ref_data = pd.read_csv(ref_file)
        except:
            pass
        
        # Identify key columns (tax_ex_sc, tax_inc_sc, country, year)
        # Common column names in GRD:
        country_cols = [c for c in df_grd.columns if any(x in c.lower() for x in ['country', 'iso3', 'iso_alpha3', 'countryname', 'country_name', 'countrycode'])]
        year_cols = [c for c in df_grd.columns if 'year' in c.lower() or c.lower() == 'year']
        # Look for tax columns - GRD may have "Taxes" as total, need to check structure
        # tax_ex_sc = Taxes excluding social contributions
        # tax_inc_sc = Taxes including social contributions  
        tax_ex_cols = [c for c in df_grd.columns if 'tax_ex_sc' in c.lower() or 
                      ('tax' in c.lower() and 'ex' in c.lower() and 'sc' in c.lower()) or
                      (c.lower() == 'taxes' and 'social' not in str(df_grd.columns).lower())]
        tax_inc_cols = [c for c in df_grd.columns if 'tax_inc_sc' in c.lower() or 
                       ('tax' in c.lower() and 'inc' in c.lower() and 'sc' in c.lower())]
        
        # If not found, check if "Taxes" column exists and use it
        if not tax_ex_cols and 'Taxes' in df_grd.columns:
            # Check if there's a separate social contributions column
            if 'Social Contributions' in df_grd.columns:
                # tax_ex_sc = Taxes (excluding SC)
                tax_ex_cols = ['Taxes']
            else:
                # Use Taxes as tax_ex_sc (assuming it excludes SC)
                tax_ex_cols = ['Taxes']
        
        # tax_inc_sc = Taxes + Social Contributions
        if not tax_inc_cols and 'Taxes' in df_grd.columns and 'Social Contributions' in df_grd.columns:
            # Will calculate as Taxes + Social Contributions
            tax_inc_cols = ['Taxes']  # Will add SC later
        
        # Also check for iso3 column
        iso3_cols = [c for c in df_grd.columns if 'iso3' in c.lower() or 'iso_alpha3' in c.lower() or c.lower() == 'iso3']
        
        print(f"  Detected columns:")
        print(f"    Country: {country_cols[0] if country_cols else 'NOT FOUND'}")
        print(f"    ISO3: {iso3_cols[0] if iso3_cols else 'NOT FOUND'}")
        print(f"    Year: {year_cols[0] if year_cols else 'NOT FOUND'}")
        print(f"    tax_ex_sc: {tax_ex_cols[0] if tax_ex_cols else 'NOT FOUND'}")
        print(f"    tax_inc_sc: {tax_inc_cols[0] if tax_inc_cols else 'NOT FOUND'}")
        
        if not country_cols or not year_cols:
            print("⚠️  Cannot identify country/year columns.")
            print(f"   Available columns: {list(df_grd.columns)[:20]}")
            return pd.DataFrame()
        
        country_col = country_cols[0]
        year_col = year_cols[0]
        iso3_col = iso3_cols[0] if iso3_cols else None
        
        # Transform to long format
        grd_records = []
        
        # Process tax_ex_sc (Taxes excluding Social Contributions)
        if tax_ex_cols:
            for col in tax_ex_cols:
                cols_to_use = [country_col, year_col, col]
                if iso3_col:
                    cols_to_use.append(iso3_col)
                
                subset = df_grd[cols_to_use].copy()
                subset = subset.rename(columns={col: 'value', country_col: 'country_or_area', year_col: 'year'})
                if iso3_col:
                    subset = subset.rename(columns={iso3_col: 'iso3'})
                subset['indicator_label'] = 'Tax Revenue Excluding Social Contributions (% of GDP) - GRD'
                subset = subset[subset['value'].notna()]
                
                # Add iso3 if not already present
                if 'iso3' not in subset.columns:
                    if not ref_data.empty:
                        # Try different possible column names
                        iso_col = None
                        country_col_ref = None
                        for col in ref_data.columns:
                            if 'iso' in col.lower() and '3' in col.lower():
                                iso_col = col
                            if 'country' in col.lower() and 'area' in col.lower():
                                country_col_ref = col
                        
                        if iso_col and country_col_ref:
                            subset = subset.merge(
                                ref_data[[country_col_ref, iso_col]],
                                left_on='country_or_area',
                                right_on=country_col_ref,
                                how='left'
                            )
                            subset['iso3'] = subset[iso_col]
                        else:
                            subset['iso3'] = None
                    else:
                        subset['iso3'] = None
                
                grd_records.append(subset[['indicator_label', 'country_or_area', 'year', 'value', 'iso3']])
        
        # Process tax_inc_sc (Taxes including Social Contributions)
        if tax_inc_cols or ('Taxes' in df_grd.columns and 'Social Contributions' in df_grd.columns):
            # If we have both Taxes and Social Contributions, calculate tax_inc_sc
            if 'Taxes' in df_grd.columns and 'Social Contributions' in df_grd.columns:
                cols_to_use = [country_col, year_col, 'Taxes', 'Social Contributions']
                if iso3_col:
                    cols_to_use.append(iso3_col)
                
                subset = df_grd[cols_to_use].copy()
                subset = subset.rename(columns={country_col: 'country_or_area', year_col: 'year'})
                if iso3_col:
                    subset = subset.rename(columns={iso3_col: 'iso3'})
                
                # Calculate tax_inc_sc = Taxes + Social Contributions
                # Convert to numeric, handling any string values
                subset['Taxes'] = pd.to_numeric(subset['Taxes'], errors='coerce').fillna(0)
                subset['Social Contributions'] = pd.to_numeric(subset['Social Contributions'], errors='coerce').fillna(0)
                subset['value'] = subset['Taxes'] + subset['Social Contributions']
                subset['indicator_label'] = 'Tax Revenue Including Social Contributions (% of GDP) - GRD'
                subset = subset[subset['value'].notna() & (subset['value'] > 0)]
                
                # Add iso3 if not already present
                if 'iso3' not in subset.columns:
                    if not ref_data.empty:
                        # Try different possible column names
                        iso_col = None
                        country_col_ref = None
                        for col in ref_data.columns:
                            if 'iso' in col.lower() and '3' in col.lower():
                                iso_col = col
                            if 'country' in col.lower() and 'area' in col.lower():
                                country_col_ref = col
                        
                        if iso_col and country_col_ref:
                            subset = subset.merge(
                                ref_data[[country_col_ref, iso_col]],
                                left_on='country_or_area',
                                right_on=country_col_ref,
                                how='left'
                            )
                            subset['iso3'] = subset[iso_col]
                        else:
                            subset['iso3'] = None
                    else:
                        subset['iso3'] = None
                
                grd_records.append(subset[['indicator_label', 'country_or_area', 'year', 'value', 'iso3']])
            else:
                # Use direct tax_inc_sc column if available
                for col in tax_inc_cols:
                    cols_to_use = [country_col, year_col, col]
                    if iso3_col:
                        cols_to_use.append(iso3_col)
                    
                    subset = df_grd[cols_to_use].copy()
                    subset = subset.rename(columns={col: 'value', country_col: 'country_or_area', year_col: 'year'})
                    if iso3_col:
                        subset = subset.rename(columns={iso3_col: 'iso3'})
                    subset['indicator_label'] = 'Tax Revenue Including Social Contributions (% of GDP) - GRD'
                    subset = subset[subset['value'].notna()]
                    
                    # Add iso3 if not already present
                    if 'iso3' not in subset.columns:
                        if not ref_data.empty:
                            # Try different possible column names
                            iso_col = None
                            country_col_ref = None
                            for col in ref_data.columns:
                                if 'iso' in col.lower() and '3' in col.lower():
                                    iso_col = col
                                if 'country' in col.lower() and 'area' in col.lower():
                                    country_col_ref = col
                            
                            if iso_col and country_col_ref:
                                subset = subset.merge(
                                    ref_data[[country_col_ref, iso_col]],
                                    left_on='country_or_area',
                                    right_on=country_col_ref,
                                    how='left'
                                )
                                subset['iso3'] = subset[iso_col]
                            else:
                                subset['iso3'] = None
                        else:
                            subset['iso3'] = None
                    
                    grd_records.append(subset[['indicator_label', 'country_or_area', 'year', 'value', 'iso3']])
        
        if grd_records:
            df_grd_long = pd.concat(grd_records, ignore_index=True)
            print(f"✓ Transformed to long format: {len(df_grd_long)} records")
            return df_grd_long
        else:
            print("⚠️  No tax columns found in GRD file")
            return pd.DataFrame()
            
    except Exception as e:
        print(f"❌ Error loading GRD data: {e}")
        import traceback
        traceback.print_exc()
        return pd.DataFrame()


def load_fsi_data(fsi_file="data/TJN_FSI.csv"):
    """Load and transform FSI data from wide to long format."""
    print(f"\n[2/7] Loading FSI data from {fsi_file}...")
    
    try:
        df_fsi = pd.read_csv(fsi_file)
        print(f"✓ Loaded {len(df_fsi)} countries from FSI data")
        
        # Load reference data to match iso3 to country_or_area
        ref_data = uv.load_country_reference_data() if 'uv' in sys.modules else pd.DataFrame()
        if ref_data.empty:
            # Fallback: load directly
            ref_file = Path("data/iso3_country_reference.csv")
            if ref_file.exists():
                ref_data = pd.read_csv(ref_file)
            else:
                print("⚠️  Reference data not found. Will use iso3 matching.")
        
        # Merge FSI with reference data to get country_or_area
        if not ref_data.empty:
            # Find iso3 column in reference data
            iso_col = None
            country_col = None
            for col in ref_data.columns:
                if 'iso' in col.lower() and '3' in col.lower():
                    iso_col = col
                if 'country' in col.lower() and 'area' in col.lower():
                    country_col = col
            
            if iso_col and country_col:
                df_fsi = df_fsi.merge(
                    ref_data[[iso_col, country_col]],
                    left_on='iso3',
                    right_on=iso_col,
                    how='left'
                )
                df_fsi['country_or_area'] = df_fsi[country_col].fillna(df_fsi['country_name'])
            else:
                df_fsi['country_or_area'] = df_fsi['country_name']
        else:
            df_fsi['country_or_area'] = df_fsi['country_name']
        
        # Transform wide format to long format
        fsi_years = {
            'fsi_2011_score': 2011,
            'fsi_2013_score': 2013,
            'fsi_2015_score': 2015,
            'fsi_2018_score': 2018,
            'fsi_2020_score': 2020,
            'fsi_2022_score': 2022,
            'fsi_2025_score': 2025
        }
        
        fsi_records = []
        for score_col, year in fsi_years.items():
            if score_col in df_fsi.columns:
                indicator_label = f"Secrecy Score - Financial Secrecy Index {year}"
                subset = df_fsi[['country_or_area', 'iso3', score_col]].copy()
                subset = subset.rename(columns={score_col: 'value'})
                subset['year'] = year
                subset['indicator_label'] = indicator_label
                subset = subset[subset['value'].notna()]  # Remove missing values
                fsi_records.append(subset[['indicator_label', 'country_or_area', 'year', 'value', 'iso3']])
        
        if fsi_records:
            df_fsi_long = pd.concat(fsi_records, ignore_index=True)
            print(f"✓ Transformed to long format: {len(df_fsi_long)} records")
            return df_fsi_long
        else:
            print("⚠️  No FSI score columns found")
            return pd.DataFrame()
            
    except Exception as e:
        print(f"❌ Error loading FSI data: {e}")
        import traceback
        traceback.print_exc()
        return pd.DataFrame()


def calculate_tax_effort_capacity_gap(df_main, ref_data=None):
    """
    Calculate Tax Effort, Capacity, and Gap using Stochastic Frontier Analysis (SFA).
    
    Methodology:
    - SFA regression: tax_revenue % GDP = f(GDP_pc, Trade_openness) + v - u
    - Tax Capacity = predicted frontier value
    - Tax Effort = Actual / Capacity
    - Tax Gap = Capacity - Actual
    """
    print("\n[3/7] Calculating Tax Effort, Capacity, and Gap using SFA...")
    
    # Required indicators - try multiple possible names
    tax_indicators = [
        "Tax Revenue - % of GDP - value",
        "Tax revenue (% of GDP)",
        "Tax Revenue USD - USD - value"
    ]
    gdp_pc_indicators = [
        "GDP per Capita Constant USD - USD - value",
        "GDP per Capita Constant USD"
    ]
    trade_indicators = [
        "Trade (% of GDP)",
        "Trade - value"  # May need to calculate as % of GDP
    ]
    
    # Get data for each indicator
    tax_data = pd.DataFrame()
    for ind in tax_indicators:
        tax_data = df_main[df_main['indicator_label'] == ind].copy()
        if not tax_data.empty:
            print(f"✓ Using tax indicator: {ind}")
            break
    
    if tax_data.empty:
        print(f"⚠️  Tax indicators not found. Available tax-related indicators:")
        tax_related = df_main[df_main['indicator_label'].str.contains('Tax', case=False, na=False)]['indicator_label'].unique()
        for t in tax_related[:10]:
            print(f"    - {t}")
        return pd.DataFrame()
    
    gdp_pc_data = pd.DataFrame()
    for ind in gdp_pc_indicators:
        gdp_pc_data = df_main[df_main['indicator_label'] == ind].copy()
        if not gdp_pc_data.empty:
            print(f"✓ Using GDP per capita indicator: {ind}")
            break
    
    if gdp_pc_data.empty:
        print(f"⚠️  GDP per capita indicator not found")
        return pd.DataFrame()
    
    # Try to get trade data or calculate it
    trade_data = pd.DataFrame()
    for ind in trade_indicators:
        trade_data = df_main[df_main['indicator_label'] == ind].copy()
        if not trade_data.empty:
            print(f"✓ Using trade indicator: {ind}")
            break
    
        # If trade not found, try to calculate from exports + imports
        if trade_data.empty:
            print("⚠️  Trade indicator not found. Attempting to calculate from exports + imports...")
            exports_data = df_main[df_main['indicator_label'] == "Exports (X) - Constant USD - value"].copy()
            imports_data = df_main[df_main['indicator_label'] == "Imports (M) - Constant USD - value"].copy()
            gdp_data = df_main[df_main['indicator_label'] == "GDP Constant USD - USD - value"].copy()
            
            if not exports_data.empty and not imports_data.empty and not gdp_data.empty:
                # Merge and calculate trade as % of GDP
                trade_calc = exports_data.merge(
                    imports_data[['country_or_area', 'year', 'value']],
                    on=['country_or_area', 'year'],
                    how='inner',
                    suffixes=('_exp', '_imp')
                )
                # Merge GDP data separately to avoid column name conflicts
                trade_calc = trade_calc.merge(
                    gdp_data[['country_or_area', 'year', 'value']].rename(columns={'value': 'value_gdp'}),
                    on=['country_or_area', 'year'],
                    how='inner'
                )
                # Calculate trade as % of GDP: (exports + imports) / GDP * 100
                trade_calc['value'] = ((trade_calc['value_exp'] + trade_calc['value_imp']) / trade_calc['value_gdp']) * 100
                trade_calc['indicator_label'] = 'Trade (% of GDP)'
                # iso3 should already be in trade_calc from exports_data merge
                if 'iso3' not in trade_calc.columns:
                    trade_calc['iso3'] = None
                trade_calc = trade_calc[['indicator_label', 'country_or_area', 'year', 'value', 'iso3']]
                trade_data = trade_calc
                print("✓ Calculated trade from exports + imports")
            else:
                print("⚠️  Cannot calculate trade - missing exports, imports, or GDP data")
                return pd.DataFrame()
    
    # Merge data by country and year
    merged = tax_data.merge(
        gdp_pc_data[['country_or_area', 'year', 'value']],
        on=['country_or_area', 'year'],
        how='inner',
        suffixes=('_tax', '_gdp_pc')
    )
    
    # Merge trade data
    merged = merged.merge(
        trade_data[['country_or_area', 'year', 'value']],
        on=['country_or_area', 'year'],
        how='inner',
        suffixes=('', '_trade')
    )
    
    merged = merged.rename(columns={
        'value_tax': 'tax_revenue_pct',
        'value_gdp_pc': 'gdp_per_capita',
        'value': 'trade_openness'  # This is the trade value from the last merge
    })
    
    # Remove missing values
    merged = merged.dropna(subset=['tax_revenue_pct', 'gdp_per_capita', 'trade_openness'])
    
    if merged.empty:
        print("⚠️  No complete observations after merging")
        return pd.DataFrame()
    
    print(f"✓ Merged data: {len(merged)} country-year observations")
    
    # Data validation before calculations
    print("\n📊 Data Validation:")
    
    # Check for negative or zero values
    negative_tax = merged[merged['tax_revenue_pct'] <= 0]
    negative_gdp = merged[merged['gdp_per_capita'] <= 0]
    negative_trade = merged[merged['trade_openness'] < 0]
    
    if len(negative_tax) > 0:
        print(f"   ⚠️  Warning: {len(negative_tax)} observations have non-positive tax revenue")
        merged = merged[merged['tax_revenue_pct'] > 0]
    
    if len(negative_gdp) > 0:
        print(f"   ⚠️  Warning: {len(negative_gdp)} observations have non-positive GDP per capita")
        merged = merged[merged['gdp_per_capita'] > 0]
    
    if len(negative_trade) > 0:
        print(f"   ⚠️  Warning: {len(negative_trade)} observations have negative trade openness")
        # Allow negative trade (can happen in some cases)
    
    # Check for extreme outliers
    tax_q99 = merged['tax_revenue_pct'].quantile(0.99)
    tax_q01 = merged['tax_revenue_pct'].quantile(0.01)
    extreme_tax = merged[(merged['tax_revenue_pct'] > tax_q99 * 2) | (merged['tax_revenue_pct'] < tax_q01 / 2)]
    
    if len(extreme_tax) > 0:
        print(f"   ⚠️  Warning: {len(extreme_tax)} observations have extreme tax revenue values")
        print(f"      Range: [{merged['tax_revenue_pct'].min():.2f}%, {merged['tax_revenue_pct'].max():.2f}%]")
        # Don't remove, but flag for review
    
    print(f"   ✓ Valid observations: {len(merged)}")
    
    if merged.empty:
        print("   ❌ ERROR: No valid observations after validation")
        return pd.DataFrame()
    
    # Prepare data for SFA
    # Ensure numeric types
    merged['tax_revenue_pct'] = pd.to_numeric(merged['tax_revenue_pct'], errors='coerce')
    merged['gdp_per_capita'] = pd.to_numeric(merged['gdp_per_capita'], errors='coerce')
    merged['trade_openness'] = pd.to_numeric(merged['trade_openness'], errors='coerce')
    
    # Remove any remaining NaN values
    merged = merged.dropna(subset=['tax_revenue_pct', 'gdp_per_capita', 'trade_openness'])
    
    # Use log transformation for GDP per capita (common in SFA literature)
    merged['log_gdp_pc'] = np.log(merged['gdp_per_capita'].astype(float) + 1)
    
    # Add time trend variable for time-series calculation
    # This allows the relationship to vary over time, improving both R² and temporal variation
    merged['year_trend'] = merged['year'] - merged['year'].min()
    
    # Prepare data for SFA model (with time trend)
    X = merged[['log_gdp_pc', 'trade_openness', 'year_trend']].values
    y = merged['tax_revenue_pct'].values
    
    # Use Stochastic Frontier Analysis if available
    global HAS_SFA, SFA_MODULE
    if HAS_SFA:
        print(f"✓ Using Stochastic Frontier Analysis (SFA) with {SFA_MODULE}...")
        try:
            if SFA_MODULE == 'pysfa':
                # pysfa implementation
                from pysfa import SFA
                # SFA expects: SFA(y, x, fun='prod', method='teJ')
                # y = output (tax revenue % GDP) - 1D array
                # x = inputs (log GDP per capita, trade openness) - 2D array
                # fun = 'prod' for production function
                # method = 'teJ' for technical efficiency
                res = SFA.SFA(y, X, fun='prod', intercept=True, method='teJ')
                
                # Get predicted values (frontier/capacity)
                # pysfa doesn't have direct predict, so calculate from coefficients
                beta = res.get_beta()
                if beta is not None and len(beta) > 0:
                    # Add intercept if present
                    if X.shape[1] == len(beta) - 1:
                        # Has intercept
                        merged['tax_capacity'] = beta[0] + X @ beta[1:]
                    else:
                        merged['tax_capacity'] = X @ beta
                else:
                    # Fallback: use OLS prediction
                    model = LinearRegression()
                    model.fit(X, y)
                    merged['tax_capacity'] = model.predict(X)
                
                # Get efficiency scores (tax effort)
                # Efficiency = exp(-u) where u is inefficiency
                # pysfa may provide this through residuals or efficiency method
                try:
                    # Try to get efficiency directly
                    efficiency = res.get_efficiency() if hasattr(res, 'get_efficiency') else None
                    if efficiency is None:
                        # Calculate from residuals if available
                        residuals = res.get_residuals() if hasattr(res, 'get_residuals') else None
                        if residuals is not None:
                            # Efficiency approximation from residuals
                            efficiency = np.exp(-np.maximum(0, -residuals))
                        else:
                            # Fallback: calculate from capacity
                            efficiency = merged['tax_revenue_pct'] / merged['tax_capacity']
                    merged['tax_effort'] = efficiency
                except:
                    # Fallback: calculate from capacity
                    merged['tax_effort'] = merged['tax_revenue_pct'] / merged['tax_capacity']
                
            elif SFA_MODULE == 'pyStoNED':
                # pyStoNED implementation
                from pyStoNED import StoNED
                # Create StoNED object and fit
                stoned = StoNED(y, X, method='CNLS')
                stoned.fit()
                # Get efficiency scores
                efficiency = stoned.get_efficiency()
                # Capacity = actual / efficiency
                merged['tax_effort'] = efficiency
                merged['tax_capacity'] = merged['tax_revenue_pct'] / efficiency
                
            elif SFA_MODULE == 'frontier':
                # frontier package implementation
                from frontier import StochasticFrontier
                sfa_model = StochasticFrontier(y, X)
                sfa_model.fit()
                merged['tax_capacity'] = sfa_model.predict(X)
                merged['tax_effort'] = sfa_model.efficiency()
            
            print(f"✓ SFA model fitted successfully using {SFA_MODULE}")
        except Exception as e:
            print(f"⚠️  SFA model failed: {e}")
            import traceback
            traceback.print_exc()
            print("   Falling back to OLS regression...")
            HAS_SFA = False
    
    # Fallback to OLS if SFA not available or failed
    if not HAS_SFA:
        print("⚠️  Using OLS regression as proxy for SFA...")
        print("   Note: OLS predicts mean, not frontier. Applying frontier adjustment...")
        
        # Fit OLS model
        model = LinearRegression()
        model.fit(X, y)
        
        # Predict tax capacity (mean prediction from OLS)
        merged['tax_capacity'] = model.predict(X)
        
        # Calculate R² for diagnostics
        r2 = r2_score(y, merged['tax_capacity'])
        print(f"   OLS Model R²: {r2:.3f}")
        
        # FIX: Shift capacity upward to create a frontier
        # Method: Use 75th percentile as reference point for frontier (more realistic than 90th)
        capacity_75th = np.percentile(merged['tax_capacity'], 75)
        capacity_90th = np.percentile(merged['tax_capacity'], 90)
        capacity_mean = merged['tax_capacity'].mean()
        capacity_std = merged['tax_capacity'].std()
        
        # Shift all capacities upward by the difference between 75th percentile and mean
        # This creates a more realistic frontier where top quartile defines the maximum
        shift_75th = capacity_75th - capacity_mean
        
        # Alternative: Use 1.5 standard deviations for stronger differentiation
        shift_std = 1.5 * capacity_std
        
        # Use the larger of the two shifts to ensure sufficient variation
        shift = max(shift_75th, shift_std)
        
        print(f"   Capacity shift: {shift:.2f}% (75th percentile: {capacity_75th:.2f}%, mean: {capacity_mean:.2f}%, std: {capacity_std:.2f}%)")
        print(f"   Using shift = max(75th-mean={shift_75th:.2f}%, 1.5*std={shift_std:.2f}%) = {shift:.2f}%")
        merged['tax_capacity'] = merged['tax_capacity'] + shift
        
        # Ensure capacity is always >= actual revenue (no negative gaps from model error)
        # But allow some over-performance (negative gaps) if actual > capacity
        # This is handled naturally by the formula
        
        # Calculate tax effort as ratio
        merged['tax_effort'] = merged['tax_revenue_pct'] / merged['tax_capacity']
        
        # Diagnostic: Report effort distribution
        effort_mean = merged['tax_effort'].mean()
        effort_std = merged['tax_effort'].std()
        effort_min = merged['tax_effort'].min()
        effort_max = merged['tax_effort'].max()
        print(f"   Tax Effort stats: mean={effort_mean:.3f}, std={effort_std:.3f}, range=[{effort_min:.3f}, {effort_max:.3f}]")
        
        # Verify variation within countries (should NOT be zero)
        print("\n📊 Tax Effort Variation Check (per country):")
        print(f"   Overall: mean={effort_mean:.3f}, std={effort_std:.3f}")
        sample_countries = merged['country_or_area'].unique()[:5]
        for country in sample_countries:
            country_data = merged[merged['country_or_area'] == country]
            if len(country_data) > 1:
                country_std = country_data['tax_effort'].std()
                country_mean = country_data['tax_effort'].mean()
                print(f"   {country}: mean={country_mean:.3f}, std={country_std:.3f}, years={len(country_data)}")
            else:
                print(f"   {country}: single observation (year={country_data['year'].values[0] if len(country_data) > 0 else 'N/A'})")
        
        # Check if variation is too low (all values close to 1.0)
        values_near_one = ((merged['tax_effort'] >= 0.9) & (merged['tax_effort'] <= 1.1)).sum()
        pct_near_one = (values_near_one / len(merged)) * 100
        if pct_near_one > 80:
            print(f"   ⚠️  WARNING: {pct_near_one:.1f}% of values are between 0.9 and 1.1")
            print(f"      This suggests insufficient variation. Consider adjusting frontier shift.")
    
    # Calculate tax gap (already calculated tax_effort above if using SFA)
    if 'tax_effort' not in merged.columns:
        merged['tax_effort'] = merged['tax_revenue_pct'] / merged['tax_capacity']
    
    # Calculate tax gap: Capacity - Actual
    # Positive gap = under-collection, Negative gap = over-collection
    merged['tax_gap'] = merged['tax_capacity'] - merged['tax_revenue_pct']
    
    # Data validation and diagnostics
    print("\n📊 Calculation Diagnostics:")
    
    # Check for negative gaps (over-collection)
    negative_gaps = merged[merged['tax_gap'] < 0]
    if len(negative_gaps) > 0:
        pct_negative = (len(negative_gaps) / len(merged)) * 100
        mean_negative_gap = negative_gaps['tax_gap'].mean()
        print(f"   ⚠️  Negative gaps (over-collection): {len(negative_gaps)} observations ({pct_negative:.1f}%)")
        print(f"      Mean negative gap: {mean_negative_gap:.2f}% of GDP")
        print(f"      Countries with negative gaps: {', '.join(negative_gaps['country_or_area'].unique()[:10])}")
        if len(negative_gaps['country_or_area'].unique()) > 10:
            print(f"      ... and {len(negative_gaps['country_or_area'].unique()) - 10} more")
    else:
        print(f"   ✓ No negative gaps (all countries under-collecting relative to capacity)")
    
    # Check for extreme values
    extreme_effort = merged[(merged['tax_effort'] < 0.3) | (merged['tax_effort'] > 1.5)]
    if len(extreme_effort) > 0:
        print(f"   ⚠️  Extreme tax effort values: {len(extreme_effort)} observations")
        print(f"      Range: [{merged['tax_effort'].min():.3f}, {merged['tax_effort'].max():.3f}]")
    
    # Summary statistics
    print(f"   Tax Capacity: mean={merged['tax_capacity'].mean():.2f}%, std={merged['tax_capacity'].std():.2f}%")
    print(f"   Tax Effort: mean={merged['tax_effort'].mean():.3f}, std={merged['tax_effort'].std():.3f}")
    print(f"   Tax Gap: mean={merged['tax_gap'].mean():.2f}%, std={merged['tax_gap'].std():.2f}%")
    
    # Validate formulas
    effort_check = np.allclose(
        merged['tax_effort'],
        merged['tax_revenue_pct'] / merged['tax_capacity'],
        rtol=1e-5
    )
    gap_check = np.allclose(
        merged['tax_gap'],
        merged['tax_capacity'] - merged['tax_revenue_pct'],
        rtol=1e-5
    )
    
    if not effort_check:
        print("   ❌ ERROR: Tax Effort formula validation failed!")
    if not gap_check:
        print("   ❌ ERROR: Tax Gap formula validation failed!")
    if effort_check and gap_check:
        print("   ✓ Formula validation passed")
    
    # Create output records
    results = []
    
    # Tax Effort
    effort_records = merged[['country_or_area', 'year', 'tax_effort']].copy()
    effort_records['indicator_label'] = 'Tax Effort (Actual / Capacity)'
    effort_records = effort_records.rename(columns={'tax_effort': 'value'})
    effort_records['iso3'] = merged['iso3'] if 'iso3' in merged.columns else None
    effort_records['source'] = 'OSAA'  # OSAA calculates this indicator
    results.append(effort_records[['indicator_label', 'country_or_area', 'year', 'value', 'iso3', 'source']])
    
    # Tax Capacity
    capacity_records = merged[['country_or_area', 'year', 'tax_capacity']].copy()
    capacity_records['indicator_label'] = 'Tax Capacity (% of GDP)'
    capacity_records = capacity_records.rename(columns={'tax_capacity': 'value'})
    capacity_records['iso3'] = merged['iso3'] if 'iso3' in merged.columns else None
    capacity_records['source'] = 'OSAA'  # OSAA calculates this indicator
    results.append(capacity_records[['indicator_label', 'country_or_area', 'year', 'value', 'iso3', 'source']])
    
    # Tax Gap
    gap_records = merged[['country_or_area', 'year', 'tax_gap']].copy()
    gap_records['indicator_label'] = 'Tax Gap (% of GDP)'
    gap_records = gap_records.rename(columns={'tax_gap': 'value'})
    gap_records['iso3'] = merged['iso3'] if 'iso3' in merged.columns else None
    gap_records['source'] = 'OSAA'  # OSAA calculates this indicator
    results.append(gap_records[['indicator_label', 'country_or_area', 'year', 'value', 'iso3', 'source']])
    
    df_results = pd.concat(results, ignore_index=True)
    print(f"\n✓ Calculated indicators: {len(df_results)} records")
    print(f"  - Tax Effort: {len(effort_records)} records")
    print(f"  - Tax Capacity: {len(capacity_records)} records")
    print(f"  - Tax Gap: {len(gap_records)} records")
    
    # Final data quality check
    if len(df_results) == 0:
        print("   ❌ ERROR: No results generated!")
        return pd.DataFrame()
    
    # Check for missing values
    missing_values = df_results['value'].isna().sum()
    if missing_values > 0:
        print(f"   ⚠️  Warning: {missing_values} records have missing values")
    
    # Check for infinite values
    infinite_values = np.isinf(df_results['value']).sum()
    if infinite_values > 0:
        print(f"   ⚠️  Warning: {infinite_values} records have infinite values")
        # Remove infinite values
        df_results = df_results[~np.isinf(df_results['value'])]
    
    print("   ✓ Data quality checks completed")
    
    return df_results


def calculate_tax_buoyancy(df_main):
    """
    Calculate Tax Buoyancy per country using log-log regression.
    
    Methodology:
    - Log-log regression: ln(Tax Revenue) = α + β * ln(GDP) + ε
    - β represents tax buoyancy (elasticity)
    - Calculated per country using all available years
    """
    print("\n[4/7] Calculating Tax Buoyancy per country...")
    
    # Required indicators - try multiple possible names
    tax_indicators = [
        "Tax Revenue USD - USD - value",  # Prefer absolute values for buoyancy
        "Tax Revenue - % of GDP - value",
        "Tax revenue (% of GDP)"
    ]
    gdp_indicators = [
        "GDP (current US$)",
        "GDP Constant USD - USD - value"
    ]
    
    # Get data
    tax_data = pd.DataFrame()
    for ind in tax_indicators:
        tax_data = df_main[df_main['indicator_label'] == ind].copy()
        if not tax_data.empty:
            print(f"✓ Using tax indicator for buoyancy: {ind}")
            break
    
    if tax_data.empty:
        print(f"⚠️  Tax indicators not found for buoyancy calculation")
        return pd.DataFrame()
    
    gdp_data = pd.DataFrame()
    for ind in gdp_indicators:
        gdp_data = df_main[df_main['indicator_label'] == ind].copy()
        if not gdp_data.empty:
            print(f"✓ Using GDP indicator for buoyancy: {ind}")
            break
    
    if gdp_data.empty:
        print(f"⚠️  GDP indicator not found for buoyancy calculation")
        return pd.DataFrame()
    
    # Merge by country and year
    merged = tax_data.merge(
        gdp_data[['country_or_area', 'year', 'value']],
        on=['country_or_area', 'year'],
        how='inner',
        suffixes=('_tax', '_gdp')
    )
    
    merged = merged.rename(columns={
        'value_tax': 'tax_revenue',
        'value_gdp': 'gdp'
    })
    
    # Remove missing or zero values
    merged = merged[(merged['tax_revenue'] > 0) & (merged['gdp'] > 0)]
    merged = merged.dropna(subset=['tax_revenue', 'gdp'])
    
    if merged.empty:
        print("⚠️  No complete observations after merging")
        return pd.DataFrame()
    
    print(f"✓ Merged data: {len(merged)} country-year observations")
    
    # Calculate buoyancy per country
    buoyancy_records = []
    
    for country in merged['country_or_area'].unique():
        country_data = merged[merged['country_or_area'] == country].copy()
        country_data = country_data.sort_values('year')
        
        # Need at least 3 years to calculate regression
        if len(country_data) < 3:
            continue
        
        # Ensure numeric types
        country_data['tax_revenue'] = pd.to_numeric(country_data['tax_revenue'], errors='coerce')
        country_data['gdp'] = pd.to_numeric(country_data['gdp'], errors='coerce')
        
        # Remove any NaN values
        country_data = country_data.dropna(subset=['tax_revenue', 'gdp'])
        
        if len(country_data) < 3:
            continue
        
        # Log transformation - ensure float type
        country_data['log_tax'] = np.log(country_data['tax_revenue'].astype(float))
        country_data['log_gdp'] = np.log(country_data['gdp'].astype(float))
        
        # Fit log-log regression
        X = country_data[['log_gdp']].values
        y = country_data['log_tax'].values
        
        try:
            model = LinearRegression()
            model.fit(X, y)
            buoyancy = model.coef_[0]  # Elasticity coefficient
            
            # Store result for each year (same buoyancy value for all years of the country)
            for year in country_data['year'].unique():
                buoyancy_records.append({
                    'indicator_label': 'Tax Buoyancy (Elasticity)',
                    'country_or_area': country,
                    'year': year,
                    'value': buoyancy,
                    'iso3': country_data['iso3'].iloc[0] if 'iso3' in country_data.columns else None,
                    'source': 'OSAA'  # OSAA calculated this indicator
                })
        except Exception as e:
            print(f"⚠️  Error calculating buoyancy for {country}: {e}")
            continue
    
    if buoyancy_records:
        df_buoyancy = pd.DataFrame(buoyancy_records)
        # Ensure source column is set
        if 'source' not in df_buoyancy.columns:
            df_buoyancy['source'] = 'OSAA'
        
        # Data validation
        print(f"\n📊 Tax Buoyancy Diagnostics:")
        print(f"   ✓ Calculated buoyancy for {df_buoyancy['country_or_area'].nunique()} countries")
        
        # Check for extreme values
        extreme_buoyancy = df_buoyancy[
            (df_buoyancy['value'] < -2) | (df_buoyancy['value'] > 5)
        ]
        if len(extreme_buoyancy) > 0:
            print(f"   ⚠️  Extreme buoyancy values: {len(extreme_buoyancy)} countries")
            print(f"      Range: [{df_buoyancy['value'].min():.3f}, {df_buoyancy['value'].max():.3f}]")
        
        # Summary statistics
        print(f"   Buoyancy stats: mean={df_buoyancy['value'].mean():.3f}, std={df_buoyancy['value'].std():.3f}")
        print(f"   Countries with buoyancy < 0.5: {len(df_buoyancy[df_buoyancy['value'] < 0.5])}")
        print(f"   Countries with buoyancy > 1.0: {len(df_buoyancy[df_buoyancy['value'] > 1.0])}")
        
        # Check for missing/infinite values
        missing = df_buoyancy['value'].isna().sum()
        infinite = np.isinf(df_buoyancy['value']).sum()
        if missing > 0:
            print(f"   ⚠️  Warning: {missing} records have missing values")
        if infinite > 0:
            print(f"   ⚠️  Warning: {infinite} records have infinite values")
            df_buoyancy = df_buoyancy[~np.isinf(df_buoyancy['value'])]
        
        print("   ✓ Data quality checks completed")
        
        return df_buoyancy
    else:
        print("⚠️  No buoyancy values calculated")
        return pd.DataFrame()


def merge_to_nexus_parquet(new_indicators, output_file="data/nexus.parquet", backup=True):
    """
    Merge new indicators into existing nexus.parquet file.
    """
    print(f"\n[4/6] Merging new indicators into {output_file}...")
    
    try:
        # Load existing data
        df_existing = pd.read_parquet(output_file)
        print(f"✓ Loaded existing data: {len(df_existing)} rows")
        
        # Check if new indicators already exist
        existing_indicators = df_existing['indicator_label'].unique()
        new_indicator_names = new_indicators['indicator_label'].unique()
        
        # Remove duplicates if they exist
        indicators_to_remove = [ind for ind in new_indicator_names if ind in existing_indicators]
        if indicators_to_remove:
            print(f"⚠️  Removing existing indicators: {indicators_to_remove}")
            df_existing = df_existing[~df_existing['indicator_label'].isin(indicators_to_remove)]
        
        # Ensure all values are numeric (convert any strings to NaN, then drop)
        new_indicators['value'] = pd.to_numeric(new_indicators['value'], errors='coerce')
        new_indicators = new_indicators.dropna(subset=['value'])
        
        # Ensure string columns are strings (not mixed types)
        new_indicators['country_or_area'] = new_indicators['country_or_area'].astype(str)
        new_indicators['indicator_label'] = new_indicators['indicator_label'].astype(str)
        if 'iso3' in new_indicators.columns:
            new_indicators['iso3'] = new_indicators['iso3'].astype(str).replace('nan', None)
        
        # Ensure year is integer
        new_indicators['year'] = pd.to_numeric(new_indicators['year'], errors='coerce').astype('Int64')
        
        # Ensure source column exists and set to OSAA for calculated indicators
        if 'source' not in new_indicators.columns:
            new_indicators['source'] = None
        # Set OSAA as source for calculated indicators
        calculated_indicators = ['Tax Effort', 'Tax Capacity', 'Tax Gap', 'Tax Buoyancy']
        for ind in calculated_indicators:
            mask = new_indicators['indicator_label'].str.contains(ind, na=False)
            new_indicators.loc[mask, 'source'] = 'OSAA'
        
        # Combine
        df_combined = pd.concat([df_existing, new_indicators], ignore_index=True)
        
        # Backup original file
        if backup:
            backup_file = output_file.replace('.parquet', '_backup.parquet')
            df_existing.to_parquet(backup_file, index=False)
            print(f"✓ Created backup: {backup_file}")
        
        # Save combined data
        df_combined.to_parquet(output_file, index=False)
        print(f"✓ Saved combined data: {len(df_combined)} rows")
        print(f"  - Added {len(new_indicators)} new records")
        print(f"  - Total indicators: {df_combined['indicator_label'].nunique()}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error merging data: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Main execution function."""
    print("=" * 60)
    print("Adding Missing Indicators to nexus.parquet")
    print("=" * 60)
    
    # Load main data
    print("\n[0/7] Loading main data...")
    try:
        df_main = pd.read_parquet("data/nexus.parquet")
        print(f"✓ Loaded {len(df_main):,} rows")
        print(f"  Columns: {list(df_main.columns)}")
        print(f"  Unique indicators: {df_main['indicator_label'].nunique()}")
    except Exception as e:
        print(f"❌ Error loading main data: {e}")
        return False
    
    # Load reference data
    ref_data = pd.DataFrame()
    try:
        if 'uv' in sys.modules:
            ref_data = uv.load_country_reference_data()
        else:
            ref_file = Path("data/iso3_country_reference.csv")
            if ref_file.exists():
                ref_data = pd.read_csv(ref_file)
        if not ref_data.empty:
            print(f"✓ Loaded reference data: {len(ref_data)} countries")
    except Exception as e:
        print(f"⚠️  Reference data not available: {e}")
    
    # 1. Load and transform GRD data
    df_grd = load_grd_data()
    
    # 2. Load and transform FSI data
    df_fsi = load_fsi_data()
    
    # 3. Calculate Tax Effort, Capacity, Gap (now using GRD data if available)
    # Update df_main with GRD data first if it was loaded
    if not df_grd.empty:
        print("\n[2.5/7] Adding GRD data to working dataset...")
        df_main = pd.concat([df_main, df_grd], ignore_index=True)
        print(f"✓ Added GRD data: {len(df_grd)} records")
    
    df_tax_indicators = calculate_tax_effort_capacity_gap(df_main, ref_data)
    
    # 4. Calculate Tax Buoyancy
    df_buoyancy = calculate_tax_buoyancy(df_main)
    
    # 5. Combine all new indicators
    print("\n[6/7] Combining all new indicators...")
    all_new_indicators = []
    
    if not df_grd.empty:
        all_new_indicators.append(df_grd)
        print(f"✓ Added GRD indicators: {len(df_grd)} records")
    
    if not df_fsi.empty:
        all_new_indicators.append(df_fsi)
        print(f"✓ Added FSI indicators: {len(df_fsi)} records")
    
    if not df_tax_indicators.empty:
        all_new_indicators.append(df_tax_indicators)
        print(f"✓ Added Tax indicators: {len(df_tax_indicators)} records")
    
    if not df_buoyancy.empty:
        all_new_indicators.append(df_buoyancy)
        print(f"✓ Added Buoyancy indicators: {len(df_buoyancy)} records")
    
    if not all_new_indicators:
        print("⚠️  No new indicators to add")
        return False
    
    df_new = pd.concat(all_new_indicators, ignore_index=True)
    print(f"✓ Total new records: {len(df_new)}")
    
    # 6. Merge into nexus.parquet
    success = merge_to_nexus_parquet(df_new)
    
    if success:
        print("\n" + "=" * 60)
        print("✓ SUCCESS: All indicators added to nexus.parquet")
        print("=" * 60)
        return True
    else:
        print("\n" + "=" * 60)
        print("❌ FAILED: Could not merge indicators")
        print("=" * 60)
        return False


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)

