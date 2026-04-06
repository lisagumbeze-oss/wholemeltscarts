import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/products';
import SEO from '../components/SEO';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <SEO 
        title="Frequently Asked Questions | Help & Info"
        description="Find answers to common questions about Whole Melt Extracts, shipping, payments, and product authenticity. Everything you need to know in one place."
        canonical="/faq"
      />
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Frequently Asked Questions</h1>
          <p className="page-header__desc">Everything you need to know about Whole Melt Extracts.</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'faq-item--open' : ''}`}>
              <button className="faq-item__question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                {faq.q}
                <ChevronDown size={18} className="faq-item__chevron" />
              </button>
              {openIndex === i && (
                <div className="faq-item__answer">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
