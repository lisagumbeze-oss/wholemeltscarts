import fs from 'fs';

const content = fs.readFileSync('src/data/products.js', 'utf8');

// Find the blogPosts export
const marker = 'export const blogPosts = ';
const idx = content.indexOf(marker);

if (idx === -1) {
  console.error('Could not find blogPosts export in products.js');
  process.exit(1);
}

// Everything before blogPosts is the products data
const productsPart = content.substring(0, idx).trimEnd();
// Everything from blogPosts onward is the blog data
const blogsPart = content.substring(idx);

// Write the new blogs.js file
const blogsFileContent = `// Blog posts data - extracted from products.js for maintainability\n${blogsPart}`;
fs.writeFileSync('src/data/blogs.js', blogsFileContent);
console.log('✅ Created src/data/blogs.js');

// Write products.js without the blogPosts
fs.writeFileSync('src/data/products.js', productsPart + '\n');
console.log('✅ Updated src/data/products.js (removed blogPosts)');

// Verify
const newProducts = fs.readFileSync('src/data/products.js', 'utf8');
const newBlogs = fs.readFileSync('src/data/blogs.js', 'utf8');
console.log(`Products file: ${newProducts.length} chars`);
console.log(`Blogs file: ${newBlogs.length} chars`);
console.log(`blogPosts still in products.js? ${newProducts.includes('blogPosts')}`);
console.log(`blogPosts in blogs.js? ${newBlogs.includes('blogPosts')}`);
