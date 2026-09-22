const fs = require('fs');

const srcPath = 'C:\\Users\\iqbol\\.gemini\\antigravity-ide\\brain\\3fa47e56-023d-40d3-a835-e2985f9f14f0\\.user_uploaded\\media_1790059634373.png';
const buf = fs.readFileSync(srcPath);

// PNG header check
console.log('Size:', buf.length);
// Read width and height from IHDR chunk (bytes 16-23)
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
console.log(`Dimensions: ${width}x${height}`);
