import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Use Vercel env vars)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    // A simple query to wake up the database
    // This queries just 1 row from the orders table
    const { data, error } = await supabase
      .from('orders')
      .select('id')
      .limit(1);

    if (error) {
      console.error("Ping Error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    console.log("Database ping successful.");
    return res.status(200).json({ success: true, message: "Database pinged successfully to prevent 7-day pause." });
  } catch (err) {
    console.error("Ping Exception:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
