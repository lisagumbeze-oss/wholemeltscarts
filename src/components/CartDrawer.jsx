import { useCart } from '../context/CartContext';
import { X, ShoppingBag, ArrowRight, Trash2, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export default function CartDrawer() {
  const { cart, drawerOpen, closeDrawer, cartTotal, removeFromCart, updateQty, addToCart } = useCart();

  return (
    <>
      <div 
        className={`cart-drawer-overlay ${drawerOpen ? 'open' : ''}`} 
        onClick={closeDrawer}
      />
      
      <div className={`cart-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="cart-drawer__header">
          <div className="cart-drawer__title">YOUR BASKET</div>
          <button className="cart-drawer__close" onClick={closeDrawer}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-drawer__content">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
              <ShoppingBag size={48} style={{ color: 'var(--glass-border)', marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-muted)' }}>Your cart is empty</p>
              <button 
                className="btn btn-outline btn-sm" 
                style={{ marginTop: '1.5rem' }}
                onClick={closeDrawer}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
                  <img 
                    src={item.images?.[0] || item.image} 
                    alt={item.name} 
                    style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', background: 'var(--bg-card)' }} 
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</div>
                    <div style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '0.75rem' }}>${parseFloat(item.price).toFixed(2)}</div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="cart-item__qty" style={{ gap: '0.25rem' }}>
                        <button 
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            style={{ width: '24px', height: '24px' }}
                        >
                            <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.8rem', minWidth: '20px' }}>{item.qty}</span>
                        <button 
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            style={{ width: '24px', height: '24px' }}
                        >
                            <Plus size={12} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upsell Section */}
          {cart.length > 0 && (
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
                Recommended For You
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {products
                  .filter(p => !cart.find(item => item.id === p.id))
                  .slice(0, 2)
                  .map(p => (
                    <div key={p.id} className="glass" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                      <img src={p.images?.[0] || p.image} alt={p.name} style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>${parseFloat(p.price).toFixed(2)}</div>
                      </div>
                      <button 
                        className="btn btn-primary btn-sm" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem' }}
                        onClick={() => addToCart(p)}
                      >
                        Add
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total-row">
              <span>SUBTOTAL</span>
              <span style={{ color: 'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Shipping and taxes calculated at checkout.
            </p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <Link 
                to="/checkout" 
                className="btn btn-primary" 
                onClick={closeDrawer}
                style={{ width: '100%' }}
              >
                PROCEED TO CHECKOUT <ArrowRight size={18} />
              </Link>
              <Link 
                to="/cart" 
                className="btn btn-outline" 
                onClick={closeDrawer}
                style={{ width: '100%' }}
              >
                VIEW FULL CART
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
