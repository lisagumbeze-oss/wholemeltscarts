import fs from 'fs';

const productsFile = 'src/data/products.js';
const chunksFile = 'tmp/chunks.json';

if (!fs.existsSync(productsFile) || !fs.existsSync(chunksFile)) {
    process.exit(1);
}

// Read chunks, handling potential UTF-16LE from PowerShell redirect
let chunksStr = fs.readFileSync(chunksFile, 'utf8');
if (chunksStr.includes('\x00')) {
    chunksStr = fs.readFileSync(chunksFile, 'utf16le');
}
const auditStr = chunksStr.startsWith('\uFEFF') ? chunksStr.slice(1) : chunksStr;
const chunks = JSON.parse(auditStr);

let content = fs.readFileSync(productsFile, 'utf8');

for (const chunk of chunks) {
    // Only replace if it exactly matches to avoid double-replacing
    if (content.includes(chunk.TargetContent)) {
        content = content.replace(chunk.TargetContent, chunk.ReplacementContent);
    }
}

fs.writeFileSync(productsFile, content);
console.log(`Applied ${chunks.length} high-res updates to ${productsFile}`);
