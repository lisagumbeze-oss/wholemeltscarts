import React from 'react';
import { Truck, ShieldCheck, Clock, Globe, PackageCheck, AlertCircle } from 'lucide-react';
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
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
              Shipping & <span className="text-gradient">Logistics Logistics</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Everything you need to know about your order's journey from our lab to your door.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '3rem', marginBottom: '5rem' }}>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}><Truck size={36} /></div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Global Reach</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                As the official master distributor, we provide worldwide shipping across the USA, Canada, United Kingdom, European Union (Germany, France, Ireland, Italy, Netherlands, Spain), South Korea, Japan, and Australia. 
                Our logistics network is optimized for speed, security, and anonymity. 
              </p>
            </div>
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}><ShieldCheck size={36} /></div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Stealth Packaging</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                Every Whole Melt Extracts order is prepared using our signature multilayered stealth fulfillment protocol. 
                Packages are vacuum-sealed, wiped with isopropyl alcohol, and placed inside generic nondescript boxes to ensure 
                uninterrupted transit through any domestic or international checkpoint.
              </p>
            </div>
          </div>

          <div className="glass" style={{ padding: '3.5rem', borderRadius: '2rem', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock className="text-secondary" /> Processing & Transit Timelines
            </h2>
            <div style={{ lineHeight: '2', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                At Whole Melt Extracts, we understand the importance of timely delivery. Our fulfillment center operates 365 days a year to ensure your premium concentrates reach you as quickly as possible.
              </p>
              <h3 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.25rem' }}>Order Processing Phase</h3>
              <ul style={{ listStyle: 'circle', paddingLeft: '2rem', marginBottom: '2rem' }}>
                <li><strong>Same-Day Cutoff:</strong> Orders placed before 1:00 PM PST are processed and dispatched on the same business day.</li>
                <li><strong>Tracking Generation:</strong> You will receive a unique, real-time tracking link via email or Telegram once your batch is scanned into the carrier network. </li>
                <li><strong>Verification Scan:</strong> Every wholesale or retail batch undergoes a final quality check before being sealed to ensure the COA matches your order.</li>
              </ul>

              <h3 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.25rem' }}>Transit Estimation by Region</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Our logistics team utilizes premium air freight and courier services (priority overnight where available). While estimated delivery dates are accurate for 98% of orders, please allow for unforeseen transit delays during peak seasons.
              </p>
              <ul style={{ listStyle: 'circle', paddingLeft: '2rem', marginBottom: '2rem' }}>
                <li><strong>USA (Domestic):</strong> 2 - 3 Business Days via Priority Mail Express.</li>
                <li><strong>Canada & United Kingdom:</strong> 3 - 5 Business Days via International Air Cargo.</li>
                <li><strong>European Union (Schengen Area):</strong> 5 - 7 Business Days with full EU-to-EU internal transit to avoid customs hubs.</li>
                <li><strong>Rest of World (Australia, Asia):</strong> 7 - 10 Business Days via Secure Global Distribution channels.</li>
              </ul>

              <h3 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.25rem' }}>Insurance & Delivery Guarantee</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Whole Melt Extracts provides a universal <strong>100% Delivery Guarantee</strong>. If your package is lost, seized, or damaged during transit, we will provide a one-time reshipment or a full credit to your account—no questions asked. 
                As the official brand portal, we take full responsibility for our products until they are successfully scan-delivered to your specified address.
              </p>
              <div style={{ marginTop: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '1rem 2rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '1rem', color: 'var(--primary)', fontWeight: 600 }}>
                <PackageCheck /> Your order is 100% insured up to the moment of successful delivery.
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingBottom: '5rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', display: 'inline-block', padding: '0.75rem 1.5rem', borderRadius: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                <AlertCircle size={18} className="text-secondary" />
                <span>Shipping restrictions may apply to certain international territories. Check with support for details.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
