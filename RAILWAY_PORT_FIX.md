# Railway PORT Error Fix - Final Solution

## The Problem
Railway is using Nixpacks correctly, but still getting PORT error. This happens when PORT is referenced during the **build phase** instead of only at runtime.

## Solution: Set Start Command in Railway UI

The issue is that Railway might be trying to validate PORT during build. We need to set the start command **only in Railway's UI**, not in config files.

### For `drm-dashboard-streamlit`:

1. **Go to Railway Dashboard**
2. **Click on `drm-dashboard-streamlit` service**
3. **Click "Settings" tab**
4. **Scroll to "Deploy" section** (NOT "Build")
5. **Find "Start Command" field**
6. **Enter**:
   ```
   streamlit run app_streamlit.py --server.port $PORT --server.address 0.0.0.0 --server.headless true
   ```
7. **Make sure "Custom Build Command" is EMPTY** (or just: `pip install -r requirements.txt`)
8. **Click "Save"**
9. **Go to "Deployments" tab**
10. **Click "Redeploy"**

### For `drm-dashboard-api`:

1. **Click on `drm-dashboard-api` service**
2. **Click "Settings" tab**
3. **Scroll to "Deploy" section**
4. **Set "Start Command"**:
   ```
   uvicorn api_server:app --host 0.0.0.0 --port $PORT
   ```
5. **Make sure "Custom Build Command" is EMPTY** (or just: `pip install -r requirements.txt`)
6. **Click "Save"**
7. **Redeploy**

## Key Points

✅ **Start Command** = Used at runtime (when app starts) - PORT is available here  
❌ **Build Command** = Used during build (PORT not available yet) - Don't use PORT here

## Verify

After redeploy, check logs:
- ✅ Should see: "Using Nixpacks"
- ✅ Should see: "Starting Streamlit..." or "Application startup complete"
- ❌ Should NOT see: "PORT variable must be integer"

## Alternative: Use Procfile

If Railway UI doesn't work, Railway will auto-detect `Procfile`:

The `Procfile` is already in the repo with:
```
web: uvicorn api_server:app --host 0.0.0.0 --port $PORT
```

For Streamlit, you might need to create a separate Procfile or set it in UI.

## Still Not Working?

1. **Delete the service**
2. **Create new service from GitHub**
3. **Don't set any build commands**
4. **Only set start command in Deploy section**
5. **Let Railway auto-detect everything else**

