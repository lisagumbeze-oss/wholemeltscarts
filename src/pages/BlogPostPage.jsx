import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { blogPosts } from '../data/blogs';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h2>Post Not Found</h2>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <div className="blog-post-page" style={{ position: 'relative' }}>
        {/* Cinematic Hero Section */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '600px', 
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000'
        }}>
          {post.image ? (
            <img src={post.image} alt={post.title} style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              opacity: 0.6,
              filter: 'brightness(0.7) contrast(1.1)'
            }} />
          ) : (
             <img src="/images/products/authentic-nerds-live-resin.jpeg" alt="Whole Melts" style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              opacity: 0.4,
              filter: 'blur(5px) brightness(0.5)'
            }} />
          )}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to top, var(--bg-main) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)' 
          }}></div>
          
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <Link to="/blog" className="btn btn-outline btn-sm" style={{ 
              marginBottom: '2rem', 
              borderColor: 'rgba(212, 175, 55, 0.4)',
              color: 'var(--primary)'
            }}>
              <ArrowLeft size={16} /> Back to Daily Info
            </Link>
            <h1 style={{ 
              fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', 
              fontFamily: 'var(--font-serif)', 
              lineHeight: '1.2', 
              color: '#fff', 
              maxWidth: '900px', 
              margin: '0 auto',
              textShadow: '0 4px 20px rgba(0,0,0,0.4)'
            }}>{post.title}</h1>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              gap: '2.5rem', 
              marginTop: '2.5rem', 
              color: 'var(--primary)', 
              fontSize: '0.9rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Calendar size={18} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <User size={18} /> Team Whole Melt
              </span>
            </div>
          </div>
        </div>

        {/* Content Section Overlay */}
        <section className="section" style={{ marginTop: '-120px', position: 'relative', zIndex: 10, paddingBottom: '8rem' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div className="glass blog-post-content" style={{ 
              padding: 'clamp(2rem, 5vw, 4.5rem)', 
              borderRadius: 'var(--radius-2xl)',
              background: 'rgba(18, 18, 18, 0.9)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
              overflow: 'hidden'
            }}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              
              <div style={{ 
                marginTop: '6rem', 
                paddingTop: '3rem', 
                borderTop: '1px solid rgba(212, 175, 55, 0.1)',
                textAlign: 'center'
              }}>
                <h4 style={{ 
                  color: 'var(--primary)', 
                  marginBottom: '2rem', 
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem'
                }}>Connect with the Team</h4>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <a href="https://telegram.me/wholemeltscartsus" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Join Telegram
                  </a>
                  <Link to="/products" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Explore Catalog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
