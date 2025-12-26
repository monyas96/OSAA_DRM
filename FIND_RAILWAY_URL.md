# How to Find Your Railway API URL

## Step-by-Step Instructions

### Method 1: From Service Overview (Easiest)

1. **Go to Railway Dashboard**: https://railway.app
2. **Click on your project** (e.g., "fearless-peace" or your project name)
3. **Look at the service cards** on the left sidebar
4. **Click on `drm-dashboard-api`** service card
5. **In the main panel**, you'll see:
   - **Service name** at the top
   - **A URL** displayed below the service name
   - It will look like: `drm-dashboard-api-production.up.railway.app`
   - Or: `https://drm-dashboard-api-production.up.railway.app`

6. **Copy that URL** - that's your API URL!

---

### Method 2: From Settings → Networking

1. **Click on `drm-dashboard-api`** service
2. **Click "Settings" tab** (top menu)
3. **Scroll down to "Networking" section**
4. **Look for "Public Domain"** or "Custom Domain"
5. **Copy the URL** shown there

---

### Method 3: From Deployments Tab

1. **Click on `drm-dashboard-api`** service
2. **Click "Deployments" tab**
3. **Look at the latest deployment**
4. **You'll see the deployment URL** in the deployment details
5. **Copy that URL**

---

### Method 4: Generate Public Domain (If Not Visible)

If you don't see a URL:

1. **Click on `drm-dashboard-api`** service
2. **Click "Settings" tab**
3. **Scroll to "Networking" section**
4. **Click "Generate Domain"** button
5. **Railway will create a public URL** for you
6. **Copy that URL**

---

## What the URL Looks Like

Your Railway API URL will be one of these formats:

- `drm-dashboard-api-production.up.railway.app`
- `https://drm-dashboard-api-production.up.railway.app`
- `drm-dashboard-api.railway.app`
- `https://drm-dashboard-api.railway.app`

**Important**: 
- Use the **base URL** (no `/api` at the end)
- Include `https://` if it's not there
- Example: `https://drm-dashboard-api-production.up.railway.app`

---

## Test Your API URL

Once you have the URL, test it:

1. **Open in browser**: `https://your-api-url.railway.app/api/health`
2. **Should return**: `{"status":"ok"}` or similar JSON
3. **If it works**, that's the correct URL!

---

## Quick Visual Guide

```
Railway Dashboard
├── Your Project
    ├── drm-dashboard-api ← Click here
    │   ├── Deployments tab → Shows URL
    │   ├── Settings → Networking → Shows URL
    │   └── Main panel → Shows URL at top
    └── drm-dashboard-streamlit
```

---

## Still Can't Find It?

1. **Check if service is deployed**:
   - Service should show "Running" (green) not "Failed" (red)

2. **Check if domain is generated**:
   - Go to Settings → Networking
   - Click "Generate Domain" if needed

3. **Check deployment logs**:
   - Go to Deployments tab
   - Latest deployment should show the URL

---

## Example Screenshot Locations

The URL typically appears:
- **Top of service panel** (main view)
- **Settings → Networking section**
- **Deployment details** (when you click on a deployment)

---

## Need Help?

If you still can't find it:
1. Take a screenshot of your Railway dashboard
2. Or tell me what you see in the service panel
3. I'll help you locate it!

