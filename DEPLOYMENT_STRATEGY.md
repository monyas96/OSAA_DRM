# Complete Deployment Strategy - Step by Step

## Overview: 3 Services to Deploy

1. **Streamlit** → Streamlit Cloud (FREE)
2. **React Frontend** → Netlify or Vercel (FREE)
3. **FastAPI Server** → Railway or Render (FREE tier)

All three have free tiers that should be sufficient for your needs.

---

## Step 1: Deploy Streamlit (5 minutes) ✅ FREE

### Platform: Streamlit Cloud
- **Cost**: FREE forever
- **URL**: https://share.streamlit.io

### Steps:
1. Go to [share.streamlit.io](https://share.streamlit.io)
2. Sign in with GitHub
3. Click "New app"
4. **Repository**: `monyas96/OSAA_DRM`
5. **Branch**: `main`
6. **Main file**: `app_streamlit.py`
7. **Python version**: 3.12
8. Click "Deploy"

**Wait 2-3 minutes** → You'll get a URL like: `https://osaa-drm.streamlit.app`

**Save this URL** - you'll need it for Step 2 and 3!

---

## Step 2: Deploy FastAPI Server (10 minutes) ✅ FREE

### Platform Options (both free):

### Option A: Railway (Recommended - Easier)
- **Cost**: FREE tier (500 hours/month)
- **URL**: https://railway.app

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose `monyas96/OSAA_DRM`
6. Railway will detect it's a Python project
7. **Configure**:
   - **Root Directory**: `/` (root)
   - **Start Command**: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`
   - **Build Command**: `pip install -r requirements.txt && pip install fastapi uvicorn[standard]`
8. **Add Environment Variable**:
   - Key: `ALLOWED_ORIGINS`
   - Value: `https://your-netlify-app.netlify.app` (you'll update this after Step 3)
9. Click "Deploy"

**Wait 3-5 minutes** → You'll get a URL like: `https://osaa-drm-api.railway.app`

**Save this URL** - you'll need it for Step 3!

### Option B: Render (Alternative)
- **Cost**: FREE tier (sleeps after 15 min inactivity)
- **URL**: https://render.com

**Steps:**
1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New" → "Web Service"
4. Connect repository: `monyas96/OSAA_DRM`
5. **Configure**:
   - **Name**: `osaa-drm-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt && pip install fastapi uvicorn[standard]`
   - **Start Command**: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`
6. **Environment Variables**:
   - `ALLOWED_ORIGINS`: `https://your-netlify-app.netlify.app` (update after Step 3)
7. Click "Create Web Service"

**Wait 3-5 minutes** → You'll get a URL like: `https://osaa-drm-api.onrender.com`

---

## Step 3: Deploy React Frontend (10 minutes) ✅ FREE

### Platform Options (both free):

### Option A: Netlify (Recommended - Simpler than Vercel)
- **Cost**: FREE forever
- **URL**: https://netlify.com

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select repository: `monyas96/OSAA_DRM`
5. **Configure build settings**:
   - **Base directory**: `osaa-drm-app`
   - **Build command**: `npm run build`
   - **Publish directory**: `osaa-drm-app/dist`
6. **Add Environment Variables** (click "Show advanced"):
   - `VITE_API_URL`: `https://your-api.railway.app` (from Step 2)
   - `VITE_STREAMLIT_URL`: `https://your-app.streamlit.app` (from Step 1)
7. Click "Deploy site"

**Wait 2-3 minutes** → You'll get a URL like: `https://osaa-drm.netlify.app`

### Option B: Vercel (Alternative)
- **Cost**: FREE tier
- **URL**: https://vercel.com

**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import repository: `monyas96/OSAA_DRM`
5. **Configure**:
   - **Root Directory**: `osaa-drm-app` (click "Edit" to set this)
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto)
   - **Output Directory**: `dist` (auto)
6. **Environment Variables**:
   - `VITE_API_URL`: `https://your-api.railway.app`
   - `VITE_STREAMLIT_URL`: `https://your-app.streamlit.app`
7. Click "Deploy"

**Wait 2-3 minutes** → You'll get a URL like: `https://osaa-drm.vercel.app`

---

## Step 4: Update CORS Settings

After deploying React, update the API server's CORS settings:

1. **Go back to Railway/Render** (where you deployed the API)
2. **Update Environment Variable**:
   - `ALLOWED_ORIGINS`: Change to your actual Netlify/Vercel URL
   - Example: `https://osaa-drm.netlify.app`
3. **Redeploy** the API service

---

## Summary: What Each Service Does

| Service | What It Does | Where It's Deployed | Cost |
|---------|-------------|---------------------|------|
| **Streamlit** | Exploratory data views, all topics, data availability | Streamlit Cloud | FREE |
| **FastAPI** | Serves data to React app (JSON API) | Railway or Render | FREE |
| **React** | Policy briefs, landing page, navigation | Netlify or Vercel | FREE |

---

## Total Cost: $0 (All Free Tiers)

- ✅ Streamlit Cloud: Free forever
- ✅ Netlify/Vercel: Free forever
- ✅ Railway: 500 hours/month free
- ✅ Render: Free tier (sleeps after inactivity)

---

## Quick Checklist

- [ ] Step 1: Deploy Streamlit → Get Streamlit URL
- [ ] Step 2: Deploy FastAPI → Get API URL
- [ ] Step 3: Deploy React → Get React URL
- [ ] Step 4: Update API CORS with React URL
- [ ] Step 5: Update React env vars with API and Streamlit URLs
- [ ] Step 6: Test everything works!

---

## Troubleshooting

### React can't connect to API
- Check API URL in React environment variables
- Verify API is running (visit `/api/health` endpoint)
- Check CORS settings in API

### Streamlit not loading in React
- Check Streamlit URL in React environment variables
- Verify Streamlit app is deployed and accessible
- Check browser console for errors

### API not responding
- Check Railway/Render logs
- Verify environment variables are set
- Make sure API server started successfully

---

## Need Help?

If you get stuck at any step, let me know which step and what error you're seeing!

