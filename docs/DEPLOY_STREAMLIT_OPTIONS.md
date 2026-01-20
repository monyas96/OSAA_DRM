# Deploy Streamlit via GitHub Actions - Options

## ⚠️ Important Note

**GitHub Pages cannot run Streamlit apps** - it only serves static files. You need a platform that supports Python apps.

## Option 1: Keep Streamlit Cloud (Recommended - Easiest)

**Pros:**
- ✅ Free
- ✅ Automatic deployments on git push
- ✅ No configuration needed
- ✅ Built specifically for Streamlit
- ✅ Already working for you

**Cons:**
- ❌ Separate service (not in GitHub Actions)

**Current Setup:** You're already using this and it works!

---

## Option 2: Deploy to Railway via GitHub Actions

**Pros:**
- ✅ Free tier available
- ✅ Can deploy via GitHub Actions
- ✅ Automatic HTTPS
- ✅ Easy setup

**Cons:**
- ❌ Requires Railway account
- ❌ Need to set up Railway project first

### Setup Steps:

1. **Create Railway Account:**
   - Go to: https://railway.app
   - Sign in with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository: `monyas96/OSAA_DRM`
   - Railway will auto-detect it's a Python app

3. **Configure Service:**
   - **Root Directory:** `/` (root)
   - **Start Command:** `streamlit run app_streamlit.py --server.port $PORT`
   - **Environment Variables:** Add any needed (like data paths)

4. **Get Railway Token:**
   - Go to: https://railway.app/account/tokens
   - Create new token
   - Copy the token

5. **Add GitHub Secret:**
   - Go to: https://github.com/monyas96/OSAA_DRM/settings/secrets/actions
   - Add secret: `RAILWAY_TOKEN` = your token

6. **Get Service ID:**
   - In Railway dashboard, go to your service
   - Copy the service ID from the URL or settings

7. **Update Workflow:**
   - The workflow file `.github/workflows/deploy-streamlit.yml` is ready
   - Just add the `RAILWAY_TOKEN` secret

8. **Update React App:**
   - Get your Railway URL (e.g., `https://your-app.railway.app`)
   - Update GitHub secret: `VITE_STREAMLIT_URL` = Railway URL

---

## Option 3: Deploy to Render via GitHub Actions

**Pros:**
- ✅ Free tier available
- ✅ Can deploy via GitHub Actions
- ✅ Automatic HTTPS

**Cons:**
- ❌ Requires Render account
- ❌ Free tier spins down after inactivity

### Setup Steps:

1. **Create Render Account:**
   - Go to: https://render.com
   - Sign in with GitHub

2. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo: `monyas96/OSAA_DRM`
   - Configure:
     - **Name:** `osaa-drm-streamlit`
     - **Environment:** Python 3
     - **Build Command:** `pip install -r requirements.txt`
     - **Start Command:** `streamlit run app_streamlit.py --server.port $PORT --server.address 0.0.0.0`
     - **Plan:** Free

3. **Get API Key:**
   - Go to: https://dashboard.render.com/account/api-keys
   - Create new API key
   - Copy the key

4. **Get Service ID:**
   - In Render dashboard, go to your service
   - Service ID is in the URL or settings

5. **Add GitHub Secrets:**
   - `RENDER_API_KEY` = your API key
   - `RENDER_SERVICE_ID` = your service ID

6. **Update React App:**
   - Get your Render URL (e.g., `https://osaa-drm-streamlit.onrender.com`)
   - Update GitHub secret: `VITE_STREAMLIT_URL` = Render URL

---

## Option 4: Deploy to Fly.io via GitHub Actions

**Pros:**
- ✅ Free tier available
- ✅ Good performance
- ✅ Can deploy via GitHub Actions

**Cons:**
- ❌ More complex setup
- ❌ Requires Docker

### Setup Steps:

1. **Install Fly CLI and create app:**
   ```bash
   fly auth login
   fly launch
   ```

2. **Create Dockerfile:**
   ```dockerfile
   FROM python:3.12-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   EXPOSE 8080
   CMD streamlit run app_streamlit.py --server.port 8080 --server.address 0.0.0.0
   ```

3. **Add GitHub Secrets:**
   - `FLY_API_TOKEN` = your Fly.io token

4. **Update workflow** to use Fly.io deployment

---

## Recommendation

**Keep using Streamlit Cloud** - it's the easiest and most reliable option for Streamlit apps. The "github.com refused to connect" issue is likely a CORS/security issue, not a deployment issue.

If you want everything in GitHub Actions for automation, **Railway** is the best option:
- Easy setup
- Free tier
- Good performance
- Automatic deployments

---

## Quick Comparison

| Platform | Free Tier | Auto-Deploy | Setup Difficulty | Performance |
|----------|-----------|-------------|------------------|-------------|
| Streamlit Cloud | ✅ Yes | ✅ Yes | ⭐ Easy | ⭐⭐⭐ Good |
| Railway | ✅ Yes | ✅ Yes | ⭐⭐ Medium | ⭐⭐⭐ Good |
| Render | ✅ Yes | ✅ Yes | ⭐⭐ Medium | ⭐⭐ Fair (spins down) |
| Fly.io | ✅ Yes | ✅ Yes | ⭐⭐⭐ Hard | ⭐⭐⭐ Excellent |

---

## Next Steps

If you want to proceed with Railway:

1. I can help you set up the Railway deployment
2. Update the GitHub Actions workflow
3. Update the React app to use the new Streamlit URL

Let me know which option you prefer!

