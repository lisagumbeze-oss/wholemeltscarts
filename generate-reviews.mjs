/**
 * Generates 25 unique, product-specific reviews for every product
 * and writes them back into src/data/products.js
 */
import fs from 'fs';
import { products, categories } from './src/data/products.js';

const firstNames = [
  'James','Michael','Sarah','Emily','David','Jessica','Chris','Amanda','Daniel','Ashley',
  'Brandon','Nicole','Tyler','Rachel','Kevin','Lauren','Brian','Megan','Andrew','Melissa',
  'John','Laura','Matthew','Stephanie','Jason','Samantha','Ryan','Jennifer','Justin','Brittany',
  'Marcus','Heather','Derek','Natalie','Kyle','Amber','Sean','Kayla','Trevor','Courtney'
];
const lastInitials = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');

// Category-specific sentence fragments
const introByCategory = {
  disposables: [
    (name) => `Just received my ${name} disposable and I'm blown away.`,
    (name) => `The ${name} is hands down the best disposable I've ever tried.`,
    (name) => `Finally got my hands on the ${name} and it lives up to the hype.`,
    (name) => `I picked up the ${name} disposable last week and can't put it down.`,
    (name) => `Third time ordering the ${name} — consistency is unmatched.`,
    (name) => `The ${name} exceeded every expectation I had.`,
    (name) => `My friend recommended the ${name} and now I see why.`,
    (name) => `Tried the ${name} for the first time and I'm instantly hooked.`,
    (name) => `The ${name} disposable is in a league of its own.`,
    (name) => `Whole Melts really nailed it with the ${name}.`,
  ],
  carts: [
    (name) => `The ${name} cartridge is absolutely fire.`,
    (name) => `Loaded up the ${name} cart and the first hit was incredible.`,
    (name) => `The ${name} is the smoothest cart I've ever vaped.`,
    (name) => `Just finished my second ${name} cart — ordering more immediately.`,
    (name) => `The oil quality in the ${name} cart is clearly premium.`,
    (name) => `I switched to the ${name} and I'm never going back.`,
    (name) => `The ${name} cartridge delivers every single time.`,
    (name) => `This ${name} cart has become my daily go-to.`,
    (name) => `I've tried many carts but the ${name} stands alone at the top.`,
    (name) => `Got the ${name} based on a recommendation — so glad I did.`,
  ],
  'live-resin': [
    (name) => `The ${name} live resin is absolutely incredible.`,
    (name) => `Opened the jar of ${name} and the terps hit immediately.`,
    (name) => `The ${name} has the most authentic flavor I've ever experienced.`,
    (name) => `This batch of ${name} is the best concentrate I've had all year.`,
    (name) => `The ${name} live resin melts like butter on a warm banger.`,
    (name) => `I'm a dab connoisseur and the ${name} genuinely impressed me.`,
    (name) => `The ${name} delivers a true full-spectrum experience.`,
    (name) => `Every batch of ${name} I've tried has been consistently fire.`,
    (name) => `The terpene profile on the ${name} is absolutely phenomenal.`,
    (name) => `Just got the ${name} and I can already tell this is top shelf.`,
  ],
};

const flavorComments = [
  'The flavor is incredibly smooth with zero harshness on the exhale.',
  'Tastes exactly like the strain name suggests — pure and authentic.',
  'The terpene expression is loud and layered, truly a premium experience.',
  'Every hit delivers rich, complex flavor that lingers perfectly.',
  'The flavor stays consistent from start to finish, which is rare.',
  'You can genuinely taste the quality of the live resin extraction.',
  'The taste is so clean and natural — no artificial or chemical notes.',
  'Flavor profile is rich and aromatic, exactly what I was looking for.',
  'The terps hit different on this one — incredibly vibrant and fresh.',
  'Seriously authentic flavor, you can tell this is made from fresh-frozen flower.',
];

const potencyComments = [
  'The effects kick in within minutes and last for hours.',
  'Potency is no joke — a little goes a very long way with this one.',
  'The high is clean and balanced, perfect for any time of day.',
  'Effects are deeply relaxing without being too sedating.',
  'I have a high tolerance and this still delivers an amazing experience.',
  'The body high is incredible — all tension just melts away.',
  'Perfect cerebral uplift paired with full-body relaxation.',
  'The effects are therapeutic and genuinely help me unwind after work.',
  'Clean, clear-headed experience with no anxiety or paranoia.',
  'This delivers exactly the kind of calm, focused high I look for.',
];

const qualityComments = [
  'The build quality is premium and the packaging is sleek.',
  'Zero issues with clogging or leaking — just pure quality.',
  'You can tell Whole Melts doesn\'t cut corners on extraction.',
  'The oil has a beautiful golden color that screams purity.',
  'Lab-tested and it shows — this is genuinely clean product.',
  'Hardware quality is excellent, much better than competitors.',
  'From packaging to product, everything feels premium.',
  'The consistency and color of the extract is absolutely perfect.',
  'Clearly made with high-quality starting material — no shortcuts.',
  'The attention to detail in this product is impressive.',
];

const closingComments = [
  'Already ordered two more — this is a permanent part of my rotation.',
  'I\'ve recommended this to everyone I know. Five stars all day.',
  'Will absolutely be coming back for more. Whole Melts has a loyal customer.',
  'This has become my new go-to and I don\'t see that changing anytime soon.',
  'Customer service was great too — fast shipping and discreet packaging.',
  'Worth every penny. You truly get what you pay for with Whole Melts.',
  'I\'ve tried a lot of brands and Whole Melts consistently comes out on top.',
  'The quality-to-price ratio is unbeatable. Outstanding product.',
  'Already on my third order this month. The consistency is what keeps me coming back.',
  'Shipping was fast and discreet. The product itself is absolutely top-tier.',
  'I trust Whole Melts more than any other brand on the market right now.',
  'If you\'re on the fence, just try it. You won\'t be disappointed.',
  'My friends keep asking what brand I\'m using — always happy to share.',
  'This is what premium cannabis products should always be. No compromises.',
  'Whole Melts has set the bar incredibly high. Nothing else compares.',
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateReviewsForProduct(product) {
  const category = product.category || 'disposables';
  const intros = introByCategory[category] || introByCategory.disposables;
  const reviews = [];
  const usedNames = new Set();

  for (let i = 0; i < 25; i++) {
    // Unique reviewer name
    let name;
    let attempts = 0;
    do {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last = lastInitials[Math.floor(Math.random() * lastInitials.length)];
      name = `${first} ${last}.`;
      attempts++;
    } while (usedNames.has(name) && attempts < 200);
    usedNames.add(name);

    // Build unique comment combining product-specific intro + category details
    const intro = intros[i % intros.length](product.name);
    const flavor = flavorComments[(i * 3 + Math.floor(Math.random() * 3)) % flavorComments.length];
    const potency = potencyComments[(i * 7 + Math.floor(Math.random() * 3)) % potencyComments.length];
    const quality = qualityComments[(i * 2 + Math.floor(Math.random() * 3)) % qualityComments.length];
    const closing = closingComments[(i * 5 + Math.floor(Math.random() * 5)) % closingComments.length];

    // Mix 3-4 sentence comments for variety
    let comment;
    const variant = i % 5;
    if (variant === 0) comment = `${intro} ${flavor} ${potency} ${closing}`;
    else if (variant === 1) comment = `${intro} ${quality} ${flavor} ${closing}`;
    else if (variant === 2) comment = `${intro} ${potency} ${closing}`;
    else if (variant === 3) comment = `${intro} ${flavor} ${quality} ${closing}`;
    else comment = `${intro} ${potency} ${flavor} ${closing}`;

    const rating = Math.random() < 0.75 ? 5 : 4;

    // Random date in last 6 months
    const now = new Date('2026-03-30');
    const daysAgo = Math.floor(Math.random() * 180);
    const reviewDate = new Date(now.getTime() - daysAgo * 86400000);
    const date = reviewDate.toISOString().split('T')[0];

    reviews.push({ user: name, rating, date, comment });
  }

  // Sort by date descending
  reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  return reviews;
}

// Generate reviews for all products
const updatedProducts = products.map(product => ({
  ...product,
  reviews: generateReviewsForProduct(product),
}));

// Write back to file
const output = `export const categories = ${JSON.stringify(categories, null, 2)};

export const products = ${JSON.stringify(updatedProducts, null, 2)};
`;

// Also export other data that may exist (faqs, blogPosts)
import { fileURLToPath } from 'url';
const originalFile = fs.readFileSync('./src/data/products.js', 'utf8');

// Extract faqs and blogPosts exports
const faqMatch = originalFile.match(/export const faqs\s*=\s*(\[[\s\S]*?\n\]);/);
const blogMatch = originalFile.match(/export const blogPosts\s*=\s*(\[[\s\S]*?\n\]);/);

let finalOutput = output;
if (faqMatch) finalOutput += `\nexport const faqs = ${faqMatch[1]};\n`;
if (blogMatch) finalOutput += `\nexport const blogPosts = ${blogMatch[1]};\n`;

fs.writeFileSync('./src/data/products.js', finalOutput, 'utf8');

console.log(`✓ Generated 25 reviews for each of ${updatedProducts.length} products`);
console.log(`✓ Written to src/data/products.js`);
