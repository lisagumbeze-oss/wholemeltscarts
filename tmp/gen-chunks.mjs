import fs from 'fs';

const productsFile = 'src/data/products.js';
const auditFile = 'tmp/audit-results-utf8.json';

if (!fs.existsSync(productsFile) || !fs.existsSync(auditFile)) {
    console.error('Files missing');
    process.exit(1);
}

const products = fs.readFileSync(productsFile, 'utf8').split('\n');
const auditStr = fs.readFileSync(auditFile, 'utf8').trim();

// Handle potential BOM or encoding issues
const cleanAuditStr = auditStr.startsWith('\uFEFF') ? auditStr.slice(1) : auditStr;
const audit = JSON.parse(cleanAuditStr);

const chunks = [];
for (const item of audit) {
    let lineNum = -1;
    for (let i = 0; i < products.length; i++) {
        // Look for the exact target string with its context
        if (products[i].includes(item.target)) {
            lineNum = i + 1;
            break;
        }
    }
    
    if (lineNum !== -1) {
        chunks.push({
            StartLine: lineNum,
            EndLine: lineNum,
            TargetContent: item.target,
            ReplacementContent: item.replacement,
            AllowMultiple: false
        });
    }
}

console.log(JSON.stringify(chunks, null, 2));
