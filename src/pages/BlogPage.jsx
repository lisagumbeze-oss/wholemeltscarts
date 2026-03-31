import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/products';
import { Link } from 'react-router-dom';

export default function BlogPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Daily Info</h1>
          <p className="page-header__desc">News, reviews, and insights from the Whole Melt Extracts team.</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {blogPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card glass hover-lift" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', textDecoration: 'none', color: 'inherit', padding: 0 }}>
                {/* Image Section */}
                <div style={{ width: '100%', height: '220px', backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--glass-border)', overflow: 'hidden', position: 'relative' }}>
                  {post.image ? (
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="blog-card__image" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <img src="/images/products/authentic-nerds-live-resin.jpeg" alt="Whole Melts" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, mixBlendMode: 'overlay' }} />
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'}}></div>
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--primary-gradient)', color: '#000', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}
                  </div>
                </div>
                
                {/* Content Section */}
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h2 className="blog-card__title" style={{ fontSize: '1.3rem', marginBottom: '1rem', lineHeight: '1.4' }}>{post.title}</h2>
                  <p className="blog-card__excerpt" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{post.excerpt}</p>
                  <span className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }}>
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
