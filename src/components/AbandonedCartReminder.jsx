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
      <div className="abandoned-cart-reminder__content">
        <div className="abandoned-cart-reminder__icon">
          <ShoppingBag size={24} className="icon-bag" />
          <span className="abandoned-cart-reminder__badge">
            {cart.length}
          </span>
        </div>
        <div className="abandoned-cart-reminder__text-area">
          <div className="abandoned-cart-reminder__title">Finish Your Order</div>
          <div className="abandoned-cart-reminder__subtitle">Items are still in your basket</div>
        </div>
      </div>
      
      <Link to="/checkout" className="btn btn-primary btn-sm">
        Checkout <ArrowRight size={14} />
      </Link>
    </div>
  );
}
