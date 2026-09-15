const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const assets = [
  { url: 'https://uzbservice.uz/wp-content/themes/eson/images/uzbservice.png', name: 'logo.png' },
  { url: 'https://uzbservice.uz/wp-content/themes/eson/images/icon-phone.svg', name: 'icon-phone.svg' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/hero-img.png', name: 'hero-img.png' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/undefined_image-1.png', name: 'service-gas-boiler.png' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/undefined_image.png', name: 'service-fridge.png' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/undefined_image-2.png', name: 'service-ac.png' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/undefined_image-3.png', name: 'service-washing.png' },
  { url: 'https://uzbservice.uz/wp-content/themes/eson/images/icon-about-experience.svg', name: 'icon-about-experience.svg' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/about-1.png', name: 'about-1.png' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/about-2.png', name: 'about-2.png' },
  { url: 'https://uzbservice.uz/wp-content/themes/eson/images/icon-about-service-1.svg', name: 'icon-service-1.svg' },
  { url: 'https://uzbservice.uz/wp-content/themes/eson/images/icon-about-service-2.svg', name: 'icon-service-2.svg' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/facts-image.png', name: 'facts-image.png' },
  { url: 'https://uzbservice.uz/wp-content/themes/eson/images/icon-facts-counter-1.svg', name: 'icon-counter-1.svg' },
  { url: 'https://uzbservice.uz/wp-content/themes/eson/images/icon-facts-counter-2.svg', name: 'icon-counter-2.svg' },
  { url: 'https://uzbservice.uz/wp-content/themes/eson/images/icon-facts-counter-3.svg', name: 'icon-counter-3.svg' },
  { url: 'https://uzbservice.uz/wp-content/themes/eson/images/icon-facts-counter-4.svg', name: 'icon-counter-4.svg' },
  { url: 'https://uzbservice.uz/wp-content/themes/eson/images/testimonial-quote.svg', name: 'testimonial-quote.svg' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/author-1.jpg', name: 'author-1.jpg' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/author-2.jpg', name: 'author-2.jpg' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/cta-box-bg.jpg', name: 'cta-box-bg.jpg' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/cta-box-img.png', name: 'cta-box-img.png' },
  { url: 'https://uzbservice.uz/wp-content/uploads/2025/04/turn-off.webp', name: 'favicon.webp' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const u = new URL(url);
          redirectUrl = u.origin + redirectUrl;
        }
        return download(redirectUrl, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    });
    req.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  console.log('Starting asset download...');
  for (const asset of assets) {
    const dest = path.join(dir, asset.name);
    try {
      await download(asset.url, dest);
      console.log('✓ Downloaded:', asset.name);
    } catch (e) {
      console.error('✗ Failed:', asset.name, e.message);
    }
  }
  console.log('Done downloading assets.');
})();
