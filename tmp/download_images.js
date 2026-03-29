import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { products, categories, faqs, blogPosts } from '../src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');
const TARGET_DIR = path.join(PROJECT_ROOT, 'public/images/products');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

function download(url, filename) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(path.join(TARGET_DIR, filename));
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        console.warn(`Failed to download ${url}: HTTP ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${url}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  const updatedProducts = [];
  for (const product of products) {
    try {
      const url = new URL(product.image);
      const safeName = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const ext = path.extname(url.pathname) || '.webp';
      const filename = `${safeName}${ext}`;
      
      const success = await download(product.image, filename);
      
      if (success) {
        console.log(`✓ Downloaded: ${filename}`);
        updatedProducts.push({
          ...product,
          image: `/images/products/${filename}`
        });
      } else {
        updatedProducts.push(product);
      }
    } catch (e) {
      console.error(`Invalid URL for ${product.name}: ${product.image}`);
      updatedProducts.push(product);
    }
  }

  const content = `export const categories = ${JSON.stringify(categories, null, 2)};\n\n` +
                  `export const products = ${JSON.stringify(updatedProducts, null, 2)};\n\n` +
                  `export const faqs = ${JSON.stringify(faqs, null, 2)};\n\n` +
                  `export const blogPosts = ${JSON.stringify(blogPosts, null, 2)};\n`;

  fs.writeFileSync(path.join(PROJECT_ROOT, 'src/data/products.js'), content);
  console.log('\nSUCCESS: products.js updated with local paths.');
}

run();
