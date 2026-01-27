# Data folder

This folder holds input datasets used by the Streamlit app and scripts. File descriptions, schemas, and lineage are documented below.

## File list and data dictionary

| File | Format | Description | Main columns (typical) |
|------|--------|-------------|-------------------------|
| `iso3_country_reference.csv` | CSV | ISO3 codes and country/area names; regional classification (e.g. Region Name) for filtering (e.g. Africa). | Country or Area, ISO3, Region Name |
| `countries_codes_and_coordinates.csv` | CSV | Country codes and coordinates for mapping / geographic views. | Country/area, codes, lat/lon (or similar) |
| `nexus.parquet` | Parquet | **Main indicator dataset** (long format). Built or updated by scripts; often gitignored. | indicator_label, country_or_area, year, value, iso3 |
| `Pension_Fund_Asset_Allocation_by_Country.csv` | CSV | Pension fund asset allocation by country; used for indicator 4.3.3.1. | Country, asset classes, shares |
| `TJN_FSI.csv` | CSV | Tax Justice Network Financial Secrecy Index; used for Financial Secrecy–related indicators. | Country, year, FSI scores / components |
| `UNUWIDER_GRD.xlsx` | Excel | UNU-WIDER Government Revenue Dataset; used to add tax indicators (e.g. tax_ex_sc, tax_inc_sc) into the nexus. | Country, year, revenue variables |
| `Viz specification matrix.xlsx` | Excel | Specification matrix for visualizations (which indicator → which chart, etc.). | Indicator/viz metadata |
| `*.pdf` | PDF | Reference documents (e.g. project or methodology docs). | — |

## Data lineage

- **Where each file is loaded/used**
  - `iso3_country_reference.csv`: `app/universal_viz.load_country_reference_data()` (default path); `scripts/add_missing_indicators.py` (e.g. `data/iso3_country_reference.csv`) for joins when merging new indicators.
  - `nexus.parquet`: `app/universal_viz.load_main_data()` (default `data/nexus.parquet`); topic pages and policy-brief pages load it via `load_main_data()` or `pb_shared.load_policy_brief_data()`. Expected columns: `indicator_label`, `country_or_area`, `year`, `value`, `iso3`.
  - `Pension_Fund_Asset_Allocation_by_Country.csv`: `app/pages/pb_graph_helpers.py` (e.g. `data/Pension_Fund_Asset_Allocation_by_Country.csv`), `app/pages/5_topic_4_3.py`, `app/special_pages/tab_4_3_3.py`.
  - `TJN_FSI.csv`: `scripts/add_missing_indicators.py` (e.g. `load_fsi_data("data/TJN_FSI.csv")`) to merge FSI-based indicators into the nexus.
  - `UNUWIDER_GRD.xlsx`: `scripts/add_missing_indicators.py` (e.g. `load_grd_data("data/UNUWIDER_GRD.xlsx")`) to add tax revenue indicators into the nexus.
  - `countries_codes_and_coordinates.csv`: used where mapping or coordinate-based logic is needed (see codebase for exact call sites).

- **Transformations and derived files**
  - `nexus.parquet` is produced or updated by `scripts/add_missing_indicators.py`, which reads GRD, FSI, and reference data and merges new indicators into an existing `data/nexus.parquet` (with optional backup). No other transformation pipeline is documented in-repo; the app assumes `nexus.parquet` already exists for run-time usage.

## Notes

- Large or generated files (e.g. `nexus.parquet`, `main_data.json`) may be gitignored; the app often expects them after a separate build or download step.
- Paths in code are usually relative to the **repository root** (e.g. `data/iso3_country_reference.csv`).
