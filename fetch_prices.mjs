import https from 'https';
import fs from 'fs';

const url = 'https://wholemeltextracts.store/product/blue-nerdz-hash-rosin/';
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

https.get(url, { agent: httpsAgent, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const dataMatch = body.match(/data-product_variations="([^"]+)"/);
    if (dataMatch) {
       const unescaped = dataMatch[1].replace(/&quot;/g, '"');
       try {
          const variations = JSON.parse(unescaped);
          variations.forEach(v => {
             console.log(`Variation: ${v.attributes.attribute_quantity}, Price: ${v.display_price}`);
          });
       } catch (e) {
          console.log('Failed to parse variations data');
       }
    }
  });
});
