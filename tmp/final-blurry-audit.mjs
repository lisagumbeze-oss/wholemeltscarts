import fs from 'fs';
import path from 'path';

const productsFile = 'src/data/products.js';
const imagesDir = 'public/images/products';

if (!fs.existsSync(productsFile)) {
    process.exit(1);
}

const content = fs.readFileSync(productsFile, 'utf8');
const heavyFiles = fs.readdirSync(imagesDir).filter(f => {
    const s = fs.statSync(path.join(imagesDir, f));
    return s.size > 50000;
});

const regex = /"image":\s*"\/images\/products\/(.*?)\.jpeg"/g;
let match;
const blurryUpdates = [];

console.log('--- FINAL BLURRY AUDIT ---');
while ((match = regex.exec(content)) !== null) {
    const baseName = match[1];
    const fullPath = path.join(imagesDir, baseName + '.jpeg');
    if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        if (stats.size < 15000) {
            console.log(`[BLURRY] ${baseName}.jpeg: ${(stats.size/1024).toFixed(1)} KB`);
            // Try to find a match in heavyFiles
            const bestMatch = heavyFiles.find(f => f.startsWith(baseName) || baseName.startsWith(f.split('.')[0]));
            if (bestMatch) {
                console.log(`   -> FOUND MATCH: ${bestMatch}`);
                blurryUpdates.push({ old: `${baseName}.jpeg`, new: bestMatch });
            } else {
                // Fuzzy match for common categories
                if (baseName.includes('dual-chamber')) {
                    const fallback = heavyFiles.find(f => f.includes('v7-dual-chamber') || f.includes('phase-three-dual-chamber'));
                    if (fallback) {
                        console.log(`   -> FALLBACK MATCH: ${fallback}`);
                        blurryUpdates.push({ old: `${baseName}.jpeg`, new: fallback });
                    }
                }
            }
        }
    }
}
console.log('--- END OF AUDIT ---');
console.log(JSON.stringify(blurryUpdates, null, 2));
