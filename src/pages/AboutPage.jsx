import { CheckCircle2, Award, History, Heart } from 'lucide-react';
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
      <section className="page-header">
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
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div className="animate-reveal">
              <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                  <History size={36} />
                </div>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Our History</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                  In a young industry, our team has more than 100 years of combined experience in cannabis development. 
                  We have evolved from a small collective of extraction enthusiasts into a global standard for solvent-free purity.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  We operate the sole, legal Official Whole Melt Extracts online store, serving as the trusted provincial wholesaler for private retail stores and a direct-to-connoisseur platform worldwide.
                </p>
              </div>
            </div>
            <div className="animate-reveal" style={{ animationDelay: '0.2s' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>
                We Are Your <span className="text-gradient">Favorite Store</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '2', marginBottom: '2rem', fontSize: '1.1rem' }}>
                At Whole Melt, we invitation to experience a level of quality and purity that transcends expectations, 
                setting a new standard in the cannabis industry. Our specialized focus is on crafting premium-grade 
                extracts that redefine what it means to be "top-shelf."
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--primary)" />
                  <span style={{ fontSize: '0.9rem' }}>Connoisseur Grade</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--primary)" />
                  <span style={{ fontSize: '0.9rem' }}>Lab Certified</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--primary)" />
                  <span style={{ fontSize: '0.9rem' }}>Zero Residual Solvents</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--primary)" />
                  <span style={{ fontSize: '0.9rem' }}>Discreet Worldwide Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Quality Standards ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">Medical Grade Precision</h2>
            <p className="section-header__desc" style={{ maxWidth: '800px', margin: '1.5rem auto' }}>
              At Whole Melt Extracts, we prioritize purity above all else. We use state-of-the-art medical grade equipment, 
              combined with a proprietary solvent-free blend to transform prime plant material into high-end products. 
              Our commitment to excellence has earned us an incomparable reputation among connoisseurs and medical patients alike.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '4rem' }}>
            <div className="glass hover-lift" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Award size={40} style={{ margin: '0 auto' }} />
              </div>
              <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontSize: '1.1rem' }}>Elite Potency</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Our meticulous extraction process preserves the full spectrum of cannabinoids and terpenes for max impact. 
                This ensures a multi-layered, nuanced experience that shorter extraction methods simply cannot match.
              </p>
            </div>
            <div className="glass hover-lift" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Heart size={40} style={{ margin: '0 auto' }} />
              </div>
              <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontSize: '1.1rem' }}>100% Organic</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Crafted from the finest parts of the plant, free from contaminants, residues, or artificial additives. 
                We source only from sustainable farms that adhere to strict organic cultivation standards.
              </p>
            </div>
            <div className="glass hover-lift" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={40} style={{ margin: '0 auto' }} />
              </div>
              <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontSize: '1.1rem' }}>Global Trust</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Voted as a favorite store by medical patients and connoisseurs who prioritize safety and legality. 
                Whole Melt Extracts has become a household name in the premium concentrate community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Expanded Content: The Science of Solventless ═══ */}
      <section className="section bg-deep" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="animate-reveal">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>
              The <span className="text-gradient">Solventless Revolution</span>
            </h2>
            <div style={{ display: 'grid', gap: '2.5rem', color: 'var(--text-secondary)', lineHeight: '2', fontSize: '1.05rem' }}>
              <p>
                In the traditional world of cannabis extracts, harsh chemicals like butane or CO2 are often used to separate the desirable compounds from the plant material. At Whole Melt Extracts, we rejected this approach from day one. Instead, we embraced <strong>solventless extraction</strong>—a purely mechanical process that uses only ice, water, heat, and pressure.
              </p>
              <p>
                Our signature "Live Resin" and "Live Rosin" are the products of an intricate deep-freeze method. We flash-freeze our premium crops immediately after harvest to lock in the absolute freshest terpene profile possible. By bypassing the traditional drying and curing phase, we preserve the volatile aromatic compounds that give each strain its unique soul.
              </p>
              <p>
                This isn't just about safety; it's about flavor. When you experience a Whole Melt product, you are tasting the plant exactly as it lived. The subtle notes of berry, pine, or diesel are amplified, providing a clean, smooth, and potent experience that has no equal in the industry. Our commitment to <strong>zero residual solvents</strong> means you can enjoy your favorites with complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Call to Action ═══ */}
      <section className="section text-center" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Ready to Experience Excellence?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Join our global community of connoisseurs and experience the purest cannabis concentrates available. 
            From 2G disposables to elite badder batches, excellence is just a click away.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/shop" className="btn btn-primary btn-lg">Browse Collections</a>
            <a href="/faq" className="btn btn-outline btn-lg">View FAQs</a>
          </div>
        </div>
      </section>
    </div>
  );
}
