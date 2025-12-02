import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================
// SEND ORDER CONFIRMATION EMAIL
// ============================================

export const sendOrderConfirmationEmail = async (order, user) => {
  try {
    if (!user || !user.email) {
      console.error("❌ Invalid user email");
      return;
    }

    if (!order || !order._id) {
      console.error("❌ Invalid order data");
      return;
    }

    // Build order items HTML
    const itemsHTML = order.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px;">${item.name}</td>
        <td style="padding: 12px; text-align:center;">${item.size}</td>
        <td style="padding: 12px; text-align:center;">${item.quantity}</td>
        <td style="padding: 12px; text-align:right;">₹${item.price}</td>
      </tr>
    `
      )
      .join("");

    // Email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial; background:#f5f5f5; padding:0; margin:0;">
        <div style="max-width:600px; margin:20px auto; background:#fff; padding:20px; border-radius:8px;">
          
          <h2 style="background:#667eea; color:#fff; padding:15px; text-align:center;">
            ✓ Order Confirmed!
          </h2>

          <p>Hi <strong>${user.name}</strong>,</p>
          <p>Your order has been placed successfully.</p>

          <h3>Order Summary</h3>
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr>
                <th style="padding:10px; background:#667eea; color:white;">Product</th>
                <th style="padding:10px; background:#667eea; color:white;">Size</th>
                <th style="padding:10px; background:#667eea; color:white;">Qty</th>
                <th style="padding:10px; background:#667eea; color:white;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>

          <h3>Total Amount: ₹${order.totalPrice}</h3>

          <h3>Shipping Address</h3>
          <p>
            ${order.shippingAddress.street}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.state}<br>
            ${order.shippingAddress.zipcode}
          </p>

          <p>You will receive tracking information soon.</p>

          <br>
          <p>Regards,<br><strong>Clothing Store Team</strong></p>
        </div>
      </body>
      </html>
    `;

    // Send using Resend
    const result = await resend.emails.send({
      from: "Clothing Store <onboarding@resend.dev>",
      to: user.email,
      subject: `Order Confirmation - #${order._id.toString().slice(-8)}`,
      html: htmlTemplate,
    });

    console.log("📧 Order confirmation sent:", result);
    return result;
  } catch (error) {
    console.error("❌ Resend Email Error:", error);
    return null;
  }
};

// ============================================
// SEND WELCOME EMAIL
// ============================================

export const sendWelcomeEmail = async (user) => {
  try {
    if (!user || !user.email) return;

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial; background:#f5f5f5;">
        <div style="max-width:600px; margin:20px auto; background:white; padding:20px; border-radius:8px;">
          <h2 style="color:#667eea;">Welcome to Clothing Store 🎉</h2>
          <p>Hi <strong>${user.name}</strong>,</p>
          <p>Thanks for joining us!</p>
          <p>Start exploring amazing fashion today.</p>
          <br>
          <p>Best regards,<br><strong>Clothing Store Team</strong></p>
        </div>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: "Clothing Store <onboarding@resend.dev>",
      to: user.email,
      subject: "Welcome to Clothing Store!",
      html: htmlTemplate,
    });

    console.log("📧 Welcome email sent:", result);
    return result;
  } catch (error) {
    console.error("❌ Welcome email error:", error);
    return null;
  }
};
