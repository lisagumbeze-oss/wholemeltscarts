import fs from 'fs';
import path from 'path';

const productsFile = 'src/data/products.js';
const content = fs.readFileSync(productsFile, 'utf8');

// I need to parse the products array
const matchStart = content.indexOf('export const products = [');
if (matchStart === -1) {
    console.error("Could not find products array.");
    process.exit(1);
}

const prefixLength = 'export const products = '.length;
let arrayStr = content.substring(matchStart + prefixLength);
const nextExport = arrayStr.indexOf('\nexport const ');
if (nextExport !== -1) {
    arrayStr = arrayStr.substring(0, nextExport);
}
arrayStr = arrayStr.replace(/;\s*$/, '');

try {
    const productsArray = JSON.parse(arrayStr);
    const broken = [];
    
    productsArray.forEach(p => {
        const imgPath = p.image;
        if (imgPath.includes('/images/premium/')) {
            broken.push({ id: p.id, name: p.name, type: 'premium' });
            return;
        }
        
        const fullPath = path.join('public', imgPath.replace(/^\//, ''));
        if (fs.existsSync(fullPath)) {
            const stats = fs.statSync(fullPath);
            // 103791 is the size of the placeholder image
            if (stats.size === 103791) {
                broken.push({ id: p.id, name: p.name, type: '103kb' });
            }
        } else {
            broken.push({ id: p.id, name: p.name, type: 'missing' });
        }
    });
    
    console.log(`TOTAL BROKEN/PLACEHOLDER: ${broken.length}`);
    console.log(JSON.stringify(broken, null, 2));
} catch(e) {
    console.error("Failed to parse products array:", e);
}
