import { useState } from 'react';
import { Send, Mail, MessageSquare, MapPin } from 'lucide-react';
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
        <div className="container contact-grid">
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Get in touch</h2>

            <div className="contact-card">
              <div className="contact-card__label"><Mail size={18} /> Email</div>
              <p>sales@wholemeltscarts.us</p>
            </div>

            <div className="contact-card">
              <div className="contact-card__label"><MessageSquare size={18} /> Telegram</div>
              <p>@wholemeltscartsus</p>
            </div>

            <div className="contact-card">
              <div className="contact-card__label"><MapPin size={18} /> Address</div>
              <p style={{ whiteSpace: 'pre-line' }}>
                2401 Zephyr Cv{'\n'}
                Rocklin, California (CA), 95677
              </p>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '1rem' }}>
              Our support team is available 24/7. Include your order ID for faster order inquiries.
            </p>
          </div>

          <div>
            {submitted ? (
              <div className="empty-state" style={{ minHeight: 'auto', padding: '3rem 1rem' }}>
                <Send size={36} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                <h3 style={{ marginBottom: '0.5rem' }}>Message sent</h3>
                <p>We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <div style={{ color: '#e07070', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
                <div className="form-group"><label className="form-label">Name *</label><input className="form-input" name="name" value={form.name} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Email *</label><input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Subject</label><input className="form-input" name="subject" value={form.subject} onChange={handleChange} /></div>
                <div className="form-group"><label className="form-label">Message *</label><textarea className="form-textarea" name="message" value={form.message} onChange={handleChange} required placeholder="How can we help?" /></div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Sending…' : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
