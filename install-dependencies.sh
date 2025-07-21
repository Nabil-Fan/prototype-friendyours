#!/bin/bash

# Install missing dependencies
npm install --save-dev @types/node @types/react @types/react-dom
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
npm install recharts

# Clear cache and reinstall if needed
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

echo "Dependencies installed successfully!"
