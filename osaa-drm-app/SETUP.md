# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add OSAA Logo**
   - Copy `logos/OSAA identifier color.png` from the main project to `osaa-drm-app/public/logos/`
   - Or update the image path in `HeroSection.jsx` to match your file structure

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## File Structure Setup

Ensure your `public` folder structure looks like this:

```
osaa-drm-app/
├── public/
│   └── logos/
│       └── OSAA identifier color.png
```

## Customization

### Colors
Edit `tailwind.config.js` to modify the color palette:
- `osaa-blue`: #003366
- `osaa-orange`: #FF6B35
- `osaa-teal`: #008B8B

### Content
All content is in the component files:
- `src/components/HeroSection.jsx` - Hero section
- `src/components/FundamentalShift.jsx` - Introduction section
- `src/components/FourPillars.jsx` - Four pillars section
- `src/components/FinancingParadox.jsx` - Financing paradox section
- `src/components/DRMGameChanger.jsx` - DRM game changer section

### Icons
All icons are from `lucide-react`. To change an icon, import a different one from the library.

## Deployment

The built files will be in the `dist` folder. Deploy this folder to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

