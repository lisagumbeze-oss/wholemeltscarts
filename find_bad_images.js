import fs from 'fs';
import path from 'path';

const dir = 'public/images/products';
const files = fs.readdirSync(dir);

const badFiles = [];

for (const file of files) {
  const filePath = path.join(dir, file);
  const stats = fs.statSync(filePath);
  if (stats.size === 103791) {
    badFiles.push({ file, type: 'missing', size: stats.size });
  } else if (stats.size < 6000) {
    badFiles.push({ file, type: 'blurry', size: stats.size });
  }
}

console.log(`Found ${badFiles.length} bad files.`);
for (const file of badFiles) {
  console.log(`${file.file} - ${file.type} (${file.size} bytes)`);
}
