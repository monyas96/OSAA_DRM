# Complete GitHub Deployment Guide

## Important: What Can Run on GitHub

- ✅ **React Frontend** → GitHub Pages (static files)
- ❌ **FastAPI Server** → Cannot run on GitHub Pages (needs a server)
- ✅ **Streamlit** → Streamlit Cloud (separate platform)

**Solution**: Deploy API to Railway/Render, then use those URLs as secrets.

---

## Step 1: Deploy API First (Get the URL)

### Option A: Railway (Recommended)

1. **Go to** https://railway.app
2. **Sign in with GitHub**
3. **New Project** → **Deploy from GitHub repo**
4. **Select**: `monyas96/OSAA_DRM`
5. **Configure**:
   - **Service Name**: `drm-dashboard-api`
   - **Start Command**: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`
6. **Wait for deployment** (3-5 minutes)
7. **Copy the URL** (e.g., `https://osaa-drm-api.up.railway.app`)

### Option B: Render (Alternative)

1. **Go to** https://render.com
2. **Sign in with GitHub**
3. **New** → **Web Service**
4. **Connect**: `monyas96/OSAA_DRM`
5. **Configure**:
   - **Name**: `drm-dashboard-api`
   - **Start Command**: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`
6. **Wait for deployment**
7. **Copy the URL** (e.g., `https://osaa-drm-api.onrender.com`)

---

## Step 2: Deploy Streamlit (Get the URL)

1. **Go to** https://share.streamlit.io
2. **Sign in with GitHub**
3. **New app**
4. **Repository**: `monyas96/OSAA_DRM`
5. **Main file**: `app_streamlit.py`
6. **Deploy**
7. **Copy the URL** (e.g., `https://osaa-drm.streamlit.app`)

---

## Step 3: Set GitHub Secrets

Now that you have your URLs, set them as secrets:

### How to Set Secrets:

1. **Go to your repository**: https://github.com/monyas96/OSAA_DRM
2. **Click "Settings"** (top menu)
3. **Click "Secrets and variables"** → **"Actions"** (left sidebar)
4. **Click "New repository secret"**

### Add These Secrets:

#### Secret 1: API URL
- **Name**: `VITE_API_URL`
- **Value**: Your Railway/Render API URL
  - Example: `https://osaa-drm-api.up.railway.app`
  - **Important**: Don't include `/api` at the end, just the base URL
- **Click "Add secret"**

#### Secret 2: Streamlit URL
- **Name**: `VITE_STREAMLIT_URL`
- **Value**: Your Streamlit Cloud URL
  - Example: `https://osaa-drm.streamlit.app`
- **Click "Add secret"**

#### Secret 3: (Optional) Railway Token (for auto-deploy)
If you want GitHub Actions to auto-deploy API changes:

1. **Go to Railway**: https://railway.app/account/tokens
2. **Create new token**
3. **Copy the token**
4. **Add as secret**:
   - **Name**: `RAILWAY_TOKEN`
   - **Value**: (paste your token)

---

## Step 4: Enable GitHub Pages

1. **Go to**: https://github.com/monyas96/OSAA_DRM/settings/pages
2. **Under "Source"**:
   - Select **"GitHub Actions"**
3. **Save**

---

## Step 5: Deploy React App

The workflow is already set up! Just:

1. **Go to "Actions" tab** in your repository
2. **You should see "Deploy to GitHub Pages" workflow**
3. **Click on it** → **"Run workflow"** → **"Run workflow"**
4. **Wait 2-3 minutes**

Your React app will be live at: **https://monyas96.github.io/OSAA_DRM/**

---

## Step 6: Update API CORS

After React is deployed, update API CORS to allow GitHub Pages:

1. **Go to Railway/Render** (where your API is)
2. **Environment Variables**:
   - **Key**: `ALLOWED_ORIGINS`
   - **Value**: `https://monyas96.github.io`
3. **Redeploy API**

---

## Summary: What Runs Where

| Component | Platform | URL |
|-----------|----------|-----|
| **React Frontend** | GitHub Pages | `https://monyas96.github.io/OSAA_DRM/` |
| **FastAPI Server** | Railway/Render | `https://your-api.railway.app` |
| **Streamlit App** | Streamlit Cloud | `https://your-app.streamlit.app` |

---

## Quick Checklist

- [ ] Deploy API to Railway/Render → Get API URL
- [ ] Deploy Streamlit to Streamlit Cloud → Get Streamlit URL
- [ ] Set `VITE_API_URL` secret in GitHub
- [ ] Set `VITE_STREAMLIT_URL` secret in GitHub
- [ ] Enable GitHub Pages (Settings → Pages → GitHub Actions)
- [ ] Run GitHub Actions workflow (Actions tab)
- [ ] Update API CORS with GitHub Pages URL
- [ ] Test your deployed app!

---

## Troubleshooting

### Secrets not working?
- Make sure secret names are exactly: `VITE_API_URL` and `VITE_STREAMLIT_URL`
- Check that URLs don't have trailing slashes
- Verify secrets are in "Actions" secrets, not "Dependabot"

### API not connecting?
- Check API is running (visit `/api/health` endpoint)
- Verify CORS includes `https://monyas96.github.io`
- Check browser console for errors

### Build fails?
- Check "Actions" tab for error logs
- Verify all secrets are set
- Make sure API and Streamlit are deployed first

---

## All Free! 🎉

- ✅ GitHub Pages: Free
- ✅ Railway: 500 hours/month free
- ✅ Streamlit Cloud: Free forever
- ✅ Render: Free tier (sleeps after inactivity)

---

## Need Help?

If you get stuck:
1. Check which step you're on
2. Share the error message
3. I'll help you fix it!

