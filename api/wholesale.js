import nodemailer from 'nodemailer';
import { getWholesaleInquiryTemplate, getWholesaleConfirmationTemplate } from './utils/emailTemplates.js';

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

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, email, business_name, location, estimated_volume, message } = req.body;

  if (!name || !email || !business_name || !location || !estimated_volume || !message) {
    return res.status(400).json({ success: false, error: 'Required fields missing.' });
  }

  try {
    // 1. Send Alert to Admin
    await transporter.sendMail({
      from: '"Whole Melt Master Hub" <sales@wholemeltscarts.us>',
      to: 'sales@wholemeltscarts.us',
      replyTo: email,
      subject: `[WHOLESALE INQUIRY] ${business_name} - ${location}`,
      html: getWholesaleInquiryTemplate(name, email, business_name, location, estimated_volume, message)
    });

    // 2. Send Confirmation to Customer
    await transporter.sendMail({
      from: '"Whole Melt Master Hub" <sales@wholemeltscarts.us>',
      to: email,
      subject: 'Application Received: Whole Melt Extracts Distribution',
      html: getWholesaleConfirmationTemplate(name)
    });

    return res.status(200).json({ success: true, message: 'Wholesale inquiry sent successfully.' });

  } catch (err) {
    console.error('Wholesale Form Error:', err);
    return res.status(500).json({ success: false, error: 'Failed to dispatch inquiry. Please reach out via Telegram.' });
  }
}
