# Troubleshooting Deployment Issues

## 404 NOT_FOUND Error

If you're seeing a 404 error after deployment, here are common causes and solutions:

### 1. Vercel Routing Issue

**Problem**: React Router routes not working on Vercel.

**Solution**: The `vercel.json` has been updated with proper rewrites. Make sure:
- The file exists in `osaa-drm-app/vercel.json`
- Vercel is configured to use the `osaa-drm-app` directory as root
- The build output directory is set to `dist`

**Check Vercel Settings**:
1. Go to your project on Vercel
2. Settings → General
3. Root Directory: `osaa-drm-app`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Framework Preset: `Vite`

### 2. Missing Environment Variables

**Problem**: API or Streamlit URLs not configured.

**Solution**: Set environment variables in Vercel:
1. Go to Project → Settings → Environment Variables
2. Add:
   - `VITE_API_URL`: Your FastAPI server URL
   - `VITE_STREAMLIT_URL`: Your Streamlit app URL
3. Redeploy after adding variables

### 3. Build Failures

**Problem**: Build fails during deployment.

**Check**:
- Node.js version (should be 18+)
- All dependencies are in `package.json`
- No syntax errors in code

**Solution**:
```bash
cd osaa-drm-app
npm install
npm run build
```

If build succeeds locally, check Vercel build logs for specific errors.

### 4. API Server Not Running

**Problem**: React app can't connect to API.

**Check**:
- API server is deployed and running
- CORS is configured correctly
- API URL in environment variables is correct

**Test API**:
```bash
curl https://your-api-url.com/api/health
```

### 5. Streamlit Not Loading

**Problem**: Streamlit iframes show errors.

**Check**:
- Streamlit Cloud deployment is active
- Streamlit URL in environment variables is correct
- Browser console for CORS or iframe errors

### 6. GitHub Repository Issues

**Problem**: Vercel can't access the repository.

**Solution**:
1. Verify repository is public or Vercel has access
2. Check GitHub connection in Vercel settings
3. Reconnect repository if needed

## Common Error Messages

### "Module not found"
- Check that all dependencies are in `package.json`
- Run `npm install` locally to verify

### "Failed to fetch"
- Check API server is running
- Verify CORS settings
- Check network tab in browser console

### "Cannot read property of undefined"
- Check environment variables are set
- Verify API responses are correct format

## Quick Fixes

### Redeploy on Vercel
1. Go to Deployments
2. Click "..." on latest deployment
3. Select "Redeploy"

### Clear Build Cache
1. Settings → General
2. Scroll to "Build & Development Settings"
3. Clear build cache
4. Redeploy

### Check Logs
1. Go to Deployments
2. Click on a deployment
3. View "Build Logs" and "Function Logs"

## Still Having Issues?

1. **Check Vercel Status**: https://www.vercel-status.com/
2. **Review Build Logs**: Look for specific error messages
3. **Test Locally**: Ensure everything works locally first
4. **Check Browser Console**: Look for JavaScript errors
5. **Verify Environment Variables**: Make sure all are set correctly

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected
- [ ] Root directory set to `osaa-drm-app`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables set
- [ ] API server deployed and running
- [ ] Streamlit app deployed and running
- [ ] CORS configured on API server
- [ ] Test all routes work
- [ ] Test API connections
- [ ] Test Streamlit iframes

