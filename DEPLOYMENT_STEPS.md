# Deployment Steps for OSAA DRM Dashboard

## ✅ Step 1: Code is Pushed to GitHub

The code has been successfully pushed to: **https://github.com/monyas96/OSAA_DRM**

## 🚀 Step 2: Deploy Components

### A. Deploy React Frontend to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub
2. **Click "New Project"**
3. **Import Git Repository**: Select `monyas96/OSAA_DRM`
4. **Configure Project**:
   - **Root Directory**: `osaa-drm-app`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. **Environment Variables** (add these):
   - `VITE_API_URL`: (Leave empty for now, add after API is deployed)
   - `VITE_STREAMLIT_URL`: (Leave empty for now, add after Streamlit is deployed)
6. **Click "Deploy"**

### B. Deploy Streamlit to Streamlit Cloud

1. **Go to [share.streamlit.io](https://share.streamlit.io)**
2. **Sign in with GitHub**
3. **Click "New app"**
4. **Configure**:
   - **Repository**: `monyas96/OSAA_DRM`
   - **Branch**: `main`
   - **Main file path**: `app_streamlit.py`
   - **Python version**: 3.12
5. **Click "Deploy"**
6. **Copy the URL** (e.g., `https://osaa-drm.streamlit.app`)
7. **Update Vercel environment variable**:
   - Go back to Vercel → Your Project → Settings → Environment Variables
   - Update `VITE_STREAMLIT_URL` with your Streamlit URL
   - Redeploy

### C. Deploy FastAPI to Railway

1. **Go to [railway.app](https://railway.app)** and sign in with GitHub
2. **Click "New Project"** → "Deploy from GitHub repo"
3. **Select repository**: `monyas96/OSAA_DRM`
4. **Configure Service**:
   - **Root Directory**: `/` (root)
   - **Start Command**: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`
   - **Build Command**: `pip install -r requirements.txt && pip install fastapi uvicorn[standard]`
5. **Environment Variables**:
   - `ALLOWED_ORIGINS`: Add your Vercel URL (e.g., `https://osaa-drm.vercel.app`)
   - `PORT`: Auto-set by Railway
6. **Deploy**
7. **Copy the Railway URL** (e.g., `https://osaa-drm-api.railway.app`)
8. **Update Vercel environment variable**:
   - Go to Vercel → Settings → Environment Variables
   - Update `VITE_API_URL` with your Railway API URL
   - Redeploy

## 🔧 Step 3: Update CORS Settings

After getting your Railway API URL, update `api_server.py`:

1. **Edit `api_server.py`** (or set via Railway environment variable):
   ```python
   ALLOWED_ORIGINS = "https://your-vercel-app.vercel.app,https://your-streamlit-app.streamlit.app"
   ```

2. **Commit and push**:
   ```bash
   git add api_server.py
   git commit -m "Update CORS for production"
   git push
   ```

3. **Redeploy Railway** (auto-deploys on push if connected to GitHub)

## ✅ Step 4: Verify Deployment

1. **Test React App**: Visit your Vercel URL
2. **Test API**: Visit `https://your-api.railway.app/api/health`
3. **Test Streamlit**: Visit your Streamlit Cloud URL
4. **Test Integration**: 
   - Navigate through the React app
   - Check if Streamlit iframes load
   - Verify API calls work (check browser console)

## 🔄 Alternative: Deploy All to Railway

If you prefer a single platform:

1. **Use the provided `Dockerfile`**
2. **Deploy to Railway**:
   - Railway will detect the Dockerfile
   - Both FastAPI (port 8000) and Streamlit (port 8501) will run
   - Update environment variables accordingly

## 📝 Environment Variables Summary

### Vercel (React Frontend)
```
VITE_API_URL=https://your-api.railway.app
VITE_STREAMLIT_URL=https://your-app.streamlit.app
```

### Railway (FastAPI)
```
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
PORT=8000 (auto-set)
```

### Streamlit Cloud
No environment variables needed (uses data from repository)

## 🐛 Troubleshooting

### CORS Errors
- Ensure `ALLOWED_ORIGINS` includes your Vercel URL
- Check that API server is running
- Verify environment variables are set correctly

### Streamlit Not Loading
- Check Streamlit Cloud deployment status
- Verify iframe embedding is allowed
- Check browser console for errors

### API Not Found
- Verify API server is running on Railway
- Check API URL in environment variables
- Test API health endpoint directly

## 📞 Support

For deployment issues:
1. Check platform-specific logs (Vercel, Railway, Streamlit Cloud)
2. Review browser console for errors
3. Verify all environment variables are set
4. Ensure all services are deployed and running

