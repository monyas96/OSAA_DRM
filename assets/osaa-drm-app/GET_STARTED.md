# 🚀 Get Started - OSAA DRM Framework App

## ⚠️ IMPORTANT: This is a NEW React Application

This is a **separate React application** - it's NOT part of your Streamlit app. It runs independently.

## Quick Start (3 Steps)

### 1. Navigate to the app directory
```bash
cd osaa-drm-app
```

### 2. Install dependencies (FIRST TIME ONLY)
```bash
npm install
```

This will take 1-2 minutes. You'll see it installing:
- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React icons

### 3. Start the development server
```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Open http://localhost:3000 in your browser**

## Or Use the Quick Start Script

```bash
cd osaa-drm-app
./start.sh
```

This script will:
- ✅ Check and install dependencies automatically
- ✅ Verify logo file
- ✅ Start the dev server

## What You Should See

1. **Hero Section** - Blue gradient background with title
2. **OSAA Logo** - Top left corner
3. **Orange Africa Icon** - Top right corner
4. **Scroll Indicator** - Animated down arrow
5. **Four Pillars Section** - Interactive cards
6. **Financing Paradox** - Animated flow diagram
7. **DRM Game Changer** - Transformation section

## Troubleshooting

### "npm: command not found"
- Install Node.js: https://nodejs.org/ (version 18+)
- Restart your terminal after installation

### "Port 3000 already in use"
- Change port in `vite.config.js`:
  ```js
  server: {
    port: 3001,  // Change this
  }
  ```

### Blank page / White screen
1. Open browser console (F12)
2. Check for error messages
3. Make sure all files are saved
4. Try: `npm install` again

### Logo not showing
- Logo should be at: `public/logos/OSAA identifier color.png`
- If missing, copy from: `../logos/OSAA identifier color.png`

## File Structure

```
osaa-drm-app/
├── src/
│   ├── components/     ← All React components
│   ├── App.jsx         ← Main app file
│   └── main.jsx        ← Entry point
├── public/
│   └── logos/          ← OSAA logo here
├── package.json        ← Dependencies
└── vite.config.js      ← Build config
```

## Next Steps After It's Running

1. **Customize Content** - Edit text in component files
2. **Change Colors** - Edit `tailwind.config.js`
3. **Add Real Links** - Replace `#` with actual URLs
4. **Build for Production** - Run `npm run build`

## Need Help?

- Check browser console for errors
- Verify Node.js is installed: `node --version`
- Verify npm is installed: `npm --version`
- All components should be in `src/components/`

