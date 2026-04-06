import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">WHOLE MELT EXTRACTS</div>
          <p className="footer__desc">
            Premium cannabis concentrates crafted for connoisseurs. Pure, potent, and lab-tested for your peace of mind. Order whole melts disposables, live resin, and more from the official store.
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            📧 sales@wholemeltscarts.us<br />
            💬 Telegram: @wholemeltscartsus
          </p>
        </div>

        <div>
          <h4 className="footer__heading">Shop</h4>
          <ul className="footer__links">
            <li><Link to="/shop?category=disposables">Disposables</Link></li>
            <li><Link to="/shop?category=carts">Carts</Link></li>
            <li><Link to="/shop?category=live-resin">Live Resin</Link></li>
            <li><Link to="/shop?category=v6">V6 Edition</Link></li>
            <li><Link to="/shop?category=v5">V5 Edition</Link></li>
            <li><Link to="/shop?category=shatter">Shatter</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer__heading">Info</h4>
          <ul className="footer__links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/blog">Daily Info</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/wholesale">Wholesale Portal</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer__heading">Payment</h4>
          <ul className="footer__links">
            <li><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Zelle</span></li>
            <li><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>CashApp</span></li>
            <li><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Venmo</span></li>
            <li><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Apple Cash</span></li>
            <li><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Chime</span></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} Whole Melt Extracts. Official Store. All rights reserved.
      </div>
    </footer>
  );
}
