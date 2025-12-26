# ⚡ INSTALL AND RUN - Step by Step

## You need to run these commands:

```bash
# 1. Go to the app directory
cd osaa-drm-app

# 2. Install all dependencies (DO THIS FIRST!)
npm install

# 3. Start the development server
npm run dev
```

## What happens:

1. **`npm install`** downloads and installs:
   - React framework
   - Vite (build tool)
   - Tailwind CSS (styling)
   - Framer Motion (animations)
   - Lucide React (icons)

2. **`npm run dev`** starts a local web server
   - Opens at: http://localhost:3000
   - Auto-refreshes when you edit files
   - Shows errors in browser console

## Expected Output:

After `npm run dev`, you should see:
```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h + enter to show help
```

Then open **http://localhost:3000** in your browser.

## If you see errors:

1. **"npm: command not found"**
   → Install Node.js: https://nodejs.org/

2. **"Port 3000 already in use"**
   → Change port in `vite.config.js` or close other apps

3. **Blank page**
   → Open browser console (F12) and check for errors
   → Make sure you ran `npm install` first

4. **"Cannot find module"**
   → Delete `node_modules` folder
   → Run `npm install` again

## This is a SEPARATE app

⚠️ **Important**: This React app is separate from your Streamlit app. 
- Streamlit app: `pages/04_hero_story.py` (runs with `streamlit run`)
- React app: `osaa-drm-app/` (runs with `npm run dev`)

They are two different applications!

