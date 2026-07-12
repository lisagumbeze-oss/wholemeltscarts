import { CheckCircle2, Award, History, Heart, Sparkles, Gem } from 'lucide-react';
import SEO from '../components/SEO';

export default function AboutPage() {
  return (
    <div className="about-page">
      <SEO 
        title="About Whole Melt Extracts | Brand Heritage & Purity"
        description="Learn the history of Whole Melt Extracts. Discover our commitment to solventless purity, elite genetics, and the science of premium cannabis concentrates."
        canonical="/about"
      />
      {/* ═══ Page Header ═══ */}
      <section className="page-header" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <span className="section-header__tag animate-reveal">Our Brand Heritage</span>
          <h1 className="page-header__title animate-reveal">About Whole Melt Extracts</h1>
          <p className="page-header__desc animate-reveal">
            The pinnacle of solventless extraction and cannabis purity.
          </p>
        </div>
      </section>

      {/* ═══ Mission & History ═══ */}
      <section className="section bg-deep">
        <div className="container about-split" style={{ gap: '4rem' }}>
          <div className="glass-card animate-reveal" style={{ padding: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)', marginBottom: '1.5rem' }}>
              <History size={28} />
            </div>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Our history</h2>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p>
                In a young industry, our team has more than 100 years of combined experience in cannabis development.
                We have evolved from a small collective of extraction enthusiasts into a global standard for solvent-free purity.
              </p>
              <p>
                We operate the sole, legal Official Whole Melt Extracts online store, serving as the trusted provincial wholesaler for private retail stores and a direct-to-connoisseur platform worldwide.
              </p>
            </div>
          </div>
          <div className="animate-reveal" style={{ animationDelay: '0.2s', alignSelf: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
              We are your <span className="text-gradient">favorite store</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '2.5rem', fontSize: '1.1rem' }}>
              At Whole Melt, we invite you to experience a level of quality and purity that transcends expectations,
              setting a new standard in the cannabis industry. Our specialized focus is on crafting premium-grade
              extracts that redefine what it means to be top-shelf.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { icon: <Gem size={18} />, text: "Connoisseur Grade" },
                { icon: <CheckCircle2 size={18} />, text: "Lab Certified" },
                { icon: <Sparkles size={18} />, text: "Zero Residual Solvents" },
                { icon: <Award size={18} />, text: "Discreet Worldwide Shipping" }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                  <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Quality Standards ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--center animate-reveal">
            <h2 className="section-header__title">Medical Grade Precision</h2>
            <p className="section-header__desc" style={{ maxWidth: '800px', margin: '0 auto' }}>
              At Whole Melt Extracts, we prioritize purity above all else. We use state-of-the-art medical grade equipment, 
              combined with a proprietary solvent-free blend to transform prime plant material into high-end products. 
            </p>
          </div>

          <div className="home-proof" style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-card animate-reveal" style={{ padding: '2.5rem', textAlign: 'center', animationDelay: '0.1s' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-gradient)', color: '#000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Award size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Elite Potency</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Full-spectrum cannabinoids and terpenes preserved for maximum impact and authentic flavor profile.</p>
            </div>
            
            <div className="glass-card animate-reveal" style={{ padding: '2.5rem', textAlign: 'center', animationDelay: '0.2s' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-gradient)', color: '#000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Heart size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>100% Organic</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Sourced exclusively from sustainable farms with the strictest cultivation standards in California.</p>
            </div>

            <div className="glass-card animate-reveal" style={{ padding: '2.5rem', textAlign: 'center', animationDelay: '0.3s' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-gradient)', color: '#000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Global Trust</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Trusted by connoisseurs globally who prioritize safety, authenticity, and premium quality above all.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Retail Flagship Photos ═══ */}
      <section className="section bg-deep" style={{ borderTop: '1px solid var(--glass-border)', paddingBottom: '8rem' }}>
        <div className="container">
          <div className="section-header section-header--center">
            <span className="section-header__tag animate-reveal">Retail Experience</span>
            <h2 className="section-header__title animate-reveal">Our Flagship Store</h2>
            <p className="section-header__desc animate-reveal">
              Experience the pinnacle of cannabis luxury in person at our state-of-the-art dispensary.
            </p>
          </div>
          <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
            <div className="glass-card animate-reveal" style={{ padding: '1rem' }}>
              <img 
                src="/images/storefront-exterior.jpg" 
                alt="Whole Melt Extracts Flagship Exterior" 
                style={{ width: '100%', borderRadius: 'calc(var(--radius-lg) - 4px)', display: 'block' }}
              />
            </div>
            <div className="glass-card animate-reveal" style={{ padding: '1rem', animationDelay: '0.2s' }}>
              <img 
                src="/images/storefront-interior.jpg" 
                alt="Whole Melt Extracts Flagship Interior" 
                style={{ width: '100%', borderRadius: 'calc(var(--radius-lg) - 4px)', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Expanded Content: The Science of Solventless ═══ */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="glass-card animate-reveal" style={{ padding: '4rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2.5rem', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>
              The <span className="text-gradient">Solventless Revolution</span>
            </h2>
            <div style={{ display: 'grid', gap: '2rem', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem' }}>
              <p>
                In the traditional world of cannabis extracts, harsh chemicals like butane or CO2 are often used to separate the desirable compounds from the plant material. At Whole Melt Extracts, we rejected this approach from day one. Instead, we embraced <strong style={{ color: 'var(--text-primary)' }}>solventless extraction</strong>—a purely mechanical process that uses only ice, water, heat, and pressure.
              </p>
              <p>
                Our signature "Live Resin" and "Live Rosin" are the products of an intricate deep-freeze method. We flash-freeze our premium crops immediately after harvest to lock in the absolute freshest terpene profile possible. By bypassing the traditional drying and curing phase, we preserve the volatile aromatic compounds that give each strain its unique soul.
              </p>
              <p>
                This isn't just about safety; it's about flavor. When you experience a Whole Melt product, you are tasting the plant exactly as it lived. The subtle notes of berry, pine, or diesel are amplified, providing a clean, smooth, and potent experience that has no equal in the industry. Our commitment to <strong style={{ color: 'var(--text-primary)' }}>zero residual solvents</strong> means you can enjoy your favorites with complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Call to Action ═══ */}
      <section className="section text-center bg-deep" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <h2 className="animate-reveal" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
            Ready to Experience <span className="text-gradient">Excellence?</span>
          </h2>
          <p className="animate-reveal" style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
            Join our global community of connoisseurs and experience the purest cannabis concentrates available. 
            From 2G disposables to elite badder batches, excellence is just a click away.
          </p>
          <div className="animate-reveal" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/shop" className="btn btn-primary btn-lg glow-border">Browse Collections</a>
            <a href="/faq" className="btn btn-outline btn-lg">View FAQs</a>
          </div>
        </div>
      </section>
    </div>
  );
}
