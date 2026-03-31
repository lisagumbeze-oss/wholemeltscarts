import fs from 'fs';

try {
  const content = fs.readFileSync('src/data/products.js', 'utf8');
  const blogs = fs.readFileSync('tmp/blogs.json', 'utf8');

  // Find the split point
  const splitStr = 'export const blogPosts = ';
  const parts = content.split(splitStr);

  if (parts.length === 2) {
    const newContent = parts[0] + splitStr + blogs + ';\n';
    fs.writeFileSync('src/data/products.js', newContent);
    console.log('Successfully injected blog posts into src/data/products.js');
  } else {
    console.error('Could not find exact split point for blogPosts array.');
  }

} catch (e) {
  console.error(e);
}
