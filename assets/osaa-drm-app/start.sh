#!/bin/bash

echo "🚀 Starting OSAA DRM Framework Application Setup..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies. Please check your Node.js installation."
        exit 1
    fi
    echo "✅ Dependencies installed successfully!"
    echo ""
fi

# Check if logo exists
if [ ! -f "public/logos/OSAA identifier color.png" ]; then
    echo "⚠️  Warning: OSAA logo not found in public/logos/"
    echo "   Please copy the logo file to: public/logos/OSAA identifier color.png"
    echo ""
fi

echo "🎨 Starting development server..."
echo "   The app will open at: http://localhost:3000"
echo ""
npm run dev

