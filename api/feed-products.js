import { products as localCatalog } from '../src/data/products.js';
import {
  getFeedOrigin,
  buildProductFeedItems,
  buildGoogleMerchantXml,
  buildGoogleMerchantCsv,
  xmlEscape,
} from './productFeed.js';

/** Vercel serverless — used when /feed/* is rewritten here (avoid SPA fallback to index.html). */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

  const raw = req.query.format || req.query.f || '';
  const format = String(Array.isArray(raw) ? raw[0] : raw).toLowerCase() || 'json';

  try {
    const origin = getFeedOrigin(req);

    if (format === 'json') {
      const items = buildProductFeedItems(localCatalog, origin);
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.status(200).json({
        title: 'Whole Melt Extracts — Product catalog',
        home_page_url: origin,
        feed_url: `${origin}/feed/products.json`,
        feeds: {
          json: `${origin}/feed/products.json`,
          csv: `${origin}/feed/products.csv`,
          xml: `${origin}/feed/products.xml`,
        },
        updated: new Date().toISOString(),
        item_count: items.length,
        items,
      });
    }

    if (format === 'xml') {
      const xml = buildGoogleMerchantXml(localCatalog, origin);
      res.setHeader('Content-Type', 'text/xml; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.status(200).send(xml);
    }

    if (format === 'csv') {
      const csv = buildGoogleMerchantCsv(localCatalog, origin);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.status(200).send('\uFEFF' + csv);
    }

    return res.status(400).json({ error: 'Invalid format. Use json, xml, or csv.' });
  } catch (err) {
    console.error('feed-products:', err);
    if (format === 'xml') {
      return res.status(500).setHeader('Content-Type', 'text/xml').send(`<?xml version="1.0"?><error>${xmlEscape(err.message)}</error>`);
    }
    if (format === 'csv') {
      return res.status(500).setHeader('Content-Type', 'text/plain').send(`Error: ${err.message}`);
    }
    return res.status(500).json({ success: false, error: err.message });
  }
}
