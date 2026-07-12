import { Shield, Lock, Eye, Users, Cookie, AlertCircle, FileText } from 'lucide-react';
import SEO from '../components/SEO';

export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      <SEO 
        title="Privacy Policy | Legal Information"
        description="Learn how Whole Melt Extracts handles your personal information, data security, and privacy. Your trust and safety are our top priorities."
        canonical="/privacy"
      />
      {/* ═══ Header ═══ */}
      <section className="page-header" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container text-center">
          <span className="section-header__tag animate-reveal" style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <FileText size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/> Legal Information
          </span>
          <h1 className="page-header__title animate-reveal">Privacy Policy</h1>
          <p className="page-header__desc animate-reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
            At Whole Melt Extracts, we are committed to protecting your privacy and ensuring 
            your personal information is handled with the utmost care and security.
          </p>
        </div>
      </section>

      {/* ═══ Content ═══ */}
      <section className="section bg-deep">
        <div className="container content-page">
          <div className="glass-card animate-reveal" style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto' }}>
            
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                <Users size={24} />
                <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Information Collection & Usage</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                We collect information that you provide directly to us, such as when you create an account, 
                place an order, or contact us for support. This include your name, email address, 
                shipping address, and payment information. We also automatically collect certain information 
                when you browse our Site, such as IP addresses, browser types, and access times.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                This data is used exclusively to fulfill your orders, provide personalized customer support, 
                and improve the security of our official distribution network. We do not engage in the sale 
                of user metadata to advertising networks.
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                <Lock size={24} />
                <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Data Protection & Advanced Security</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                Your security is our absolute priority. We implement a variety of high-level security measures, including 
                SSL (Secure Sockets Layer) encryption and AES-256 data rest encryption, to maintain the safety 
                of your personal information when you place an order or access your account details.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Our servers are hosted in secure, Tier-III data centers with 24/7 monitoring. We regularly 
                conduct internal security audits to identify and mitigate potential vulnerabilities in our 
                verification and fulfillment systems.
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                <Eye size={24} />
                <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Third-Party Disclosure Policies</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                We do not sell, trade, or otherwise transfer your personally identifiable information to 
                outside parties. This does not include trusted third parties who assist us in operating 
                our website, conducting our business, or servicing you (such as our logistics partners), 
                so long as those parties agree through strict Confidentiality Agreements to keep this data secure.
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                <Cookie size={24} />
                <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Cookie Usage & Opt-Out</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Whole Melt Extracts uses cookies to enhance your browsing experience. Cookies are small 
                files that a site or its service provider transfers to your computer's hard drive through 
                your web browser that enables the site's or service provider's systems to recognize your 
                browser and capture and remember certain information (like items in your cart). 
                You may choose to disable cookies through your browser settings, though this may impact 
                certain functionalities of our digital storefront.
              </p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                <AlertCircle size={24} />
                <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Compliance & Legal Rights</h2>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Age Verification (21+):</strong> Our website and products are intended solely for individuals who are 21 years of age or 
                  older. By using this website, you represent and warrant that you meet this requirement. 
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>California Privacy Rights (CCPA):</strong> California residents have the right to request access to their data and 
                  the deletion of personal information. If you wish to exercise these rights, please contact our legal team.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>GDPR Compliance:</strong> For our European customers, we adhere to the principles of the General Data Protection Regulation. 
                  You have the right to data portability, rectification, and the 'right to be forgotten' within our systems.
                </p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', marginTop: '4rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Contact Our Privacy Officer</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto' }}>
                If you have any questions regarding this privacy policy or our data handling practices, 
                please reach out to our dedicated Privacy Officer at <a href="mailto:sales@wholemeltscarts.us" style={{ color: 'var(--primary)', textDecoration: 'none' }}>sales@wholemeltscarts.us</a>. 
                We aim to respond to all formal privacy inquiries within 48 business hours.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
