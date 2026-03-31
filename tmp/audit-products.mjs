
import fs from 'fs';

const content = fs.readFileSync('c:\\Users\\User\\Desktop\\Whole Melts Extracts\\src\\data\\products.js', 'utf8');
const lines = content.split('\n');

const results = [];
let currentProduct = null;
let currentStartLine = 0;

const keywords = ['wax', 'badder', 'rosin', 'sugar', 'resin', 'extract', 'diamonds'];
const cloneImage = 'badder-blue-nerdz.jpg';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('"id":')) {
    if (currentProduct) {
      const nameLower = currentProduct.name.toLowerCase();
      const needsCategoryShift = currentProduct.category === 'disposables' && keywords.some(k => nameLower.includes(k));
      const isClone = currentProduct.image.includes(cloneImage);
      const isMisplacedWatermelon = currentProduct.id === 15 && currentProduct.category === 'carts';
      const isMisplacedBlackberry = currentProduct.id === 13 && currentProduct.category === 'carts';

      if (needsCategoryShift || isClone || isMisplacedWatermelon || isMisplacedBlackberry) {
        results.push({
          line: currentStartLine + 1,
          id: currentProduct.id,
          name: currentProduct.name,
          category: currentProduct.category,
          image: currentProduct.image,
          reason: needsCategoryShift ? 'category' : (isClone ? 'clone' : 'misplaced')
        });
      }
    }
    
    const idMatch = line.match(/"id":\s*(\d+)/);
    if (idMatch) {
      currentProduct = { id: parseInt(idMatch[1]), name: '', category: '', image: '' };
      currentStartLine = i;
    }
  }
  
  if (currentProduct) {
    if (line.includes('"name":')) {
      const nameMatch = line.match(/"name":\s*"(.*?)"/);
      if (nameMatch) currentProduct.name = nameMatch[1];
    }
    if (line.includes('"category":')) {
      const catMatch = line.match(/"category":\s*"(.*?)"/);
      if (catMatch) currentProduct.category = catMatch[1];
    }
    if (line.includes('"image":')) {
      const imgMatch = line.match(/"image":\s*"(.*?)"/);
      if (imgMatch) currentProduct.image = imgMatch[1];
    }
  }
}

if (currentProduct) {
   const nameLower = currentProduct.name.toLowerCase();
   const needsCategoryShift = currentProduct.category === 'disposables' && keywords.some(k => nameLower.includes(k));
   const isClone = currentProduct.image.includes(cloneImage);
   
   if (needsCategoryShift || isClone || currentProduct.id === 15 || currentProduct.id === 13) {
        results.push({
          line: currentStartLine + 1,
          id: currentProduct.id,
          name: currentProduct.name,
          category: currentProduct.category,
          image: currentProduct.image,
          reason: needsCategoryShift ? 'category' : (isClone ? 'clone' : 'misplaced')
        });
      }
}

fs.writeFileSync('c:\\Users\\User\\Desktop\\Whole Melts Extracts\\tmp\\audit-results.json', JSON.stringify(results, null, 2));
console.log('Audit complete. Results in tmp/audit-results.json');
