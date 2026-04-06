export const getBaseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Whole Melt Extracts</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #ffffff; background-color: #0a0a0a; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%); padding: 40px 20px; text-align: center; border-bottom: 1px solid #D4AF37; }
        .logo { font-size: 28px; font-weight: 800; color: #D4AF37; text-transform: uppercase; letter-spacing: 4px; margin: 0; }
        .content { padding: 40px 30px; }
        .footer { background-color: #0a0a0a; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #1a1a1a; }
        .btn { display: inline-block; padding: 14px 30px; background-color: #D4AF37; color: #000; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px; }
        .details-box { background-color: #1a1a1a; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #333; }
        h1, h2, h3 { color: #D4AF37; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { text-align: left; border-bottom: 1px solid #333; padding: 12px 10px; color: #D4AF37; font-size: 14px; }
        td { padding: 12px 10px; border-bottom: 1px solid #1a1a1a; font-size: 14px; }
        .total-row { font-weight: bold; font-size: 18px; color: #D4AF37; }
        .label { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .value { color: #fff; font-size: 15px; margin-bottom: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">WHOLE MELT EXTRACTS</div>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Whole Melt Extracts. All rights reserved.<br>
            Official Website: <a href="https://wholemeltscarts.us" style="color: #D4AF37; text-decoration: none;">wholemeltscarts.us</a>
        </div>
    </div>
</body>
</html>
`;

export const getOrderConfirmationTemplate = (orderId, customerName, items, total, shippingDetails, paymentMethod) => {
    const itemsHtml = items.map(item => `
        <tr>
            <td>${item.name} x ${item.quantity}</td>
            <td style="text-align: right;">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    return getBaseTemplate(`
        <h1>Order Confirmed</h1>
        <p>Hi ${customerName},</p>
        <p>Your order has been successfully placed and is now being processed. Thank you for choosing Whole Melt Extracts.</p>
        
        <div class="details-box">
            <div class="label">Order ID</div>
            <div class="value" style="font-weight: bold; color: #D4AF37;">${orderId}</div>
            
            <div class="label">Payment Method</div>
            <div class="value">${paymentMethod}</div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th style="text-align: right;">Total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td style="padding-top: 20px;">Grand Total</td>
                    <td style="padding-top: 20px; text-align: right;">$${parseFloat(total).toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>

        <div class="details-box">
            <h3>Shipping Details</h3>
            <p style="margin: 0;">
                ${shippingDetails.firstName} ${shippingDetails.lastName}<br>
                ${shippingDetails.address}<br>
                ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zip}<br>
                ${shippingDetails.country}
            </p>
        </div>

        <p style="font-size: 13px; color: #888; background: #1a1a1a; padding: 15px; border-radius: 4px; border-left: 3px solid #D4AF37;">
            <strong>Important:</strong> If you chose a manual payment method (Zelle, CashApp, etc.), please ensure you send a screenshot of your payment confirmation to <strong>sales@wholemeltscarts.us</strong> with your Order ID in the subject.
        </p>
    `);
}

export const getAdminOrderAlertTemplate = (orderId, customerName, customerEmail, items, total, paymentMethod, shippingDetails) => {
    const itemsHtml = items.map(item => `<li>${item.name} x ${item.quantity} ($${(parseFloat(item.price) * item.quantity).toFixed(2)})</li>`).join('');

    return getBaseTemplate(`
        <h1>New Order Received</h1>
        <div class="details-box">
            <div class="label">Order ID</div>
            <div class="value" style="color: #D4AF37;">${orderId}</div>
            
            <div class="label">Customer</div>
            <div class="value">${customerName} (${customerEmail})</div>
            
            <div class="label">Total Amount</div>
            <div class="value">$${parseFloat(total).toFixed(2)}</div>
            
            <div class="label">Payment Method</div>
            <div class="value">${paymentMethod}</div>
        </div>

        <h3>Items</h3>
        <ul style="color: #ccc; padding-left: 20px;">
            ${itemsHtml}
        </ul>

        <h3>Shipping Info</h3>
        <p style="color: #ccc;">
            ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zip}, ${shippingDetails.country}
        </p>

        <a href="https://wholemeltscarts.us/admin" class="btn">View in Admin Panel</a>
    `);
}

export const getContactFormTemplate = (name, email, subject, message) => {
    return getBaseTemplate(`
        <h1>New Contact Inquiry</h1>
        <div class="details-box">
            <div class="label">From</div>
            <div class="value">${name} (${email})</div>
            
            <div class="label">Subject</div>
            <div class="value">${subject || 'General Inquiry'}</div>
        </div>

        <h3>Message</h3>
        <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #333; color: #ccc;">
            ${message.replace(/\n/g, '<br>')}
        </div>

        <p style="margin-top: 30px;">
            <a href="mailto:${email}" class="btn">Reply to Customer</a>
        </p>
    `);
}

export const getContactConfirmationTemplate = (name) => {
    return getBaseTemplate(`
        <h1>Message Received</h1>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to Whole Melt Extracts. We have received your message and our support team will get back to you within 1-2 hours during business hours.</p>
        
        <p>If this is regarding an existing order, please ensure you have provided your Order ID for faster assistance.</p>
        
        <div style="margin-top: 30px; border-top: 1px solid #333; padding-top: 20px;">
            <p style="font-size: 14px; color: #888;">Live Support is also available on Telegram: <a href="https://t.me/wholemeltscartsus" style="color: #D4AF37; text-decoration: none;">@wholemeltscartsus</a></p>
        </div>
    `);
}
