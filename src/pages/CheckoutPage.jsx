import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import PaymentMethods from '../components/PaymentMethods';
import { CheckCircle, Truck, Bitcoin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Italy", "Spain", "Netherlands", "Norway", "Sweden", "Other"
];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [orderId] = useState(() => 'WM-' + Math.random().toString(36).substring(2, 8).toUpperCase());

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'United States', notes: ''
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('Zelle');

  useEffect(() => {
    if (cart.length > 0 && cartTotal < 100) {
      alert("Minimum order amount is $100. Redirecting to cart...");
      navigate('/cart');
    }
  }, [cartTotal, cart.length, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const getShippingCost = () => {
    const isUSA = form.country === 'United States';
    if (isUSA) {
      if (shippingMethod === 'standard') {
        return cartTotal >= 500 ? 0 : 15;
      }
      return 25; // Express USA
    } else {
      // International
      return shippingMethod === 'standard' ? 25 : 50;
    }
  };

  const shippingCost = getShippingCost();
  const finalTotal = cartTotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CheckCircle size={60} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.75rem' }}>Order Placed!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Your Order ID: <strong style={{ color: 'var(--primary)' }}>{orderId}</strong></p>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '1.5rem', lineHeight: '1.7' }}>
          Payment Method: <strong>{paymentMethod}</strong>
        </p>

        {paymentMethod === 'Plisio (Crypto)' ? (
          <div className="glass shadow-lg" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', maxWidth: '500px', width: '100%', textAlign: 'center', background: 'var(--bg-elevated)', border: '1px solid var(--primary)' }}>
            <Bitcoin size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '1rem' }}>Complete Your Crypto Payment</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Click the button below to proceed to our secure Plisio payment gateway. You can pay with BTC, ETH, LTC, USDT, and more.
            </p>
            <a 
              href={`https://plisio.net/pay?api_key=d7HGgW3rgy1PWJEBHWqDuS1d5Xc2W7HIVuaqxKXZDcM2ZOtGfmGfUJwe0sqVJ46d&order_number=${orderId}&amount=${finalTotal.toFixed(2)}&currency=USD&source_currency=BTC`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              Pay with Plisio <Bitcoin size={18} />
            </a>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '2rem', lineHeight: '1.7' }}>
              Please send <strong>${finalTotal.toFixed(2)}</strong> using the details below. Include your Order ID in the payment memo.
              Your order will be processed and shipped once payment is confirmed.
            </p>
            <div style={{ maxWidth: '500px', width: '100%', textAlign: 'left' }}>
              <PaymentMethods selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
            </div>
          </>
        )}
        <Link to="/" className="btn btn-outline" style={{ marginTop: '2rem' }} onClick={() => clearCart()}>Return Home</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container section" style={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>Nothing to Checkout</h1>
        <Link to="/shop" className="btn btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-header" style={{ paddingBottom: '1rem' }}>
        <div className="container"><h1 className="page-header__title">Checkout</h1></div>
      </div>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem' }}>Shipping Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group"><label className="form-label">First Name *</label><input className="form-input" name="firstName" value={form.firstName} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Last Name *</label><input className="form-input" name="lastName" value={form.lastName} onChange={handleChange} required /></div>
              </div>
              <div className="form-group"><label className="form-label">Email *</label><input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} required /></div>
              <div className="form-group"><label className="form-label">Phone</label><input className="form-input" name="phone" value={form.phone} onChange={handleChange} /></div>
              
              <div className="form-group">
                <label className="form-label">Country *</label>
                <select className="form-input" name="country" value={form.country} onChange={handleChange} required>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group"><label className="form-label">Address *</label><input className="form-input" name="address" value={form.address} onChange={handleChange} required /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group"><label className="form-label">City *</label><input className="form-input" name="city" value={form.city} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">State *</label><input className="form-input" name="state" value={form.state} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Zip *</label><input className="form-input" name="zip" value={form.zip} onChange={handleChange} required /></div>
              </div>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '2rem 0 1.5rem' }}>Shipping Method</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <label className={`glass ${shippingMethod === 'standard' ? 'selected' : ''}`} style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', cursor: 'pointer', borderRadius: 'var(--radius-md)',
                  border: shippingMethod === 'standard' ? '2px solid var(--primary)' : '1px solid var(--glass-border)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Truck size={20} />
                    <div>
                      <div style={{ fontWeight: 600 }}>Standard Shipping</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3-5 Business Days</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 700 }}>
                      {form.country === 'United States' ? (cartTotal >= 500 ? 'FREE' : '$15.00') : '$25.00'}
                    </span>
                    <input type="radio" name="shippingMethod" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} />
                  </div>
                </label>

                <label className={`glass ${shippingMethod === 'express' ? 'selected' : ''}`} style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', cursor: 'pointer', borderRadius: 'var(--radius-md)',
                  border: shippingMethod === 'express' ? '2px solid var(--primary)' : '1px solid var(--glass-border)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Truck size={20} style={{ color: 'var(--accent)' }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>Express Shipping</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1-2 Business Days</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 700 }}>
                      {form.country === 'United States' ? '$25.00' : '$50.00'}
                    </span>
                    <input type="radio" name="shippingMethod" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} />
                  </div>
                </label>
              </div>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '2rem 0 1.5rem' }}>Payment Method</h2>
              <PaymentMethods selectedMethod={paymentMethod} onSelect={setPaymentMethod} />

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '2rem' }}>
                Place Order — ${finalTotal.toFixed(2)}
              </button>
            </form>

            {/* Summary */}
            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '90px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Your Order</h3>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.name} × {item.qty}</span>
                  <span>${((item.salePrice || item.price) * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '1rem', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.5rem' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--primary)' }}>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: '1.6' }}>
                Your order ID: <strong>{orderId}</strong><br />
                Orders are processed after payment confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
