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
      <section className="page-header page-header--left">
        <div className="container">
          <span className="section-header__tag">Journal</span>
          <h1 className="page-header__title">Whole Melt blog</h1>
          <p className="page-header__desc">Product verification, lab results, and cannabis education.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card-link">
                <div className="blog-card-link__media">
                  {post.image ? (
                    <img src={post.image} alt={post.title} loading="lazy" />
                  ) : (
                    <img src="/images/products/authentic-nerds-live-resin.jpeg" alt="" loading="lazy" style={{ opacity: 0.5 }} />
                  )}
                  <span className="blog-card-link__date">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="blog-card-link__body">
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="blog-card-link__cta">
                    Read article <ArrowRight size={16} />
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
