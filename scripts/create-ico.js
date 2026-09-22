const fs = require('fs');
const path = require('path');

const pngBuf = fs.readFileSync('public/images/favicon.png');

// 22-byte ICO header with embedded PNG (standard since Windows Vista, supported by all modern browsers)
const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0); // Reserved
icoHeader.writeUInt16LE(1, 2); // Type 1 = ICON
icoHeader.writeUInt16LE(1, 4); // 1 Image

icoHeader.writeUInt8(0, 6); // Width: 0 means >= 256
icoHeader.writeUInt8(0, 7); // Height: 0 means >= 256
icoHeader.writeUInt8(0, 8); // Color count
icoHeader.writeUInt8(0, 9); // Reserved
icoHeader.writeUInt16LE(1, 10); // Color planes
icoHeader.writeUInt16LE(32, 12); // Bits per pixel
icoHeader.writeUInt32LE(pngBuf.length, 14); // Size of PNG data
icoHeader.writeUInt32LE(22, 18); // Offset where PNG begins

const validIco = Buffer.concat([icoHeader, pngBuf]);

fs.writeFileSync('public/favicon.ico', validIco);
fs.writeFileSync('app/favicon.ico', validIco);

console.log('✅ Valid Windows ICO format created! Size:', validIco.length);
