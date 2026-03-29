import axios from 'axios';
import fs from 'fs';
import path from 'path';

async function download() {
  const url = 'https://wholemeltextractofficial.com/wp-content/uploads/2023/11/GARLIC-COOKIES-510x510-1-1.jpg';
  const dest = 'public/images/products/badder-garlic-cocktail.jpg';
  
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    
    const writer = fs.createWriteStream(dest);
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log('Successfully downloaded Badder Garlic Cocktail image.');
        resolve();
      });
      writer.on('error', reject);
    });
  } catch (e) {
    console.error('Download failed:', e.message);
  }
}

download();
