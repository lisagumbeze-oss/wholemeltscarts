import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY 
  // Wait, signUp can be called by ANON_KEY if email confirmations are disabled!
  // If not, we might need a Service Role Key. Assuming it works.
);

async function createAdmin() {
  console.log('Attempting to create admin account...');
  const { data, error } = await supabaseAdmin.auth.signUp({
    email: 'sales@wholemeltscarts.us',
    password: 'wholemelts2026',
  });

  if (error) {
    console.error('Error creating admin:', error.message);
  } else {
    console.log('Admin account created successfully!', data);
  }
}

createAdmin();
