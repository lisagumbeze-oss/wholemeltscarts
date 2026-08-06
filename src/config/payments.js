export const BITCOIN_ADDRESS = '1CED26bTSz4JVWzrQCe3vCoxYfAwj95bFN';
export const BITCOIN_PAYMENT_NAME = 'Bitcoin (BTC)';
export const FULL_PAYMENT_THRESHOLD = 100;

export const isBitcoinPayment = (paymentMethod = '') => {
  const name = paymentMethod.toLowerCase();
  return name.includes('bitcoin') || name.includes('btc');
};

export const getBitcoinPaymentDetail = () =>
  `Send BTC to: ${BITCOIN_ADDRESS}`;

export const getAvailablePaymentOptions = (paymentOptions = [], orderTotal = 0) => {
  if (orderTotal >= FULL_PAYMENT_THRESHOLD) {
    return paymentOptions;
  }

  return paymentOptions.filter(option => isBitcoinPayment(option.config?.name));
};

export const requiresBitcoinOnly = (orderTotal = 0) => orderTotal < FULL_PAYMENT_THRESHOLD;
