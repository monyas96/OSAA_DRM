"""
Data Mart Generator for React Dashboard
Pre-processes parquet data using universal_viz.py and exports to JSON
This eliminates the need for an API server - React can load JSON directly
"""
import json
import pandas as pd
import sys
from pathlib import Path
from datetime import datetime

# Add parent directory to path
parent_dir = str(Path(__file__).resolve().parent)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

try:
    import universal_viz as uv
    print("✓ Imported universal_viz module")
except ImportError as e:
    print(f"❌ Error importing universal_viz: {e}")
    sys.exit(1)

def create_data_mart(output_dir="osaa-drm-app/public/data"):
    """
    Create a data mart by:
    1. Loading data using universal_viz.py
    2. Processing and transforming as needed
    3. Exporting to JSON files that React can load directly
    """
    print("=" * 60)
    print("Creating Data Mart for React Dashboard")
    print("=" * 60)
    
    # Create output directory
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    print(f"✓ Output directory: {output_path}")
    
    # Step 1: Load main data
    print("\n[1/5] Loading main data...")
    try:
        # Load directly from parquet (bypass Streamlit cache decorator)
        import pandas as pd
        data_file = Path("data/nexus.parquet")
        if not data_file.exists():
            print(f"❌ Data file not found: {data_file}")
            return False
        
        df_main = pd.read_parquet(data_file)
        if df_main is None or df_main.empty:
            print("❌ Main data is empty!")
            return False
        print(f"✓ Loaded {len(df_main):,} rows")
        print(f"  Columns: {list(df_main.columns)}")
        print(f"  Unique indicators: {df_main['indicator_label'].nunique()}")
        print(f"  Unique countries: {df_main['country_or_area'].nunique()}")
        print(f"  Year range: {df_main['year'].min()} - {df_main['year'].max()}")
    except Exception as e:
        print(f"❌ Error loading main data: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    # Step 2: Load reference data
    print("\n[2/5] Loading reference data...")
    try:
        # Try to load reference data using universal_viz, but fallback to direct CSV load
        try:
            df_ref = uv.load_country_reference_data()
        except Exception:
            # Fallback: load directly from CSV
            ref_file = Path("data/iso3_country_reference.csv")
            if ref_file.exists():
                df_ref = pd.read_csv(ref_file)
                print(f"✓ Loaded reference data directly from CSV")
            else:
                print("⚠️  Reference data file not found")
                df_ref = pd.DataFrame()
        
        if df_ref is None or df_ref.empty:
            print("⚠️  Reference data is empty")
        else:
            print(f"✓ Loaded {len(df_ref):,} rows")
            print(f"  Columns: {list(df_ref.columns)}")
    except Exception as e:
        print(f"⚠️  Error loading reference data: {e}")
        import traceback
        traceback.print_exc()
        df_ref = pd.DataFrame()
    
    # Step 3: Export main data (full dataset)
    print("\n[3/5] Exporting main data to JSON...")
    try:
        # Convert to records format (list of dicts)
        main_data_records = df_main.to_dict('records')
        
        # Save as JSON
        main_data_file = output_path / "main_data.json"
        with open(main_data_file, 'w') as f:
            json.dump(main_data_records, f, default=str)
        
        file_size_mb = main_data_file.stat().st_size / (1024 * 1024)
        print(f"✓ Exported {len(main_data_records):,} rows to {main_data_file}")
        print(f"  File size: {file_size_mb:.2f} MB")
    except Exception as e:
        print(f"❌ Error exporting main data: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    # Step 4: Export reference data
    print("\n[4/5] Exporting reference data to JSON...")
    try:
        if not df_ref.empty:
            ref_data_records = df_ref.to_dict('records')
            ref_data_file = output_path / "reference_data.json"
            with open(ref_data_file, 'w') as f:
                json.dump(ref_data_records, f, default=str)
            
            file_size_mb = ref_data_file.stat().st_size / (1024 * 1024)
            print(f"✓ Exported {len(ref_data_records):,} rows to {ref_data_file}")
            print(f"  File size: {file_size_mb:.2f} MB")
        else:
            print("⚠️  Skipping reference data (empty)")
    except Exception as e:
        print(f"⚠️  Error exporting reference data: {e}")
    
    # Step 5: Create metadata and index files
    print("\n[5/5] Creating metadata and index files...")
    try:
        # Create metadata
        metadata = {
            "generated_at": datetime.now().isoformat(),
            "main_data": {
                "row_count": len(df_main),
                "indicators_count": df_main['indicator_label'].nunique(),
                "countries_count": df_main['country_or_area'].nunique(),
                "year_range": {
                    "min": int(df_main['year'].min()),
                    "max": int(df_main['year'].max())
                },
                "columns": list(df_main.columns)
            },
            "reference_data": {
                "row_count": len(df_ref) if not df_ref.empty else 0,
                "columns": list(df_ref.columns) if not df_ref.empty else []
            }
        }
        
        metadata_file = output_path / "metadata.json"
        with open(metadata_file, 'w') as f:
            json.dump(metadata, f, indent=2)
        print(f"✓ Created metadata: {metadata_file}")
        
        # Create index of all indicators
        indicators = sorted(df_main['indicator_label'].dropna().unique().tolist())
        indicators_file = output_path / "indicators.json"
        with open(indicators_file, 'w') as f:
            json.dump({"indicators": indicators, "count": len(indicators)}, f, indent=2)
        print(f"✓ Created indicators index: {indicators_file} ({len(indicators)} indicators)")
        
        # Create index of all countries
        countries = sorted(df_main['country_or_area'].dropna().unique().tolist())
        countries_file = output_path / "countries.json"
        with open(countries_file, 'w') as f:
            json.dump({"countries": countries, "count": len(countries)}, f, indent=2)
        print(f"✓ Created countries index: {countries_file} ({len(countries)} countries)")
        
        # Create index of all years
        years = sorted(df_main['year'].dropna().unique().tolist())
        years_file = output_path / "years.json"
        with open(years_file, 'w') as f:
            json.dump({"years": years, "min": int(years[0]), "max": int(years[-1])}, f, indent=2)
        print(f"✓ Created years index: {years_file} ({len(years)} years)")
        
    except Exception as e:
        print(f"⚠️  Error creating metadata: {e}")
        import traceback
        traceback.print_exc()
    
    print("\n" + "=" * 60)
    print("✅ Data Mart Created Successfully!")
    print("=" * 60)
    print(f"\nOutput directory: {output_path}")
    print("\nFiles created:")
    print(f"  - main_data.json ({len(main_data_records):,} rows)")
    if not df_ref.empty:
        print(f"  - reference_data.json ({len(ref_data_records):,} rows)")
    print(f"  - metadata.json")
    print(f"  - indicators.json ({len(indicators)} indicators)")
    print(f"  - countries.json ({len(countries)} countries)")
    print(f"  - years.json ({len(years)} years)")
    print("\n💡 React app can now load these files directly (no API server needed!)")
    print("=" * 60)
    
    return True

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Create data mart for React dashboard")
    parser.add_argument(
        "--output",
        default="osaa-drm-app/public/data",
        help="Output directory for JSON files (default: osaa-drm-app/public/data)"
    )
    
    args = parser.parse_args()
    
    success = create_data_mart(args.output)
    sys.exit(0 if success else 1)

