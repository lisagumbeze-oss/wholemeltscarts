import { ArrowRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/blogs';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function BlogPage() {
  return (
    <div className="blog-index-page">
      <SEO
        title="Whole Melt Extracts Blog | Authenticity & Lab Results"
        description="Stay informed with the Whole Melt Extracts daily blog. Learn about product verification, lab test results, and the latest in solventless cannabis technology."
        canonical="/blog"
      />
      
      {/* ═══ Header ═══ */}
      <section className="page-header" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container text-center">
          <span className="section-header__tag animate-reveal" style={{ color: 'var(--primary)', background: 'rgba(212, 175, 55, 0.1)', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <BookOpen size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/> Journal
          </span>
          <h1 className="page-header__title animate-reveal">Whole Melt <span className="text-gradient">Blog</span></h1>
          <p className="page-header__desc animate-reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Product verification guides, deep dives into solventless extraction, and exclusive drop announcements.
          </p>
        </div>
      </section>

      <section className="section bg-deep">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post, idx) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card-link animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="blog-card-link__media">
                  {post.image ? (
                    <img src={post.image} alt={post.title} loading="lazy" />
                  ) : (
                    <img src="/images/products/authentic-nerds-live-resin.jpeg" alt="" loading="lazy" style={{ opacity: 0.5 }} />
                  )}
                  <span className="blog-card-link__date" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="blog-card-link__body glass-card" style={{ padding: '2rem', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 0 }}>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>{post.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>{post.excerpt}</p>
                  <span className="blog-card-link__cta" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Read article <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
