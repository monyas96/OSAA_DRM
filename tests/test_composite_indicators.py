"""
Tests for composite indicator calculations.
Run from repo root: python -m pytest tests/test_composite_indicators.py -v
"""
import sys
from pathlib import Path
import pandas as pd
import pytest

# Add repo root and scripts to path
ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
if str(ROOT / "scripts") not in sys.path:
    sys.path.insert(0, str(ROOT / "scripts"))

import composite_indicator_methods as cim


def test_calculate_corruption_losses_sum_and_columns():
    """Corruption losses should sum to 148B and output should have expected columns."""
    df = pd.DataFrame({
        "country_or_area": ["A", "B", "C"],
        "year": [2020, 2020, 2020],
        "value": [0.0, 0.5, 1.0],  # WGI-style scores
    })
    out = cim.calculate_corruption_losses(df)
    assert "corruption_loss_billion_usd" in out.columns
    assert "country_or_area" in out.columns
    assert out["corruption_loss_billion_usd"].sum() == pytest.approx(148.0, rel=1e-6)


def test_calculate_corruption_losses_normalization():
    """Normalized and inverted scores should be in [0,1]; inverted = 1 - norm."""
    df = pd.DataFrame({
        "country_or_area": ["X"],
        "year": [2019],
        "value": [0.0],
    })
    out = cim.calculate_corruption_losses(df)
    assert out["normalized_score"].iloc[0] == pytest.approx(0.5)  # (0+2.5)/5
    assert out["inverted_score"].iloc[0] == pytest.approx(0.5)
    assert out["corruption_loss_billion_usd"].iloc[0] == pytest.approx(148.0)


def test_calculate_banking_sector_development_index_empty():
    """Empty or missing-indicator input should return empty DataFrame with expected columns."""
    df = pd.DataFrame({
        "country_or_area": [],
        "year": [],
        "indicator_label": [],
        "value": [],
    })
    out = cim.calculate_banking_sector_development_index(df)
    assert "Banking Sector Development Index" in out.columns
    assert out.shape[0] == 0


def test_calculate_banking_sector_development_index_shape():
    """With one country-year and all three indicators, result has one row and index in [0,1]."""
    labels = [
        "Bank capital to assets ratio (%)",
        "Bank liquid reserves to bank assets ratio (%)",
        "Domestic credit provided by financial sector (% of GDP)",
    ]
    df = pd.DataFrame({
        "country_or_area": ["C1"] * 3,
        "year": [2020] * 3,
        "indicator_label": labels,
        "value": [10.0, 20.0, 50.0],
    })
    out = cim.calculate_banking_sector_development_index(df)
    assert out.shape[0] == 1
    assert "Banking Sector Development Index" in out.columns
    assert 0 <= out["Banking Sector Development Index"].iloc[0] <= 1
