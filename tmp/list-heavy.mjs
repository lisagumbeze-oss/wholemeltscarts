import fs from 'fs';
import path from 'path';

const dir = 'public/images/products';
if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    const heavy = files.map(f => {
        const stats = fs.statSync(path.join(dir, f));
        return { name: f, size: stats.size };
    }).filter(f => f.size > 50000)
      .sort((a, b) => b.size - a.size);
      
    heavy.forEach(f => {
        console.log(`${f.name} (${(f.size/1024).toFixed(1)} KB)`);
    });
}
