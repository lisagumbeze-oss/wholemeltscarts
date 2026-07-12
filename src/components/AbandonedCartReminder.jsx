import { useCart } from '../context/CartContext';
import { useLocation, Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function AbandonedCartReminder() {
  const { cart, cartTotal } = useCart();
  const location = useLocation();

  const isCheckoutOrCart = location.pathname === '/cart' || location.pathname === '/checkout' || location.pathname.startsWith('/admin');
  
  if (cart.length === 0 || isCheckoutOrCart) return null;

  return (
    <div className="abandoned-cart-reminder animate-reveal">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ position: 'relative' }}>
          <ShoppingBag size={24} style={{ color: 'var(--primary)' }} />
          <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--accent)', color: '#000', fontSize: '0.65rem', fontWeight: 700, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {cart.length}
          </span>
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Finish Your Order</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Items are still in your basket</div>
        </div>
      </div>
      
      <Link to="/checkout" className="btn btn-primary btn-sm">
        Checkout <ArrowRight size={14} />
      </Link>
    </div>
  );
}
