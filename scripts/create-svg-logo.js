const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\iqbol\\.gemini\\antigravity-ide\\brain\\3fa47e56-023d-40d3-a835-e2985f9f14f0\\.user_uploaded\\media_1790059634373.png';

const buffer = fs.readFileSync(srcPath);

// Save PNG and favicon variants with transparent background
fs.writeFileSync(path.join('public', 'images', 'logo.png'), buffer);
fs.writeFileSync(path.join('public', 'images', 'favicon.webp'), buffer);
fs.writeFileSync(path.join('public', 'images', 'favicon.png'), buffer);
fs.writeFileSync(path.join('public', 'favicon.ico'), buffer);
fs.writeFileSync(path.join('app', 'favicon.ico'), buffer);

// Create 1:1 SVG vector container with crisp transparency
const base64 = buffer.toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <filter id="logo-drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.12" />
    </filter>
  </defs>
  <image
    href="data:image/png;base64,${base64}"
    x="0"
    y="0"
    width="512"
    height="512"
    filter="url(#logo-drop-shadow)"
    preserveAspectRatio="xMidYMid meet"
  />
</svg>
`;

fs.writeFileSync(path.join('public', 'images', 'logo.svg'), svgContent, 'utf-8');

console.log('✅ 1:1 SVG va shaffof PNG logolar muvaffaqiyatli saqlandi!');
