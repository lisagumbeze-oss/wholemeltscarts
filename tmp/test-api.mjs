import fs from 'fs';
import https from 'https';

const API_URL = 'https://wholemeltscarts.us/wp-json/wp/v2/posts?per_page=1';

https.get(API_URL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const posts = JSON.parse(data);
      console.log("Keys available:", Object.keys(posts[0]));
      if(posts[0].yoast_head_json && posts[0].yoast_head_json.og_image) {
        console.log("Image URL:", posts[0].yoast_head_json.og_image[0].url);
      } else {
        console.log("Looking for fallback:", posts[0].jetpack_featured_media_url || posts[0].featured_media);
      }
    } catch (e) { console.error(e); }
  });
});
