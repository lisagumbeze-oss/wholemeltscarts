import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // MUST use service role to bypass auth checks
);

async function resetAdmin() {
  const email = 'sales@wholemeltscarts.us';
  const newPassword = 'wholemelts2026';

  console.log(`Searching for user: ${email}...`);
  
  // 1. Find user ID by email
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  
  if (listError) {
    console.error('Error listing users:', listError.message);
    return;
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    console.log(`Admin user not found. Creating new admin user: ${email}...`);
    const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: newPassword,
      email_confirm: true
    });
    
    if (createError) {
      console.error('Error creating admin:', createError.message);
    } else {
      console.log('Admin account created successfully!', createData.user.id);
    }
  } else {
    console.log(`Found user: ${user.id}. Resetting password...`);
    const { data: updateData, error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (updateError) {
      console.error('Error resetting password:', updateError.message);
    } else {
      console.log('Admin password reset successfully!');
    }
  }
}

resetAdmin();
