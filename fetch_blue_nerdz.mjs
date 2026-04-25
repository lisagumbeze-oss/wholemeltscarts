import https from 'https';
import fs from 'fs';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { agent: httpsAgent, headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function extractAndDownload() {
  const url = 'https://wholemeltextracts.store/product/blue-nerdz-hash-rosin/';
  console.log(`Fetching HTML from ${url}...`);
  const html = await fetchHtml(url);
  
  // Try to find the og:image or main product image
  let match = html.match(/<meta property="og:image" content="(.*?)"/);
  if (!match) {
    match = html.match(/<img[^>]+src="(https:\/\/wholemeltextracts\.store\/wp-content\/uploads\/[^"]+)"/);
  }

  if (match && match[1]) {
    const imgUrl = match[1];
    console.log(`Found image URL: ${imgUrl}`);
    
    // Download image
    const destPath = 'public/images/products/blue-nerdz-hash-rosin.jpg';
    console.log(`Downloading to ${destPath}...`);
    
    const file = fs.createWriteStream(destPath);
    https.get(imgUrl, { agent: httpsAgent, headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', function() {
          file.close();  
          console.log('Download complete!');
        });
      } else {
        console.error('Failed to download image. Status code:', response.statusCode);
      }
    });

  } else {
    console.log('Could not find image URL in HTML.');
  }
}

extractAndDownload().catch(console.error);
