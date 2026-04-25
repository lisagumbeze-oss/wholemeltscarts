import google from 'googlethis';
import fs from 'fs';

async function test() {
  const images = await google.image('whole melts extract disposable hawaiian dew', { safe: false });
  console.log(images.slice(0, 2));
}

test().catch(console.error);
