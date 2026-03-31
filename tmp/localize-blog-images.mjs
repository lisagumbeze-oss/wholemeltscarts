import fs from 'fs';
import path from 'path';
import https from 'https';

const BLOG_DATA_PATH = 'src/data/blogs.js';
const ASSETS_DIR = 'public/assets/blog';

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    // Handle specific character encoding in URLs (e.g., &#038; -> &)
    const cleanUrl = url.replace(/&#038;/g, '&');
    
    https.get(cleanUrl, {
      rejectUnauthorized: false // Bypass SSL issues for the source server
    }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const filePath = path.join(ASSETS_DIR, filename);
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(`/assets/blog/${filename}`);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function localizeImages() {
  try {
    const content = fs.readFileSync(BLOG_DATA_PATH, 'utf8');
    
    // We need to parse the array. Since it's an export, we can do a simple extraction.
    const startIdx = content.indexOf('[');
    const endIdx = content.lastIndexOf(']');
    
    if (startIdx === -1 || endIdx === -1) {
      throw new Error('Could not find blogPosts array in blogs.js');
    }
    
    const arrayStr = content.substring(startIdx, endIdx + 1);
    const blogPosts = JSON.parse(arrayStr);
    
    console.log(`Processing ${blogPosts.length} blog posts...`);
    
    for (const post of blogPosts) {
      if (post.image && post.image.startsWith('http')) {
        const extension = path.extname(new URL(post.image.replace(/&#038;/g, '&')).pathname) || '.jpg';
        const filename = `${post.slug}${extension.split('?')[0]}`;
        
        console.log(`Downloading image for: ${post.title}`);
        try {
          const localPath = await downloadImage(post.image, filename);
          post.image = localPath;
          console.log(`  -> Saved to ${localPath}`);
        } catch (err) {
          console.error(`  -> Failed to download: ${err.message}`);
        }
      }
    }
    
    // Write back the updated file
    const updatedContent = content.substring(0, startIdx) + JSON.stringify(blogPosts, null, 2) + ';\n';
    fs.writeFileSync(BLOG_DATA_PATH, updatedContent);
    console.log('✅ Updated src/data/blogs.js with local image paths');

  } catch (err) {
    console.error('Error during localization:', err);
  }
}

localizeImages();
