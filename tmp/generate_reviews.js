import fs from 'fs';

const productsFile = 'src/data/products.js';

const names = [
  "Michael", "Sarah", "Jason", "Jessica", "David", "Amanda", "Chris", "Ashley", 
  "Matthew", "Brian", "Kevin", "Lauren", "James", "Rachel", "Andrew", "Emily", 
  "John", "Melissa", "Daniel", "Laura", "Tyler", "Nicole", "Brandon", "Megan"
];

const lastInitials = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const experiencePhrases = [
  "My past experience with other brands doesn't even compare.",
  "I've ordered this past month and highly recommend it.",
  "Past orders were great, but this batch is exceptional.",
  "From my past experience, shipping is always discreet and fast.",
  "This is my third past order, and the consistency is wild.",
  "Compared to past orders of different strains, this one hits hardest."
];

const flavorPhrases = [
  "The terpenes are incredibly loud.",
  "Flavor is smooth and deeply satisfying.",
  "Tastes exactly like the name suggests, very pure profile.",
  "The taste lingers perfectly without being harsh on the throat.",
  "Loud flavor and clean hitting. The terps really pop on this one.",
  "Seriously authentic flavor profile, you can taste the high quality extraction."
];

const generalPhrases = [
  "One of the best products in their entire lineup.",
  "Will absolutely be returning for more.",
  "Effects are instant and deeply relaxing.",
  "Perfect for winding down after a long day.",
  "Clean high with no foggy feeling the next day.",
  "Customer service is as top-tier as the extract itself.",
  "Highly potent, so a little goes a very long way."
];

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function generateReviews(productId, productName, productCategory) {
    const random = mulberry32(productId * 9991);
    const reviews = [];
    
    // Convert generic category to descriptive
    let catDesc = productCategory.replace('-', ' ');
    if (catDesc === 'disposables') catDesc = "disposable pen";
    if (catDesc === 'live resin') catDesc = "live resin extract";
    if (catDesc === 'carts') catDesc = "cartridge";
    
    for (let i = 0; i < 20; i++) {
        // Randomize name
        const first = names[Math.floor(random() * names.length)];
        const last = lastInitials[Math.floor(random() * lastInitials.length)];
        
        // Randomize date within last 6 months
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() - Math.floor(random() * 180));
        const dateStr = dateObj.toISOString().split('T')[0];
        
        // Randomize stars (80% 5-star, 20% 4-star)
        const rating = random() > 0.8 ? 4 : 5;
        
        // Build unique comment
        const exp = experiencePhrases[Math.floor(random() * experiencePhrases.length)];
        const flav = flavorPhrases[Math.floor(random() * flavorPhrases.length)];
        const gen = generalPhrases[Math.floor(random() * generalPhrases.length)];
        
        // Mix structure
        let comment = "";
        const struct = Math.floor(random() * 3);
        
        if (struct === 0) {
            comment = `Just got my ${productName} ${catDesc}. ${exp} ${flav} ${gen}`;
        } else if (struct === 1) {
            comment = `${flav} Getting this ${catDesc} was a great choice. ${gen} ${exp}`;
        } else {
            comment = `${gen} The ${productName} is insane. ${exp} ${flav}`;
        }
        
        reviews.push({
            user: `${first} ${last}.`,
            rating,
            date: dateStr,
            comment
        });
    }
    
    return reviews;
}

let content = fs.readFileSync(productsFile, 'utf8');

// I need to parse the export const products = [...] array, mutate it, and write it back.
// Since Javascript files with export const aren't strictly JSON, I will extract the JSON array.
const matchStart = content.indexOf('export const products = [');
if (matchStart === -1) {
    console.error("Could not find products array.");
    process.exit(1);
}

const prefixLength = 'export const products = '.length;
let arrayStr = content.substring(matchStart + prefixLength);
let suffix = '';

// Find where the array ends (usually right before export const something else)
const nextExport = arrayStr.indexOf('\nexport const ');
if (nextExport !== -1) {
    suffix = arrayStr.substring(nextExport);
    arrayStr = arrayStr.substring(0, nextExport);
}
// Strip training semicolon
arrayStr = arrayStr.replace(/;\s*$/, '');

try {
    const productsArray = JSON.parse(arrayStr);
    
    // Mutate and add reviews 
    productsArray.forEach(p => {
        p.reviews = generateReviews(p.id, p.name, p.category);
    });
    
    const newProductsStr = JSON.stringify(productsArray, null, 2);
    
    const finalFileContent = content.substring(0, matchStart + prefixLength) + newProductsStr + ';\n' + suffix;
    fs.writeFileSync(productsFile, finalFileContent, 'utf8');
    
    console.log(`Successfully attached 20 unique reviews to all ${productsArray.length} products! (Total ${productsArray.length * 20} reviews)`);
} catch(e) {
    console.error("Failed to parse or write products array:", e);
}
