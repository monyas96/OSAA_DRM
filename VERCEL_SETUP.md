# Vercel Setup Instructions

## The Problem
Vercel is trying to build from the repository root, but the React app is in the `osaa-drm-app` subdirectory.

## Solution 1: Configure Root Directory in Vercel (Recommended)

1. **Go to your Vercel project**: https://vercel.com/dashboard
2. **Click on your project** (`osaa-drm`)
3. **Go to Settings** → **General**
4. **Scroll to "Root Directory"**
5. **Click "Edit"** and set it to: `osaa-drm-app`
6. **Save** and **Redeploy**

This tells Vercel to treat `osaa-drm-app` as the project root.

## Solution 2: Use Root-Level vercel.json (Already Added)

A root-level `vercel.json` has been added that configures the build to run from the subdirectory. This should work automatically, but you may still need to set the root directory in Vercel settings.

## After Setting Root Directory

1. **Go to Deployments**
2. **Click "Redeploy"** on the latest deployment, or push a new commit
3. **Wait for the build to complete**

## Verify Settings

In Vercel Settings → General, verify:
- **Root Directory**: `osaa-drm-app`
- **Framework Preset**: `Vite` (or auto-detected)
- **Build Command**: `npm run build` (should auto-detect)
- **Output Directory**: `dist` (should auto-detect)
- **Install Command**: `npm install` (should auto-detect)

## Environment Variables

Don't forget to set these in **Settings → Environment Variables**:
- `VITE_API_URL`: Your FastAPI server URL
- `VITE_STREAMLIT_URL`: Your Streamlit app URL

## If Still Getting Errors

1. **Check Build Logs**: Look for specific error messages
2. **Verify package.json exists**: Should be in `osaa-drm-app/package.json`
3. **Test locally**: 
   ```bash
   cd osaa-drm-app
   npm install
   npm run build
   ```
4. **Clear Vercel cache**: Settings → General → Clear Build Cache

