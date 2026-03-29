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
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {blogPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card glass" style={{ display: 'block', textDecoration: 'none', color: 'inherit', transition: 'transform 0.3s ease' }}>
                <article>
                  <div className="blog-card__date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  <h2 className="blog-card__title">{post.title}</h2>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <span className="btn btn-outline btn-sm">
                    Read More <ArrowRight size={14} />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
