import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { 
  getOrderConfirmationTemplate, 
  getAdminOrderAlertTemplate,
  getWholesaleInquiryTemplate,
  getWholesaleConfirmationTemplate,
  getContactFormTemplate,
  getContactConfirmationTemplate
} from './api/utils/emailTemplates.js';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static('dist'));
// Fallback to 'public' for dev or if dist isn't built
app.use(express.static('public'));

// ═══ Wholesale Submission ═══
app.post('/api/wholesale', async (req, res) => {
  try {
    const { name, email, business_name, location, estimated_volume, message } = req.body;
    
    await transporter.sendMail({
      from: '"Whole Melt Master Hub" <sales@wholemeltscarts.us>',
      to: 'sales@wholemeltscarts.us',
      replyTo: email,
      subject: `[WHOLESALE INQUIRY] ${business_name} - ${location}`,
      html: getWholesaleInquiryTemplate(name, email, business_name, location, estimated_volume, message)
    });

    await transporter.sendMail({
      from: '"Whole Melt Master Hub" <sales@wholemeltscarts.us>',
      to: email,
      subject: 'Application Received: Whole Melt Extracts Distribution',
      html: getWholesaleConfirmationTemplate(name)
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Local Wholesale Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ═══ Contact Submission ═══
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    await transporter.sendMail({
      from: '"Whole Melt Extracts Support" <sales@wholemeltscarts.us>',
      to: 'sales@wholemeltscarts.us',
      replyTo: email,
      subject: `New Customer Inquiry: ${subject || 'No Subject'}`,
      html: getContactFormTemplate(name, email, subject, message)
    });

    await transporter.sendMail({
      from: '"Whole Melt Extracts Support" <sales@wholemeltscarts.us>',
      to: email,
      subject: 'We have received your message!',
      html: getContactConfirmationTemplate(name)
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Local Contact Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

// Initialize Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Email Transporter (SMTP)
const transporter = nodemailer.createTransport({
  host: 'server551.iseencloud.net',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'sales@wholemeltscarts.us',
    pass: 'o28!iZY}POdRJ*iK'
  }
});

app.post('/api/checkout', async (req, res) => {
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
        account_detail: form.email, // Or any other relevant info
        items: cart,
        shipping_details: form,
        status: 'pending'
      });

    if (error) throw error;

    // 2. Prepare Emails with Premium Templates
    const customerEmailHtml = getOrderConfirmationTemplate(orderId, form.firstName, cart, finalTotal, form, paymentMethod);
    const adminEmailHtml = getAdminOrderAlertTemplate(orderId, `${form.firstName} ${form.lastName}`, form.email, cart, finalTotal, paymentMethod, form);
    
    // ... email sending logic remains the same ...
    // (already updated in previous turn)


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

    res.status(200).json({ success: true, message: 'Order processed and emails sent.' });

  } catch (err) {
    console.error('Checkout Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
