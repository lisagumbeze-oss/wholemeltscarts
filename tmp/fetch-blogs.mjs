import fs from 'fs';

// Bypass SSL issues 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const API_URL = 'https://wholemeltscarts.us/wp-json/wp/v2/posts?per_page=100';

function decodeHtmlEntities(text) {
  return text.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
             .replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#8217;/g, "'")
             .replace(/&#8220;/g, '"')
             .replace(/&#8221;/g, '"')
             .replace(/&#8211;/g, '-')
             .replace(/&#8212;/g, '--');
}

function stripHtmlTagsAndDecode(text) {
  const noTags = text.replace(/<\/?[^>]+(>|$)/g, "");
  return decodeHtmlEntities(noTags).replace(/\n/g, ' ').replace(/\s{2,}/g, ' ');
}

async function fetchBlogs() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const posts = await res.json();
    
    const formattedPosts = posts.map((post, index) => {
      let imageUrl = null;
      if (post.jetpack_featured_media_url) {
        imageUrl = post.jetpack_featured_media_url;
      } else if (post.yoast_head_json && post.yoast_head_json.og_image) {
        imageUrl = post.yoast_head_json.og_image[0].url;
      }

      return {
        id: index + 1,
        title: decodeHtmlEntities(post.title.rendered),
        date: post.date.split('T')[0],
        excerpt: stripHtmlTagsAndDecode(post.excerpt.rendered).trim(),
        content: post.content.rendered,
        slug: post.slug,
        image: imageUrl,
      };
    });

    fs.writeFileSync('tmp/blogs.json', JSON.stringify(formattedPosts, null, 2));
    console.log(`Successfully fetched and formatted ${formattedPosts.length} blog posts with images.`);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

fetchBlogs();
