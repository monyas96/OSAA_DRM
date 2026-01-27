# App core – shared UI and config

Reusable building blocks and configuration for the Streamlit app.

## Layout

- **`components/`** – UI building blocks: flip cards, headers, navigation, quadrant cards, Streamlit tour, etc. Used by `home.py` and topic/theme pages.
- **`config/`** – Configuration (e.g. pillars, topics) used to drive navigation and layout.
- **`layouts/`** – Layout helpers for pillar and topic views.
- **`styles/`** – CSS and shared styling (e.g. `style_osaa.css`). Pages can load these via a shared helper to keep styling consistent.

## Naming

- Component modules expose one or more `render_*` or similar functions that take content/options and call `st.*` to display output.
- Config modules define structures (e.g. pillar/topic trees) consumed by layouts and pages.

## Usage

Import from `app.app_core` or from the specific subpackage, e.g.:

```python
from app.app_core.components import header
from app.app_core.config.pillars_config import ...
```
