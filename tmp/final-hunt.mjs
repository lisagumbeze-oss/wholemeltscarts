import fs from 'fs';
import path from 'path';

const dir = 'public/images/products';
const productsFile = 'src/data/products.js';

if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    const heavy = files.map(f => {
        const stats = fs.statSync(path.join(dir, f));
        return { name: f, size: stats.size };
    }).filter(f => f.size > 50000);

    const productContent = fs.readFileSync(productsFile, 'utf8');
    const blurryRegex = /"image":\s*"\/images\/products\/(.*?)\.jpeg"/g;
    let match;

    console.log('--- TARGETED VISUAL AUDIT ---');
    while ((match = blurryRegex.exec(productContent)) !== null) {
        const base = match[1];
        const stats = fs.statSync(path.join(dir, base + '.jpeg'));
        if (stats.size < 15000) {
            console.log(`[BLURRY] ${base}.jpeg (${(stats.size/1024).toFixed(1)} KB)`);
            // Fuzzy match
            const best = heavy.find(h => h.name.includes(base) || base.includes(h.name.split('.')[0]));
            if (best) {
                console.log(`   -> SUGGESTED MATCH: ${best.name} (${(best.size/1024).toFixed(1)} KB)`);
            }
        }
    }
}
