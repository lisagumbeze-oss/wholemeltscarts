const fs = require('fs');
const path = require('path');

const productsFile = 'src/data/products.js';
const imagesDir = 'public/images/products';

if (!fs.existsSync(productsFile)) {
    console.error('Products file not found');
    process.exit(1);
}

const content = fs.readFileSync(productsFile, 'utf8');
const files = fs.readdirSync(imagesDir);

// Match "image": "/images/products/filename.ext"
const regex = /"image":\s*"\/?images\/products\/(.*?)\.(jpeg|jpg|webp|png)"/g;
let match;
const updates = [];

while ((match = regex.exec(content)) !== null) {
    const fullMatch = match[0];
    const basename = match[1];
    const currentExt = match[2];
    
    // Extensions to try in priority order
    const candidates = ['.png', '.webp', '.jpg'];
    
    for (const ext of candidates) {
        const filename = `${basename}${ext}`;
        if (files.includes(filename)) {
            const filePath = path.join(imagesDir, filename);
            const stats = fs.statSync(filePath);
            
            // Only upgrade if the new file is significantly larger (not a thumbnail)
            if (stats.size > 10000 && ext !== '.' + currentExt) {
                updates.push({
                    target: fullMatch,
                    replacement: `"image": "/images/products/${filename}"`,
                    size: stats.size
                });
                break;
            }
        }
    }
}

console.log(JSON.stringify(updates, null, 2));
