import { CheckCircle2, Award, History, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ═══ Page Header ═══ */}
      <section className="page-header">
        <div className="container">
          <span className="section-header__tag animate-reveal">Our Brand Heritage</span>
          <h1 className="page-header__title animate-reveal">The Art of Pure Extraction</h1>
          <p className="page-header__desc animate-reveal">
            Founded in 2015, Whole Melt Extracts hit the ground running with a singular goal: 
            to create cannabis concentrates of the highest quality and potency… the best nature will allow.
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
            <p className="section-header__desc">
              We use state-of-the-art medical grade equipment, along with a proprietary solvent-free blend to transform 
              prime plant material into high-end products that have quickly earned us an incomparable reputation.
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
              </p>
            </div>
            <div className="glass hover-lift" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Heart size={40} style={{ margin: '0 auto' }} />
              </div>
              <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontSize: '1.1rem' }}>100% Organic</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Crafted from the finest parts of the plant, free from contaminants, residues, or artificial additives.
              </p>
            </div>
            <div className="glass hover-lift" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={40} style={{ margin: '0 auto' }} />
              </div>
              <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontSize: '1.1rem' }}>Global Trust</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Voted as a favorite store by medical patients and connoisseurs who prioritize safety and legality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Call to Action ═══ */}
      <section className="section bg-deep text-center" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Ready to Experience Excellence?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Join our newsletter to never miss a premium batch drop or exclusive discount.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="/shop" className="btn btn-primary btn-lg">Browse Collections</a>
            <a href="/contact" className="btn btn-outline btn-lg">Contact Support</a>
          </div>
        </div>
      </section>
    </div>
  );
}
