# Fix CORS/Security Issue - Step by Step

## The Problem

The "github.com refused to connect" error is likely caused by:
1. **CORS disabled** in Streamlit config (`enableCORS = false`)
2. **XSRF protection** blocking iframe requests
3. **Streamlit Cloud** trying to access GitHub resources internally

## Solution

### Step 1: Update Streamlit Config ✅ (Already Done)

I've updated `.streamlit/config.toml` to:
- ✅ Enable CORS (`enableCORS = true`)
- ✅ Disable XSRF protection for iframe embedding
- ✅ Allow iframe embedding

### Step 2: Verify Streamlit Cloud Settings

1. **Go to Streamlit Cloud Dashboard:**
   - Visit: https://share.streamlit.io
   - Sign in and find your app: `osaadrm`

2. **Check App Settings:**
   - Click on your app
   - Go to "Settings" or "⚙️" icon
   - Verify:
     - **Public access** is enabled
     - **Embedding** is allowed (if there's an option)

3. **Redeploy the App:**
   - Go to "⚙️ Settings" → "Advanced settings"
   - Click "Redeploy" or "Clear cache and redeploy"
   - This will pick up the new config changes

### Step 3: Update React App (If Needed)

The React app is already configured correctly with:
- ✅ `?embed=true` parameter
- ✅ Proper iframe sandbox attributes
- ✅ CORS handling

### Step 4: Test the Fix

1. **Wait 2-3 minutes** after redeploying Streamlit
2. **Clear browser cache:**
   - Press `Ctrl+Shift+Delete` (Windows/Linux) or `Cmd+Shift+Delete` (Mac)
   - Clear cached images and files
3. **Test the connection:**
   - Visit: https://monyas96.github.io/OSAA_DRM/exploratory
   - Check if Streamlit loads without "github.com refused to connect" error

### Step 5: If Still Not Working

**Check Streamlit Cloud Logs:**
1. Go to: https://share.streamlit.io
2. Click on your app
3. Click "Manage app" → "Logs"
4. Look for errors about:
   - GitHub connections
   - CORS issues
   - Resource loading failures

**Common Issues:**

1. **"github.com refused to connect" still appears:**
   - This might be Streamlit Cloud trying to fetch repository info
   - Check if your repository is public (Streamlit Cloud needs access)
   - Verify the app has proper permissions

2. **CORS errors in browser console:**
   - Open browser console (F12)
   - Look for CORS errors
   - The config change should fix this

3. **Iframe still blocked:**
   - Check browser console for security errors
   - Verify the iframe has proper `sandbox` attributes (already set)
   - Try opening Streamlit directly: https://osaadrm.streamlit.app

---

## Alternative: Use Streamlit's Embedding Feature

Streamlit Cloud has built-in embedding support. Make sure you're using:
- URL format: `https://osaadrm.streamlit.app/?embed=true`
- This is already what we're using ✅

---

## Quick Checklist

- [x] Updated `.streamlit/config.toml` with `enableCORS = true`
- [ ] Redeployed Streamlit app on Streamlit Cloud
- [ ] Cleared browser cache
- [ ] Tested the connection
- [ ] Checked Streamlit Cloud logs for errors

---

## Next Steps

1. **Commit and push the config change:**
   ```bash
   git add .streamlit/config.toml
   git commit -m "Fix CORS: Enable CORS for iframe embedding"
   git push origin main
   ```

2. **Redeploy on Streamlit Cloud:**
   - Streamlit Cloud will auto-detect the change
   - Or manually trigger redeploy from dashboard

3. **Test after 2-3 minutes**

The config change should fix the CORS issue. The "github.com refused to connect" error might be a separate issue with Streamlit Cloud itself, but enabling CORS should help with iframe embedding.

