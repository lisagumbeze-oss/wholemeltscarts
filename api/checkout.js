import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { getOrderConfirmationTemplate, getAdminOrderAlertTemplate } from './utils/emailTemplates.js';

// Initialize Supabase (Use Vercel env vars)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Email Transporter (SMTP) - Using the provided credentials
const transporter = nodemailer.createTransport({
  host: 'server551.iseencloud.net',
  port: 465,
  secure: true, 
  auth: {
    user: 'sales@wholemeltscarts.us',
    pass: 'o28!iZY}POdRJ*iK'
  }
});

// Vercel Serverless Function signature
export default async function handler(req, res) {
  // Allow CORS
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
    const { error } = await supabase
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

    // 2. Prepare Emails with Premium Templates
    const customerEmailHtml = getOrderConfirmationTemplate(orderId, form.firstName, cart, finalTotal, form, paymentMethod);
    const adminEmailHtml = getAdminOrderAlertTemplate(orderId, `${form.firstName} ${form.lastName}`, form.email, cart, finalTotal, paymentMethod, form);

    // 3. Send Emails
    // Send to Customer
    await transporter.sendMail({
      from: '"Whole Melt Extracts" <sales@wholemeltscarts.us>',
      to: form.email,
      subject: `Order Confirmation - ${orderId}`,
      html: customerEmailHtml
    });

    // Send to Admin
    await transporter.sendMail({
      from: '"Whole Melt Extracts" <sales@wholemeltscarts.us>',
      to: 'sales@wholemeltscarts.us',
      subject: `New Order Alert - ${orderId}`,
      html: adminEmailHtml
    });

    return res.status(200).json({ success: true, message: 'Order processed and premium emails sent.' });

  } catch (err) {
    console.error('Checkout Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
