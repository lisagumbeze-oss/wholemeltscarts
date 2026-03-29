import fs from 'fs';

const content = fs.readFileSync('src/data/products.js', 'utf8');

// evaluate the module exports
// but since it uses export const products = ... we can't just eval
// I will parse JSON out of it

let productsStr = content.substring(content.indexOf('export const products = [') + 'export const products = ['.length - 1);
productsStr = productsStr.replace(/;\s*$/, ''); // remove trailing semicolon

// actually, let's just write a script that loads it properly via import() because Node supports ES modules.
