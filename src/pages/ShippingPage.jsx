import { Truck, ShieldCheck, Clock, PackageCheck, AlertCircle, Plane, Box, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function ShippingPage() {
  return (
    <div className="shipping-page">
      <SEO
        title="Shipping & Delivery | Whole Melt Extracts Official"
        description="Official Shipping and Logistics Guide for Whole Melt Extracts. Worldwide discreet shipping, stealth packaging, and global delivery timelines for our premium concentrates."
        canonical="/shipping"
      />
      
      {/* ═══ Page Header ═══ */}
      <section className="page-header" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container text-center">
          <span className="section-header__tag animate-reveal" style={{ color: 'var(--primary)', background: 'rgba(212, 175, 55, 0.1)', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <Plane size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/> Global Fulfillment
          </span>
          <h1 className="page-header__title animate-reveal">Shipping & Logistics</h1>
          <p className="page-header__desc animate-reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
            From our California labs directly to your door. Secure, discreet, and tracked worldwide delivery.
          </p>
        </div>
      </section>

      <section className="section bg-deep">
        <div className="container">

          {/* ═══ Top Features ═══ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="glass-card animate-reveal" style={{ padding: '2.5rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <ShieldCheck size={28} />
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Stealth Packaging</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Every order utilizes multilayered stealth fulfillment—vacuum-sealed, odor-proofed, 
                and placed inside generic, nondescript boxes ensuring safe and uninterrupted transit.
              </p>
            </div>
            <div className="glass-card animate-reveal" style={{ padding: '2.5rem', animationDelay: '0.1s' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Truck size={28} />
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Global Reach</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                We actively ship across the USA, Canada, UK, EU, South Korea, Japan, and Australia. 
                Our private logistics network is optimized for speed and maximum discretion.
              </p>
            </div>
          </div>

          {/* ═══ Transit Times & Guarantee ═══ */}
          <div className="about-split animate-reveal" style={{ gap: '4rem', alignItems: 'start' }}>
            
            {/* Transit Block */}
            <div className="glass-card glow-border" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
              
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock size={28} color="var(--primary)" /> Transit by Region
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
                Our fulfillment center operates daily to ensure your concentrates arrive quickly. Orders placed before 1:00 PM PST are processed the same business day.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { region: 'USA (Domestic)', time: '2–3 business days' },
                  { region: 'Canada & UK', time: '3–5 business days' },
                  { region: 'European Union (EU)', time: '5–7 business days' },
                  { region: 'Australia & Asia', time: '7–10 business days' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      <Box size={16} color="var(--text-muted)" /> {item.region}
                    </div>
                    <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee Block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>The Delivery <span className="text-gradient">Guarantee</span></h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                  Whole Melt Extracts provides a 100% delivery guarantee on all orders globally. 
                  If your package is lost, seized, or damaged in transit, we will provide a comprehensive one-time reshipment or full account credit—no questions asked.
                </p>
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    <PackageCheck size={24} color="var(--primary)" /> 
                    <span>Fully insured until successful delivery.</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)' }}>
                <AlertCircle size={24} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  Shipping restrictions may apply to specific remote territories. Detailed tracking information is automatically emailed once your order has cleared our QA facility and entered the shipping network.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
