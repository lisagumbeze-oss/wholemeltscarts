import { DollarSign, Smartphone, CreditCard, Building, Banknote, Bitcoin } from 'lucide-react';

const methods = [
  { name: 'Zelle', icon: <DollarSign size={20} />, detail: 'Send to: payments@wholemeltextracts.com', note: 'Include your Order ID in the memo.' },
  { name: 'CashApp', icon: <Smartphone size={20} />, detail: 'Send to: $WholeMeltExtracts', note: 'Include your Order ID in the note.' },
  { name: 'Venmo', icon: <CreditCard size={20} />, detail: 'Send to: @WholeMeltExtracts', note: 'Set payment to "private". Include Order ID.' },
  { name: 'Apple Cash', icon: <Banknote size={20} />, detail: 'Send to: payments@wholemeltextracts.com', note: 'Use iMessage to send Apple Cash with your Order ID.' },
  { name: 'Chime', icon: <Building size={20} />, detail: 'Send to: payments@wholemeltextracts.com', note: 'Use Chime Pay Anyone feature. Include Order ID.' },
  { name: 'Plisio (Crypto)', icon: <Bitcoin size={20} />, detail: 'Pay with BTC, ETH, LTC, USDT, etc.', note: 'Secure crypto payment gateway. No ID required.' },
];

export default function PaymentMethods({ selectedMethod, onSelect }) {
  return (
    <div>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
        Choose your preferred payment method below. After placing your order, send the payment using the details provided.
      </p>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {methods.map(m => (
          <div 
            key={m.name} 
            className={`payment-block ${selectedMethod === m.name ? 'selected' : ''}`}
            onClick={() => onSelect(m.name)}
            style={{ 
              cursor: 'pointer', 
              border: selectedMethod === m.name ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="payment-block__header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="payment-block__icon">{m.icon}</span>
                {m.name}
              </div>
              <input 
                type="radio" 
                name="paymentMethod" 
                checked={selectedMethod === m.name} 
                onChange={() => onSelect(m.name)}
                style={{ cursor: 'pointer' }}
              />
            </div>
            {selectedMethod === m.name && (
              <div style={{ marginTop: '1rem' }}>
                <p className="payment-block__detail"><strong>{m.detail}</strong></p>
                <p className="payment-block__detail" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{m.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
