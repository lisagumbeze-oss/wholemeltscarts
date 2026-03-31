import fs from 'fs';

try {
  const content = fs.readFileSync('src/data/products.js', 'utf8');

  // Split out the blogPosts
  const splitStr = 'export const blogPosts = ';
  const parts = content.split(splitStr);

  if (parts.length === 2) {
    let blogDataStr = parts[1].replace(/;[\s\n]*$/, '');
    
    // Parse the JSON representation (since the array is valid JSON mostly)
    // Actually products.js was created by injecting JSON string directly, so parsing might be easy
    let blogPosts;
    try {
      blogPosts = JSON.parse(blogDataStr);
    } catch (e) {
      // In case it's not strictly JSON, we do an eval
      blogPosts = eval('(' + blogDataStr + ')');
    }

    // Extract first image from content for each post
    const updatedPosts = blogPosts.map(post => {
      if (!post.image && post.content) {
        const imgMatch = post.content.match(/<img[^>]+src="([^">]+)"/i);
        post.image = imgMatch ? imgMatch[1] : null;
      }
      return post;
    });

    const newContent = parts[0] + splitStr + JSON.stringify(updatedPosts, null, 2) + ';\n';
    fs.writeFileSync('src/data/products.js', newContent);
    console.log('Successfully extracted images and updated src/data/products.js');
    console.log(`Images found for ${updatedPosts.filter(p => p.image).length} out of ${updatedPosts.length} posts.`);

  } else {
    console.error('Could not find exact split point for blogPosts array.');
  }

} catch (e) {
  console.error(e);
}
