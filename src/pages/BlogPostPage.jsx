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
          {post.image && (
            <div style={{ width: '100%', height: '400px', marginBottom: '3rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <div className="glass blog-post-content" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </section>
    </>
  );
}
