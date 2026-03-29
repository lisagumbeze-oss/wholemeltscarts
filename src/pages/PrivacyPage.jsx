import React from 'react';
import { Shield, Lock, Eye, Users, Cookie, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="privacy-page" style={{ paddingTop: '5rem' }}>
      {/* ═══ Header ═══ */}
      <section className="page-header">
        <div className="container">
          <span className="section-header__tag animate-reveal">Legal Information</span>
          <h1 className="page-header__title animate-reveal">Privacy Policy</h1>
          <p className="page-header__desc animate-reveal">
            At Whole Melt Extracts, we are committed to protecting your privacy and ensuring 
            your personal information is handled with the utmost care and security.
          </p>
        </div>
      </section>

      {/* ═══ Content ═══ */}
      <section className="section bg-deep">
        <div className="container">
          <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              
              <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                  <Users size={24} />
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Information Collection</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  We collect information that you provide directly to us, such as when you create an account, 
                  place an order, or contact us for support. This may include your name, email address, 
                  shipping address, and payment information (which is processed securely through our partners).
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                  <Lock size={24} />
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Data Protection & SSL</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  Your security is our priority. We implement a variety of security measures, including 
                  SSL (Secure Sockets Layer) encryption, to maintain the safety of your personal information 
                  when you place an order or enter, submit, or access your details on our platform.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                  <Eye size={24} />
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Third-Party Disclosure</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  We do not sell, trade, or otherwise transfer your personally identifiable information to 
                  outside parties except for trusted third parties who assist us in operating our website, 
                  conducting our business, or servicing you (such as shipping partners), so long as those 
                  parties agree to keep this information confidential.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                  <Cookie size={24} />
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Cookie Usage</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  Whole Melt Extracts uses cookies to enhance your browsing experience. Cookies are small 
                  files that a site or its service provider transfers to your computer's hard drive through 
                  your web browser that enables the site's or service provider's systems to recognize your 
                  browser and capture and remember certain information (like items in your cart).
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                  <AlertCircle size={24} />
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Age Verification (21+)</h2>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  Our website and products are intended solely for individuals who are 21 years of age or 
                  older. By using this website, you represent and warrant that you meet this age requirement. 
                  We do not knowingly collect information from individuals under the age of 21.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', marginTop: '4rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Contact Us</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  If you have any questions regarding this privacy policy, you may contact us using the 
                  information on our <a href="/contact" style={{ color: 'var(--primary)' }}>Contact Us</a> page.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
