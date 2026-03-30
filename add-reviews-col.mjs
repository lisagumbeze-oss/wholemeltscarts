import 'dotenv/config';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Use the Supabase SQL query endpoint (v1/query)
const projectRef = SUPABASE_URL.replace('https://', '').split('.')[0];

async function runSQL(sql) {
  // Try the pg_net / sql endpoint
  const resp = await fetch(`${SUPABASE_URL}/pg`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql })
  });
  
  if (resp.ok) {
    console.log('✓ SQL executed via /pg endpoint');
    return true;
  }
  
  // Try alternate endpoint
  const resp2 = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({})
  });
  
  console.log('REST status:', resp2.status);
  return false;
}

// Alternative: Create an RPC function first, then use it
async function createExecFunction() {
  // This won't work without admin SQL access... 
  // Let's try the simplest approach: just update with the column and see if Supabase auto-creates
  
  const { createClient } = await import('@supabase/supabase-js');
  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    db: { schema: 'public' },
    auth: { autoRefreshToken: false, persistSession: false }
  });

  // Attempt: use raw postgres via supabase-js realtime or storage trick
  // Actually, let's try using the database API directly
  
  // First, check if we can reach the management API
  const mgmtResp = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: `ALTER TABLE products ADD COLUMN IF NOT EXISTS reviews jsonb DEFAULT '[]'::jsonb` })
  });
  
  console.log('Management API status:', mgmtResp.status);
  const mgmtText = await mgmtResp.text();
  console.log('Response:', mgmtText.slice(0, 200));
}

createExecFunction().catch(console.error);
