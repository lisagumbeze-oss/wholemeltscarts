import fs from 'fs';
import path from 'path';

const baseUrl = 'https://wholemeltscarts.us';

// Read products.js
const productsContent = fs.readFileSync('src/data/products.js', 'utf8');
const productSlugs = [...productsContent.matchAll(/"slug":\s*"([^"]+)"/g)].map(m => m[1]);

// Read blogs.js
const blogsContent = fs.readFileSync('src/data/blogs.js', 'utf8');
const blogSlugs = [...blogsContent.matchAll(/"slug":\s*"([^"]+)"/g)].map(m => m[1]);

const staticPages = [
  '',
  '/shop',
  '/cart',
  '/checkout',
  '/faq',
  '/blog',
  '/contact',
  '/about',
  '/privacy'
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Add static pages
staticPages.forEach(page => {
  sitemap += `  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>\n`;
});

// Add products
productSlugs.forEach(slug => {
  sitemap += `  <url>
    <loc>${baseUrl}/product/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
});

// Add blogs
blogSlugs.forEach(slug => {
  sitemap += `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
});

sitemap += '</urlset>';

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully at public/sitemap.xml');

const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

fs.writeFileSync('public/robots.txt', robots);
console.log('Robots.txt generated successfully at public/robots.txt');
