import axios from 'axios';
import fs from 'fs';

async function fetchRaw() {
  try {
    const res = await axios.get('https://wholemeltextractofficial.com/shop/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    });
    fs.writeFileSync('tmp/raw.html', res.data, 'utf8');
    console.log('Saved raw.html successfully.');
  } catch(e) {
    console.error('Failed to fetch:', e.message);
  }
}
fetchRaw();
