import nodemailer from 'nodemailer';
import { getContactFormTemplate, getContactConfirmationTemplate } from './utils/emailTemplates.js';

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

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Required fields missing.' });
  }

  try {
    // 1. Send Alert to Admin
    await transporter.sendMail({
      from: '"Whole Melt Extracts Support" <sales@wholemeltscarts.us>',
      to: 'sales@wholemeltscarts.us',
      replyTo: email,
      subject: `New Customer Inquiry: ${subject || 'No Subject'}`,
      html: getContactFormTemplate(name, email, subject, message)
    });

    // 2. Send Confirmation to Customer
    await transporter.sendMail({
      from: '"Whole Melt Extracts Support" <sales@wholemeltscarts.us>',
      to: email,
      subject: 'We have received your message!',
      html: getContactConfirmationTemplate(name)
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully.' });

  } catch (err) {
    console.error('Contact Form Error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send message. Please try again later.' });
  }
}
