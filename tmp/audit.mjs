import fs from 'fs';
import path from 'path';

const productsFile = 'src/data/products.js';
const imagesDir = 'public/images/products';

if (!fs.existsSync(productsFile)) {
    console.error('Products file not found');
    process.exit(1);
}

const content = fs.readFileSync(productsFile, 'utf8');
const files = fs.readdirSync(imagesDir);

// Match "image": "/images/products/filename.ext"
const regex = /"image":\s*"\/images\/products\/(.*?)\.(jpeg|jpg|webp|png)"/g;
let match;
const updates = [];

while ((match = regex.exec(content)) !== null) {
    const fullMatch = match[0];
    const basename = match[1];
    const currentExt = match[2];
    
    // Extensions to try in priority order for high res
    const candidates = ['.png', '.webp', '.jpg'];
    
    for (const ext of candidates) {
        const filename = `${basename}${ext}`;
        if (files.includes(filename)) {
            const filePath = path.join(imagesDir, filename);
            const stats = fs.statSync(filePath);
            
            // Only upgrade if the new file is significantly larger (not a thumbnail)
            // or if it's already a high-res extension and we just want consistency
            if (stats.size > 10000 && ext !== '.' + currentExt) {
                updates.push({
                    target: fullMatch,
                    replacement: `"image": "/images/products/${filename}"`
                });
                break;
            }
        }
    }
}

console.log(JSON.stringify(updates));
