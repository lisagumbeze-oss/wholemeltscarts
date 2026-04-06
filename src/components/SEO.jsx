import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for managing dynamic meta tags and structured data.
 * @param {Object} props
 * @param {string} props.title - The page title.
 * @param {string} props.description - The meta description.
 * @param {string} props.canonical - The canonical URL.
 * @param {string} props.ogImage - The Open Graph image URL.
 * @param {string} props.ogType - The Open Graph type (website, article, product).
 * @param {Object} props.schema - JSON-LD schema object.
 */
export default function SEO({ 
  title, 
  description, 
  canonical, 
  ogImage = 'https://wholemeltscarts.us/images/brand/hero-banner.png', 
  ogType = 'website',
  schema 
}) {
  const siteName = 'Whole Melt Extracts Official';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const url = canonical ? `https://wholemeltscarts.us${canonical}` : 'https://wholemeltscarts.us';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
