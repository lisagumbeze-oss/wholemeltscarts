import React, { useState } from 'react';
import { Truck, ShieldCheck, Mail, Send, Award, Globe, Database } from 'lucide-react';
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
    // Simulate API call for now (Same logic as Contact form)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <SEO 
        title="Wholesale Whole Melt Extracts | Bulk Carts & Master Cases"
        description="Official Whole Melt Extracts B2B Portal. Bulk orders, master cases, and worldwide distribution for verified retailers. Inquire now for wholesale pricing."
        canonical="/wholesale"
        ogType="website"
      />
      
      <div className="section" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="section-header text-center animate-reveal">
            <span className="section-header__tag">B2B Distribution</span>
            <h1 className="section-header__title">Official <span className="text-gradient">Wholesale Portal</span></h1>
            <p className="section-header__desc" style={{ maxWidth: '800px', margin: '1.5rem auto' }}>
              Expand your inventory with the purest solventless concentrates in the market. 
              As the official master distributor, we offer tiered pricing and priority logistics for verified retail partners globally.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '4rem', marginTop: '4rem', alignItems: 'start' }}>
            {/* ═══ Left: Distribution Benefits ═══ */}
            <div className="animate-reveal">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>Why Partner With Us?</h2>
              
              <div style={{ display: 'grid', gap: '2rem' }}>
                {[
                  {
                    icon: <Award className="text-secondary" />,
                    title: "Master Case Tier Pricing",
                    desc: "Unlock absolute lowest prices per unit when ordering in bulk (50+ units). Direct-from-lab pricing with no middleman markup."
                  },
                  {
                    icon: <Globe className="text-secondary" />,
                    title: "Global Stealth Logistics",
                    desc: "Our dedicated B2B logistics team uses multi-layered stealth packaging to ensure 99.9% delivery success across the USA, Canada, and Europe."
                  },
                  {
                    icon: <ShieldCheck className="text-secondary" />,
                    title: "Authenticity Guarantee",
                    desc: "Every order is batch-scanned and verified before departure. We provide unique COA (Certificate of Analysis) data for all wholesale batches."
                  },
                  {
                    icon: <Database className="text-secondary" />,
                    title: "Inventory Priority",
                    desc: "Wholesale partners get early access to limited edition drops, Fusion collaborations, and V6 inventory before they hit the retail market."
                  }
                ].map((benefit, i) => (
                  <div key={i} className="glass hover-lift" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', borderRadius: '1.25rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '0.75rem', height: 'fit-content' }}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{benefit.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══ Right: Inquiry Form ═══ */}
            <div className="glass sticky-top animate-reveal" style={{ padding: '2.5rem', borderRadius: '2rem', top: '2rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div className="text-secondary" style={{ marginBottom: '1.5rem' }}><Send size={48} style={{ margin: '0 auto' }} /></div>
                  <h3 style={{ marginBottom: '1rem' }}>Inquiry Received</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Your wholesale application has been sent to our master agents. A distribution officer will contact you via email or Telegram within 4-6 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Bulk Inquiry Form</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" name="name" className="form-input" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Business Email</label>
                      <input type="email" name="email" className="form-input" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Business/Telegram Name</label>
                      <input type="text" name="business_name" className="form-input" value={form.business_name} onChange={handleChange} placeholder="e.g. Elite Melts CA" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Regional Location</label>
                      <input type="text" name="location" className="form-input" value={form.location} onChange={handleChange} placeholder="e.g. Los Angeles, CA" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Estimated Monthly Volume</label>
                      <select name="estimated_volume" className="form-input" value={form.estimated_volume} onChange={handleChange}>
                        <option value="50-100">50 - 100 units (Sample Case)</option>
                        <option value="100-500">100 - 500 units (Case Stack)</option>
                        <option value="500-2000">500 - 2,000 units (Master Pack)</option>
                        <option value="2000+">2,000+ units (Master Distributor)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Primary Inquiry Details</label>
                      <textarea name="message" className="form-textarea" value={form.message} onChange={handleChange} placeholder="Tell us about your distribution needs..." required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                      {loading ? 'Processing...' : 'Submit Wholesale Application'}
                    </button>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                      By submitting this form, you verify that you are a distributor looking for master case inventory.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
