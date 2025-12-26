# Quick Deployment Guide

## Option 1: Deploy React Frontend to Vercel (Easiest)

### Steps:

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Navigate to React app**:
   ```bash
   cd osaa-drm-app
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts to connect your GitHub repository.

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project → Settings → Environment Variables
   - Add:
     - `VITE_API_URL`: Your FastAPI server URL (e.g., `https://your-api.railway.app`)
     - `VITE_STREAMLIT_URL`: Your Streamlit app URL (e.g., `https://your-app.streamlit.app`)

5. **Redeploy** after setting environment variables:
   ```bash
   vercel --prod
   ```

## Option 2: Deploy React Frontend to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   cd osaa-drm-app
   netlify deploy --prod
   ```

3. **Set Environment Variables** in Netlify Dashboard:
   - Go to Site settings → Environment variables
   - Add `VITE_API_URL` and `VITE_STREAMLIT_URL`

## Option 3: Deploy Streamlit to Streamlit Cloud

1. **Push your code to GitHub**

2. **Go to** [share.streamlit.io](https://share.streamlit.io)

3. **Click "New app"**

4. **Configure**:
   - Repository: Your GitHub repo
   - Branch: `main` (or your default branch)
   - Main file: `app_streamlit.py`
   - Python version: 3.12

5. **Click "Deploy"**

## Option 4: Deploy FastAPI to Railway

1. **Install Railway CLI**:
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**:
   ```bash
   railway login
   ```

3. **Initialize**:
   ```bash
   railway init
   ```

4. **Deploy**:
   ```bash
   railway up
   ```

5. **Get your URL** from Railway dashboard and update React app's `VITE_API_URL`

## Environment Variables Summary

### React App (.env.production or Vercel/Netlify settings):
```
VITE_API_URL=https://your-api.railway.app
VITE_STREAMLIT_URL=https://your-app.streamlit.app
```

### FastAPI Server:
Update `api_server.py` CORS settings to include your production React URL.

## Quick Test

After deployment, test:
1. React app loads at your Vercel/Netlify URL
2. API responds at `/api/health`
3. Streamlit loads in iframe
4. Navigation works between React and Streamlit

