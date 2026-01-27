# Quick Start Guide

## Step 1: Install Dependencies

```bash
cd osaa-drm-app
npm install
```

This will install:
- React
- Vite (build tool)
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

## Step 2: Copy Logo (if needed)

Make sure the OSAA logo is in the public folder:
```bash
# From the project root
cp logos/OSAA\ identifier\ color.png osaa-drm-app/public/logos/
```

Or manually copy `logos/OSAA identifier color.png` to `osaa-drm-app/public/logos/`

## Step 3: Run Development Server

```bash
npm run dev
```

The app will open at: **http://localhost:3000**

## Step 4: View the Application

Open your browser and navigate to the URL shown in the terminal (usually http://localhost:3000)

## Troubleshooting

### "Command not found: npm"
- Install Node.js from https://nodejs.org/ (version 18 or higher)

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

### Blank page or errors
- Check the browser console (F12) for error messages
- Make sure all component files exist in `src/components/`
- Verify the logo path is correct

### Port already in use
- Change the port in `vite.config.js` or kill the process using port 3000

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

