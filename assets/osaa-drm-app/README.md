# OSAA DRM Framework - Interactive Web Application

An enhanced, visually engaging interactive webpage for "Evidence Policy Making in Practice: The Case of DRM (Domestic Resource Mobilization)" for the UN Office of the Special Adviser on Africa (OSAA).

## Features

- **Hero Section** with parallax scrolling and OSAA branding
- **Interactive Four Pillars** with hover effects and animations
- **Animated Financing Paradox** visualization with interactive hotspots
- **DRM Game Changer** section with transformation metaphors
- **Sticky Sidebar Navigation** with smooth scrolling
- **Resource Panel** with publications, links, and newsletter signup
- **Scroll Progress Indicator**
- **Back to Top** button
- **Comprehensive Footer** with social links and contact info
- **Fully Responsive** design for all devices
- **Accessible** (WCAG AA compliant)

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

## Installation

```bash
cd osaa-drm-app
npm install
npm run dev
```

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
osaa-drm-app/
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx
│   │   ├── FundamentalShift.jsx
│   │   ├── FourPillars.jsx
│   │   ├── FinancingParadox.jsx
│   │   ├── DRMGameChanger.jsx
│   │   ├── SidebarNavigation.jsx
│   │   ├── ResourcePanel.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── BackToTop.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── logos/
│       └── OSAA identifier color.png
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Color Palette

- **Deep Blue**: `#003366` (osaa-blue)
- **Orange**: `#FF6B35` (osaa-orange)
- **Teal**: `#008B8B` (osaa-teal)
- **Light Gray**: `#F5F5F5` (osaa-light-gray)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for the UN Office of the Special Adviser on Africa (OSAA).

