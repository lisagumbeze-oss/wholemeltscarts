import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Use Vercel env vars, same as generic ones)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Email Transporter (SMTP)
const transporter = nodemailer.createTransport({
  host: 'server596.iseencloud.net',
  port: 465,
  secure: true, 
  auth: {
    user: 'sales@wholemeltscarts.us',
    pass: 'O3H?iU)%pY^WqAP}'
  }
});

// Vercel Serverless Function signature
export default async function handler(req, res) {
  // Allow CORS for basic testing if needed, though Vercel handles this if it's identical origin path
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { orderId, cart, cartTotal, form, paymentMethod, finalTotal } = req.body;

  try {
    // 1. Save order to Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        customer_name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        total: finalTotal,
        payment_method: paymentMethod,
        account_detail: form.email, 
        items: cart,
        shipping_details: form,
        status: 'pending'
      });

    if (error) {
       console.error("Supabase Insertion Error:", error);
       throw error;
    }

    // 2. Prepare Email Content
    const itemsHtml = cart.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} x ${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #D4AF37; text-align: center;">Whole Melt Extracts</h2>
        <p>Hi ${form.firstName},</p>
        <p>Thank you for your order! Your Order ID is <strong>${orderId}</strong>.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #f9f9f9;">
              <th style="padding: 10px; text-align: left;">Item</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Total</td>
              <td style="padding: 10px; font-weight: bold; text-align: right;">$${finalTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <h4 style="margin-top: 0;">Shipping to:</h4>
          <p style="margin-bottom: 0;">
            ${form.firstName} ${form.lastName}<br>
            ${form.address}, ${form.city}, ${form.state} ${form.zip}<br>
            ${form.country}
          </p>
        </div>

        <p style="margin-top: 20px; font-size: 0.9rem; color: #666;">
          <strong>Important Instructions:</strong> If you chose a manual payment method (Zelle, CashApp, etc.), please ensure you send the screenshot of your payment to sales@wholemeltscarts.us with your Order ID.
        </p>
      </div>
    `;

    const adminEmailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #D4AF37;">New Order Received!</h2>
        <p>Order ID: <strong>${orderId}</strong></p>
        <p>Customer: ${form.firstName} ${form.lastName} (${form.email})</p>
        <p>Total: $${finalTotal.toFixed(2)}</p>
        <p>Payment: ${paymentMethod}</p>
        
        <h4>Items Ordered:</h4>
        <ul>
          ${cart.map(item => `<li>${item.name} x ${item.quantity} ($${(item.price * item.quantity).toFixed(2)})</li>`).join('')}
        </ul>

        <h4>Shipping Details:</h4>
        <p>
          ${form.address}, ${form.city}, ${form.state} ${form.zip}, ${form.country}
        </p>
      </div>
    `;

    // 3. Send Emails
    // Send to Customer
    await transporter.sendMail({
      from: '"Whole Melt Extracts" <sales@wholemeltscarts.us>',
      to: form.email,
      subject: `Order Confirmation - ${orderId}`,
      html: emailHtml
    });

    // Send to Admin
    await transporter.sendMail({
      from: '"Whole Melt Extracts" <sales@wholemeltscarts.us>',
      to: 'sales@wholemeltscarts.us',
      subject: `New Order Alert - ${orderId}`,
      html: adminEmailHtml
    });

    return res.status(200).json({ success: true, message: 'Order processed and emails sent.' });

  } catch (err) {
    console.error('Checkout Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
