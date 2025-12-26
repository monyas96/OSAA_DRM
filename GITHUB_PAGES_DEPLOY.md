# Deploy React App to GitHub Pages (FREE!)

## ✅ Yes! You can publish the React app on GitHub Pages for FREE

GitHub Pages is perfect for hosting static React apps. Here's how:

---

## Step 1: Enable GitHub Pages

1. **Go to your repository**: https://github.com/monyas96/OSAA_DRM
2. **Click "Settings"** (top menu)
3. **Scroll down to "Pages"** (left sidebar)
4. **Under "Source"**:
   - Select **"GitHub Actions"** (not "Deploy from a branch")
5. **Save**

---

## Step 2: Add Environment Variables (Secrets)

1. **In your repository**, go to **Settings** → **Secrets and variables** → **Actions**
2. **Click "New repository secret"**
3. **Add these secrets**:
   - **Name**: `VITE_API_URL`
     - **Value**: Your API URL (e.g., `https://your-api.railway.app`)
   - **Name**: `VITE_STREAMLIT_URL`
     - **Value**: Your Streamlit URL (e.g., `https://your-app.streamlit.app`)
4. **Click "Add secret"** for each

---

## Step 3: Push the Deployment Workflow

I've created a GitHub Actions workflow that will:
- Build your React app automatically
- Deploy it to GitHub Pages
- Update on every push to `main`

**The workflow file is already created** at: `.github/workflows/deploy.yml`

**Just push it:**
```bash
git add .github/workflows/deploy.yml osaa-drm-app/vite.config.js
git commit -m "Add GitHub Pages deployment"
git push
```

---

## Step 4: Wait for Deployment

1. **Go to "Actions" tab** in your GitHub repository
2. **You'll see the workflow running**
3. **Wait 2-3 minutes** for it to complete
4. **When done**, your app will be live at:
   - `https://monyas96.github.io/OSAA_DRM/`

---

## Step 5: Update Your URLs

After deployment, you'll need to update:
- **API CORS settings** to include: `https://monyas96.github.io`
- **Any hardcoded URLs** in your code

---

## Benefits of GitHub Pages

✅ **FREE forever**  
✅ **Automatic HTTPS**  
✅ **Auto-deploys on every push**  
✅ **No separate hosting account needed**  
✅ **Custom domain support** (optional)

---

## Your App URLs

After deployment:
- **React App**: `https://monyas96.github.io/OSAA_DRM/`
- **Streamlit**: (your Streamlit Cloud URL)
- **API**: (your Railway/Render URL)

---

## Troubleshooting

### Build fails?
- Check "Actions" tab for error logs
- Verify environment variables (secrets) are set
- Make sure `package.json` has correct build script

### App loads but API doesn't work?
- Check CORS settings on your API server
- Verify `VITE_API_URL` secret is set correctly
- Check browser console for errors

### 404 errors?
- Make sure base path in `vite.config.js` is `/OSAA_DRM/`
- GitHub Pages needs the repository name in the path

---

## Alternative: Use a Custom Domain

If you have a domain, you can:
1. Go to repository **Settings** → **Pages**
2. Enter your custom domain
3. Update DNS records as instructed

Then your app will be at: `https://yourdomain.com`

---

## Summary

**GitHub Pages is the simplest free option!** Just:
1. Enable Pages in Settings
2. Add secrets for API/Streamlit URLs
3. Push the workflow file
4. Done! 🎉

Your React app will be live at: `https://monyas96.github.io/OSAA_DRM/`

