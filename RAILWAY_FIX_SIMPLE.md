# Quick Fix for Railway PORT Error

## The Problem
Railway is detecting your `Dockerfile` and trying to use it, but the Dockerfile has PORT issues.

## Solution: Use Nixpacks Instead of Docker

**Easiest fix** - Configure Railway to use Nixpacks (auto-detection) instead of Docker:

### For Each Service in Railway:

1. **Go to your service** (drm-dashboard-api or drm-dashboard-streamlit)
2. **Click "Settings"**
3. **Scroll to "Build" section**
4. **Change "Builder" from "Docker" to "Nixpacks"**
5. **Under "Deploy" section**, set:

#### For API Service:
- **Start Command**: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`

#### For Streamlit Service:
- **Start Command**: `streamlit run app_streamlit.py --server.port $PORT --server.address 0.0.0.0 --server.headless true`

6. **Click "Save"**
7. **Redeploy** the service

---

## Alternative: Rename Dockerfile

If you want to keep Dockerfile for other uses but not use it on Railway:

1. **Rename Dockerfile**:
   ```bash
   git mv Dockerfile Dockerfile.backup
   git commit -m "Rename Dockerfile to avoid Railway auto-detection"
   git push
   ```

2. **Railway will then use Nixpacks** automatically

---

## Why This Works

- **Nixpacks** = Railway's auto-detector (simpler, handles PORT automatically)
- **Docker** = Manual Dockerfile (more control, but needs proper PORT handling)

For Python apps, Nixpacks is usually easier and handles environment variables like PORT automatically.

---

## Quick Steps Summary

1. Railway Dashboard → Your Service → Settings
2. Change Builder: Docker → **Nixpacks**
3. Set Start Command (see above)
4. Save → Redeploy
5. Done! ✅

