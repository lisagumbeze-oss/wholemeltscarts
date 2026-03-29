import fs from 'fs';

const productsFile = 'src/data/products.js';

function createSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-')         // spaces to dashes
        .replace(/-+/g, '-')          // multiple dashes to single
        .trim();
}

let content = fs.readFileSync(productsFile, 'utf8');

const matchStart = 'export const products = ';
const index = content.indexOf(matchStart);
if (index === -1) {
    console.error("Could not find products array.");
    process.exit(1);
}

let arrayPart = content.substring(index + matchStart.length);
const nextExport = arrayPart.indexOf('\nexport const ');
let suffix = '';
if (nextExport !== -1) {
    suffix = arrayPart.substring(nextExport);
    arrayPart = arrayPart.substring(0, nextExport);
}
arrayPart = arrayPart.replace(/;\s*$/, '');

try {
    const productsArray = JSON.parse(arrayPart);
    
    // Track unique slugs
    const slugMap = new Map();
    
    productsArray.forEach(p => {
        let baseSlug = createSlug(p.name);
        let slug = baseSlug;
        let counter = 1;
        
        while (slugMap.has(slug)) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        
        p.slug = slug;
        slugMap.set(slug, p.id);
    });
    
    const newProductsStr = JSON.stringify(productsArray, null, 2);
    const finalFileContent = content.substring(0, index + matchStart.length) + newProductsStr + ';\n' + suffix;
    
    fs.writeFileSync(productsFile, finalFileContent, 'utf8');
    console.log(`Successfully generated unique slugs for ${productsArray.length} products.`);
} catch(e) {
    console.error("Failed to parse or write products array:", e);
}
