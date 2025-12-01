import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Check environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn('⚠️  WARNING: EMAIL_USER or EMAIL_PASS not set in .env');
  console.warn('📧 Email sending will not work until you configure these.');
}

// Initialize nodemailer transporter with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', // IMPORTANT: Must be 'gmail' for Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Must be App Password, NOT regular password
  },
  // Optional: Add these for better compatibility
  tls: {
    rejectUnauthorized: false,
  },
});

// Test transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service error:', error.message);
    console.error('Make sure you:');
    console.error('1. Have 2-Step Verification enabled on Google Account');
    console.error('2. Created an App Password (16 characters)');
    console.error('3. Copied it WITHOUT spaces in .env as EMAIL_PASS');
  } else {
    console.log('✅ Email service ready! Connected as:', process.env.EMAIL_USER);
  }
});

export const sendOrderConfirmationEmail = async (order, user) => {
  try {
    if (!user || !user.email) {
      console.error('❌ Invalid user data for email');
      return;
    }

    if (!order || !order._id) {
      console.error('❌ Invalid order data for email');
      return;
    }

    // Generate order items HTML
    const itemsHTML = order.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: left;">
          ${item.name || 'Unknown Product'}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">
          ${item.size || 'N/A'}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">
          ${item.quantity || 0}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">
          ₹${(item.price || 0).toFixed(2)}
        </td>
      </tr>
    `
      )
      .join('');

    // Generate HTML email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.95;
          }
          .content {
            padding: 30px;
            background-color: #ffffff;
          }
          .greeting {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 25px;
          }
          .order-info-box {
            background-color: #f5f5f5;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #667eea;
          }
          .order-info-box p {
            margin: 10px 0;
            font-size: 14px;
          }
          .order-info-label {
            font-weight: 700;
            color: #333;
          }
          .order-info-value {
            color: #666;
          }
          h2 {
            color: #333;
            font-size: 18px;
            margin: 25px 0 15px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            background-color: #fafafa;
          }
          th {
            background-color: #667eea;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 700;
            font-size: 14px;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            font-size: 14px;
          }
          .total-section {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: 700;
            color: #333;
          }
          .total-amount {
            color: #667eea;
          }
          .shipping-info {
            background-color: #e8f4f8;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
          }
          .shipping-info h3 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 14px;
          }
          .shipping-info p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
            line-height: 1.6;
          }
          .what-next {
            background-color: #f0f7ff;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
          }
          .what-next h3 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 14px;
          }
          .what-next ul {
            margin: 0;
            padding-left: 20px;
            color: #666;
            font-size: 14px;
          }
          .what-next li {
            margin: 8px 0;
          }
          .message-text {
            color: #666;
            line-height: 1.8;
            margin: 15px 0;
            font-size: 14px;
          }
          .footer {
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
            color: #999;
            font-size: 12px;
            border-top: 1px solid #e0e0e0;
          }
          .support-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
          }
          .support-link:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="header">
            <h1>✓ Order Confirmed!</h1>
            <p>Your order has been successfully placed</p>
          </div>

          <!-- Main Content -->
          <div class="content">
            <div class="greeting">
              <p>Hi <strong>${user.name || 'Valued Customer'}</strong>,</p>
              <p class="message-text">
                Thank you for your order! We're thrilled you chose us. Your clothing items are being 
                carefully packaged and will be shipped to you soon.
              </p>
            </div>

            <!-- Order Information Box -->
            <div class="order-info-box">
              <p>
                <span class="order-info-label">Order ID:</span>
                <span class="order-info-value">#${order._id}</span>
              </p>
              <p>
                <span class="order-info-label">Order Date:</span>
                <span class="order-info-value">
                  ${new Date(order.orderDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </p>
              <p>
                <span class="order-info-label">Status:</span>
                <span class="order-info-value" style="text-transform: capitalize;">
                  ${order.status || 'Pending'}
                </span>
              </p>
            </div>

            <!-- Order Items -->
            <h2>Order Summary</h2>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <!-- Total Amount -->
            <div class="total-section">
              <div class="total-row">
                <span>Total Amount:</span>
                <span class="total-amount">₹${(order.totalPrice || 0).toFixed(2)}</span>
              </div>
            </div>

            <!-- Shipping Information -->
            ${
              order.shippingAddress
                ? `
              <div class="shipping-info">
                <h3>📦 Shipping Address</h3>
                <p>
                  ${order.shippingAddress.street || ''}<br>
                  ${order.shippingAddress.city || ''}, 
                  ${order.shippingAddress.state || ''} 
                  ${order.shippingAddress.zipcode || ''}
                </p>
              </div>
            `
                : ''
            }

            <!-- What's Next -->
            <div class="what-next">
              <h3>📋 What's Next?</h3>
              <ul>
                <li>✓ We'll send you a tracking number within 24 hours</li>
                <li>✓ Expected delivery: 5-7 business days</li>
                <li>✓ Free returns within 30 days</li>
              </ul>
            </div>

            <p class="message-text">
              If you have any questions or need assistance, feel free to reach out to us anytime.
            </p>

            <p class="message-text">
              Best regards,<br>
              <strong>The Clothing Store Team</strong>
            </p>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>
              © ${new Date().getFullYear()} Clothing Store. All rights reserved.<br>
              This is an automated email. Please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: `Clothing Store <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Order Confirmation - #${order._id.toString().slice(-8)}`,
      html: htmlTemplate,
      replyTo: process.env.EMAIL_USER,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to:', user.email);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    // Don't throw - let order complete even if email fails
    return null;
  }
};

// Optional: Send welcome email
export const sendWelcomeEmail = async (user) => {
  try {
    if (!user || !user.email) return;

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; padding: 30px;">
          <h1 style="color: #667eea;">Welcome to Clothing Store! 🎉</h1>
          <p>Hi ${user.name},</p>
          <p>Thank you for creating an account with us! Start shopping now and enjoy premium quality clothing.</p>
          <p>Best regards,<br>The Clothing Store Team</p>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `Clothing Store <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Welcome to Clothing Store!',
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', user.email);
  } catch (error) {
    console.error('❌ Error sending welcome email:', error.message);
  }
};