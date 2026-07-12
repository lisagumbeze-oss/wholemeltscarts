import { Home, ShoppingBag, ShoppingCart, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function BottomNav() {
  const location = useLocation();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Don't show on admin routes or checkout
  if (location.pathname.startsWith('/admin') || location.pathname === '/checkout') return null;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/shop', label: 'Shop', icon: ShoppingBag },
    { 
      path: '/wishlist', 
      label: 'Wishlist', 
      icon: Heart,
      badge: wishlist?.length > 0 ? wishlist.length : null
    },
    { 
      path: '/cart', 
      label: 'Cart', 
      icon: ShoppingCart,
      badge: cart?.length > 0 ? cart.length : null
    }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`bottom-nav__item ${isActive ? 'active' : ''}`}
          >
            <div className="bottom-nav__icon-wrapper">
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {item.badge ? (
                <span className="bottom-nav__badge">{item.badge}</span>
              ) : null}
            </div>
            <span className="bottom-nav__label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
