import { useState } from 'react';
import { ChevronDown, MessageSquare, Mail } from 'lucide-react';
import { faqs } from '../data/products';
import SEO from '../components/SEO';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-page">
      <SEO 
        title="Frequently Asked Questions | Help & Info"
        description="Find answers to common questions about Whole Melt Extracts, shipping, payments, and product authenticity. Everything you need to know in one place."
        canonical="/faq"
      />
      
      {/* ═══ Page Header ═══ */}
      <section className="page-header" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <span className="section-header__tag animate-reveal">Support Center</span>
          <h1 className="page-header__title animate-reveal">Frequently Asked Questions</h1>
          <p className="page-header__desc animate-reveal">Everything you need to know about Whole Melt Extracts, shipping, and authenticity.</p>
        </div>
      </section>

      {/* ═══ FAQ Accordion ═══ */}
      <section className="section bg-deep">
        <div className="container" style={{ maxWidth: '800px' }}>
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item animate-reveal ${openIndex === i ? 'faq-item--open' : ''}`} style={{ animationDelay: `${i * 0.05}s` }}>
              <button className="faq-item__question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                {faq.q}
                <ChevronDown size={20} className="faq-item__chevron" />
              </button>
              {openIndex === i && (
                <div className="faq-item__answer animate-fade">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Support CTA ═══ */}
      <section className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 className="animate-reveal" style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            Still have <span className="text-gradient">questions?</span>
          </h2>
          <p className="animate-reveal" style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
            Our support team is available 24/7 to help you with your order, product questions, or wholesale inquiries.
          </p>
          <div className="animate-reveal" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn btn-primary btn-lg glow-border">
              <MessageSquare size={18} /> Contact Support
            </a>
            <a href="mailto:sales@wholemeltscarts.us" className="btn btn-outline btn-lg">
              <Mail size={18} /> Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
