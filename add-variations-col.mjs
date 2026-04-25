import 'dotenv/config';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const projectRef = SUPABASE_URL.replace('https://', '').split('.')[0];

async function addVariationsColumn() {
  const mgmtResp = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SUPABASE_ACCESS_TOKEN || SERVICE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: `ALTER TABLE products ADD COLUMN IF NOT EXISTS variations jsonb DEFAULT '[]'::jsonb;` })
  });
  
  console.log('Management API status:', mgmtResp.status);
  const mgmtText = await mgmtResp.text();
  console.log('Response:', mgmtText.slice(0, 200));

  // Also query the Database via REST if management API failed
  if (!mgmtResp.ok) {
     console.log('Ensure you have SUPABASE_ACCESS_TOKEN if SERVICE_KEY is not sufficient for management API.');
  }
}

addVariationsColumn().catch(console.error);
