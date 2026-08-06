import { isBitcoinPayment, getBitcoinPaymentInstructions, BITCOIN_ADDRESS } from './payments.js';

export const getBaseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Whole Melt Extracts</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        
        body { 
            font-family: 'Manrope', 'Helvetica Neue', Helvetica, Arial, sans-serif; 
            line-height: 1.6; 
            color: #F3F0E8; 
            background-color: #050505; 
            margin: 0; 
            padding: 0; 
        }
        .container { 
            max-width: 600px; 
            margin: 40px auto; 
            background-color: #0c0d18; 
            border: 1px solid rgba(212, 175, 55, 0.2); 
            border-radius: 24px; 
            overflow: hidden; 
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); 
        }
        .header { 
            background: linear-gradient(180deg, #111111 0%, #0a0a0a 100%); 
            padding: 60px 40px; 
            text-align: center; 
            border-bottom: 1px solid rgba(212, 175, 55, 0.1); 
        }
        .logo { 
            font-family: 'Playfair Display', serif;
            font-size: 32px; 
            font-weight: 800; 
            color: #D4AF37; 
            text-transform: uppercase; 
            letter-spacing: 6px; 
            margin: 0; 
        }
        .logo-subtitle {
            font-size: 10px;
            color: #8A8D9A;
            letter-spacing: 4px;
            text-transform: uppercase;
            margin-top: 5px;
        }
        .content { 
            padding: 50px 40px; 
        }
        .footer { 
            background-color: #050505; 
            padding: 40px 20px; 
            text-align: center; 
            font-size: 11px; 
            color: #6F6B63; 
            border-top: 1px solid rgba(212, 175, 55, 0.05); 
        }
        .btn { 
            display: inline-block; 
            padding: 18px 36px; 
            background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); 
            color: #000; 
            text-decoration: none; 
            border-radius: 12px; 
            font-weight: 800; 
            margin-top: 30px; 
            text-transform: uppercase; 
            letter-spacing: 1.5px; 
            box-shadow: 0 10px 15px -3px rgba(212, 175, 55, 0.3);
        }
        .card { 
            background: rgba(255, 255, 255, 0.03); 
            border-radius: 16px; 
            padding: 30px; 
            margin: 30px 0; 
            border: 1px solid rgba(255, 255, 255, 0.05); 
        }
        h1 { 
            font-family: 'Playfair Display', serif;
            color: #D4AF37; 
            font-size: 36px;
            margin-top: 0; 
            margin-bottom: 20px;
        }
        h2, h3 { 
            color: #fff; 
            margin-top: 0; 
            font-weight: 600;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 30px 0; 
        }
        th { 
            text-align: left; 
            border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
            padding: 15px 10px; 
            color: #D4AF37; 
            font-size: 13px; 
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        td { 
            padding: 18px 10px; 
            border-bottom: 1px solid rgba(255, 255, 255, 0.03); 
            font-size: 15px; 
        }
        .total-row { 
            font-weight: 800; 
            font-size: 20px; 
            color: #D4AF37; 
        }
        .label { 
            color: #8A8D9A; 
            font-size: 11px; 
            text-transform: uppercase; 
            letter-spacing: 2px; 
            margin-bottom: 6px; 
        }
        .value { 
            color: #fff; 
            font-size: 16px; 
            margin-bottom: 20px; 
            font-weight: 500;
        }
        .highlight-box {
            background: rgba(212, 175, 55, 0.05);
            border-left: 4px solid #D4AF37;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">WHOLE MELT</div>
            <div class="logo-subtitle">Premium Extracts & Concentrates</div>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Whole Melt Extracts. Distributed by Authorized Hubs.<br>
            Official Online Store & Security Verification: <a href="https://wholemeltscarts.us" style="color: #D4AF37; text-decoration: none; font-weight: 600;">wholemeltscarts.us</a>
            <p style="margin-top: 20px; color: #6F6B63;">
                This email was sent to you because you interacted with our official distribution system.
            </p>
        </div>
    </div>
</body>
</html>
`;

export const getOrderConfirmationTemplate = (orderId, customerName, items, total, shippingDetails, paymentMethod) => {
    const itemsHtml = items.map(item => `
        <tr>
            <td style="color: #fff; font-weight: 500;">${item.name} <span style="color: #8A8D9A; font-weight: normal;">x ${item.quantity}</span></td>
            <td style="text-align: right; font-family: monospace; color: #fff;">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    return getBaseTemplate(`
        <h1 style="text-align: center;">Order Confirmed</h1>
        <p style="font-size: 18px; text-align: center; color: #fff;">Pleasure doing business with you, <strong>${customerName}</strong>.</p>
        <p style="text-align: center; color: #8A8D9A;">Your order is secured and we've notified our logistics hub for immediate preparation.</p>
        
        <div class="card">
            <div style="display: flex; justify-content: space-between;">
                <div style="width: 50%;">
                    <div class="label">Manifest ID</div>
                    <div class="value" style="color: #D4AF37; font-weight: 800;">${orderId}</div>
                </div>
                <div style="width: 50%;">
                    <div class="label">Payment Method</div>
                    <div class="value">${paymentMethod}</div>
                </div>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Selected Products</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td style="padding-top: 30px;">Investment Total</td>
                    <td style="padding-top: 30px; text-align: right;">$${parseFloat(total).toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>

        <div class="card">
            <h3 style="color: #D4AF37; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">Destination Agent</h3>
            <p style="margin: 0; font-size: 16px; color: #fff; line-height: 1.8;">
                <strong>${shippingDetails.firstName} ${shippingDetails.lastName}</strong><br>
                ${shippingDetails.address}<br>
                ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zip}<br>
                ${shippingDetails.country}
            </p>
        </div>

        ${isBitcoinPayment(paymentMethod) ? getBitcoinPaymentInstructions(orderId, total) : `
        <div class="highlight-box">
            <strong style="color: #D4AF37; text-transform: uppercase; display: block; margin-bottom: 8px;">Action Required:</strong> 
            If you selected a manual payment gateway (Zelle, CashApp, etc.), please dispatch a screenshot of your successful transaction to <a href="mailto:sales@wholemeltscarts.us" style="color: #fff; text-decoration: underline;">sales@wholemeltscarts.us</a> along with your <strong>Manifest ID</strong> to avoid dispatch delays.
        </div>
        `}
        
        <p style="text-align: center; margin-top: 40px; font-size: 14px; color: #8A8D9A;">
            Once verified, you will receive tracking coordinates for your shipment.
        </p>
    `);
}

export const getAdminOrderAlertTemplate = (orderId, customerName, customerEmail, items, total, paymentMethod, shippingDetails) => {
    const itemsHtml = items.map(item => `
        <li style="margin-bottom: 15px;">
            <div style="color: #fff;">${item.name}</div>
            <div style="font-size: 13px; color: #8A8D9A;">Quantity: ${item.quantity} | Unit Value: $${parseFloat(item.price).toFixed(2)}</div>
        </li>
    `).join('');

    return getBaseTemplate(`
        <h1 style="color: #fff; text-align: center;">New Order Alert</h1>
        <div style="text-align: center; margin-bottom: 30px;">
            <span style="background: rgba(212, 175, 55, 0.1); color: #D4AF37; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 800; text-transform: uppercase;">Awaiting Fulfillment</span>
        </div>

        <div class="card">
            <div class="label">Manifest ID</div>
            <div class="value" style="color: #D4AF37;">${orderId}</div>
            
            <div class="label">Customer Identity</div>
            <div class="value">${customerName} (${customerEmail})</div>
            
            <div class="label">Total Secure Transaction Value</div>
            <div class="value" style="font-size: 24px; color: #D4AF37;">$${parseFloat(total).toFixed(2)}</div>
            
            <div class="label">Proposed Payment</div>
            <div class="value">${paymentMethod}</div>
            ${isBitcoinPayment(paymentMethod) ? `
            <div class="label">Bitcoin Address</div>
            <div class="value" style="font-family: monospace; font-size: 14px; word-break: break-all;">${BITCOIN_ADDRESS}</div>
            ` : ''}
        </div>

        <h3>Inventory Requirements</h3>
        <ul style="color: #E2E8F0; padding-left: 0; list-style: none;">
            ${itemsHtml}
        </ul>

        <div class="card">
            <h3 style="font-size: 14px; color: #D4AF37;">Logistics Data</h3>
            <p style="color: #E2E8F0; margin: 0; line-height: 1.8;">
                ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zip}<br>
                ${shippingDetails.country}
            </p>
        </div>

        <div style="text-align: center;">
            <a href="https://wholemeltscarts.us/admin" class="btn">Access Command Center</a>
        </div>
    `);
}

export const getPaymentClaimedAdminTemplate = (orderId, customerName, customerEmail, total, paymentMethod, paymentClaimedAt) => {
    return getBaseTemplate(`
        <h1 style="color: #fff; text-align: center;">Payment Reported</h1>
        <div style="text-align: center; margin-bottom: 30px;">
            <span style="background: rgba(212, 175, 55, 0.1); color: #D4AF37; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 800; text-transform: uppercase;">Customer Claims Payment Sent</span>
        </div>

        <div class="card">
            <div class="label">Manifest ID</div>
            <div class="value" style="color: #D4AF37;">${orderId}</div>

            <div class="label">Customer Identity</div>
            <div class="value">${customerName} (${customerEmail})</div>

            <div class="label">Order Total</div>
            <div class="value" style="font-size: 24px; color: #D4AF37;">$${parseFloat(total).toFixed(2)}</div>

            <div class="label">Payment Method</div>
            <div class="value">${paymentMethod}</div>

            ${isBitcoinPayment(paymentMethod) ? `
            <div class="label">Bitcoin Address</div>
            <div class="value" style="font-family: monospace; font-size: 14px; word-break: break-all;">${BITCOIN_ADDRESS}</div>
            ` : ''}

            <div class="label">Reported At</div>
            <div class="value">${new Date(paymentClaimedAt).toLocaleString()}</div>
        </div>

        <div class="highlight-box">
            The customer clicked <strong>I Have Paid</strong>. Please verify the transaction on-chain or in your wallet before updating the order status.
        </div>

        <div style="text-align: center;">
            <a href="https://wholemeltscarts.us/admin" class="btn">Review Order</a>
        </div>
    `);
}

export const getContactFormTemplate = (name, email, subject, message) => {
    return getBaseTemplate(`
        <h1 style="text-align: center;">New Communications Channel</h1>
        <p style="text-align: center; color: #8A8D9A;">A customer has initiated contact via the official portal.</p>

        <div class="card">
            <div class="label">From Agent</div>
            <div class="value" style="color: #fff;">${name}</div>
            
            <div class="label">Contact Endpoint</div>
            <div class="value" style="color: #D4AF37;">${email}</div>
            
            <div class="label">Inquiry Subject</div>
            <div class="value" style="color: #fff; font-style: italic;">"${subject || 'General Assistance Requested'}"</div>
        </div>

        <h3 style="margin-bottom: 15px; color: #D4AF37;">Transmission Message</h3>
        <div style="background: rgba(255,255,255,0.03); padding: 30px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); color: #fff; line-height: 1.8; font-size: 16px;">
            ${message.replace(/\n/g, '<br>')}
        </div>

        <div style="text-align: center; margin-top: 40px;">
            <a href="mailto:${email}" class="btn">Establish Response</a>
        </div>
    `);
}

export const getContactConfirmationTemplate = (name) => {
    return getBaseTemplate(`
        <h1 style="text-align: center;">Transmission Received</h1>
        <p style="font-size: 18px; text-align: center; color: #fff;">Status: <strong>Active Support Assigned</strong></p>
        <p style="text-align: center; color: #8A8D9A; max-width: 400px; margin: 0 auto;">Hi ${name}, your inquiry has reached our support network. A high-priority response is being drafted.</p>
        
        <div class="highlight-box" style="text-align: center; border-left: none; border: 1px solid rgba(212, 175, 55, 0.2);">
            We aim to resolve all communications within <strong>2 daylight hours</strong>.
        </div>
        
        <p style="text-align: center; font-size: 14px; color: #8A8D9A; margin-top: 30px;">
            If this pertains to a secure order, please ensure your Manifest ID is included in all follow-up transmissions.
        </p>
        
        <div style="margin-top: 50px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 30px;">
            <p style="font-size: 13px; color: #52526b; margin-bottom: 10px;">Accelerated Support available via Telegram:</p>
            <a href="https://t.me/wholemeltscartsus" style="color: #D4AF37; text-decoration: none; font-weight: 800; font-size: 16px; letter-spacing: 1px;">@WHOLEMELTSCARTSUS</a>
        </div>
    `);
}

export const getWholesaleInquiryTemplate = (name, email, businessName, location, volume, message) => {
    return getBaseTemplate(`
        <h1 style="text-align: center;">Master Hub Inquiry</h1>
        <div style="text-align: center; margin-bottom: 30px;">
            <span style="background: rgba(212, 175, 55, 0.1); color: #D4AF37; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 800; text-transform: uppercase;">Wholesale Lead</span>
        </div>

        <div class="card">
            <div class="label">Partner Name</div>
            <div class="value" style="color: #fff;">${name}</div>
            
            <div class="label">Business / Alias</div>
            <div class="value" style="color: #D4AF37;">${businessName}</div>
            
            <div class="label">Distribution Region</div>
            <div class="value" style="color: #fff;">${location}</div>
            
            <div class="label">Monthly Volume Commitment</div>
            <div class="value" style="color: #fff; font-weight: 700;">${volume} Units</div>
        </div>

        <h3 style="margin-bottom: 15px; color: #D4AF37;">Inquiry Profile</h3>
        <div style="background: rgba(255,255,255,0.03); padding: 30px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); color: #fff; line-height: 1.8; font-size: 16px;">
            ${message.replace(/\n/g, '<br>')}
        </div>

        <div style="text-align: center; margin-top: 40px;">
            <a href="mailto:${email}" class="btn">Establish Partnership</a>
        </div>
    `);
}

export const getWholesaleConfirmationTemplate = (name) => {
    return getBaseTemplate(`
        <h1 style="text-align: center;">Wholesale Portal Active</h1>
        <p style="font-size: 18px; text-align: center; color: #fff;">Status: <strong>Application Under Review</strong></p>
        <p style="text-align: center; color: #8A8D9A; max-width: 400px; margin: 0 auto;">Hi ${name}, your distribution inquiry has reached our **Master Logistics Hub**. We are currently reviewing your credentials.</p>
        
        <div class="highlight-box" style="text-align: center; border-left: none; border: 1px solid rgba(212, 175, 55, 0.2);">
            A **Distribution Officer** will reach out via email or Telegram within **4-6 hours** with tiered case pricing.
        </div>
        
        <div class="card">
            <h3 style="font-size: 14px; color: #D4AF37; margin-bottom: 10px;">Next Steps for Verification:</h3>
            <ul style="color: #8A8D9A; padding-left: 20px; font-size: 14px; text-align: left;">
                <li style="margin-bottom: 8px;">Ensure your Telegram alias matches your business application.</li>
                <li style="margin-bottom: 8px;">Prepare your shipping region coordinates for high-security logistics.</li>
                <li style="margin-bottom: 8px;">Review our Master Case tiers to decide on your opening inventory.</li>
            </ul>
        </div>
        
        <p style="text-align: center; font-size: 14px; color: #8A8D9A; margin-top: 30px;">
            Thank you for choosing **Whole Melt Extracts** as your primary concentrate partner.
        </p>
        
        <div style="margin-top: 50px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 30px;">
            <p style="font-size: 13px; color: #52526b; margin-bottom: 10px;">Direct Dispatch Support:</p>
            <a href="https://t.me/wholemeltscartsus" style="color: #D4AF37; text-decoration: none; font-weight: 800; font-size: 16px; letter-spacing: 1px;">@WHOLEMELTSCARTSUS</a>
        </div>
    `);
}

