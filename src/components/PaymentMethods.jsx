import { DollarSign, Smartphone, CreditCard, Building, Banknote, Bitcoin, Wallet } from 'lucide-react';

const getIconForPayment = (name) => {
  const n = name.toLowerCase();
  if (n.includes('zelle')) return <DollarSign size={20} />;
  if (n.includes('cash')) return <Smartphone size={20} />;
  if (n.includes('venmo')) return <CreditCard size={20} />;
  if (n.includes('crypto') || n.includes('plisio') || n.includes('btc')) return <Bitcoin size={20} />;
  if (n.includes('chime')) return <Building size={20} />;
  return <Wallet size={20} />;
};

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
                <p className="payment-block__detail" style={{ fontSize: '0.95rem' }}><strong>{m.config.detail}</strong></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
