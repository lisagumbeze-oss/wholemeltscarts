import fs from 'fs';
import path from 'path';
import { products } from './src/data/products.js';

let allGood = true;
for (const prod of products) {
  const file = path.join(process.cwd(), 'public', prod.image);
  try {
    const stats = fs.statSync(file);
    if (stats.size < 6000 || stats.size === 103791) {
      console.log(`Failed product: ${prod.name} (File size: ${stats.size})`);
      allGood = false;
    }
  } catch (e) {
    console.log(`Failed product (Missing): ${prod.name}`);
    allGood = false;
  }
}
if (allGood) console.log("All products in products.js now have high-res, valid images!");
