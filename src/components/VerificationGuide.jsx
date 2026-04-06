import React from 'react';
import { ShieldCheck, Smartphone, Search, AlertCircle } from 'lucide-react';

export default function VerificationGuide() {
  const steps = [
    {
      icon: <Smartphone size={32} />,
      title: "Scan the QR Code",
      desc: "Every authentic Whole Melt package features a unique, high-security QR code on the back or side. Use your smartphone camera to reveal the hidden batch data."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Check the Hologram",
      desc: "Genuine disposables and concentrate jars include a triple-layered holographic seal that shifts color when tilted. If the seal is broken or dull, do not consume."
    },
    {
      icon: <Search size={32} />,
      title: "Verify Batch Results",
      desc: "Cross-reference your batch number on our official portal. Verified products will show the specific terpene profile and potency results for your exact harvest."
    }
  ];

  return (
    <div className="glass" style={{ padding: '3rem', borderRadius: '2rem', marginTop: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
          Official <span className="text-gradient">Authenticity Guide</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Protect yourself from counterfeit products. Follow these three steps to ensure you are experiencing genuine Whole Melt Extracts.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
        {steps.map((step, i) => (
          <div key={i} className="animate-reveal" style={{ animationDelay: `${i * 0.2}s` }}>
            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              {step.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>{step.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7', textAlign: 'center' }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '1rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
          <AlertCircle size={18} />
          Note: Authentic Whole Melts are NEVER sold through unverified third-party telegram channels.
        </div>
      </div>
    </div>
  );
}
