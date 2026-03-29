import fs from 'fs';
import path from 'path';

const productsFile = 'src/data/products.js';
let content = fs.readFileSync(productsFile, 'utf8');

const regex = /("image":\s*")(\/images\/products\/[^"]+)(")/g;
let match;
let count = 0;

const replacements = [];

// find all matches
while ((match = regex.exec(content)) !== null) {
  const fullMatch = match[0];
  const imgPath = match[2];
  const fullPath = path.join('public', imgPath.replace(/^\//, ''));
  
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    // 103791 represents the placeholder file
    if (stats.size === 103791) {
      // Find what category this product belongs to using basic string matching nearby
      // We look backward a little bit to find the Category:
      const beforeStr = content.substring(Math.max(0, match.index - 150), match.index);
      let cat = 'disposables'; // default
      const catMatch = beforeStr.match(/"category":\s*"([^"]+)"/);
      if (catMatch) cat = catMatch[1];
      
      let newImg = '/images/premium/premium_live_resin_1774758999697.png';
      if (cat === 'carts') {
        newImg = '/images/premium/premium_carts_1774759030333.png';
      } else if (cat === 'disposables') {
        newImg = '/images/premium/premium_disposable_1774759013453.png';
      } else if (cat === 'wholesale') {
        newImg = '/images/premium/premium_packaging_1774759047657.png';
      }
      
      replacements.push({
        oldStr: fullMatch,
        newStr: `"image": "${newImg}"`,
        index: match.index
      });
      count++;
    }
  }
}

// apply replacements in reverse so indices don't shift
replacements.reverse().forEach(rep => {
  content = content.substring(0, rep.index) + rep.newStr + content.substring(rep.index + rep.oldStr.length);
});

fs.writeFileSync(productsFile, content, 'utf8');
console.log(`Replaced ${count} broken images with premium alternatives.`);
