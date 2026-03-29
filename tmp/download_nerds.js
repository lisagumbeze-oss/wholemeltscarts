import axios from 'axios';
import fs from 'fs';
import path from 'path';

async function download() {
  const url = 'https://wholemeltextractofficial.com/wp-content/uploads/2025/10/Authentic-Nerds-Live-Resin-510x680-1.jpeg';
  const dest = 'public/images/products/authentic-nerds-live-resin.jpeg';
  
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
        console.log('Successfully downloaded Authentic Nerds Live Resin image.');
        resolve();
      });
      writer.on('error', reject);
    });
  } catch (e) {
    console.error('Download failed:', e.message);
  }
}

download();
