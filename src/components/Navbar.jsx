import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { cartCount, openDrawer } = useCart();
  const { wishlist } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/strains', label: 'Strains' },
    { to: '/lab-results', label: 'Lab Hub' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    { to: '/faq', label: 'FAQs' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-mark">Whole Melt</span>
          <span className="navbar__logo-sub">Extracts Official</span>
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
          <form onSubmit={handleSearch} className="navbar__search-form">
            <div style={{ position: 'relative' }}>
              <input
                autoFocus
                type="text"
                placeholder="Search extracts, carts, strains…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingRight: '3rem', background: 'rgba(255,255,255,0.03)' }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>
          </form>
        )}

        <div className="navbar__actions">
          {!searchOpen && (
            <button className="navbar__cart-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search size={20} />
            </button>
          )}
          <Link to="/wishlist" className="navbar__cart-btn" aria-label="Wishlist">
            <Heart size={20} fill={wishlist.length > 0 ? 'var(--primary)' : 'none'} style={{ color: wishlist.length > 0 ? 'var(--primary)' : 'inherit' }} />
            {wishlist.length > 0 && <span className="navbar__cart-count">{wishlist.length}</span>}
          </Link>
          <button className="navbar__cart-btn" onClick={openDrawer} aria-label="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="navbar__cart-count">{cartCount}</span>}
          </button>
          <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="navbar__mobile-panel">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
