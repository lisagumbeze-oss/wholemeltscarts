---
name: perfect-ecommerce-builder
description: USE THIS SKILL to build, optimize, or audit premium e-commerce platforms like 'Whole Melt Extracts'. MANDATORY for high-end web design (glassmorphism, obsidian/gold), manual payment systems (Zelle, CashApp, Venmo, Chime, Apple Cash), and aggressive SEO scraping of competitors. Trigger for creating landing pages, product catalogs, meta-tag optimization, and competitor analysis reports. Use when the user mentions premium brands, artisan products, or specific manual payment flows.
---

# Perfect E-commerce Builder

This skill empowers you to create world-class e-commerce experiences. It combines high-end design principles with pragmatic payment solutions and aggressive SEO optimization.

## Core Capabilities

1.  **Premium Design**: Implementing glassmorphism, fluid animations (using Framer Motion or Vanilla CSS), and curated color palettes that evoke luxury and reliability.
2.  **Manual Payment Systems**: Integrating non-traditional but highly effective payment methods like Zelle, CashApp, and direct Bank Transfers with clear user instructions and manual verification workflows.
3.  **Advanced SEO Scraping**: Using bundled scripts to scrape competitor metadata and keywords to inform high-ranking content and meta-tag optimization.
4.  **Conversion Optimization**: Strategic placement of CTAs, trust signals, and streamlined checkout flows.

---

## E-commerce Construction Workflow

### 1. Market Research & SEO Audit
- Identify 3 top competitors in the niche.
- Use the `scripts/seo_scraper.py` to extract their meta titles, descriptions, and H1-H3 headers.
- **Analyze Gaps**: Identify keywords they rank for that you are missing. Generate a keyword strategy based on "High Intent" search terms.

### 2. Premium Design Foundation
- **Design Tokens**: Use the `assets/ecommerce_template.css` as a baseline.
- **Visuals**: Prioritize high-resolution, cinematic product photography. Use `generate_image` to create placeholder hero assets that "WOW" the user.
- **Aesthetics**: Implement translucent "frosted glass" cards, subtle glow effects, and smooth entry animations.

### 3. Manual Payment Implementation
Don't use generic "Payment Method" placeholders. Implement specific, branded blocks for:
- **Zelle**: "Scan to Pay" or "Email: payments@brand.com".
- **CashApp**: "$Cashtag" with a QR code generated or mock-up.
- **Bank Transfer**: Clear table with Account Name, Routing, and IBAN.
- **Workflow**: Ensure the checkout page explains that orders are processed *after* manual confirmation.

### 4. SEO & Meta-Tag Completion
- Implement the "Perfect SEO Pattern" for every product page:
    - **Meta Title**: [Keyword] | [Brand Name] (Max 60 chars)
    - **Meta Description**: Compelling, keyword-rich summary with a CTA (Max 155 chars)
    - **Semantic HTML**: Use exactly one `<h1>` per page, followed by logical `<h2>` and `<h3>` hierarchies.

---

## Implementation Guidelines

### Purity & Performance
- Use **Vite + React** for the frontend.
- Use **Vanilla CSS** for the bulk of styling to ensure zero-bloat and maximum control over premium effects.
- Avoid 3rd party bloat. If a micro-animation can be done in CSS, do it there.

### Design System Requirements
- **Palette**: Use deep obsidian (#080808) for backgrounds and bright amber/gold (#D4AF37) for accents.
- **Glassmorphism**: `backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.05);`
- **Typography**: Playfair Display for headings (Luxury) and Inter for body (Utility).
