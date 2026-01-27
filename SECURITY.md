# Security configuration

This document explains the security-related settings used in the OSAA DRM application and when they are appropriate.

## Streamlit configuration (`.streamlit/config.toml`)

The Streamlit app runs with the following options disabled:

- **`enableCORS = false`** – Cross-Origin Resource Sharing is turned off.
- **`enableXsrfProtection = false`** – Cross-Site Request Forgery protection is turned off.

### Why these are disabled

The React frontend embeds the Streamlit dashboard inside an iframe. For the iframe to load and communicate with the parent page (e.g. for resize/height messages), the browser must allow cross-origin requests between the React origin and the Streamlit origin. Enabling CORS and XSRF in the default way would block this embedding and break the integration.

### When this is acceptable

This setup is **appropriate only** when:

1. **Both apps are under your control** – The React app and the Streamlit app are part of the same product and deployed together.
2. **Deployment is trusted** – For example:
   - Streamlit Cloud + same-domain or known frontend (e.g. GitHub Pages, Vercel, Netlify), or
   - Your own infrastructure where both backend and frontend are on trusted hosts.
3. **Sensitive actions are limited** – The embedded Streamlit app is used for viewing analytics and policy-brief visualizations, not for authenticating users or performing privileged operations.

### When to reassess

If you change how the app is deployed or who can access it, you should review these settings:

- **Different domains or public URLs** – Ensure you understand which origins can load the Streamlit app and whether that matches your threat model.
- **New sensitive features** – If the embedded app starts handling authentication, payment, or other sensitive operations, CORS and XSRF (and possibly authentication/authorization) should be revisited.
- **Third-party embedding** – If other sites are allowed to embed your Streamlit app, treat that as a new risk and consider stricter controls (e.g. allowlists, auth, or moving sensitive logic elsewhere).

For more detail on Streamlit’s options, see the [Streamlit configuration documentation](https://docs.streamlit.io/develop/concepts/configuration).
