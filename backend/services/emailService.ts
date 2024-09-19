import nodemailer from 'nodemailer';

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or any other service like Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export const sendOrderConfirmation = async (email: string, orderDetails: any) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // Recipient address (the email typed by the user)
    subject: 'Order Confirmation', // Subject
    text: `Thank you for your order! Here are your order details:\n\n${JSON.stringify(orderDetails, null, 2)}`,
    html: `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <h3>Order Summary</h3>
      <p>Total: $${orderDetails.totalAmount.toFixed(2)}</p>
      <p>Status: ${orderDetails.orderStatus}</p>
      <p>Order Items:</p>
      <ul>
        ${orderDetails.items.map((item: any) => `
          <li>${item.name} - ${item.quantity} x $${item.priceAtOrder}</li>
        `).join('')}
      </ul>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};
