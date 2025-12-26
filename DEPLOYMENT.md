# Deployment Guide

This guide covers deploying the DRM Dashboard application, which consists of:
1. **React Frontend** (osaa-drm-app)
2. **Streamlit Backend** (Python/Streamlit)
3. **FastAPI Server** (Python/FastAPI for data API)

## Architecture Overview

- **Frontend**: React + Vite (Port 3000/5173)
- **Streamlit**: Python Streamlit app (Port 8501)
- **API Server**: FastAPI (Port 8000)

## Deployment Options

### Option 1: Vercel (Recommended for React Frontend)

#### Prerequisites
- Vercel account (free tier available)
- GitHub repository

#### Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy React Frontend**:
   ```bash
   cd osaa-drm-app
   vercel
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   - `VITE_API_URL`: Your FastAPI server URL (e.g., `https://your-api.railway.app`)
   - `VITE_STREAMLIT_URL`: Your Streamlit app URL (e.g., `https://your-streamlit.streamlit.app`)

4. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Option 2: Netlify (Alternative for React Frontend)

#### Steps

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
   - `VITE_API_URL`: Your FastAPI server URL
   - `VITE_STREAMLIT_URL`: Your Streamlit app URL

### Option 3: Streamlit Cloud (For Streamlit Backend)

#### Steps

1. **Push code to GitHub**

2. **Go to** [share.streamlit.io](https://share.streamlit.io)

3. **Connect your GitHub repository**

4. **Configure**:
   - Main file: `app_streamlit.py`
   - Python version: 3.10 or 3.12
   - Requirements: `requirements.txt`

5. **Set Environment Variables** (if needed):
   - Any API keys or configuration

### Option 4: Railway/Render (For FastAPI + Streamlit)

#### Railway Deployment

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

5. **Set Environment Variables**:
   - Port will be auto-assigned
   - Update CORS settings in `api_server.py`

#### Render Deployment

1. **Create a new Web Service** on Render

2. **Connect GitHub repository**

3. **Configure**:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`
   - Environment: Python 3

4. **Set Environment Variables**:
   - `PORT`: Auto-set by Render

## Environment Variables

### React Frontend (.env.production)
```env
VITE_API_URL=https://your-api-url.com
VITE_STREAMLIT_URL=https://your-streamlit-url.streamlit.app
```

### FastAPI Server
Update CORS origins in `api_server.py` to include your production domains:
```python
allow_origins=[
    "https://your-react-app.vercel.app",
    "https://your-react-app.netlify.app",
    # Add your production URLs
]
```

### Streamlit
No special environment variables needed, but ensure data files are included.

## Data Files

Ensure these files are included in deployment:
- `data/nexus.parquet`
- `data/iso3_country_reference.csv`
- `data/Pension_Fund_Asset_Allocation_by_Country.csv`
- `data/TJN_FSI.csv`
- Any other data files referenced

## Recommended Deployment Architecture

### Production Setup:
1. **React Frontend**: Vercel or Netlify
2. **Streamlit**: Streamlit Cloud
3. **FastAPI**: Railway or Render

### Alternative (All-in-one):
- Deploy everything on Railway/Render using Docker

## Docker Deployment (All-in-one)

Create a `Dockerfile` for containerized deployment:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install FastAPI and Uvicorn
RUN pip install fastapi uvicorn[standard]

# Copy application files
COPY . .

# Expose ports
EXPOSE 8000 8501

# Start both services
CMD ["sh", "-c", "uvicorn api_server:app --host 0.0.0.0 --port 8000 & streamlit run app_streamlit.py --server.port 8501 --server.address 0.0.0.0"]
```

## Post-Deployment Checklist

- [ ] Update API URLs in React app environment variables
- [ ] Update CORS settings in FastAPI server
- [ ] Test all API endpoints
- [ ] Test Streamlit iframe embedding
- [ ] Verify data files are accessible
- [ ] Test navigation between React and Streamlit
- [ ] Check mobile responsiveness
- [ ] Verify PDF export functionality
- [ ] Test all policy brief pages

## Troubleshooting

### CORS Errors
- Update `allow_origins` in `api_server.py` with production URLs
- Ensure environment variables are set correctly

### API Not Found
- Verify API server is running
- Check API URL in environment variables
- Verify network connectivity

### Streamlit Not Loading
- Check Streamlit Cloud deployment status
- Verify iframe embedding is allowed
- Check browser console for errors

## Support

For deployment issues, check:
- Vercel/Netlify build logs
- Streamlit Cloud logs
- API server logs
- Browser console errors

