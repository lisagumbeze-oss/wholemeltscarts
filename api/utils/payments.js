export const BITCOIN_ADDRESS = '1CED26bTSz4JVWzrQCe3vCoxYfAwj95bFN';

export const FULL_PAYMENT_THRESHOLD = 100;

export const isBitcoinPayment = (paymentMethod = '') => {
  const name = paymentMethod.toLowerCase();
  return name.includes('bitcoin') || name.includes('btc');
};

export const requiresBitcoinOnly = (orderTotal = 0) => orderTotal < FULL_PAYMENT_THRESHOLD;

export const getBitcoinPaymentInstructions = (orderId, total) => `
  <div class="highlight-box">
    <strong style="color: #D4AF37; text-transform: uppercase; display: block; margin-bottom: 8px;">Bitcoin Payment Instructions</strong>
    <p style="margin: 0 0 12px; color: #fff; line-height: 1.8;">
      Send <strong>$${parseFloat(total).toFixed(2)} USD equivalent</strong> in BTC to the address below.
      Include your Manifest ID <strong>${orderId}</strong> in the transaction memo when possible.
    </p>
    <div style="background: rgba(0,0,0,0.25); padding: 16px; border-radius: 8px; font-family: monospace; word-break: break-all; color: #D4AF37; font-size: 14px;">
      BTC: ${BITCOIN_ADDRESS}
    </div>
    <p style="margin: 12px 0 0; color: #8A8D9A; font-size: 13px; line-height: 1.6;">
      After sending payment, return to your order confirmation page and click <strong>I Have Paid</strong> so our team can verify your transaction.
    </p>
  </div>
`;
