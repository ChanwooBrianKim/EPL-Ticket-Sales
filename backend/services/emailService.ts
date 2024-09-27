import nodemailer from 'nodemailer';

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or any other service like Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email from .env
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password from .env
  },
});

// Function to send an order confirmation email
export const sendOrderConfirmation = async (email: string, orderDetails: any) => {
  // Check if email user and pass are properly set up
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are not properly set in .env');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // Recipient address (the email typed by the user)
    subject: 'Order Confirmation', // Subject of the email
    text: `Thank you for your order! Here are your order details:\n\n${JSON.stringify(orderDetails, null, 2)}`,
    html: `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <h3>Order Summary</h3>
      <p><strong>Total:</strong> $${orderDetails.totalAmount.toFixed(2)}</p>
      <p><strong>Status:</strong> ${orderDetails.orderStatus}</p>
      <h4>Order Items:</h4>
      <ul>
        ${orderDetails.items && orderDetails.items.length > 0 
          ? orderDetails.items.map((item: any) => `
            <li>${item.name} - ${item.quantity} x $${item.priceAtOrder.toFixed(2)}</li>
          `).join('') 
          : '<li>No items found in order.</li>'
        }
      </ul>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw new Error('Failed to send order confirmation email');
  }
};
