import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About Us' },
    { to: '/blog', label: 'Daily Info' },
    { to: '/faq', label: 'FAQs' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span>WHOLE MELT EXTRACTS</span>
        </Link>

        <ul className="navbar__links">
          {links.map(link => (
            <li key={link.to}>
              <NavLink to={link.to} className={({ isActive }) => isActive ? 'active' : ''}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <Link to="/cart" className="navbar__cart-btn">
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="navbar__cart-count">{cartCount}</span>}
          </Link>
          <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{
          padding: '1rem clamp(1rem, 4vw, 3rem)',
          borderTop: '1px solid var(--glass-border)',
          background: 'rgba(5,5,5,0.95)',
        }}>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '0.75rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
