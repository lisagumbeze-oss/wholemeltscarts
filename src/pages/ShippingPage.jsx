import { Truck, ShieldCheck, Clock, PackageCheck, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function ShippingPage() {
  return (
    <>
      <SEO
        title="Shipping & Delivery | Whole Melt Extracts Official"
        description="Official Shipping and Logistics Guide for Whole Melt Extracts. Worldwide discreet shipping, stealth packaging, and global delivery timelines for our premium concentrates."
        canonical="/shipping"
      />
      <div className="section" style={{ paddingTop: '5rem' }}>
        <div className="container content-page">
          <div className="page-header page-header--left" style={{ padding: '0 0 2.5rem' }}>
            <span className="section-header__tag">Fulfillment</span>
            <h1 className="page-header__title">Shipping & delivery</h1>
            <p className="page-header__desc">How your order moves from our lab to your door.</p>
          </div>

          <div className="about-split" style={{ marginBottom: '3rem' }}>
            <div className="about-block">
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Truck size={28} /></div>
              <h2>Global reach</h2>
              <p>
                We ship across the USA, Canada, UK, EU, South Korea, Japan, and Australia.
                Our logistics network is optimized for speed, security, and discretion.
              </p>
            </div>
            <div className="about-block">
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><ShieldCheck size={28} /></div>
              <h2>Stealth packaging</h2>
              <p>
                Every order uses multilayered stealth fulfillment — vacuum-sealed, odor-proof,
                and placed inside generic nondescript boxes for uninterrupted transit.
              </p>
            </div>
          </div>

          <div className="info-panel">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock size={22} /> Processing & transit
            </h2>
            <p>
              Our fulfillment center operates year-round to ensure premium concentrates reach you quickly.
              Orders placed before 1:00 PM PST are processed the same business day when possible.
            </p>
            <h3 style={{ marginTop: '2rem' }}>Transit by region</h3>
            <ul>
              <li><strong>USA:</strong> 2–3 business days</li>
              <li><strong>Canada & UK:</strong> 3–5 business days</li>
              <li><strong>EU:</strong> 5–7 business days</li>
              <li><strong>Australia & Asia:</strong> 7–10 business days</li>
            </ul>
            <h3 style={{ marginTop: '2rem' }}>Delivery guarantee</h3>
            <p>
              Whole Melt Extracts provides a 100% delivery guarantee. If your package is lost, seized,
              or damaged in transit, we offer a one-time reshipment or full account credit.
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, marginTop: '1.5rem' }}>
              <PackageCheck size={18} /> Your order is insured until successful delivery.
            </p>
          </div>

          <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2.5rem' }}>
            <AlertCircle size={16} />
            Shipping restrictions may apply to certain territories. Contact support for details.
          </p>
        </div>
      </div>
    </>
  );
}
