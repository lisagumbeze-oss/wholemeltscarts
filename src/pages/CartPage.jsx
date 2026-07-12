import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal, cartCount } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const applyPromo = (e) => {
    e.preventDefault();
    setIsApplying(true);
    setPromoError('');
    setPromoSuccess('');

    setTimeout(() => {
      if (promoCode.toUpperCase() === 'WHOLE20') {
        setDiscount(cartTotal * 0.2);
        setPromoSuccess('20% discount applied.');
      } else {
        setPromoError('Invalid promo code');
      }
      setIsApplying(false);
    }, 1000);
  };

  const finalTotal = cartTotal - discount;

  if (cart.length === 0) {
    return (
      <div className="container empty-state">
        <h1>Your cart is empty</h1>
        <p>Add premium extracts to get started.</p>
        <Link to="/shop" className="btn btn-primary">Shop Now <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-header page-header--left" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <h1 className="page-header__title">Cart ({cartCount})</h1>
          <p className="page-header__desc">Review your selection before checkout.</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="funnel-layout">
            <div>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img
                    className="cart-item__img"
                    src={item.images?.[0] || item.image}
                    alt={item.name}
                    onError={(e) => { e.target.src = 'https://placehold.co/80x80/141414/D4AF37?text=WM'; }}
                  />
                  <div>
                    <Link to={`/product/${item.slug || item.id}`} className="cart-item__name" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </Link>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      {item.category?.replace('-', ' ')}
                    </p>
                  </div>
                  <div className="cart-item__qty">
                    <button type="button" onClick={() => updateQty(item.id, item.qty - 1)}><Minus size={14} /></button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.id, item.qty + 1)}><Plus size={14} /></button>
                  </div>
                  <span className="cart-item__price">${(parseFloat(item.price) * item.qty).toFixed(2)}</span>
                  <button type="button" className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <aside className="order-summary">
              <h3 className="order-summary__title">Order summary</h3>

              <div className="order-summary__row">
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="order-summary__row order-summary__row--accent">
                  <span>Promo discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="order-summary__row">
                <span>Shipping</span>
                <span style={{ color: 'var(--accent)' }}>Calculated at checkout</span>
              </div>

              <form onSubmit={applyPromo} style={{ margin: '1.25rem 0' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="form-input"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    style={{ fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn btn-outline btn-sm" disabled={isApplying || !promoCode}>
                    {isApplying ? '…' : 'Apply'}
                  </button>
                </div>
                {promoError && <p style={{ color: '#e07070', fontSize: '0.75rem', marginTop: '0.5rem' }}>{promoError}</p>}
                {promoSuccess && <p style={{ color: 'var(--primary)', fontSize: '0.75rem', marginTop: '0.5rem' }}>{promoSuccess}</p>}
              </form>

              <div className="order-summary__row order-summary__row--total">
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>${finalTotal.toFixed(2)}</span>
              </div>

              {cartTotal < 100 && (
                <p className="min-order-notice">
                  Minimum order is $100. Add ${(100 - cartTotal).toFixed(2)} more to checkout.
                </p>
              )}

              <Link
                to={cartTotal >= 100 ? '/checkout' : '#'}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  marginTop: '1rem',
                  opacity: cartTotal < 100 ? 0.5 : 1,
                  cursor: cartTotal < 100 ? 'not-allowed' : 'pointer'
                }}
                onClick={(e) => {
                  if (cartTotal < 100) {
                    e.preventDefault();
                    alert('Minimum order amount is $100. Please add more items to your cart.');
                  }
                }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link to="/shop" className="btn btn-outline" style={{ width: '100%', marginTop: '0.75rem' }}>
                Continue Shopping
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
