import fs from 'fs';
import path from 'path';

// read the products file as a module using dynamic import, or just parse it
// actually it's easier to read it as string and grab the image fields or use regex
const content = fs.readFileSync('src/data/products.js', 'utf8');

const regex = /"image":\s*"\/images\/products\/([^"]+)"/g;
let match;
let missing = [];
let total = 0;

while ((match = regex.exec(content)) !== null) {
  total++;
  const imgPath = match[1];
  const fullPath = path.join('public', 'images', 'products', imgPath);
  if (!fs.existsSync(fullPath)) {
    missing.push(imgPath);
  }
}

console.log(`Total images checked: ${total}`);
if (missing.length > 0) {
  console.log('Missing images:', missing);
} else {
  console.log('All images found!');
}
