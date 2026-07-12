import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Leaf, Award, Truck, Clock, HeadphonesIcon, Star, Loader2, ShieldCheck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import VerificationGuide from '../components/VerificationGuide';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

/* ─── Golden Smoke Particles ─── */
function GoldenSmoke() {
  return (
    <div className="golden-smoke">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="golden-smoke__particle" />
      ))}
    </div>
  );
}

/* ─── Scroll Reveal Hook (IntersectionObserver) ─── */
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Animated Counter ─── */
function AnimatedStat({ end, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="home-stat">
      <div className="home-stat__number">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="home-stat__label">{label}</div>
    </div>
  );
}

/* ─── Scroll-Reveal Wrapper ─── */
function RevealSection({ children, className = '', delay = 0 }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`scroll-reveal ${className}`} data-delay={delay}>
      {children}
    </div>
  );
}

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomeProducts() {
      try {
        const { data } = await supabase.from('products').select('*').limit(15);

        import('../data/products').then(({ products: localProducts }) => {
          if (!data || data.length === 0 || !data[0].slug) {
            setFeatured(localProducts.slice(0, 8));
            setOnSale(localProducts.filter(p => p.salePrice).slice(0, 4));
          } else {
            setFeatured(data.slice(0, 8));
            setOnSale(data.filter(p => p.original_price && parseFloat(p.original_price) > parseFloat(p.price)).slice(0, 4));
          }
        });
      } catch {
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
      <SEO
        title="Whole Melt Extracts Official | Premium 2G Disposables"
        description="Shop authentic Whole Melt Extracts. Discover premium 2G disposables, live resin, carts, and solventless concentrates. Lab-tested, pure, and potent."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Whole Melt Extracts Official",
          "url": "https://wholemeltscarts.us",
          "description": "Premium solventless cannabis concentrates and disposable vapes.",
          "publisher": {
            "@type": "Organization",
            "name": "Whole Melt Extracts",
            "logo": "https://wholemeltscarts.us/images/brand/hero-banner.png"
          }
        }}
      />

      <section className="hero-video">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/brand/hero-banner.png"
          className="hero-video__bg"
        >
          <source src="/video/video.mp4" type="video/mp4" />
        </video>
        <div className="hero-video__overlay"></div>
        <GoldenSmoke />
        <div className="container hero-video__content">
          <h1 className="hero-video__brand">
            <span className="text-gradient">Whole Melt</span>
            <span>Extracts</span>
          </h1>
          <p className="hero-video__desc">
            Solventless concentrates and disposables — pure, potent, and lab-verified.
          </p>
          <div className="hero-video__actions">
            <Link to="/shop" className="btn btn-primary btn-lg gold-shimmer">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-outline btn-lg">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <RevealSection>
            <div className="home-story">
              <div className="home-story__copy">
                <div className="section-header">
                  <span className="section-header__tag">Craft</span>
                  <h2 className="section-header__title">The pinnacle of solvent-free concentrates</h2>
                </div>
                <p>
                  Whole Melt Extracts is the official destination for premium, solvent-free cannabis concentrates.
                  Each batch is crafted to preserve full-spectrum cannabinoids and terpenes — rich flavor, clean potency,
                  connoisseur-grade results.
                </p>
                <div style={{ marginTop: '1.75rem' }}>
                  <Link to="/lab-results" className="btn btn-outline">
                    View Lab Hub <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="home-proof">
                {[
                  { icon: <Shield size={22} />, title: 'Authentic Whole Melts', desc: 'Residue-free signature solventless extracts.' },
                  { icon: <Zap size={22} />, title: 'Whole Melts Carts', desc: 'Live resin in ready-to-use vaporizer format.' },
                  { icon: <Leaf size={22} />, title: 'Live Resin', desc: 'Fresh-frozen flower for intact terpene profiles.' },
                  { icon: <Award size={22} />, title: 'Full Spectrum', desc: 'Flavor-forward concentrates for discerning users.' },
                ].map((item) => (
                  <div key={item.title} className="home-proof__item">
                    <div className="home-proof__icon">{item.icon}</div>
                    <div>
                      <h3 className="home-proof__title">{item.title}</h3>
                      <p className="home-proof__desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Animated Stats */}
          <RevealSection>
            <div className="home-stats-bar" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--glass-border)' }}>
              <AnimatedStat end={500} suffix="+" label="Strains Available" />
              <AnimatedStat end={12000} suffix="+" label="Orders Shipped" />
              <AnimatedStat end={99} suffix="%" label="Purity Tested" />
              <AnimatedStat end={48} label="States Served" />
            </div>
          </RevealSection>

          <div style={{ marginTop: '4rem' }}>
            <RevealSection>
              <VerificationGuide />
            </RevealSection>
          </div>
        </div>
      </section>

      <section className="section bg-deep">
        <div className="container">
          <RevealSection>
            <div className="section-header">
              <span className="section-header__tag">Elite Selection</span>
              <h2 className="section-header__title">Featured extracts</h2>
              <p className="section-header__desc">Curated picks from our most requested disposables, carts, and concentrates.</p>
            </div>
          </RevealSection>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Loader2 style={{ animation: 'spin 1.5s linear infinite' }} size={32} />
              <p>Loading selection…</p>
            </div>
          ) : (
            <div className="product-grid">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/shop" className="btn btn-outline">View All Products <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <RevealSection>
            <div className="section-header section-header--center">
              <span className="section-header__tag">Community</span>
              <h2 className="section-header__title">What customers say</h2>
              <p className="section-header__desc">Verified notes from the Whole Melt community.</p>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="review-rail">
              {[
                {
                  name: 'Sierra M.',
                  loc: 'Portland, OR',
                  text: 'The Blue Dream cartridge is discreet with almost no scent — strong, fast-acting effects and hardware that doesn\'t clog.',
                  rating: 5
                },
                {
                  name: 'David L.',
                  loc: 'Toronto, ON',
                  text: 'Gelato 41 badder consistency is perfect. Smooth vapor, no throat burn, powerfully relaxing yet clear-headed.',
                  rating: 4
                },
                {
                  name: 'Michael T.',
                  loc: 'Los Angeles, CA',
                  text: 'Super Lemon Haze tasted vibrant and authentic — clean energetic high. This is what live resin is supposed to be.',
                  rating: 5
                }
              ].map((review) => (
                <article key={review.name} className="review-item">
                  <div className="review-item__stars">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} size={14} fill={starIdx < review.rating ? 'var(--primary)' : 'transparent'} />
                    ))}
                  </div>
                  <p className="review-item__text">"{review.text}"</p>
                  <div className="review-item__meta">
                    <div>
                      <div className="review-item__name">{review.name}</div>
                      <div className="review-item__loc">{review.loc}</div>
                    </div>
                    <div className="review-item__badge">
                      <ShieldCheck size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                      Verified
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {!loading && onSale.length > 0 && (
        <section className="section bg-deep">
          <div className="container">
            <RevealSection>
              <div className="section-header">
                <span className="section-header__tag">Limited Time</span>
                <h2 className="section-header__title">On sale now</h2>
                <p className="section-header__desc">Selected drops at a reduced price while stock lasts.</p>
              </div>
            </RevealSection>
            <div className="product-grid">
              {onSale.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <RevealSection>
            <div className="service-strip">
              {[
                { icon: <Zap size={22} />, title: 'Swift Payment', desc: 'Transactions confirmed within minutes.' },
                { icon: <Truck size={22} />, title: 'Reliable Delivery', desc: 'Secure, discreet packaging.' },
                { icon: <HeadphonesIcon size={22} />, title: 'Dedicated Support', desc: 'sales@wholemeltscarts.us' },
                { icon: <Clock size={22} />, title: 'Fast Processing', desc: 'Same-day order processing when possible.' },
              ].map((b) => (
                <div key={b.title} className="service-strip__item">
                  <div className="service-strip__icon">{b.icon}</div>
                  <h4 className="service-strip__title">{b.title}</h4>
                  <p className="service-strip__desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  );
}
