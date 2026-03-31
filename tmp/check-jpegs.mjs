import fs from 'fs';

const productsFile = 'src/data/products.js';
const imagesDir = 'public/images/products';

if (!fs.existsSync(productsFile)) {
    process.exit(1);
}

// Read products array safely
const content = fs.readFileSync(productsFile, 'utf8');
const regex = /"image":\s*"\/images\/products\/(.*?)\.jpeg"/g;
let match;
let blurryCount = 0;

console.log('--- REVERSE AUDIT: REMAINING JPEGs ---');
while ((match = regex.exec(content)) !== null) {
    const filename = `${match[1]}.jpeg`;
    const filePath = `${imagesDir}/${filename}`;
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        if (stats.size < 10000) {
            console.log(`[BLURRY] ${filename}: ${sizeKB}KB`);
            blurryCount++;
        } else {
            console.log(`[SHARP] ${filename}: ${sizeKB}KB`);
        }
    }
}
console.log(`--- Total Blurry JPEGs left: ${blurryCount} ---`);
