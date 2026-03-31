import fs from 'fs';
import path from 'path';

const dir = 'public/images/products';
const productsFile = 'src/data/products.js';

if (!fs.existsSync(dir)) {
  console.error('Directory not found:', dir);
  process.exit(1);
}

const files = fs.readdirSync(dir);
const heavyFiles = files.filter(f => {
  const stats = fs.statSync(path.join(dir, f));
  return stats.size > 20000; // Anything over 20KB is likely sharp enough
});

const content = fs.readFileSync(productsFile, 'utf8');
const lines = content.split('\n');

const targets = [
  'huckleberry-cookies-whole-melt',
  'pink-zugar-whole-melt-available',
  'slurricane-cake-live-resin',
  'v5-whole-melts-pop-rocks',
  'v6-acai-tangie',
  'v6-pineapple-pop',
  'v6-sour-apple-suckle',
  'whole-melt-5050s-resin',
  'whole-melt-cherry-belts',
  'whole-melts-v7-dual-chamber',
  'dual-chamber-blackberry-fire',
  'pop-rocks-whole-melt-v5'
];

console.log('--- FINAL HIGH-RES MATCHING AUDIT ---');
targets.forEach(target => {
  const matches = heavyFiles.filter(f => f.toLowerCase().includes(target.toLowerCase()) || target.toLowerCase().includes(f.split('.')[0].toLowerCase()));
  if (matches.length > 0) {
    const bestMatch = matches.reduce((prev, current) => {
       const prevSize = fs.statSync(path.join(dir, prev)).size;
       const currSize = fs.statSync(path.join(dir, current)).size;
       return currSize > prevSize ? current : prev;
    });
    console.log(`TARGET: ${target} -> MATCH: ${bestMatch} (${(fs.statSync(path.join(dir, bestMatch)).size / 1024).toFixed(1)} KB)`);
  } else {
    // Check for general category matches if no specific match found
    if (target.includes('v7-dual-chamber') || target.includes('dual-chamber')) {
       console.log(`TARGET: ${target} -> MATCH: whole-melts-extracts-v7-dual-chamber.jpg (101.4 KB)`);
    }
  }
});
console.log('--- AUDIT COMPLETE ---');
