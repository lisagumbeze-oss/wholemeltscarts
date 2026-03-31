import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Leaf, FlaskConical, Truck, Clock, HeadphonesIcon, Play, Star, Award, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeProducts() {
      try {
        const { data, error } = await supabase.from('products').select('*').limit(15);
        
        // Use local data as primary if DB is out of sync or empty
        import('../data/products').then(({ products: localProducts }) => {
          if (!data || data.length === 0 || !data[0].slug) {
            setFeatured(localProducts.slice(0, 8));
            setOnSale(localProducts.filter(p => p.salePrice).slice(0, 4));
          } else {
            setFeatured(data.slice(0, 8));
            setOnSale(data.filter(p => p.original_price && parseFloat(p.original_price) > parseFloat(p.price)).slice(0, 4));
          }
        });
      } catch (err) {
        // Ultimate fallback to local data
        import('../data/products').then(({ products: localProducts }) => {
          setFeatured(localProducts.slice(0, 8));
          setOnSale(localProducts.filter(p => p.salePrice).slice(0, 4));
        });
      }
      setLoading(false);
    }
    fetchHomeProducts();
  }, []);

  return (
    <>
      {/* ═══ Video Hero Section ═══ */}
      <section className="hero-video">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video__bg"
        >
          <source src="/video/video.mp4" type="video/mp4" />
        </video>
        <div className="hero-video__overlay"></div>
        <div className="container hero-video__content">
          <div className="animate-reveal">
            <span className="hero-video__tag">Official Store — Lab Tested Purity</span>
            <h1 className="hero-video__title">
              Whole Melt <span className="text-gradient">Extracts</span> 
              <br />Premium Solventless Concentrates
            </h1>
            <p className="hero-video__desc">
              Pure, potent & full of flavor. Discover premium Whole Melt Extracts for a truly elevated cannabis experience. Connoisseur-approved and lab-verified.
            </p>
            <div className="hero-video__actions">
              <Link to="/shop" className="btn btn-primary btn-lg">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ The Pinnacle Section ═══ */}
      <section className="section bg-deep">
        <div className="container text-center">
          <div className="section-header animate-reveal">
            <h2 className="section-header__title">The Pinnacle of Solvent-Free Cannabis Concentrates</h2>
            <p className="section-header__desc" style={{ maxWidth: '800px', margin: '0 auto' }}>
              Welcome to Whole Melt Extracts, the official destination for premium, solvent-free cannabis concentrates. 
              We are dedicated to delivering an unparalleled experience derived from the finest parts of the plant. 
              Our products are crafted through a meticulous extraction process that preserves the full spectrum 
              of cannabinoids and terpenes, resulting in a rich, flavorful, and potent concentrate.
            </p>
          </div>

          <div className="trust-grid" style={{ marginTop: '4rem' }}>
            {[
              { icon: <Shield size={28} />, title: 'Authentic Whole Melts', desc: 'Non-contaminating and residue-free. Signature solvent-free extracts.' },
              { icon: <Zap size={28} />, title: 'Whole Melts Carts', desc: 'Premium quality live resin in a sleek, ready-to-use vaporizer format.' },
              { icon: <Leaf size={28} />, title: 'Live Resin', desc: 'Fresh-frozen cannabis to preserve the delicate terpene profile.' },
              { icon: <Award size={28} />, title: 'Full Spectrum', desc: 'Rich, flavorful, and potent concentrates for connoisseurs.' },
            ].map((badge, i) => (
              <div key={i} className="trust-badge glass animate-reveal" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="trust-badge__icon">{badge.icon}</div>
                <h3 className="trust-badge__title">{badge.title}</h3>
                <p className="trust-badge__desc">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Your Journey Starts Here Section ═══ */}
      <section className="section">
        <div className="container">
          <div className="journey-card animate-reveal">
            <div className="journey-card__glow"></div>
            <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
              <h2 className="section-header__title">Your Journey Starts Here</h2>
              <p className="section-header__desc" style={{ maxWidth: '800px', margin: '0 auto' }}>
                Navigating the world of premium cannabis can be complex. Let Whole Melts be your guide. 
                Explore our detailed product pages to learn about the unique properties of each extract, 
                find usage tips, and discover which Whole Melts carts or concentrates align with your desired experience.
              </p>
            </div>
            <div className="text-center">
              <Link to="/shop" className="btn btn-primary btn-lg" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Browse Our Premium Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Featured Products ═══ */}
      <section className="section bg-deep">
        <div className="container">
          <div className="section-header animate-reveal">
            <span className="section-header__tag">Elite Selection</span>
            <h2 className="section-header__title">Whole Melt Extracts Official</h2>
            <p className="section-header__desc">Curated selection of our most popular products.</p>
          </div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Loader2 className="animate-spin" style={{ animation: 'spin 1.5s linear infinite' }} size={32} />
              <p>Loading Elite Selection...</p>
            </div>
          ) : (
            <div className="product-grid animate-reveal" style={{ animationDelay: '0.2s' }}>
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/shop" className="btn btn-outline">View All Products <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ═══ Reviews Section ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-header__title">What our customers have to say</h2>
            <p className="section-header__desc">Verified testimonials from the Whole Melt community.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
            {[
              {
                name: "Sierra M.",
                loc: "Portland, OR",
                text: "The Blue Dream cartridge is my new secret weapon. It’s incredibly discreet with almost no scent, but don’t let that fool you—the effects are strong and fast-acting. Perfect for daytime use. The hardware is great too; no clogging issues like I’ve had with other brands. Wholemelts has earned a loyal customer.",
                rating: 5
              },
              {
                name: "David L.",
                loc: "Toronto, ON",
                text: "First time trying Whole Melts, and I’m impressed. I got the Gelato 41 badder. The consistency is perfect, and the vapor is unbelievably smooth—no throat burn. The effects are powerfully relaxing but very clear-headed. The quality is undeniable.",
                rating: 4
              },
              {
                name: "Michael T.",
                loc: "Los Angeles, CA",
                text: "I’ve tried countless brands, but Whole Melts carts are on another level. The flavor from the Super Lemon Haze cart was so vibrant and authentic—no weird chemical aftertaste at all. The high was clean, energetic, and exactly what I was hoping for. This is what 'live resin' is supposed to be.",
                rating: 5
              }
            ].map((review, i) => (
              <div key={i} className="glass" style={{ padding: '2.5rem', position: 'relative' }}>
                <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} size={16} fill={starIdx < review.rating ? "var(--primary)" : "transparent"} />
                  ))}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '2rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>"{review.text}"</p>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                  <div style={{ fontWeight: 600 }}>{review.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{review.loc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/contact" className="btn btn-outline">Leave a Review</Link>
          </div>
        </div>
      </section>

      {/* ═══ Sale Section ═══ */}
      {!loading && onSale.length > 0 && (
        <section className="section bg-deep">
          <div className="container">
            <div className="section-header">
              <span className="section-header__tag">Limited Time</span>
              <h2 className="section-header__title">On Sale Now</h2>
            </div>
            <div className="product-grid">
              {onSale.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ═══ Final Trust Badges ═══ */}
      <section className="section bg-deep text-center" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="trust-grid">
            {[
              { icon: <Zap size={24} />, title: 'Swift Payment', desc: 'Transactions confirmed within minutes.' },
              { icon: <Truck size={24} />, title: 'Reliable Delivery', desc: 'Quick, secure, and discreet packaging.' },
              { icon: <HeadphonesIcon size={24} />, title: '24/7 Support', desc: 'Dedicated customer service at sales@wholemeltscarts.us' },
              { icon: <Clock size={24} />, title: 'Fast Processing', desc: 'Orders processed same day for rapid shipping.' },
            ].map((b, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{b.icon}</div>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>{b.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

