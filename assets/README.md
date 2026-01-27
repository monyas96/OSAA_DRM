# Assets – frontend and static files

Static and frontend assets for the OSAA DRM application.

## Contents

- **`osaa-drm-app/`** – React (Vite) frontend that embeds the Streamlit dashboard in iframes. This is the main “policy view” UI. See `osaa-drm-app/README.md` for build, run, and deployment.
- **`logos/`** – Image and vector assets (OSAA, Quintet, indicator logos, etc.) used in the app and docs.
- **`loop_arrow.svg`** – Shared graphic used in the UI.

## React app

The React app talks to Streamlit only via iframe URLs and PostMessage (e.g. chart height). It uses `VITE_STREAMLIT_URL` to build those URLs. Copy `osaa-drm-app/.env.example` to `osaa-drm-app/.env` and set that variable for local or deployed Streamlit.
