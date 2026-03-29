import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { blogPosts } from '../data/products';

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
      <div className="page-header">
        <div className="container">
          <Link to="/blog" className="btn btn-outline btn-sm" style={{ marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Back to Daily Info
          </Link>
          <h1 className="page-header__title">{post.title}</h1>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} /> Whole Melt Extracts Team
            </span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', lineHeight: '1.8' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'white', fontWeight: 500 }}>
              {post.excerpt}
            </p>
            <div style={{ color: 'var(--text-secondary)' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                At Whole Melt Extracts, we are committed to providing our community with the most up-to-date information regarding our products and the evolving cannabis industry. This post is part of our "Daily Info" series, designed to help you make informed decisions about your wellness journey.
              </p>
              <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Quality and Potency</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Our extracts are crafted using state-of-the-art techniques that preserve the full spectrum of cannabinoids and terpenes. Whether you're interested in our V6 Edition disposables or our premium live resin sugar, you can expect a pure and potent experience every time.
              </p>
              <p>
                Stay tuned for more updates, reviews, and insights from our team. If you have any questions about this topic or our products, feel free to reach out via our live chat or contact page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
