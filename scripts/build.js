#!/usr/bin/env node

/**
 * Build Script
 * Simple build script to prepare production files
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../src');
const BUILD_DIR = path.join(__dirname, '../dist');

/**
 * Copy directory recursively
 */
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read directory contents
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Minify CSS (basic implementation)
 */
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\s*{\s*/g, '{') // Remove spaces around {
    .replace(/\s*}\s*/g, '}') // Remove spaces around }
    .replace(/\s*:\s*/g, ':') // Remove spaces around :
    .replace(/\s*;\s*/g, ';') // Remove spaces around ;
    .trim();
}

/**
 * Main build function
 */
function build() {
  console.log('🚀 Starting build process...\n');

  // Clean build directory
  if (fs.existsSync(BUILD_DIR)) {
    console.log('🧹 Cleaning build directory...');
    fs.rmSync(BUILD_DIR, { recursive: true, force: true });
  }

  // Create build directory
  fs.mkdirSync(BUILD_DIR, { recursive: true });

  // Copy source files to build directory
  console.log('📦 Copying files...');
  copyDir(SOURCE_DIR, BUILD_DIR);

  // Minify CSS files (optional)
  console.log('🎨 Processing CSS files...');
  const cssDir = path.join(BUILD_DIR, 'css');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
    cssFiles.forEach(file => {
      const filePath = path.join(cssDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const minified = minifyCSS(content);
      fs.writeFileSync(filePath, minified);
    });
  }

  console.log('\n✅ Build completed successfully!');
  console.log(`📁 Build output: ${BUILD_DIR}\n`);
}

// Run build
try {
  build();
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
