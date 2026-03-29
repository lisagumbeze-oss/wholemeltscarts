import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const productsFile = 'src/data/products.js';

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

async function deepScrape() {
    console.log('Starting puppeteer for deep scrape...');
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    // 1. Build a Master Dictionary of Scraped Titles -> Images from ALL Shop Pages
    const masterScraped = new Map();
    for (let p = 1; p <= 8; p++) {
        const url = p === 1 ? 'https://wholemeltextractofficial.com/shop/' : `https://wholemeltextractofficial.com/shop/page/${p}/`;
        console.log(`Scanning Shop Page ${p}...`);
        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
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
            
            if (items.length === 0) break;
            items.forEach(i => {
                if (i.title && i.imgUrl) {
                    masterScraped.set(i.title.toLowerCase(), i.imgUrl);
                }
            });
        } catch(e) {
            console.log(`End of pagination reached.`);
            break;
        }
    }
    
    console.log(`Global dictionary built with ${masterScraped.size} unique titles.`);
    
    // 2. Load Local Products
    let content = fs.readFileSync(productsFile, 'utf8');
    const matchStart = 'export const products = ';
    const index = content.indexOf(matchStart);
    let arrayPart = content.substring(index + matchStart.length);
    const nextExport = arrayPart.indexOf('\nexport const ');
    let suffix = '';
    if (nextExport !== -1) {
        suffix = arrayPart.substring(nextExport);
        arrayPart = arrayPart.substring(0, nextExport);
    }
    arrayPart = arrayPart.replace(/;\s*$/, '');
    
    const productsArray = JSON.parse(arrayPart);
    let updatedCount = 0;
    
    // 3. Iterate through all products to ensure images are CORRECT
    for (const p of productsArray) {
        console.log(`Checking ${p.id}: ${p.name}...`);
        
        let targetImgUrl = null;
        
        // Strategy A: Direct Dictionary Match
        if (masterScraped.has(p.name.toLowerCase())) {
            targetImgUrl = masterScraped.get(p.name.toLowerCase());
            console.log(`  Found exact match in shop grid.`);
        } else {
            // Strategy B: Visit individual product page via slug guess
            const referenceUrl = `https://wholemeltextractofficial.com/product/${p.slug}/`;
            console.log(`  No shop match. Attempting deep-link: ${referenceUrl}`);
            try {
                await page.goto(referenceUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
                targetImgUrl = await page.evaluate(() => {
                    const heroImg = document.querySelector('.woocommerce-product-gallery__image img, .wp-post-image');
                    return heroImg ? (heroImg.getAttribute('data-src') || heroImg.getAttribute('src') || '') : null;
                });
                if (targetImgUrl) console.log(`  Successfully extracted image from deep-link.`);
            } catch(e) {
                console.log(`  Deep-link failed for ${p.name}`);
            }
        }
        
        if (targetImgUrl) {
            const filename = `${p.slug}.jpeg`;
            const success = await downloadImage(targetImgUrl, filename);
            if (success) {
                p.image = `/images/products/${filename}`;
                updatedCount++;
            }
        }
    }
    
    await browser.close();
    
    // 4. Save Updates
    const newProductsStr = JSON.stringify(productsArray, null, 2);
    const finalFileContent = content.substring(0, index + matchStart.length) + newProductsStr + ';\n' + suffix;
    fs.writeFileSync(productsFile, finalFileContent, 'utf8');
    
    console.log(`DEEP SCRAPE COMPLETE. Replaced/Verified images for ${updatedCount} products.`);
}

deepScrape();
