import { useState } from 'react';
import { Send, Mail, MessageSquare, MapPin, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.error || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Contact error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <SEO 
        title="Contact Us | 24/7 Customer Support"
        description="Have questions about Whole Melt Extracts? Contact our support team 24/7 via email or Telegram for assistance with orders, products, and more."
        canonical="/contact"
      />
      
      {/* ═══ Page Header ═══ */}
      <section className="page-header" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container text-center">
          <span className="section-header__tag animate-reveal">24/7 Support</span>
          <h1 className="page-header__title animate-reveal">Contact Us</h1>
          <p className="page-header__desc animate-reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Whether you have a question about our solventless extraction process, wholesale opportunities, or your recent order, our team is ready to assist you.
          </p>
        </div>
      </section>

      {/* ═══ Contact Grid ═══ */}
      <section className="section bg-deep">
        <div className="container contact-grid" style={{ alignItems: 'start', gap: '4rem' }}>
          
          {/* Left Column: Contact Cards */}
          <div className="animate-reveal">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem' }}>
              Get in <span className="text-gradient">touch</span>
            </h2>

            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexShrink: 0 }}>
                <Mail size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Email Support</div>
                <a href="mailto:sales@wholemeltscarts.us" style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-primary)'}>
                  sales@wholemeltscarts.us
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexShrink: 0 }}>
                <MessageSquare size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Telegram (Fastest)</div>
                <a href="https://t.me/wholemeltscartsus" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-primary)'}>
                  @wholemeltscartsus
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                <MapPin size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Headquarters</div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  2401 Zephyr Cv<br />
                  Rocklin, CA 95677
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '2rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--primary)' }}>
              Note: For order inquiries, please include your Order ID in your message so our team can assist you faster.
            </p>
          </div>

          {/* Right Column: Secure Form */}
          <div className="animate-reveal" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div className="glow-border" style={{ position: 'absolute', inset: 0, zIndex: -1, opacity: 0.5, pointerEvents: 'none' }}></div>
              
              <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send size={20} color="var(--primary)" /> Send a Secure Message
              </h3>

              {submitted ? (
                <div className="empty-state" style={{ minHeight: '300px', background: 'transparent', border: 'none' }}>
                  <CheckCircle2 size={48} style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} />
                  <h3 style={{ marginBottom: '0.75rem', fontSize: '1.5rem' }}>Message Received</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Thank you for reaching out. A member of the Whole Melt team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <div style={{ padding: '1rem', background: 'rgba(224, 112, 112, 0.1)', color: '#e07070', border: '1px solid rgba(224, 112, 112, 0.3)', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Name *</label>
                      <input className="form-input" style={{ background: 'rgba(0,0,0,0.5)' }} name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email *</label>
                      <input className="form-input" style={{ background: 'rgba(0,0,0,0.5)' }} name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input className="form-input" style={{ background: 'rgba(0,0,0,0.5)' }} name="subject" value={form.subject} onChange={handleChange} placeholder="Order #12345 Inquiry" />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-textarea" style={{ background: 'rgba(0,0,0,0.5)', minHeight: '150px' }} name="message" value={form.message} onChange={handleChange} required placeholder="How can we assist you today?" />
                  </div>
                  
                  <button type="submit" className="btn btn-primary glow-border" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }} disabled={loading}>
                    {loading ? 'Transmitting Securely…' : 'Submit Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
