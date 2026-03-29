import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { faqs, blogPosts } from '../src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');
const SCRAPED_DATA_PATH = path.join(PROJECT_ROOT, 'tmp/scraped_products.json');
const TARGET_DIR = path.join(PROJECT_ROOT, 'public/images/products');
const PLACEHOLDER_SOURCE = path.join(TARGET_DIR, 'placeholder.jpg');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function download(url, filename) {
  try {
    const outputPath = path.join(TARGET_DIR, filename);
    execSync(`curl.exe -L -H "User-Agent: ${UA}" -o "${outputPath}" "${url}"`, { stdio: 'pipe' });
    return true;
  } catch (e) {
    return false;
  }
}

function mapCategory(cat, price) {
  const c = (cat || '').toLowerCase();
  if (c.includes('concentrates') || c.includes('live resin') || c.includes('baller') || c.includes('rosin')) return 'live-resin';
  if (c.includes('v6') || c.includes('disposable') || c.includes('v5') || c.includes('diamonds')) return 'disposables';
  if (c.includes('carts') || c.includes('vape')) return 'carts';
  if (c.includes('shatter')) return 'shatter';
  if (c.includes('fusion')) return 'fusion';
  if (c.includes('wholesale') || price > 150) return 'wholesale';
  return 'disposables';
}

async function run() {
  const scrapedData = JSON.parse(fs.readFileSync(SCRAPED_DATA_PATH, 'utf8'));
  const products = [];
  let idCount = 1;

  for (const item of scrapedData) {
    const price = parseInt(item.price);
    const category = mapCategory(item.category, price);
    const safeName = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50);
    const url = item.imageUrl || item.image_url;
    const ext = path.extname(new URL(url).pathname) || '.jpg';
    const filename = `${safeName}${ext}`;

    let success = download(url, filename);
    
    // If download failed, copy placeholder
    if (!success) {
      console.log(`✗ Failed ${item.name}, using placeholder.`);
      const outputPath = path.join(TARGET_DIR, filename);
      if (fs.existsSync(PLACEHOLDER_SOURCE)) {
        fs.copyFileSync(PLACEHOLDER_SOURCE, outputPath);
      }
    } else {
      console.log(`✓ ${filename}`);
    }
    
    products.push({
      id: idCount++,
      name: item.name,
      category: category,
      strain: item.name.toLowerCase().includes('sativa') ? 'Sativa' : (item.name.toLowerCase().includes('indica') ? 'Indica' : 'Hybrid'),
      price: price,
      salePrice: price < 40 ? Math.floor(price * 0.8) : null,
      image: `/images/products/${filename}`,
      badge: price < 40 ? 'Sale' : (price > 150 ? 'Wholesale' : null)
    });
  }

  const categoriesData = [
    { id: "all", name: "All Products", count: products.length },
    { id: "disposables", name: "Disposables", count: products.filter(p => p.category === 'disposables').length },
    { id: "carts", name: "Carts", count: products.filter(p => p.category === 'carts').length },
    { id: "live-resin", name: "Live Resin & Sugar", count: products.filter(p => p.category === 'live-resin').length },
    { id: "shatter", name: "Shatter", count: products.filter(p => p.category === 'shatter').length },
    { id: "fusion", name: "Fusion Collabs", count: products.filter(p => p.category === 'fusion').length },
    { id: "wholesale", name: "Wholesale & Boxes", count: products.filter(p => p.category === 'wholesale').length }
  ];

  const content = `export const categories = ${JSON.stringify(categoriesData, null, 2)};\n\n` +
                  `export const products = ${JSON.stringify(products, null, 2)};\n\n` +
                  `export const faqs = ${JSON.stringify(faqs, null, 2)};\n\n` +
                  `export const blogPosts = ${JSON.stringify(blogPosts, null, 2)};\n`;

  fs.writeFileSync(path.join(PROJECT_ROOT, 'src/data/products.js'), content);
  console.log(`\nSUCCESS: products.js rebuilt with ${products.length} products and local paths.`);
}

run();
