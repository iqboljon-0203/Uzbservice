const fs = require('fs');
const zlib = require('zlib');

const srcPath = 'C:\\Users\\iqbol\\.gemini\\antigravity-ide\\brain\\3fa47e56-023d-40d3-a835-e2985f9f14f0\\.user_uploaded\\media_1790059634373.png';
const buf = fs.readFileSync(srcPath);

const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
const bitDepth = buf[24];
const colorType = buf[25];
console.log({ width, height, bitDepth, colorType });

// Collect IDAT chunks
const idatChunks = [];
let offset = 8;
while (offset < buf.length) {
  const length = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IDAT') {
    idatChunks.push(buf.slice(offset + 8, offset + 8 + length));
  }
  offset += 12 + length;
}

const idat = Buffer.concat(idatChunks);
const raw = zlib.inflateSync(idat);
console.log('Inflated bytes:', raw.length, 'expected ~', height * (1 + width * 4));

let minX = width, maxX = 0, minY = height, maxY = 0;
const bytesPerPixel = 4;
const stride = 1 + width * bytesPerPixel;

for (let y = 0; y < height; y++) {
  const rowStart = y * stride + 1;
  for (let x = 0; x < width; x++) {
    const p = rowStart + x * bytesPerPixel;
    const a = raw[p + 3];
    if (a > 10) { // non-transparent
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log('Bounding box:', { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY });
