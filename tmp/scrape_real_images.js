import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const productsFile = 'src/data/products.js';

// Simple token overlap similarity
function getSimilarity(s1, s2) {
  const t1 = s1.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(x => x.length > 2);
  const t2 = s2.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(x => x.length > 2);
  if (t1.length === 0 || t2.length === 0) return 0;
  
  let overlap = 0;
  for (const w of t1) {
    if (t2.includes(w)) overlap++;
  }
  return overlap / Math.min(t1.length, t2.length);
}

async function downloadImage(url, filename) {
  const filepath = path.join('public/images/products', filename);
  if (!url || !url.startsWith('http')) return false;
  
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filepath);
      response.data.pipe(writer);
      writer.on('finish', () => resolve(true));
      writer.on('error', () => resolve(false));
    });
  } catch(e) {
    console.error(`Failed to download ${url}`);
    return false;
  }
}

async function scrapeImages() {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  let allScrapedProps = [];
  for (let p = 1; p <= 6; p++) {
    const url = p === 1 ? 'https://wholemeltextractofficial.com/shop/' : `https://wholemeltextractofficial.com/shop/page/${p}/`;
    console.log(`Navigating to ${url}`);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      // Wait a bit
      await new Promise(r => setTimeout(r, 2000));
      
      const items = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.product, .type-product')).map(el => {
          const titleEl = el.querySelector('.woocommerce-loop-product__title') || el.querySelector('h2') || el.querySelector('.product-title');
          const imgEl = el.querySelector('img');
          return {
            title: titleEl ? titleEl.innerText.trim() : '',
            imgUrl: imgEl ? (imgEl.getAttribute('data-src') || imgEl.getAttribute('src') || '') : ''
          };
        });
      });
      
      if (items.length === 0) {
        console.log('No elements found, moving on.');
        break;
      }
      const validItems = items.filter(i => i.title && i.imgUrl);
      allScrapedProps.push(...validItems);
      console.log(`Found ${validItems.length} valid product items on page ${p}`);
      
    } catch(e) {
      console.log(`Error or end of pagination at page ${p}: ${e.message}`);
      break;
    }
  }
  await browser.close();
  console.log(`Total scraped items from reference site: ${allScrapedProps.length}.`);

  // Load local products data
  let content = fs.readFileSync(productsFile, 'utf8');
  console.log('Matching and downloading images for fallback products...');
  
  // Find products that have been assigned premium fallback
  const regex = /({\s*"id":\s*(\d+),\s*"name":\s*"([^"]+)"[\s\S]*?"image":\s*")(\/images\/premium\/[^"]+)(")/g;
  let match;
  let matchesToProcess = [];
  
  while ((match = regex.exec(content)) !== null) {
      matchesToProcess.push({
          fullBlock: match[0],
          prefix: match[1],
          id: match[2],
          name: match[3],
          oldImg: match[4],
          suffix: match[5],
          index: match.index
      });
  }
  
  console.log(`Found ${matchesToProcess.length} products using premium fallbacks to try mapping.`);
  
  let count = 0;
  // We apply replacements bottom up so indices don't shift
  for (let i = matchesToProcess.length - 1; i >= 0; i--) {
      const matchData = matchesToProcess[i];
      const { id, name, oldImg, fullBlock, index } = matchData;
      
      // Find best match in scraped props
      let bestMatch = null;
      let bestSim = 0;
      
      for (const scraped of allScrapedProps) {
        // Exact substring
        if (scraped.title.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(scraped.title.toLowerCase())) {
          bestMatch = scraped;
          bestSim = 1;
          break;
        }
        
        const sim = getSimilarity(name, scraped.title);
        if (sim > bestSim && sim >= 0.5) {
          bestSim = sim;
          bestMatch = scraped;
        }
      }
      
      if (bestMatch && bestSim >= 0.5) {
        console.log(`Matched Local ID ${id} ("${name}") with Remote "${bestMatch.title}" (Sim: ${bestSim})`);
        // Clean URL
        let dlUrl = bestMatch.imgUrl;
        if (dlUrl.startsWith('//')) dlUrl = 'https:' + dlUrl;
        
        const filename = `real_${id}_${Date.now()}.jpg`;
        const success = await downloadImage(dlUrl, filename);
        
        if (success) {
            const newImagePath = `/images/products/${filename}`;
            const newBlock = fullBlock.replace(oldImg, newImagePath);
            content = content.substring(0, index) + newBlock + content.substring(index + fullBlock.length);
            count++;
        } else {
            console.log(`  Failed to download image for ${name} from ${dlUrl}`);
        }
      } else {
        console.log(`No reference match found for ID ${id} ("${name}"). Keeping premium fallback.`);
      }
  }
  
  fs.writeFileSync(productsFile, content, 'utf8');
  console.log(`Finished. Replaced ${count} premium placeholders with real original images.`);
}

scrapeImages();
