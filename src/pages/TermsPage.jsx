import React from 'react';
import SEO from '../components/SEO';

export default function TermsPage() {
  return (
    <>
      <SEO 
        title="Terms of Service | Whole Melt Extracts Official"
        description="Official Terms and Conditions for Whole Melt Extracts. Understand our distribution policies, intellectual property rights, and user conduct by accessing our official portal."
        canonical="/terms"
      />
      <div className="section" style={{ paddingTop: '5rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>
            Terms and <span className="text-gradient">Conditions</span>
          </h1>
          <div className="glass" style={{ padding: '3rem', borderRadius: '2rem', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}><strong>Last Updated: October 2025</strong></p>
            
            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>1. Introduction & Acceptance</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Welcome to <strong>Whole Melt Extracts Official</strong> (the "Site", "we", "us", or "our"). By accessing or using our website, you agree to be bound by these Terms and Conditions ("Terms"). These Terms constitute a legally binding agreement between you and Whole Melt Extracts. If you do not agree with any part of these Terms, you must immediately discontinue your use of the Site and our services.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Whole Melt Extracts reserves the right to modify, update, or replace any part of these Terms at any time without prior notice. It is your responsibility to review this page periodically for changes. Your continued use of the Site following the posting of any changes constitutes acceptance of those modifications.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>2. Age and Compliance Requirements</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              You must be at least 21 years of age (or the legal age of majority in your jurisdiction) to access this Site. By using this Site, you represent and warrant that you meet this age requirement. Furthermore, it is your responsibility to ensure that your access to and use of this Site complies with all local, state, and federal laws and regulations.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Whole Melt Extracts does not warrant that the use of this Site or the purchase of any products is legal in your specific location. We reserve the right to restrict access to our services to any person, geographic region, or jurisdiction at our sole discretion.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>3. Intellectual Property Rights</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              The content on this Site, including but not limited to the "Whole Melt Extracts" name, logos, product designs, graphics, images, and text, is the exclusive intellectual property of Whole Melt Extracts and is protected by copyright, trademark, and other intellectual property laws. 
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              You are granted a limited, non-exclusive, non-transferable license to access the Site for personal, non-commercial use. Any unauthorized reproduction, distribution, or modification of the Site's content for commercial purposes is strictly prohibited and may result in legal action.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>4. Distribution and Resale</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Whole Melt Extracts products are intended for consumption by the end-user. Unauthorized resale or distribution of our products is strictly prohibited unless explicitly authorized through a formal master distribution agreement via our <strong>official wholesale portal</strong>. 
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              We reserve the right to cancel any orders that we suspect are intended for unauthorized resale or fraudulent activity. Partners interested in bulk distribution must undergo our verification process to ensure brand integrity and product safety.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>5. Product Disclaimer and Liability</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Whole Melt Extracts provides premium cannabis concentrates and disposables. All product descriptions, pricing, and availability are subject to change at any time without notice. We strive for accuracy, but we do not warrant that product descriptions or other content on the Site are error-free, complete, or current.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              To the fullest extent permitted by law, Whole Melt Extracts shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our products or this Site. This includes, but is not limited to, damages for loss of profits, health complications due to misuse, or data loss.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>6. User Conduct</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              You agree not to use the Site for any unlawful purpose or any purpose prohibited under these Terms. You agree not to use the Site in any way that could damage the Site, the services, or the general business of Whole Melt Extracts. 
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Specific prohibited behaviors include, but are not limited to: harassing others, violating intellectual property rights, uploading viruses or malicious code, or attempting to compromise the security of our official verification server.
            </p>

            <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>7. Governing Law</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              These Terms and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of California. Any disputes arising from these Terms shall be resolved in the courts of Berkeley, California.
            </p>
            
            <p style={{ marginTop: '3rem', textAlign: 'center' }}>
              If you have any questions regarding these Terms, please contact our legal department at <span className="text-secondary">sales@wholemeltscarts.us</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
