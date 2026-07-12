import { useState } from 'react';
import { Send, Award, Globe, Database, ShieldCheck, CheckCircle2, PackageSearch } from 'lucide-react';
import SEO from '../components/SEO';

export default function WholesalePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    business_name: '',
    location: '',
    estimated_volume: '50-100',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/wholesale', {
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
        throw new Error(result.error || 'Failed to send inquiry.');
      }
    } catch (err) {
      console.error('Wholesale inquiry error:', err);
      alert('Failed to send inquiry. Please reach out via Telegram: @wholemeltscartsus');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wholesale-page">
      <SEO 
        title="Wholesale Whole Melt Extracts | Bulk Carts & Master Cases"
        description="Official Whole Melt Extracts B2B Portal. Bulk orders, master cases, and worldwide distribution for verified retailers. Inquire now for wholesale pricing."
        canonical="/wholesale"
        ogType="website"
      />
      
      {/* ═══ Page Header ═══ */}
      <section className="page-header" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container text-center">
          <span className="section-header__tag animate-reveal" style={{ color: 'var(--primary)', background: 'rgba(212, 175, 55, 0.1)', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <PackageSearch size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/> B2B Distribution
          </span>
          <h1 className="page-header__title animate-reveal">Official <span className="text-gradient">Wholesale Portal</span></h1>
          <p className="page-header__desc animate-reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
            Expand your inventory with the purest solventless concentrates in the market. 
            As the official master distributor, we offer tiered pricing and priority logistics for verified retail partners globally.
          </p>
        </div>
      </section>

      <section className="section bg-deep">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '4rem', alignItems: 'start' }}>
            
            {/* ═══ Left: Distribution Benefits ═══ */}
            <div className="animate-reveal">
              <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', fontFamily: 'var(--font-serif)' }}>Why Partner With Us?</h2>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {[
                  {
                    icon: <Award size={24} />,
                    title: 'Master case tier pricing',
                    desc: 'Lowest per-unit pricing at 50+ units. Direct-from-lab with no middleman markup.'
                  },
                  {
                    icon: <Globe size={24} />,
                    title: 'Global stealth logistics',
                    desc: 'Multi-layered stealth packaging for reliable delivery across USA, Canada, and Europe.'
                  },
                  {
                    icon: <ShieldCheck size={24} />,
                    title: 'Authenticity guarantee',
                    desc: 'Every order is batch-scanned with COA data for all wholesale batches.'
                  },
                  {
                    icon: <Database size={24} />,
                    title: 'Inventory priority',
                    desc: 'Early access to limited drops and V6 inventory before retail release.'
                  }
                ].map((benefit) => (
                  <div key={benefit.title} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-gradient)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{benefit.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══ Right: Inquiry Form ═══ */}
            <aside className="glass-card animate-reveal" style={{ padding: '2.5rem', position: 'sticky', top: '100px', animationDelay: '0.2s' }}>
              <div className="glow-border" style={{ position: 'absolute', inset: 0, zIndex: -1, opacity: 0.5, pointerEvents: 'none' }}></div>
              
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div style={{ marginBottom: '1.5rem' }}><CheckCircle2 size={56} style={{ margin: '0 auto', color: 'var(--primary)' }} /></div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Inquiry Received</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Your wholesale application has been sent to our master agents. A distribution officer will contact you via email or Telegram within 4-6 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Send size={20} color="var(--primary)" /> Bulk Inquiry Form
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ marginBottom: '0.5rem' }}>Full Name</label>
                      <input type="text" name="name" className="form-input" style={{ background: 'rgba(0,0,0,0.5)' }} value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ marginBottom: '0.5rem' }}>Business Email</label>
                      <input type="email" name="email" className="form-input" style={{ background: 'rgba(0,0,0,0.5)' }} value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ marginBottom: '0.5rem' }}>Business/Telegram Name</label>
                      <input type="text" name="business_name" className="form-input" style={{ background: 'rgba(0,0,0,0.5)' }} value={form.business_name} onChange={handleChange} placeholder="e.g. Elite Melts CA" required />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ marginBottom: '0.5rem' }}>Location</label>
                        <input type="text" name="location" className="form-input" style={{ background: 'rgba(0,0,0,0.5)' }} value={form.location} onChange={handleChange} placeholder="Los Angeles, CA" required />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ marginBottom: '0.5rem' }}>Est. Volume</label>
                        <select name="estimated_volume" className="form-input" style={{ background: 'rgba(0,0,0,0.5)' }} value={form.estimated_volume} onChange={handleChange}>
                          <option value="50-100">50 - 100 units</option>
                          <option value="100-500">100 - 500 units</option>
                          <option value="500-2000">500 - 2k units</option>
                          <option value="2000+">2,000+ units</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label className="form-label" style={{ marginBottom: '0.5rem' }}>Primary Inquiry Details</label>
                      <textarea name="message" className="form-textarea" style={{ background: 'rgba(0,0,0,0.5)', minHeight: '120px' }} value={form.message} onChange={handleChange} placeholder="Tell us about your distribution needs..." required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary glow-border" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }} disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Inquiry'}
                    </button>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                      By submitting this form, you verify that you are a distributor looking for master case inventory.
                    </p>
                  </form>
                </>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
