#!/usr/bin/env node

/**
 * Script tự động update version cho Service Worker khi deploy
 * Tạo version mới dựa trên timestamp và git commit hash
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Đường dẫn các file cần update
const SW_FILE = path.join(__dirname, '..', 'sw.js');
const BUILD_ID_FILE = path.join(__dirname, '..', '.last_build_id');
const VERSION_FILE = path.join(__dirname, '..', '.version');

// Tạo version mới
function generateVersion() {
  const timestamp = Date.now();
  let gitHash = 'unknown';
  
  try {
    // Lấy git commit hash ngắn (7 ký tự đầu)
    gitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
  } catch (error) {
    console.warn('Warning: Could not get git hash, using timestamp only');
  }
  
  // Format: v1.0.{timestamp}-{githash}
  const version = `v1.0.${timestamp}-${gitHash}`;
  return version;
}

// Update Service Worker file
function updateServiceWorker(version) {
  if (!fs.existsSync(SW_FILE)) {
    console.error(`Error: ${SW_FILE} not found`);
    process.exit(1);
  }
  
  let swContent = fs.readFileSync(SW_FILE, 'utf8');
  
  // Tìm và thay thế CACHE_NAME
  const cacheNameRegex = /const CACHE_NAME = ['"]([^'"]+)['"];?/;
  const newCacheName = `const CACHE_NAME = 'sap-tet-${version}';`;
  
  if (cacheNameRegex.test(swContent)) {
    swContent = swContent.replace(cacheNameRegex, newCacheName);
    console.log(`✓ Updated CACHE_NAME to: sap-tet-${version}`);
  } else {
    console.warn('Warning: Could not find CACHE_NAME in sw.js');
  }
  
  fs.writeFileSync(SW_FILE, swContent, 'utf8');
  console.log(`✓ Updated ${SW_FILE}`);
}

// Lưu version vào file
function saveVersion(version) {
  fs.writeFileSync(VERSION_FILE, version, 'utf8');
  console.log(`✓ Saved version to ${VERSION_FILE}: ${version}`);
  
  // Cũng update .last_build_id với hash
  const hash = version.split('-').pop();
  fs.writeFileSync(BUILD_ID_FILE, hash, 'utf8');
  console.log(`✓ Updated ${BUILD_ID_FILE}`);
}

// Main function
function main() {
  console.log('🚀 Starting version update...\n');
  
  const version = generateVersion();
  console.log(`📦 Generated version: ${version}\n`);
  
  updateServiceWorker(version);
  saveVersion(version);
  
  console.log('\n✅ Version update completed successfully!');
  console.log(`\nNext steps:`);
  console.log(`1. Commit the changes: git add sw.js .version .last_build_id`);
  console.log(`2. Push to GitHub: git push origin master`);
  console.log(`3. GitHub Pages will automatically deploy with the new version\n`);
}

// Chạy script
main();
