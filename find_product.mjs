import fs from 'fs';

const lines = fs.readFileSync('src/data/products.js', 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].toLowerCase().includes('blue-nerdz')) {
    console.log(`Matched line ${i + 1}: ${lines[i].trim()}`);
  }
  if (lines[i].toLowerCase().includes('blue nerdz')) {
    console.log(`Matched line ${i + 1}: ${lines[i].trim()}`);
  }
}
