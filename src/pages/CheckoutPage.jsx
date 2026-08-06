import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import PaymentMethods from '../components/PaymentMethods';
import { CheckCircle, Truck, ShieldCheck, Bitcoin, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { isBitcoinPayment, BITCOIN_ADDRESS, getAvailablePaymentOptions, requiresBitcoinOnly, FULL_PAYMENT_THRESHOLD } from '../config/payments';

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Italy", "Spain", "Netherlands", "Norway", "Sweden", "Other"
];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderId] = useState(() => 'WM-' + Math.random().toString(36).substring(2, 8).toUpperCase());

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'United States', notes: ''
  });

  const [orderDetails, setOrderDetails] = useState(null);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [shippingMethod, setShippingMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const [promoCode, setPromoCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [paymentClaimed, setPaymentClaimed] = useState(false);
  const [claimingPayment, setClaimingPayment] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('settings').select('*').in('type', ['shipping', 'payment', 'coupon']).eq('status', 'active');
      if (data) {
        setShippingOptions(data.filter(d => d.type === 'shipping'));
        const payments = data.filter(d => d.type === 'payment');
        setPaymentOptions(payments);
        setCoupons(data.filter(d => d.type === 'coupon'));
      }
    }
    fetchSettings();
  }, []);

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
  const availablePaymentOptions = getAvailablePaymentOptions(paymentOptions, finalTotal);
  const cryptoOnlyCheckout = requiresBitcoinOnly(finalTotal);

  useEffect(() => {
    if (availablePaymentOptions.length === 0) return;

    const selectedStillAvailable = availablePaymentOptions.some(
      option => option.config.name === paymentMethod
    );

    if (!selectedStillAvailable) {
      setPaymentMethod(availablePaymentOptions[0].config.name);
    }
  }, [availablePaymentOptions, paymentMethod]);

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

  const handleCopyBitcoinAddress = async () => {
    try {
      await navigator.clipboard.writeText(BITCOIN_ADDRESS);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handlePaymentClaimed = async () => {
    if (!orderDetails) return;

    setClaimingPayment(true);
    try {
      const response = await fetch('/api/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderDetails.id,
          email: form.email
        })
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to report payment.');
      }

      setPaymentClaimed(true);
    } catch (err) {
      alert(err.message || 'Could not confirm payment. Please email sales@wholemeltscarts.us with your order ID.');
    } finally {
      setClaimingPayment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (cryptoOnlyCheckout && !isBitcoinPayment(paymentMethod)) {
      alert(`Orders under $${FULL_PAYMENT_THRESHOLD} must be paid with Bitcoin.`);
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
        // Log for verification
        console.log("Order successful. ID:", orderId, "Total:", finalTotal);

        setOrderDetails({
          id: orderId,
          total: finalTotal,
          paymentMethod,
          email: form.email
        });
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

  if (submitted && orderDetails) {
    const bitcoinOrder = isBitcoinPayment(orderDetails.paymentMethod);

    return (
      <div className="container section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CheckCircle size={60} style={{ color: 'var(--accent)', marginBottom: '1.5rem' }} />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.75rem' }}>Order Placed!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Your Order ID: <strong style={{ color: 'var(--primary)' }}>{orderDetails.id}</strong></p>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '1.5rem', lineHeight: '1.7' }}>
          Payment Method: <strong>{orderDetails.paymentMethod}</strong>
        </p>

        {bitcoinOrder ? (
          <div className="glass shadow-lg" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', maxWidth: '540px', width: '100%', textAlign: 'center', background: 'var(--bg-elevated)', border: '1px solid var(--primary)' }}>
            <Bitcoin size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.75rem' }}>Complete Your Bitcoin Payment</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.7 }}>
              Send <strong>${orderDetails.total.toFixed(2)} USD equivalent</strong> in BTC to the address below. Include your Order ID <strong>{orderDetails.id}</strong> in the memo when possible.
            </p>

            <div style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(212, 175, 55, 0.06)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                BTC Address
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <code style={{ flex: 1, fontSize: '0.85rem', wordBreak: 'break-all', color: 'var(--primary)', fontFamily: 'monospace' }}>
                  {BITCOIN_ADDRESS}
                </code>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handleCopyBitcoinAddress}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}
                >
                  {copiedAddress ? <Check size={14} /> : <Copy size={14} />}
                  {copiedAddress ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {paymentClaimed ? (
              <div className="status-badge paid" style={{ padding: '1rem', width: '100%' }}>
                Payment reported. Our team will verify your transaction shortly.
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                onClick={handlePaymentClaimed}
                disabled={claimingPayment}
              >
                {claimingPayment ? 'Submitting…' : 'I Have Paid'}
              </button>
            )}

            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              After sending BTC, click the button above so we can prioritize verifying your payment.
            </p>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '2rem', lineHeight: '1.7' }}>
              Please send <strong>${orderDetails.total.toFixed(2)}</strong> using the details below. Include your Order ID in the payment memo.
              <br/><br/>
              <strong style={{ color: 'var(--primary)' }}>Important:</strong> To complete your order and guarantee dispatch, you must send a screenshot of your successful payment to <strong>sales@wholemeltscarts.us</strong>.
            </p>
            <div style={{ maxWidth: '500px', width: '100%', textAlign: 'left' }}>
              <PaymentMethods selectedMethod={orderDetails.paymentMethod} onSelect={() => {}} options={paymentOptions} readonly={true} />
            </div>
          </>
        )}

        <Link to="/" className="btn btn-outline" style={{ marginTop: '2rem' }}>Return Home</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container empty-state">
        <h1>Nothing to checkout</h1>
        <Link to="/shop" className="btn btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-header page-header--left" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <h1 className="page-header__title">Checkout</h1>
          <p className="page-header__desc">Secure payment and discreet fulfillment.</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="funnel-layout">
            <form onSubmit={handleSubmit}>
              <div className="checkout-section">
                <h2 className="checkout-section__title">Shipping details</h2>
                <div className="checkout-grid-2">
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
                <div className="checkout-grid-2" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <div className="form-group"><label className="form-label">City *</label><input className="form-input" name="city" value={form.city} onChange={handleChange} required /></div>
                  <div className="form-group"><label className="form-label">State *</label><input className="form-input" name="state" value={form.state} onChange={handleChange} required /></div>
                  <div className="form-group"><label className="form-label">Zip *</label><input className="form-input" name="zip" value={form.zip} onChange={handleChange} required /></div>
                </div>
              </div>

              <div className="checkout-section">
                <h2 className="checkout-section__title">Shipping method</h2>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {shippingOptions
                    .filter(opt => (form.country === 'United States' ? opt.config.region === 'usa' : opt.config.region === 'intl'))
                    .map(opt => (
                      <label
                        key={opt.id}
                        className={`shipping-option${shippingMethod === opt.id ? ' is-selected' : ''}`}
                      >
                        <div className="shipping-option__main">
                          <Truck size={18} />
                          <div>
                            <div className="shipping-option__name">{opt.config.name}</div>
                            <div className="shipping-option__meta">{opt.config.condition}</div>
                          </div>
                        </div>
                        <div className="shipping-option__price">
                          {Number(opt.config.rate) === 0 ? 'Free' : `$${Number(opt.config.rate).toFixed(2)}`}
                          <input type="radio" name="shippingMethod" checked={shippingMethod === opt.id} onChange={() => setShippingMethod(opt.id)} />
                        </div>
                      </label>
                    ))}
                  {shippingOptions.filter(opt => (form.country === 'United States' ? opt.config.region === 'usa' : opt.config.region === 'intl')).length === 0 && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No shipping methods available for the selected region.</p>
                  )}
                </div>
              </div>

              <div className="checkout-section">
                <h2 className="checkout-section__title">Payment method</h2>
                {cryptoOnlyCheckout && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.7 }}>
                    Orders under ${FULL_PAYMENT_THRESHOLD} are available with Bitcoin only. Choose another payment method once your total reaches ${FULL_PAYMENT_THRESHOLD} or more.
                  </p>
                )}
                <PaymentMethods selectedMethod={paymentMethod} onSelect={setPaymentMethod} options={availablePaymentOptions} />
                <div className="checkout-assurance">
                  <ShieldCheck size={18} />
                  <span>Orders are processed after payment confirmation. Include your order ID in payment memos.</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Processing…' : `Place Order — $${finalTotal.toFixed(2)}`}
              </button>
            </form>

            <aside className="order-summary">
              <h3 className="order-summary__title">Your order</h3>
              {cart.map(item => (
                <div key={item.id} className="order-summary__row">
                  <span>{item.name} × {item.qty}</span>
                  <span>${(parseFloat(item.price) * item.qty).toFixed(2)}</span>
                </div>
              ))}

              <div style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    className="form-input"
                    style={{ flex: 1 }}
                  />
                  <button type="button" className="btn btn-outline btn-sm" onClick={handleApplyCoupon}>Apply</button>
                </div>
                {couponError && <p style={{ color: '#e07070', fontSize: '0.8rem', marginTop: '0.5rem' }}>{couponError}</p>}
                {appliedCoupon && (
                  <div className="order-summary__row order-summary__row--accent" style={{ marginTop: '0.75rem' }}>
                    <span>{appliedCoupon.config.code}</span>
                    <button type="button" className="shop-clear" onClick={removeCoupon}>Remove</button>
                  </div>
                )}
              </div>

              <div className="order-summary__row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && discountAmount > 0 && (
                <div className="order-summary__row order-summary__row--accent">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="order-summary__row">
                <span>Shipping</span>
                <span>{calculatedShipping === 0 ? 'Free' : `$${calculatedShipping.toFixed(2)}`}</span>
              </div>
              <div className="order-summary__row order-summary__row--total">
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>${finalTotal.toFixed(2)}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: 1.6 }}>
                Order ID: <strong>{orderId}</strong>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
