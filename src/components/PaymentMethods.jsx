import { DollarSign, Smartphone, CreditCard, Building, Wallet, Bitcoin, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { isBitcoinPayment, BITCOIN_ADDRESS } from '../config/payments';

const getIconForPayment = (name) => {
  const n = name.toLowerCase();
  if (isBitcoinPayment(name)) return <Bitcoin size={20} />;
  if (n.includes('zelle')) return <DollarSign size={20} />;
  if (n.includes('cash')) return <Smartphone size={20} />;
  if (n.includes('venmo')) return <CreditCard size={20} />;
  if (n.includes('chime')) return <Building size={20} />;
  return <Wallet size={20} />;
};

function BitcoinAddressBlock({ readonly }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BITCOIN_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div style={{
      marginTop: '0.75rem',
      padding: '1rem',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(212, 175, 55, 0.06)',
      border: '1px solid rgba(212, 175, 55, 0.25)'
    }}>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
        Bitcoin Address
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <code style={{
          flex: 1,
          fontSize: '0.85rem',
          wordBreak: 'break-all',
          color: 'var(--primary)',
          fontFamily: 'monospace'
        }}>
          {BITCOIN_ADDRESS}
        </code>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={handleCopy}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p style={{ margin: '0.75rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        Send the exact order total in BTC to this address. Include your Order ID in the transaction memo when possible.
      </p>
    </div>
  );
}

export default function PaymentMethods({ selectedMethod, onSelect, options = [], readonly = false }) {
  // If readonly, only show the selected method
  const displayOptions = readonly 
    ? options.filter(o => o.config.name === selectedMethod)
    : options;

  if (displayOptions.length === 0) {
    if (readonly) return <p className="payment-block__detail">No details provided.</p>;
    return <div style={{ padding: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)' }}>No payment methods available.</div>;
  }

  return (
    <div>
      {!readonly && (
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
          Choose your preferred payment method below. After placing your order, send the payment using the details provided.
        </p>
      )}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {displayOptions.map(m => (
          <div 
            key={m.id} 
            className={`payment-block ${selectedMethod === m.config.name ? 'selected' : ''}`}
            onClick={() => onSelect(m.config.name)}
            style={{ 
              cursor: readonly ? 'default' : 'pointer', 
              border: selectedMethod === m.config.name ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="payment-block__header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="payment-block__icon" style={{ color: selectedMethod === m.config.name ? 'var(--primary)' : 'inherit' }}>
                  {getIconForPayment(m.config.name)}
                </span>
                {m.config.name}
              </div>
              {!readonly && (
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  checked={selectedMethod === m.config.name} 
                  onChange={() => onSelect(m.config.name)}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
            {(selectedMethod === m.config.name || readonly) && (
              <div style={{ marginTop: '1rem' }}>
                {!isBitcoinPayment(m.config.name) && m.config.detail && (
                  <p className="payment-block__detail" style={{ fontSize: '0.95rem' }}><strong>{m.config.detail}</strong></p>
                )}
                {isBitcoinPayment(m.config.name) && (
                  <BitcoinAddressBlock readonly={readonly} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
