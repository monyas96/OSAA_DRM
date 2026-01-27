# Scripts – standalone and data prep

One-off and support scripts used for data preparation, composite indicators, and generating new indicator modules. These are run manually or via automation, not as part of the live Streamlit server.

## Main files

- **`composite_indicator_methods.py`** – Functions to compute composite and derived indicators (e.g. tax effort, corruption losses). Used by the app and by policy-brief helpers; may be imported as a module when the repo root or `scripts/` is on `PYTHONPATH`.
- **`add_missing_indicators.py`** – Script to add or update indicators in the dataset or app.
- **`indicator_module_template.py`** – Template for creating new policy-brief indicator pages or modules.

## Running

Scripts assume the project root (or `scripts/`) is on the Python path. From the repo root:

```bash
# Example: run a script that uses composite_indicator_methods
python -c "from scripts.composite_indicator_methods import ..."
# Or, if you launch from scripts/:
cd scripts && python add_missing_indicators.py
```

The Streamlit app adds the repo root and `scripts/` to `sys.path` where needed so it can import `composite_indicator_methods` and related code.
