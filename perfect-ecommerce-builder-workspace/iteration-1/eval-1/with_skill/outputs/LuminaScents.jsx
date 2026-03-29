import React from 'react';
import { Sparkles, Diamond, ShieldCheck, ArrowRight, CreditCard } from 'lucide-react';

/* 
  Lumina Scents - Artisan Luxury Candle Landing Page
  Pattern: Premium E-commerce Builder Skill
*/

const LuminaScents = () => {
  return (
    <div className="lumina-container" style={{ backgroundColor: '#080808', color: '#F5F5F7', fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      {/* SEO Meta (Simulated for Component) */}
      <title>Hand-Poured Luxury Soy Candles | Lumina Scents</title>
      
      {/* Navigation */}
      <nav style={{ padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.2rem', color: '#D4AF37' }}>
          <Sparkles /> LUMINA SCENTS
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <span>Collection</span>
          <span>Our Story</span>
          <span>Sustainability</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ padding: '4rem 5%', textAlign: 'center', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '4rem', fontFamily: 'Playfair Display, serif', marginBottom: '1.5rem', fontWeight: 700 }}>
          The Art of <span style={{ color: '#D4AF37' }}>Elevated</span> Ambiance
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#A1A1A6', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Exquisite hand-poured luxury soy candles designed to transform your space into a sanctuary of light and scent.
        </p>
        <button style={{ padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', border: 'none', borderRadius: '8px', color: '#000', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
          Shop Collection <ArrowRight size={18} />
        </button>
      </header>

      {/* Product Showcase - Glassmorphism Card */}
      <section style={{ padding: '4rem 5%', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '3rem',
          maxWidth: '800px',
          width: '100%',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)'
        }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: '1.5rem' }}>Signature Scented Luxury</h2>
          <p style={{ color: '#A1A1A6', marginBottom: '2rem' }}>
            Our candles utilize 100% natural soy wax, essential oil blends, and crackling wood wicks to provide the ultimate olfactory experience.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}><ShieldCheck style={{ color: '#D4AF37', marginBottom: '0.5rem' }} /> <br/> Non-Toxic</div>
            <div style={{ textAlign: 'center' }}><Diamond style={{ color: '#D4AF37', marginBottom: '0.5rem' }} /> <br/> Artisan</div>
            <div style={{ textAlign: 'center' }}><Sparkles style={{ color: '#D4AF37', marginBottom: '0.5rem' }} /> <br/> Long Burn</div>
          </div>
        </div>
      </section>

      {/* Payment Instructions - Manual Workflow */}
      <section style={{ padding: '4rem 5%', textAlign: 'center', backgroundColor: '#121212' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '1rem' }}>Secure Checkout</h2>
        <p style={{ color: '#A1A1A6', marginBottom: '2rem' }}>We accept manual payments to maintain artisan quality and direct support.</p>
        
        <div style={{ display: 'inline-block', textAlign: 'left', padding: '2rem', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '12px', background: 'rgba(212, 175, 55, 0.05)' }}>
          <h3 style={{ color: '#D4AF37', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CreditCard size={20}/> Pay via Zelle</h3>
          <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> payments@luminascents.com</p>
          <p style={{ fontSize: '0.85rem', color: '#6E6E73' }}>Please include your Order ID in the payment memo. Your order will be processed immediately upon confirmation.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem 5%', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.8rem', color: '#6E6E73' }}>
        &copy; 2026 Lumina Scents. Premium Artisan Hand-Poured Luxury Soy Candles.
      </footer>
    </div>
  );
};

export default LuminaScents;
