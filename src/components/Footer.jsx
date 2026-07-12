import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">Whole Melt Extracts</div>
          <p className="footer__desc">
            Premium solventless concentrates for connoisseurs — lab-tested disposables,
            live resin, and carts from the official store.
          </p>
          <p className="footer__contact">
            sales@wholemeltscarts.us<br />
            Telegram: @wholemeltscartsus
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
            <li><Link to="/about">About</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/blog">Journal</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/wholesale">Wholesale</Link></li>
            <li><Link to="/shipping">Shipping</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer__heading">Payment</h4>
          <ul className="footer__links">
            <li><span>Zelle</span></li>
            <li><span>CashApp</span></li>
            <li><span>Venmo</span></li>
            <li><span>Apple Cash</span></li>
            <li><span>Chime</span></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} Whole Melt Extracts. Official Store. All rights reserved.
      </div>
    </footer>
  );
}
