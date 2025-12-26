# Deploy React App to GitHub Pages - Final Steps

## ✅ Prerequisites (You Have These!)

- ✅ Railway API deployed and working
- ✅ Streamlit deployed (Streamlit Cloud or Railway)
- ✅ GitHub repository: `monyas96/OSAA_DRM`
- ✅ GitHub Actions workflow already set up

---

## Step 1: Get Your URLs

You need these URLs to set as secrets:

### API URL (from Railway):
1. **Go to Railway Dashboard**
2. **Click on `drm-dashboard-api` service**
3. **Click "Settings"** → **"Networking"** or check the service URL
4. **Copy the URL** (e.g., `https://drm-dashboard-api-production.up.railway.app`)
   - **Important**: Use the base URL, no `/api` at the end

### Streamlit URL:
- If on **Streamlit Cloud**: `https://your-app.streamlit.app`
- If on **Railway**: Check the `drm-dashboard-streamlit` service URL

---

## Step 2: Set GitHub Secrets

1. **Go to**: https://github.com/monyas96/OSAA_DRM/settings/secrets/actions

2. **Click "New repository secret"**

3. **Add Secret 1:**
   - **Name**: `VITE_API_URL`
   - **Value**: Your Railway API URL (e.g., `https://drm-dashboard-api-production.up.railway.app`)
   - **Click "Add secret"**

4. **Click "New repository secret" again**

5. **Add Secret 2:**
   - **Name**: `VITE_STREAMLIT_URL`
   - **Value**: Your Streamlit URL (e.g., `https://your-app.streamlit.app`)
   - **Click "Add secret"**

---

## Step 3: Enable GitHub Pages

1. **Go to**: https://github.com/monyas96/OSAA_DRM/settings/pages

2. **Under "Source"**:
   - Select: **"GitHub Actions"** (NOT "Deploy from a branch")
   
3. **Click "Save"**

---

## Step 4: Trigger Deployment

1. **Go to**: https://github.com/monyas96/OSAA_DRM/actions

2. **Click on "Deploy to GitHub Pages"** workflow

3. **Click "Run workflow"** button (top right)

4. **Select branch**: `main`

5. **Click "Run workflow"**

6. **Wait 2-3 minutes** for deployment to complete

---

## Step 5: Update API CORS

After React is deployed, update API to allow GitHub Pages:

1. **Go to Railway** → `drm-dashboard-api` service
2. **Click "Variables" tab**
3. **Add/Update variable**:
   - **Key**: `ALLOWED_ORIGINS`
   - **Value**: `https://monyas96.github.io`
4. **Redeploy API** (or it will auto-redeploy)

---

## Step 6: Your App is Live! 🎉

Your React app will be available at:
**https://monyas96.github.io/OSAA_DRM/**

---

## Quick Checklist

- [ ] Get Railway API URL
- [ ] Get Streamlit URL
- [ ] Set `VITE_API_URL` secret in GitHub
- [ ] Set `VITE_STREAMLIT_URL` secret in GitHub
- [ ] Enable GitHub Pages (Settings → Pages → GitHub Actions)
- [ ] Run GitHub Actions workflow
- [ ] Update API CORS with GitHub Pages URL
- [ ] Test your deployed app!

---

## Troubleshooting

### Build fails?
- Check "Actions" tab for error logs
- Verify secrets are set correctly (exact names: `VITE_API_URL`, `VITE_STREAMLIT_URL`)
- Make sure URLs don't have trailing slashes

### API not connecting?
- Check API is running (visit `/api/health` endpoint)
- Verify CORS includes `https://monyas96.github.io`
- Check browser console for errors

### 404 errors on GitHub Pages?
- Make sure base path in `vite.config.js` is `/OSAA_DRM/`
- GitHub Pages needs repository name in path

---

## What's Deployed Where

| Component | Platform | URL |
|-----------|----------|-----|
| **React Frontend** | GitHub Pages | `https://monyas96.github.io/OSAA_DRM/` |
| **FastAPI Server** | Railway | `https://your-api.railway.app` |
| **Streamlit App** | Streamlit Cloud / Railway | `https://your-app.streamlit.app` |

All free! 🎉

