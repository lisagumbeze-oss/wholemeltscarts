import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the .env file from the root directory
dotenv.config({ path: join(__dirname, '../.env') });

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("❌ Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, key);

// Read the massive products.js file
// We can't easily import it as ES Module from a script because of potential Vite/React-specific syntax/aliases.
// But wait, products.js is just pure JS objects. Let's try importing it.
import { products, categories } from '../src/data/products.js';

async function seedCategories() {
  console.log("📦 Seeding Categories...");
  for (const cat of categories) {
    const { error } = await supabase.from('categories').upsert({
      id: cat.id,
      name: cat.name,
      count: cat.count
    });
    if (error) {
      console.error("Error inserting category:", error);
    }
  }
  console.log("✅ Categories seeded.");
}

async function seedProducts() {
  console.log("📦 Seeding Products...");
  const BATCH_SIZE = 100;
  let totalInserted = 0;

  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE).map(p => ({
      id: p.id.toString(),
      name: p.name,
      type: p.type || null,
      price: p.price || 0,
      images: p.images || [],
      original_price: p.originalPrice || null,
      description: p.description || null,
      category: p.category || null,
      strain: p.strain || null
    }));

    const { error } = await supabase.from('products').upsert(batch);
    if (error) {
      console.error(`❌ Error inserting products ${i} to ${i + batch.length}:`, error);
    } else {
      totalInserted += batch.length;
      console.log(`✅ Inserted ${totalInserted}/${products.length} products...`);
    }
  }
  console.log("✅ All Products seeded successfully!");
}

async function run() {
  console.log("🚀 Starting Database Seed...");
  await seedCategories();
  await seedProducts();
  console.log("🎉 Seed Complete!");
}

run();
