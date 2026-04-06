import { useState } from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';
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
    <>
      <SEO 
        title="Contact Us | 24/7 Customer Support"
        description="Have questions about Whole Melt Extracts? Contact our support team 24/7 via email or Telegram for assistance with orders, products, and more."
        canonical="/contact"
      />
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">Contact Us</h1>
          <p className="page-header__desc">Have a question? We're here to help 24/7.</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Get in Touch</h2>

              <div className="glass" style={{ padding: '1.5rem', marginBottom: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <Mail size={18} style={{ color: 'var(--primary)' }} />
                  <strong>Email</strong>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>sales@wholemeltscarts.us</p>
              </div>

              <div className="glass" style={{ padding: '1.5rem', marginBottom: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <MessageSquare size={18} style={{ color: 'var(--primary)' }} />
                  <strong>Telegram</strong>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>@wholemeltscartsus</p>
              </div>

              <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  Our support team is available 24/7. We typically respond within 1-2 hours during business hours. For urgent order inquiries, please include your Order ID.
                </p>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
                  <Send size={40} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                  <h3 style={{ marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <div style={{ color: '#ff4d4f', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
                  <div className="form-group"><label className="form-label">Name *</label><input className="form-input" name="name" value={form.name} onChange={handleChange} required /></div>
                  <div className="form-group"><label className="form-label">Email *</label><input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} required /></div>
                  <div className="form-group"><label className="form-label">Subject</label><input className="form-input" name="subject" value={form.subject} onChange={handleChange} /></div>
                  <div className="form-group"><label className="form-label">Message *</label><textarea className="form-textarea" name="message" value={form.message} onChange={handleChange} required placeholder="How can we help?" /></div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
