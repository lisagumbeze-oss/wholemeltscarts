import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import PaymentMethods from '../components/PaymentMethods';
import { CheckCircle, Truck, Bitcoin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Italy", "Spain", "Netherlands", "Norway", "Sweden", "Other"
];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId] = useState(() => 'WM-' + Math.random().toString(36).substring(2, 8).toUpperCase());

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'United States', notes: ''
  });

  const [shippingOptions, setShippingOptions] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [shippingMethod, setShippingMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const [promoCode, setPromoCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('settings').select('*').in('type', ['shipping', 'payment', 'coupon']).eq('status', 'active');
      if (data) {
        setShippingOptions(data.filter(d => d.type === 'shipping'));
        const payments = data.filter(d => d.type === 'payment');
        setPaymentOptions(payments);
        setCoupons(data.filter(d => d.type === 'coupon'));
        if (payments.length > 0) setPaymentMethod(payments[0].config.name);
      }
    }
    fetchSettings();
  }, []);

  useEffect(() => {
    if (cart.length > 0 && cartTotal < 100) {
      alert("Minimum order amount is $100. Redirecting to cart...");
      navigate('/cart');
    }
  }, [cartTotal, cart.length, navigate]);

  useEffect(() => {
    // Auto-select first available shipping method based on region
    const available = shippingOptions.filter(opt => (form.country === 'United States' ? opt.config.region === 'usa' : opt.config.region === 'intl'));
    if (available.length > 0 && !available.find(o => o.id === shippingMethod)) {
      setShippingMethod(available[0].id);
    } else if (available.length === 0) {
      setShippingMethod('');
    }
  }, [form.country, shippingOptions]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const selectedShippingOpt = shippingOptions.find(o => o.id === shippingMethod);
  const shippingCost = selectedShippingOpt ? Number(selectedShippingOpt.config.rate) : 0;
  
  // Coupon Math
  let discountAmount = 0;
  let calculatedShipping = shippingCost;
  
  if (appliedCoupon) {
    const discountStr = appliedCoupon.config.discount.toLowerCase();
    if (discountStr.includes('%')) {
      const pct = parseFloat(discountStr.replace(/[^0-9.]/g, ''));
      if (!isNaN(pct)) discountAmount = cartTotal * (pct / 100);
    } else if (discountStr.includes('free ship')) {
      calculatedShipping = 0;
    } else {
      const val = parseFloat(discountStr.replace(/[^0-9.]/g, ''));
      if (!isNaN(val)) discountAmount = val;
    }
  }

  const finalTotal = Math.max(0, cartTotal - discountAmount + calculatedShipping);

  const handleApplyCoupon = () => {
    setCouponError('');
    if (!promoCode.trim()) return;
    const validCoupon = coupons.find(c => c.config.code.toLowerCase() === promoCode.toLowerCase());
    if (validCoupon) {
      setAppliedCoupon(validCoupon);
      setPromoCode('');
    } else {
      setCouponError('Invalid or expired promo code.');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          cart: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.qty
          })),
          cartTotal,
          form,
          paymentMethod,
          finalTotal
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        clearCart();
      } else {
        throw new Error(result.error || 'Failed to process order.');
      }
    } catch (err) {
      console.error('Checkout Error:', err);
      setError(err.message);
      alert(`Checkout Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
              <br/><br/>
              <strong style={{ color: 'var(--primary)' }}>Important:</strong> To complete your order and guarantee dispatch, you must send a screenshot of your successful payment to <strong>sales@wholemeltscarts.us</strong>.
            </p>
            <div style={{ maxWidth: '500px', width: '100%', textAlign: 'left' }}>
              <PaymentMethods selectedMethod={paymentMethod} onSelect={() => {}} options={paymentOptions} readonly={true} />
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
                {shippingOptions
                  .filter(opt => (form.country === 'United States' ? opt.config.region === 'usa' : opt.config.region === 'intl'))
                  .map(opt => (
                    <label key={opt.id} className={`glass ${shippingMethod === opt.id ? 'selected' : ''}`} style={{ 
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', cursor: 'pointer', borderRadius: 'var(--radius-md)',
                      border: shippingMethod === opt.id ? '2px solid var(--primary)' : '1px solid var(--glass-border)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Truck size={20} style={{ color: shippingMethod === opt.id ? 'var(--primary)' : 'inherit' }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{opt.config.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{opt.config.condition}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontWeight: 700 }}>
                          {Number(opt.config.rate) === 0 ? 'FREE' : `$${Number(opt.config.rate).toFixed(2)}`}
                        </span>
                        <input type="radio" name="shippingMethod" checked={shippingMethod === opt.id} onChange={() => setShippingMethod(opt.id)} />
                      </div>
                    </label>
                  ))
                }
                {shippingOptions.filter(opt => (form.country === 'United States' ? opt.config.region === 'usa' : opt.config.region === 'intl')).length === 0 && (
                  <div style={{ padding: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)' }}>
                    No shipping methods available for the selected region.
                  </div>
                )}
              </div>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '2rem 0 1.5rem' }}>Payment Method</h2>
              <PaymentMethods selectedMethod={paymentMethod} onSelect={setPaymentMethod} options={paymentOptions} />

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '2rem' }} disabled={loading}>
                {loading ? 'Processing...' : `Place Order — $${finalTotal.toFixed(2)}`}
              </button>
            </form>

            {/* Summary */}
            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '90px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Your Order</h3>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.name} × {item.qty}</span>
                  <span>${(parseFloat(item.price) * item.qty).toFixed(2)}</span>
                </div>
              ))}

              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="Promo Code" 
                    value={promoCode} 
                    onChange={e => setPromoCode(e.target.value)}
                    className="form-input"
                    style={{ flex: 1, padding: '0.6rem', background: 'rgba(0,0,0,0.2)' }}
                  />
                  <button type="button" className="btn btn-outline" onClick={handleApplyCoupon}>Apply</button>
                </div>
                {couponError && <p style={{ color: '#ff4d4f', fontSize: '0.8rem', marginTop: '0.5rem' }}>{couponError}</p>}
                {appliedCoupon && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(76, 175, 80, 0.1)', border: '1px solid rgba(76, 175, 80, 0.3)', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4caf50', fontSize: '0.85rem' }}>
                      <strong>{appliedCoupon.config.code}</strong> 
                      <span>- {appliedCoupon.config.discount}</span>
                    </div>
                    <button type="button" style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }} onClick={removeCoupon}>Remove</button>
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '1rem', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4caf50' }}>
                    <span>Discount Deduction</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span>Shipping</span>
                  {appliedCoupon && appliedCoupon.config.discount.toLowerCase().includes('free ship') ? (
                    <span style={{ color: '#4caf50' }}>Free</span>
                  ) : (
                    <span>{calculatedShipping === 0 ? 'Free' : `$${calculatedShipping.toFixed(2)}`}</span>
                  )}
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
