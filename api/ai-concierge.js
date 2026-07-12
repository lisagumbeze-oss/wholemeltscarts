import Anthropic from '@anthropic-ai/sdk';
import { products as localCatalog } from '../src/data/products.js';

// The system prompt defines the AI's persona, knowledge, and rules.
const SYSTEM_PROMPT = `You are the Whole Melts Extracts AI Concierge, a highly knowledgeable, premium budtender and product specialist.
You assist customers in finding the right cannabis extracts, rosins, and products from our catalog.

BRAND VOICE:
- Premium, luxurious, and highly knowledgeable.
- Tone: Professional yet approachable, using connoisseur terminology (terpenes, solventless, micron, wash, dab temperature).
- Never use cheap or illicit terminology. We are a licensed, luxury extract brand.

YOUR KNOWLEDGE BASE (Product Catalog):
${JSON.stringify(localCatalog, null, 2)}

GUIDELINES:
1. Always recommend products from the provided catalog. If they ask for something we don't have, politely steer them to our closest match.
2. Format your responses with clear markdown. Use bullet points for product recommendations.
3. Keep responses concise unless asked for a deep dive into an extraction process.
4. If asked about prices, reference the prices in the catalog.
5. If asked about wholesale, tell them to visit the Wholesale application page.`;

export default async function handleAiConcierge(req, res) {
  // Use ANTHROPIC_API_KEY from environment variables by default
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set.' });
  }

  const client = new Anthropic();
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Valid messages array is required.' });
  }

  // Set up Server-Sent Events (SSE) headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // flush the headers to establish SSE connection

  try {
    const stream = client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,
      // Note: adaptive thinking is currently available on Opus 4.6 but omitting it keeps latency low for quick chat responses.
    });

    stream.on('text', (textDelta) => {
      // Send text delta to the client using SSE format
      res.write(`data: ${JSON.stringify({ text: textDelta })}\n\n`);
    });

    stream.on('error', (err) => {
      console.error('Anthropic stream error:', err);
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    });

    await stream.finalMessage();
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('AI Concierge error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
}
