import fs from 'fs';
import path from 'path';
import google from 'googlethis';
import { products } from './src/data/products.js';
import https from 'https';

async function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const stream = fs.createWriteStream(filePath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file async.
      reject(err);
    });
  });
}

async function fixImages() {
  for (const product of products) {
    const filePath = path.join(process.cwd(), 'public', product.image);
    
    // Check if the file is blurry or placeholder
    let isBad = false;
    try {
      const stats = fs.statSync(filePath);
      if (stats.size === 103791 || stats.size < 6000) {
        isBad = true;
      }
    } catch (e) {
      // File doesn't exist? That's bad too!
      isBad = true;
    }

    if (isBad) {
      console.log(`Fixing image for: ${product.name} (File: ${product.image})`);
      try {
        const query = `whole melt extracts ${product.name} ${product.category} package`;
        const images = await google.image(query, { safe: false });
        
        let success = false;
        for (const img of images) {
          if (!img.url || img.url.endsWith('svg')) continue;
          
          try {
            console.log(`  Downloading ${img.url}...`);
            await downloadImage(img.url, filePath);
            console.log(`  Successfully updated ${product.image}!`);
            success = true;
            break;
          } catch (err) {
            console.log(`  Failed to download ${img.url}, trying next...`);
          }
        }
        
        if (!success) {
          console.log(`  Failed to find a working image for ${product.name}`);
        }
      } catch (err) {
        console.error(`  Error searching for ${product.name}:`, err.message);
      }
      
      // wait a bit to avoid rate limits
      await new Promise(r => setTimeout(r, 1500));
    }
  }
}

fixImages().then(() => console.log('Done!')).catch(console.error);
