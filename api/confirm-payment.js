import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { getPaymentClaimedAdminTemplate } from './utils/emailTemplates.js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const transporter = nodemailer.createTransport({
  host: 'server551.iseencloud.net',
  port: 465,
  secure: true,
  auth: {
    user: 'sales@wholemeltscarts.us',
    pass: 'o28!iZY}POdRJ*iK'
  }
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { orderId, email } = req.body;

  if (!orderId || !email) {
    return res.status(400).json({ success: false, error: 'Order ID and email are required.' });
  }

  try {
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('email', email)
      .single();

    if (fetchError || !order) {
      return res.status(404).json({ success: false, error: 'Order not found.' });
    }

    if (order.shipping_details?.paymentClaimedAt) {
      return res.status(200).json({ success: true, message: 'Payment already reported.' });
    }

    const paymentClaimedAt = new Date().toISOString();
    const updatedShippingDetails = {
      ...order.shipping_details,
      paymentClaimedAt
    };

    const { error: updateError } = await supabase
      .from('orders')
      .update({ shipping_details: updatedShippingDetails })
      .eq('id', orderId);

    if (updateError) throw updateError;

    const adminEmailHtml = getPaymentClaimedAdminTemplate(
      orderId,
      order.customer_name,
      order.email,
      order.total,
      order.payment_method,
      paymentClaimedAt
    );

    await transporter.sendMail({
      from: '"Whole Melt Extracts" <sales@wholemeltscarts.us>',
      to: 'sales@wholemeltscarts.us',
      subject: `Payment Reported - ${orderId}`,
      html: adminEmailHtml
    });

    return res.status(200).json({
      success: true,
      message: 'Payment reported. Our team will verify your transaction shortly.'
    });
  } catch (err) {
    console.error('Confirm Payment Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
