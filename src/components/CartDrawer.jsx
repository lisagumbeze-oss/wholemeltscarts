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
        aria-hidden={!drawerOpen}
      />

      <div className={`cart-drawer ${drawerOpen ? 'open' : ''}`} role="dialog" aria-label="Shopping cart">
        <div className="cart-drawer__header">
          <div className="cart-drawer__title">Your cart</div>
          <button type="button" className="cart-drawer__close" onClick={closeDrawer} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        <div className="cart-drawer__content">
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <ShoppingBag size={40} />
              <p>Your cart is empty</p>
              <button type="button" className="btn btn-outline btn-sm" onClick={closeDrawer}>
                Start shopping
              </button>
            </div>
          ) : (
            <div className="cart-drawer__items">
              {cart.map(item => (
                <div key={item.id} className="cart-drawer__item">
                  <img src={item.images?.[0] || item.image} alt={item.name} />
                  <div className="cart-drawer__item-body">
                    <div className="cart-drawer__item-name">{item.name}</div>
                    <div className="cart-drawer__item-price">${parseFloat(item.price).toFixed(2)}</div>
                    <div className="cart-drawer__item-actions">
                      <div className="cart-item__qty">
                        <button type="button" onClick={() => updateQty(item.id, item.qty - 1)}><Minus size={12} /></button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => updateQty(item.id, item.qty + 1)}><Plus size={12} /></button>
                      </div>
                      <button type="button" className="cart-drawer__remove" onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="cart-drawer__upsell">
              <div className="cart-drawer__upsell-title">You may also like</div>
              {products
                .filter(p => !cart.find(item => item.id === p.id))
                .slice(0, 2)
                .map(p => (
                  <div key={p.id} className="cart-drawer__upsell-item">
                    <img src={p.images?.[0] || p.image} alt={p.name} />
                    <div className="cart-drawer__upsell-info">
                      <div>{p.name}</div>
                      <span>${parseFloat(p.price).toFixed(2)}</span>
                    </div>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => addToCart(p)}>
                      Add
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total-row">
              <span>Subtotal</span>
              <span style={{ color: 'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <p className="cart-drawer__note">Shipping calculated at checkout.</p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <Link to="/checkout" className="btn btn-primary" onClick={closeDrawer} style={{ width: '100%' }}>
                Checkout <ArrowRight size={18} />
              </Link>
              <Link to="/cart" className="btn btn-outline" onClick={closeDrawer} style={{ width: '100%' }}>
                View full cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
