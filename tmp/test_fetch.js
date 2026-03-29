import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

async function testFetch() {
  try {
    const res = await axios.get('https://wholemeltextractofficial.com/shop/');
    const $ = cheerio.load(res.data);
    const products = [];
    
    // Attempt to guess the WooCommerce structure for a typical shop page
    $('li.product').each((i, el) => {
      const title = $(el).find('h2').text() || $(el).find('.woocommerce-loop-product__title').text();
      const img = $(el).find('img').attr('src');
      products.push({ title: title.trim(), img });
    });
    
    console.log(`Found ${products.length} products on page 1`);
    console.log(products.slice(0, 3));
  } catch(e) {
    console.error('Error fetching:', e.message);
  }
}

testFetch();
