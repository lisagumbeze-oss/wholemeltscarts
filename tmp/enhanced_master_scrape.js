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

async function enhancedScrape() {
    console.log('Starting puppeteer for Enhanced Master Scrape...');
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    // 1. Build a Master Map of Product Titles to their Exact Reference URLs
    const productUrlMap = new Map();
    for (let p = 1; p <= 8; p++) {
        const url = p === 1 ? 'https://wholemeltextractofficial.com/shop/' : `https://wholemeltextractofficial.com/shop/page/${p}/`;
        console.log(`Mapping Shop Page ${p}...`);
        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
            await new Promise(r => setTimeout(r, 2000));
            
            const items = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.product, .type-product')).map(el => {
                    const titleEl = el.querySelector('.woocommerce-loop-product__title') || el.querySelector('h2') || el.querySelector('.product-title');
                    const linkEl = el.querySelector('a');
                    return {
                        title: titleEl ? titleEl.innerText.trim() : '',
                        link: linkEl ? linkEl.href : ''
                    };
                });
            });
            
            if (items.length === 0) break;
            items.forEach(i => {
                if (i.title && i.link) {
                    productUrlMap.set(i.title.toLowerCase(), i.link);
                }
            });
        } catch(e) {
            console.log(`End of shop pagination.`);
            break;
        }
    }
    
    console.log(`Global URL Mapping complete with ${productUrlMap.size} reference items.`);
    
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
    
    // 3. Reconcile and Deep Scrape
    for (const p of productsArray) {
        console.log(`Checking ${p.id}: ${p.name}...`);
        
        let targetUrl = null;
        
        // Exact Match
        if (productUrlMap.has(p.name.toLowerCase())) {
            targetUrl = productUrlMap.get(p.name.toLowerCase());
        } else {
            // Fuzzy Find
            let bestMatch = null;
            let bestOverlap = 0;
            const pTokens = p.name.toLowerCase().split(/\s+/);
            
            for (const [title, url] of productUrlMap) {
                const titleTokens = title.split(/\s+/);
                const overlap = pTokens.filter(t => titleTokens.includes(t)).length;
                if (overlap > bestOverlap) {
                    bestOverlap = overlap;
                    bestMatch = url;
                }
            }
            if (bestOverlap >= 2) {
                targetUrl = bestMatch;
            }
        }
        
        if (targetUrl) {
            console.log(`  Targeting URL: ${targetUrl}`);
            try {
                await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
                const imgData = await page.evaluate(() => {
                    const heroImg = document.querySelector('.woocommerce-product-gallery__image img, .wp-post-image');
                    return heroImg ? {
                        url: heroImg.getAttribute('data-src') || heroImg.getAttribute('src') || '',
                        alt: heroImg.alt || ''
                    } : null;
                });
                
                if (imgData && imgData.url) {
                    const filename = `${p.slug}.jpeg`;
                    const success = await downloadImage(imgData.url, filename);
                    if (success) {
                        p.image = `/images/products/${filename}`;
                        updatedCount++;
                        console.log(`  Success! Image downloaded for ${p.name}`);
                    }
                }
            } catch(e) {
                console.log(`  Failed to extract from ${targetUrl}`);
            }
        } else {
            console.log(`  No reference URL found for ${p.name}`);
        }
    }
    
    await browser.close();
    
    // 4. Save Updates
    const newProductsStr = JSON.stringify(productsArray, null, 2);
    const finalFileContent = content.substring(0, index + matchStart.length) + newProductsStr + ';\n' + suffix;
    fs.writeFileSync(productsFile, finalFileContent, 'utf8');
    
    console.log(`ENHANCED MASTER SCRAPE COMPLETE. Verified images for ${updatedCount} products.`);
}

enhancedScrape();
