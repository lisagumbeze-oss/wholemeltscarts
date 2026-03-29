import fs from 'fs';
import path from 'path';

const productsFile = 'src/data/products.js';
const content = fs.readFileSync(productsFile, 'utf8');

// Identify all products using premium placeholders or the 103KB broken image
const regex = /{\s*"id":\s*(\d+),\s*"name":\s*"([^"]+)"[\s\S]*?"image":\s*"([^"]+)"/g;
let match;
let broken = [];

while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  const name = match[2];
  const imgPath = match[3];
  
  if (imgPath.includes('/images/premium/')) {
    broken.push({ id, name, type: 'premium' });
    continue;
  }
  
  const fullPath = path.join('public', imgPath.replace(/^\//, ''));
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    if (stats.size === 103791) {
      broken.push({ id, name, type: '103kb' });
    }
  } else {
    broken.push({ id, name, type: 'missing' });
  }
}

console.log(`Found ${broken.length} broken/placeholder products:`);
console.log(JSON.stringify(broken, null, 2));
