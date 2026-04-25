import fs from 'fs';
import path from 'path';

// Load local data
// Note: In a real environment, we'd import these. Here we read the files as strings for analysis.
const PRODUCTS_PATH = './src/data/products.js';
const BLOGS_PATH = './src/data/blogs.js'; // Assuming this exists based on the project structure

async function analyzeInternalLinks() {
  console.log('🚀 Starting Internal Link Analysis...');
  
  try {
    const productsContent = fs.readFileSync(PRODUCTS_PATH, 'utf8');
    // Extract product names using regex (simplified for this script)
    const productNames = [...productsContent.matchAll(/name:\s*['"](.+?)['"]/g)].map(m => m[1]);
    
    console.log(`🔍 Found ${productNames.length} products to map.`);

    // If blog file exists, analyze it
    if (fs.existsSync(BLOGS_PATH)) {
      const blogContent = fs.readFileSync(BLOGS_PATH, 'utf8');
      const recommendations = [];

      productNames.forEach(name => {
        const regex = new RegExp(`\\b${name}\\b`, 'gi');
        const matches = [...blogContent.matchAll(regex)];
        
        if (matches.length > 0) {
          recommendations.push({
            keyword: name,
            occurrences: matches.length,
            action: `Link "${name}" to its product page in blogs.js`
          });
        }
      });

      if (recommendations.length > 0) {
        console.table(recommendations);
        fs.writeFileSync('internal-link-report.json', JSON.stringify(recommendations, null, 2));
        console.log('✅ Report saved to internal-link-report.json');
      } else {
        console.log('ℹ️ No internal linking opportunities found in current blog content.');
      }
    } else {
      console.log('ℹ️ Blog data file not found. Create src/data/blogs.js to enable deep linking.');
    }
  } catch (err) {
    console.error('❌ Error analyzing links:', err.message);
  }
}

analyzeInternalLinks();
