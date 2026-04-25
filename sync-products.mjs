import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── Step 1: Add reviews column if it doesn't exist ───
async function addReviewsColumn() {
  console.log('Adding reviews column via RPC...');
  const { error } = await supabase.rpc('exec_sql', {
    query: `ALTER TABLE products ADD COLUMN IF NOT EXISTS reviews jsonb DEFAULT '[]'::jsonb;`
  });
  if (error) {
    console.log('RPC not available, trying direct SQL via REST...');
    // Try direct approach - update with reviews data anyway, Supabase may auto-handle
    const testUpdate = await supabase.from('products').update({ reviews: [] }).eq('id', '2');
    if (testUpdate.error) {
      console.log('Cannot add reviews column automatically. You need to add it manually:');
      console.log('Go to Supabase Dashboard > Table Editor > products > Add Column');
      console.log('Name: reviews, Type: jsonb, Default: []');
      console.log('');
      console.log('Then re-run this script.');
      return false;
    }
  }
  return true;
}

// ─── Step 1.5: Add slug column if it doesn't exist ───
async function addSlugColumn() {
  console.log('Adding slug column via RPC...');
  const { error } = await supabase.rpc('exec_sql', {
    query: `ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;`
  });
  if (error) {
    console.log('RPC failed for slug column. Testing if it already exists...');
    // Test if the column exists by doing a harmless select
    const { error: testErr } = await supabase.from('products').select('slug').limit(1);
    if (testErr) {
      console.log('slug column not available. Syncing without slugs.');
      return false;
    }
  }
  return true;
}

// ─── Step 1.6: Add variations column if it doesn't exist ───
async function addVariationsColumn() {
  console.log('Adding variations column via RPC...');
  const { error } = await supabase.rpc('exec_sql', {
    query: `ALTER TABLE products ADD COLUMN IF NOT EXISTS variations jsonb DEFAULT '[]'::jsonb;`
  });
  if (error) {
    console.log('RPC failed for variations column. Testing if it already exists...');
    const { error: testErr } = await supabase.from('products').select('variations').limit(1);
    if (testErr) {
      console.log('variations column not available.');
      return false;
    }
  }
  return true;
}

// ─── Step 2: Generate 25 unique reviews per product ───
const firstNames = ['James','Michael','Sarah','Emily','David','Jessica','Chris','Amanda','Daniel','Ashley','Brandon','Nicole','Tyler','Rachel','Kevin','Lauren','Brian','Megan','Andrew','Melissa','John','Laura','Matthew','Stephanie','Jason','Samantha','Ryan','Jennifer','Justin','Brittany'];
const lastInitials = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');

const reviewTemplates = {
  disposables: [
    "This disposable hits incredibly smooth. The flavor is rich and authentic — no burnt taste whatsoever. I've been using it daily for a week and the battery is still going strong.",
    "Absolutely love the draw on this pen. The vapor production is perfect and the effects kick in within minutes. This is definitely my new go-to brand.",
    "The flavor profile on this is unreal. Tastes exactly like the strain name suggests. Smooth inhale, satisfying exhale, and the high is clean and balanced.",
    "Best disposable I've ever tried. No clogging, no leaking, just pure, clean vapor every single time. The potency is out of this world.",
    "I was skeptical at first, but this disposable completely won me over. The taste is phenomenal and the effects last for hours. Already ordering more.",
    "Super discreet and portable. I take this everywhere. The flavor stays consistent from first puff to last, which is rare for disposables.",
    "The build quality is premium — feels solid in the hand. The airflow is perfectly calibrated. Every hit delivers amazing flavor and potent effects.",
    "This is hands down the smoothest disposable on the market. Zero harshness, pure live resin flavor. My friends are all switching over after trying mine.",
    "Incredible flavor and potency. I usually go through disposables fast, but this one has impressive longevity. The quality of the oil is obviously top-tier.",
    "The terpene profile is absolutely on point. You can tell this is made from genuine live resin. The effects are immediate and perfectly balanced.",
    "I'm a daily user and this is the cleanest disposable I've experienced. No headaches, no grogginess the next day — just a pure, enjoyable session every time.",
    "Whole Melts never disappoints. This particular flavor exceeded my expectations. The exhale tastes like candy and the body high is deeply relaxing.",
    "Perfect for evening wind-down sessions. The effects are calming without being too sedating. The flavor is so smooth you almost forget you're vaping.",
    "I've recommended this to at least five friends already. The quality speaks for itself — rich flavor, potent effects, and a beautiful design.",
    "From the packaging to the last puff, everything about this screams premium. The live resin extract provides an experience that cheaper brands simply can't match.",
    "The vapor quality is exceptional. Thick, flavorful clouds every time. I've tried dozens of brands and Whole Melts consistently delivers the best disposables.",
    "This disposable lasted me way longer than expected. The battery life is impressive and the oil quality never degrades. Truly a cut above the rest.",
    "Amazing product from start to finish. The draw activation is responsive, the flavor is rich and layered, and the effects are exactly what I need.",
    "I appreciate the attention to detail in this product. The strain-specific terpenes are clearly authentic. You can taste the craft that goes into these extracts.",
    "My tolerance is fairly high, and this still manages to deliver a satisfying experience every time. The concentrate quality is clearly top-shelf.",
    "The smoothness of each hit is remarkable. No coughing, no irritation — just pure, flavorful vapor that delivers consistent effects session after session.",
    "I switched from cartridges to this disposable and couldn't be happier. The convenience combined with this level of quality is unbeatable.",
    "Every flavor I've tried from Whole Melts has been outstanding, but this one in particular is something special. The terpene expression is incredible.",
    "Perfect consistency, perfect potency, perfect flavor. This is what all disposables should aspire to be. I won't be buying from anyone else.",
    "The live resin quality shines through in every puff. You can genuinely taste the difference between this and distillate-based products. Night and day.",
    "Outstanding product. The draw is effortless, the flavor is pure, and the effects are long-lasting. This has become a staple in my rotation.",
    "Reliable, potent, and delicious. Everything I look for in a disposable wrapped up in sleek, premium packaging. Five stars without hesitation.",
    "I keep coming back to Whole Melts because the quality never wavers. This disposable is just as incredible as my first one was months ago."
  ],
  carts: [
    "This cartridge is absolutely fire. The oil is crystal clear and the flavor is incredibly pure. Smooth hits every time with no clogging at all.",
    "Best cart I've purchased in a long time. The hardware quality is excellent and the live resin oil delivers authentic terps with every puff.",
    "I'm impressed by how consistent the quality is across different Whole Melts carts. This one has a beautiful golden color and tastes amazing.",
    "The vapor production from this cart is outstanding. Thick, flavorful clouds that taste like fresh-frozen flower. The potency is no joke either.",
    "Premium quality through and through. The ceramic coil delivers perfectly heated vapor and the oil lasts way longer than competitor carts.",
    "This cart made me a Whole Melts convert. The flavor is so authentic and the effects are perfectly balanced. Already bought three more flavors.",
    "Smooth, potent, and absolutely delicious. The terps in this cart are loud and authentic. You can taste the quality of the extraction process.",
    "I've had zero issues with this cartridge. No leaking, no clogging, just consistent quality from the first hit to the last drop.",
    "The strain profile comes through beautifully in this cart. It tastes exactly like the flower it was extracted from. Such a clean experience.",
    "Whole Melts carts are the gold standard for me now. This particular one has incredible flavor depth and powerful, long-lasting effects.",
    "The oil viscosity is perfect — you can tell there are no fillers or cutting agents. Pure live resin that delivers an exceptional experience.",
    "Every hit from this cart is like a flavor explosion. The terpene profile is complex and layered. Ultra smooth with no throat irritation.",
    "I appreciate that Whole Melts uses real ceramic hardware. The difference in flavor delivery compared to wick-based carts is monumental.",
    "Easily the best live resin cartridge available. The clarity of the oil, the smoothness of the vapor, and the potency are all top-tier.",
    "This cart has become my daily driver. The effects are calming and euphoric, and the flavors never get old even after extended use.",
    "From the sleek packaging to the premium hardware, everything about this cart says quality. The oil inside lives up to the presentation.",
    "I specifically seek out Whole Melts carts because of the consistency. Every single one I've tried has been outstanding in flavor and potency.",
    "The draw resistance is perfectly tuned on this cart. Not too tight, not too loose — just right for flavorful, satisfying pulls.",
    "This cart lasted me significantly longer than I expected. The oil is clearly high quality and doesn't burn through wastefully.",
    "A truly premium cartridge experience. The live resin terpenes are vibrant and the effects are beautifully clean. No anxiety, just relaxation.",
    "I've been vaping for years and these carts are genuinely in a class of their own. The extraction quality sets Whole Melts apart completely.",
    "The flavor on this cart is chef's kiss. Rich, authentic, and consistent from start to finish. My friends always ask what brand I'm using.",
    "Outstanding hardware quality paired with exceptional oil. This cart is everything I want in a vaping experience — smooth, potent, and flavorful.",
    "I tried this based on a friend's recommendation and I completely understand the hype now. The flavor and effects are genuinely next level.",
    "This is my fifth Whole Melts cart and the quality hasn't dropped once. Consistent excellence, which is rare in this market."
  ],
  'live-resin': [
    "The terp profile on this live resin is absolutely insane. You can taste every note of the original flower. A true full-spectrum experience.",
    "This live resin melts beautifully and the flavor is unparalleled. The aroma when you open the jar immediately tells you it's premium quality.",
    "Incredible extraction work. This live resin preserves the plant profile perfectly. The effects are powerful yet balanced — exactly what I want.",
    "The consistency of this live resin is perfect for dabbing. It melts cleanly on the nail with zero residue and produces amazing flavor clouds.",
    "I'm a concentrate connoisseur and this live resin genuinely impressed me. The terpene preservation is remarkable — tastes like fresh-frozen flower.",
    "Every batch of Whole Melts live resin I've tried has been consistent in quality. This one has an incredibly layered, complex flavor profile.",
    "The potency of this live resin caught me off guard in the best way. A small dab delivers powerful, long-lasting effects with incredible flavor.",
    "From the jar presentation to the actual product, everything is premium. The live resin has a beautiful color and perfect wet, saucy consistency.",
    "This is what real live resin should taste like. None of that CRC-processed, stripped-down concentrate flavor — this is pure, authentic extract.",
    "The flavor development on each dab is incredible. You get different terpene notes at different temperatures. A true connoisseur's product.",
    "Whole Melts has mastered the art of live resin extraction. This product delivers the complete entourage effect with incredible flavor and potency.",
    "I've been dabbing for years and this is genuinely some of the best live resin I've ever encountered. The terpene expression is off the charts.",
    "Smooth, flavorful, and incredibly potent. This live resin delivers a clean, clear-headed high that's perfect for any time of day.",
    "The aroma that hits you when you open the jar is enough to know this is quality. The experience only gets better from there.",
    "This live resin is a masterpiece of extraction. Every dab is a symphony of flavor and effect. Worth every penny of the premium price.",
    "I specifically trust Whole Melts for concentrates because they never cut corners. This live resin is pure, potent, and perfectly crafted.",
    "Beautiful golden color, perfect consistency, and an aroma that fills the room. This live resin is a total sensory experience.",
    "The effects from this live resin are deeply therapeutic. It relieves tension and stress while keeping my mind clear and focused.",
    "Outstanding quality. The live resin melts cleanly, tastes incredible, and delivers effects that last for hours. This is elite-level concentrate.",
    "Every aspect of this product screams quality — from the packaging to the consistency to the incredible terpene expression. Truly top shelf.",
    "I appreciate the full-spectrum approach Whole Melts takes. This live resin captures everything that makes the original plant special.",
    "The low-temp dab experience with this live resin is incredible. Layers of flavor unfold with each draw. Absolutely phenomenal product.",
    "Consistency, color, aroma, flavor, effects — this live resin checks every single box. It's clear why Whole Melts has such a loyal following.",
    "This live resin delivers a uniquely smooth experience. No harshness at all, just pure, clean flavor and perfectly balanced effects.",
    "I've turned several friends into Whole Melts fans just by letting them try this live resin. The quality is immediately obvious to anyone."
  ]
};

// Fallback for categories not listed above
const genericTemplates = reviewTemplates.disposables;

function generateReviews(productName, category) {
  const templates = reviewTemplates[category] || genericTemplates;
  const reviews = [];
  const usedNames = new Set();
  const usedTemplates = new Set();

  for (let i = 0; i < 25; i++) {
    // Pick unique reviewer name
    let name;
    do {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last = lastInitials[Math.floor(Math.random() * lastInitials.length)];
      name = `${first} ${last}.`;
    } while (usedNames.has(name) && usedNames.size < firstNames.length * lastInitials.length);
    usedNames.add(name);

    // Pick template
    let templateIdx;
    do {
      templateIdx = Math.floor(Math.random() * templates.length);
    } while (usedTemplates.has(templateIdx) && usedTemplates.size < templates.length);
    usedTemplates.add(templateIdx);
    if (usedTemplates.size >= templates.length) usedTemplates.clear();

    const comment = templates[templateIdx];
    const rating = Math.random() < 0.8 ? 5 : 4;

    // Random date in last 6 months
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 180);
    const reviewDate = new Date(now - daysAgo * 86400000);
    const date = reviewDate.toISOString().split('T')[0];

    reviews.push({ user: name, rating, date, comment });
  }

  return reviews;
}

// ─── Step 3: Sync images and reviews ───
async function syncProducts() {
  // Import local data
  const { products: localProducts } = await import('./src/data/products.js');

  console.log(`Local products: ${localProducts.length}`);

  // Get DB products
  const { data: dbProducts, error } = await supabase.from('products').select('id, name');
  if (error) { console.error('Error fetching DB products:', error); return; }
  console.log(`DB products: ${dbProducts.length}`);

  // Try adding columns
  const canReview = await addReviewsColumn();
  const canSlug = await addSlugColumn();
  const canVariations = await addVariationsColumn();
  
  if (!canReview) {
    console.log('\n⚡ reviews column not available yet.\n');
  }
  if (!canSlug) {
    console.log('\n⚡ slug column not available yet.\n');
  }
  if (!canVariations) {
    console.log('\n⚡ variations column not available yet.\n');
  }

  let updated = 0;
  let failed = 0;

  for (const dbProd of dbProducts) {
    // Match by name (case-insensitive, trimmed)
    const localMatch = localProducts.find(lp =>
      lp.name.trim().toLowerCase() === dbProd.name.trim().toLowerCase()
    );

    if (!localMatch) {
      console.log(`  ⚠ No local match for DB product: "${dbProd.name}"`);
      failed++;
      continue;
    }

    const updatePayload = {
      images: [localMatch.image],
      category: localMatch.category
    };

    if (canSlug && localMatch.slug) {
      updatePayload.slug = localMatch.slug;
    }

    if (canVariations && localMatch.variations) {
      updatePayload.variations = localMatch.variations;
    }

    if (canReview) {
      const reviews = generateReviews(dbProd.name, localMatch.category);
      updatePayload.reviews = reviews;
    }

    const { error: upErr } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', dbProd.id);

    if (upErr) {
      console.log(`  ✗ Failed to update "${dbProd.name}":`, upErr.message);
      failed++;
    } else {
      updated++;
    }
  }

  console.log(`\n✓ Synced ${updated} products (${failed} failures)`);
}

syncProducts().catch(console.error);
