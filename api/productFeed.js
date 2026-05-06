/**
 * Build storefront product feeds (JSON + Google Merchant–style RSS).
 * Canonical site URL: PUBLIC_SITE_URL or SITE_URL; else derived from the request.
 */

export function getFeedOrigin(req) {
  const fromEnv =
    process.env.PUBLIC_SITE_URL || process.env.SITE_URL || process.env.VITE_SITE_URL;
  if (fromEnv) return String(fromEnv).replace(/\/$/, '');
  const proto = req.get('x-forwarded-proto') || req.protocol || 'http';
  const host = req.get('x-forwarded-host') || req.get('host') || 'localhost:3000';
  return `${proto}://${host}`;
}

export function toAbsoluteUrl(origin, path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${p}`;
}

export function buildProductFeedItems(products, origin) {
  return products
    .filter((p) => p && p.slug)
    .map((p) => {
      const imagePath = (Array.isArray(p.images) && p.images[0]) || p.image || '';
      const effective = p.salePrice ?? p.price;
      return {
        id: String(p.id),
        title: p.name,
        slug: p.slug,
        link: `${origin}/product/${encodeURIComponent(p.slug)}`,
        category: p.category ?? '',
        strain_type: p.strain ?? '',
        image: toAbsoluteUrl(origin, imagePath),
        price_usd: Number(p.price),
        sale_price_usd: p.salePrice != null ? Number(p.salePrice) : null,
        effective_price_usd: Number(effective),
        availability: 'in_stock',
        condition: 'new',
        brand: 'Whole Melt Extracts',
      };
    });
}

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Google Merchant RSS 2.0 with g: namespace (for compatible shopping tools). */
export function buildGoogleMerchantXml(products, origin, channelTitle = 'Whole Melt Extracts') {
  const items = products.filter((p) => p && p.slug);
  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">`,
    `  <channel>`,
    `    <title>${xmlEscape(channelTitle)}</title>`,
    `    <link>${xmlEscape(origin)}</link>`,
    `    <description>${xmlEscape('Official product catalog')}</description>`,
  ];

  for (const p of items) {
    const imagePath = (Array.isArray(p.images) && p.images[0]) || p.image || '';
    const img = toAbsoluteUrl(origin, imagePath);
    const effective = p.salePrice ?? p.price;
    const priceStr = `${Number(effective)} USD`;
    const desc = `${p.name} — ${p.category || 'Product'}${p.strain ? ` (${p.strain})` : ''}`;

    lines.push(`    <item>`);
    lines.push(`      <g:id>${xmlEscape(String(p.id))}</g:id>`);
    lines.push(`      <g:title>${xmlEscape(p.name)}</g:title>`);
    lines.push(`      <g:description>${xmlEscape(desc)}</g:description>`);
    lines.push(
      `      <g:link>${xmlEscape(`${origin}/product/${encodeURIComponent(p.slug)}`)}</g:link>`
    );
    if (img) lines.push(`      <g:image_link>${xmlEscape(img)}</g:image_link>`);
    lines.push(`      <g:availability>in stock</g:availability>`);
    lines.push(`      <g:price>${xmlEscape(priceStr)}</g:price>`);
    if (p.salePrice != null) {
      lines.push(`      <g:sale_price>${xmlEscape(`${Number(p.salePrice)} USD`)}</g:sale_price>`);
    }
    lines.push(`      <g:condition>new</g:condition>`);
    lines.push(`      <g:brand>${xmlEscape('Whole Melt Extracts')}</g:brand>`);
    if (p.category) {
      lines.push(`      <g:product_type>${xmlEscape(p.category)}</g:product_type>`);
    }
    lines.push(`    </item>`);
  }

  lines.push(`  </channel>`);
  lines.push(`</rss>`);
  return lines.join('\n');
}
