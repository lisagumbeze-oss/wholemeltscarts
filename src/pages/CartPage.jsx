import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container section" style={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>Your Cart is Empty</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Add some premium products to get started.</p>
        <Link to="/shop" className="btn btn-primary">Shop Now <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-header" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <h1 className="page-header__title">Your Cart ({cartCount})</h1>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem', alignItems: 'start' }}>
            {/* Cart Items */}
            <div>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img className="cart-item__img" src={item.image} alt={item.name}
                    onError={(e) => { e.target.src = 'https://placehold.co/80x80/141414/D4AF37?text=WM'; }} />
                  <div>
                    <Link to={`/product/${item.slug}`} className="cart-item__name" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </Link>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{item.category?.replace('-', ' ')}</p>
                  </div>
                  <div className="cart-item__qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}><Minus size={14} /></button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}><Plus size={14} /></button>
                  </div>
                  <span className="cart-item__price">${((item.salePrice || item.price) * item.qty).toFixed(2)}</span>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '90px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Order Summary</h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span style={{ color: 'var(--accent)' }}>Free</span>
              </div>

              <div style={{ borderTop: '1px solid var(--glass-border)', margin: '1rem 0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.15rem' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
              </div>

              {cartTotal < 100 && (
                <div style={{ 
                  background: 'rgba(212, 175, 55, 0.1)', 
                  border: '1px solid var(--accent)', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                  color: 'var(--accent)'
                }}>
                  Minimum order amount is $100. Please add ${(100 - cartTotal).toFixed(2)} more to continue.
                </div>
              )}

              <Link 
                to={cartTotal >= 100 ? "/checkout" : "#"} 
                className={`btn btn-primary ${cartTotal < 100 ? 'disabled' : ''}`} 
                style={{ 
                  width: '100%', 
                  marginTop: '1rem',
                  opacity: cartTotal < 100 ? 0.5 : 1,
                  cursor: cartTotal < 100 ? 'not-allowed' : 'pointer'
                }}
                onClick={(e) => {
                  if (cartTotal < 100) {
                    e.preventDefault();
                    alert("Minimum order amount is $100. Please add more items to your cart.");
                  }
                }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link to="/shop" className="btn btn-outline" style={{ width: '100%', marginTop: '0.75rem' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
