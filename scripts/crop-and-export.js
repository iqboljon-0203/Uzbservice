const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const srcPath = 'C:\\Users\\iqbol\\.gemini\\antigravity-ide\\brain\\3fa47e56-023d-40d3-a835-e2985f9f14f0\\.user_uploaded\\media_1790059634373.png';
const buf = fs.readFileSync(srcPath);

const origW = buf.readUInt32BE(16);
const origH = buf.readUInt32BE(20);

// Extract IDAT
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
const raw = zlib.inflateSync(Buffer.concat(idatChunks));
const origStride = 1 + origW * 4;

// Decode / Unfilter PNG
const decoded = Buffer.alloc(origW * origH * 4);

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

for (let y = 0; y < origH; y++) {
  const filterType = raw[y * origStride];
  const rowStart = y * origStride + 1;
  const decodedRowStart = y * origW * 4;
  const prevDecodedRowStart = (y - 1) * origW * 4;

  for (let x = 0; x < origW * 4; x++) {
    const rawVal = raw[rowStart + x];
    const left = (x >= 4) ? decoded[decodedRowStart + x - 4] : 0;
    const up = (y > 0) ? decoded[prevDecodedRowStart + x] : 0;
    const upLeft = (y > 0 && x >= 4) ? decoded[prevDecodedRowStart + x - 4] : 0;

    let val = 0;
    switch (filterType) {
      case 0: // None
        val = rawVal;
        break;
      case 1: // Sub
        val = (rawVal + left) & 0xFF;
        break;
      case 2: // Up
        val = (rawVal + up) & 0xFF;
        break;
      case 3: // Average
        val = (rawVal + Math.floor((left + up) / 2)) & 0xFF;
        break;
      case 4: // Paeth
        val = (rawVal + paethPredictor(left, up, upLeft)) & 0xFF;
        break;
      default:
        val = rawVal;
    }
    decoded[decodedRowStart + x] = val;
  }
}

// Verify non-zero colors on a known blue pixel in center (around x=225, y=214)
const testIdx = (214 * origW + 225) * 4;
console.log('Center pixel RGBA:', {
  r: decoded[testIdx],
  g: decoded[testIdx + 1],
  b: decoded[testIdx + 2],
  a: decoded[testIdx + 3]
});

// Crop square around logo
// Bounding box was [64, 34] to [386, 393]
// Center: cx = 225, cy = 214
const cropSize = 368;
const startX = Math.round(225 - cropSize / 2); // 41
const startY = Math.round(214 - cropSize / 2); // 30

const newStride = 1 + cropSize * 4;
const newRaw = Buffer.alloc(cropSize * newStride);

for (let y = 0; y < cropSize; y++) {
  const srcY = startY + y;
  const dstRow = y * newStride;
  newRaw[dstRow] = 0; // Filter 0 (None)

  if (srcY >= 0 && srcY < origH) {
    const srcRow = srcY * origW * 4;
    for (let x = 0; x < cropSize; x++) {
      const srcX = startX + x;
      const dstIdx = dstRow + 1 + x * 4;
      if (srcX >= 0 && srcX < origW) {
        const srcIdx = srcRow + srcX * 4;
        newRaw[dstIdx] = decoded[srcIdx];         // R
        newRaw[dstIdx + 1] = decoded[srcIdx + 1]; // G
        newRaw[dstIdx + 2] = decoded[srcIdx + 2]; // B
        newRaw[dstIdx + 3] = decoded[srcIdx + 3]; // A
      } else {
        newRaw[dstIdx + 3] = 0; // Transparent
      }
    }
  }
}

// CRC32 table
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}
function crc32(b) {
  let crc = -1;
  for (let i = 0; i < b.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ b[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.slice(4, 8 + len);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

// PNG Header
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

// IHDR chunk
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(cropSize, 0);
ihdr.writeUInt32BE(cropSize, 4);
ihdr[8] = 8; // 8-bit depth
ihdr[9] = 6; // RGBA
ihdr[10] = 0; // compression deflate
ihdr[11] = 0; // filter
ihdr[12] = 0; // no interlace

const ihdrChunk = makeChunk('IHDR', ihdr);

// IDAT chunk
const compressed = zlib.deflateSync(newRaw, { level: 9 });
const idatChunk = makeChunk('IDAT', compressed);

// IEND chunk
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

const croppedPng = Buffer.concat([pngSignature, ihdrChunk, idatChunk, iendChunk]);

console.log('✅ Cropped full-color PNG created! Size:', croppedPng.length);

// Save full-color cropped PNG and favicons
fs.writeFileSync(path.join('public', 'images', 'logo.png'), croppedPng);
fs.writeFileSync(path.join('public', 'images', 'favicon.png'), croppedPng);
fs.writeFileSync(path.join('public', 'images', 'favicon.webp'), croppedPng);
fs.writeFileSync(path.join('public', 'favicon.ico'), croppedPng);
fs.writeFileSync(path.join('app', 'favicon.ico'), croppedPng);

// Create SVG with the true full-color cropped image
const base64 = croppedPng.toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cropSize} ${cropSize}" width="100%" height="100%">
  <defs>
    <filter id="logo-drop-shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15" />
    </filter>
  </defs>
  <image
    href="data:image/png;base64,${base64}"
    x="0"
    y="0"
    width="${cropSize}"
    height="${cropSize}"
    filter="url(#logo-drop-shadow)"
    preserveAspectRatio="xMidYMid meet"
  />
</svg>
`;

fs.writeFileSync(path.join('public', 'images', 'logo.svg'), svgContent, 'utf-8');
console.log('✅ Full color cropped logo.svg saved successfully!');
