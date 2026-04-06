import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogs';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function BlogPage() {
  return (
    <>
      <SEO 
        title="Whole Melt Extracts Blog | Authenticity & Lab Results"
        description="Stay informed with the Whole Melt Extracts daily blog. Learn about product verification, lab test results, and the latest in solventless cannabis technology."
        canonical="/blog"
      />
      <section className="page-header">
        <div className="container">
          <h1 className="page-header__title">Whole Melt Extracts Blog</h1>
          <p className="page-header__desc">Your official source for product verification and cannabis education.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '2.5rem' 
          }}>
            {blogPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card glass hover-lift" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                overflow: 'hidden', 
                textDecoration: 'none', 
                color: 'inherit', 
                padding: 0,
                borderRadius: 'var(--radius-xl)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                transition: 'all 0.4s var(--ease)'
              }}>
                {/* Image Section */}
                <div style={{ 
                  width: '100%', 
                  height: '240px', 
                  backgroundColor: 'var(--bg-elevated)', 
                  borderBottom: '1px solid rgba(212, 175, 55, 0.1)', 
                  overflow: 'hidden', 
                  position: 'relative' 
                }}>
                  {post.image ? (
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s var(--ease)' }} className="blog-card__image" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <img src="/images/products/authentic-nerds-live-resin.jpeg" alt="Whole Melts" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, mixBlendMode: 'overlay' }} />
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'}}></div>
                    </div>
                  )}
                  <div style={{ 
                    position: 'absolute', 
                    top: '1.25rem', 
                    left: '1.25rem', 
                    background: 'var(--primary-gradient)', 
                    color: '#000', 
                    padding: '0.4rem 1rem', 
                    borderRadius: '50px', 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.08em',
                    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
                  }}>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}
                  </div>
                </div>
                
                {/* Content Section */}
                <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h2 className="blog-card__title" style={{ 
                    fontSize: '1.4rem', 
                    marginBottom: '1rem', 
                    lineHeight: '1.4',
                    fontFamily: 'var(--font-serif)',
                    color: '#fff'
                  }}>{post.title}</h2>
                  <p className="blog-card__excerpt" style={{ 
                    fontSize: '0.95rem', 
                    lineHeight: '1.6',
                    marginBottom: '2rem', 
                    flex: 1,
                    color: 'var(--text-secondary)'
                  }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} className="read-more-link">
                    Read Full Article <ArrowRight size={16} style={{ transition: 'transform 0.3s var(--ease)' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
