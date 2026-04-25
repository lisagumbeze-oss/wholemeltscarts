import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addPlisio() {
  console.log('Adding Plisio (Crypto) to payment options...');
  
  const newSetting = {
    type: 'payment',
    status: 'active',
    config: {
      name: 'Plisio (Crypto)',
      detail: 'Pay with BTC, ETH, LTC, USDT, etc via Plisio Secure Gateway'
    }
  };

  const { data, error } = await supabaseAdmin.from('settings').insert(newSetting);

  if (error) {
    console.error('Error adding Plisio:', error.message);
  } else {
    console.log('Plisio payment option added successfully!');
  }
}

addPlisio();
