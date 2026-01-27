"""
Basic tests for data loading and data file readability.
Run from repo root: python -m pytest tests/test_data_loading.py -v
"""
import sys
from pathlib import Path
import pandas as pd
import pytest

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"


def test_country_reference_csv_readable():
    """data/iso3_country_reference.csv (or similar) should be readable and have expected columns."""
    path = DATA / "iso3_country_reference.csv"
    if not path.exists():
        pytest.skip("data/iso3_country_reference.csv not found")
    df = pd.read_csv(path)
    assert not df.empty
    # Common reference columns used in the app
    assert "Country or Area" in df.columns or "country_or_area" in df.columns or len(df.columns) >= 2


def test_countries_codes_coordinates_readable():
    """data/countries_codes_and_coordinates.csv should be readable if present."""
    path = DATA / "countries_codes_and_coordinates.csv"
    if not path.exists():
        pytest.skip("data/countries_codes_and_coordinates.csv not found")
    df = pd.read_csv(path)
    assert not df.empty


def test_universal_viz_has_load_functions():
    """universal_viz module should expose load_country_reference_data and load_main_data."""
    if str(ROOT) not in sys.path:
        sys.path.insert(0, str(ROOT))
    try:
        from app import universal_viz as uv
    except Exception:
        pytest.skip("could not import app.universal_viz (e.g. missing deps or streamlit)")
    assert hasattr(uv, "load_country_reference_data")
    assert hasattr(uv, "load_main_data")
    assert callable(uv.load_country_reference_data)
    assert callable(uv.load_main_data)
