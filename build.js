/**
 * Simple build script for production
 * This is a basic example - in production you might use webpack, vite, or parcel
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = 'dist';

console.log('🚀 Starting build process...');

// Create dist directory
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
  console.log(`✅ Created ${DIST_DIR} directory`);
}

// Copy files function
function copyFiles(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyFiles(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Copy public directory
  if (fs.existsSync('public')) {
    copyFiles('public', DIST_DIR);
    console.log('✅ Copied public files');
  }

  // Copy src directory
  if (fs.existsSync('src')) {
    const srcDest = path.join(DIST_DIR, 'src');
    if (!fs.existsSync(srcDest)) {
      fs.mkdirSync(srcDest, { recursive: true });
    }
    copyFiles('src', srcDest);
    console.log('✅ Copied source files');
  }

  // Create a simple production HTML if needed
  // You could add minification, bundling, etc. here

  console.log('✨ Build completed successfully!');
  console.log(`📁 Output directory: ${DIST_DIR}`);
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
