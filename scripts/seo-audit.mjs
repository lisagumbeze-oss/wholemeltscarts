import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const COMPETITORS = [
  'https://fryd-vapes.com',
  'https://packman-official.com',
  'https://muhameds.com',
  'https://backpackerz.com'
];

async function auditSEO(url) {
  console.log(`Auditing: ${url}...`);
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    const html = await page.content();
    const $ = cheerio.load(html);

    const data = {
      url,
      title: $('title').text().trim(),
      description: $('meta[name="description"]').attr('content') || 'Missing',
      h1: $('h1').map((i, el) => $(el).text().trim()).get(),
      ogTitle: $('meta[property="og:title"]').attr('content') || 'Missing',
      ogDescription: $('meta[property="og:description"]').attr('content') || 'Missing',
      keywords: $('meta[name="keywords"]').attr('content') || 'Missing',
      timestamp: new Date().toISOString()
    };

    await browser.close();
    return data;
  } catch (err) {
    console.error(`Error auditing ${url}:`, err.message);
    return { url, error: err.message };
  }
}

async function run() {
  const results = [];
  for (const url of COMPETITORS) {
    const result = await auditSEO(url);
    results.push(result);
  }

  const reportPath = path.join(process.cwd(), 'competitor-seo-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ SEO Audit Complete! Report saved to: ${reportPath}`);
}

run();
