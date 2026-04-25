import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { cartCount, openDrawer } = useCart();
  const { wishlist } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/strains', label: 'Strains' },
    { to: '/lab-results', label: 'Lab Hub' },
    { to: '/about', label: 'About Us' },
    { to: '/faq', label: 'FAQs' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span>WHOLE MELT EXTRACTS</span>
        </Link>

        {!searchOpen ? (
          <ul className="navbar__links">
            {links.map(link => (
              <li key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => isActive ? 'active' : ''}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <form onSubmit={handleSearch} style={{ flex: 1, margin: '0 2rem', maxWidth: '600px' }}>
            <div style={{ position: 'relative' }}>
              <input 
                autoFocus
                type="text" 
                placeholder="Search premium extracts..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingRight: '3rem', background: 'rgba(255,255,255,0.03)' }}
              />
              <button type="button" onClick={() => setSearchOpen(false)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
          </form>
        )}

        <div className="navbar__actions">
          {!searchOpen && (
            <button className="navbar__cart-btn" onClick={() => setSearchOpen(true)}>
              <Search size={22} />
            </button>
          )}
          <Link to="/wishlist" className="navbar__cart-btn">
            <Heart size={22} fill={wishlist.length > 0 ? "var(--primary)" : "none"} style={{ color: wishlist.length > 0 ? "var(--primary)" : "inherit" }} />
            {wishlist.length > 0 && <span className="navbar__cart-count" style={{ background: 'var(--text-primary)', color: '#000' }}>{wishlist.length}</span>}
          </Link>
          <button className="navbar__cart-btn" onClick={openDrawer}>
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="navbar__cart-count">{cartCount}</span>}
          </button>
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
