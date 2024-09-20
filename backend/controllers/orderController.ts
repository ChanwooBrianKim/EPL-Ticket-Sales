import { Request, Response } from 'express';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Product from '../models/Product';
import { sendOrderConfirmation } from '../services/emailService'; // Import the email service

// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, items } = req.body as { userId: number; items: { productId: number; quantity: number }[] };

    // Validate items exist
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in the order' });
    }

    // Create a new order
    const order = await Order.create({
      userId,
      status: 'pending',
      total: 0, // Will be updated after calculating total
    });

    let total = 0;

    // Loop through each item, calculate total, and create order items
    for (const item of items) {
      const product = await Product.findByPk(item.productId);

      if (!product) {
        return res.status(404).json({ error: `Product with id ${item.productId} not found` });
      }

      // Check product stock
      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for product: ${product.name}` });
      }

      // Create the order item
      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        priceAtOrder: product.price,
      });

      // Decrease stock
      product.stockQuantity -= item.quantity;
      await product.save();

      // Add to total order price
      total += product.price * item.quantity;
    }

    // Update the order total
    await order.update({ total });

    // Send order confirmation email
    const orderDetails = {
      totalAmount: total,
      orderStatus: order.status,
      items: await OrderItem.findAll({
        where: { orderId: order.id },
        include: [{ model: Product, as: 'product', attributes: ['name', 'price'] }],
      }),
    };

    const userEmail = req.body.email; // Ensure you are passing email in the request body
    if (userEmail) {
      await sendOrderConfirmation(userEmail, orderDetails);
    }

    return res.status(201).json({
      message: 'Order placed successfully',
      order: {
        id: order.id,
        total: order.total,
        status: order.status,
        items: orderDetails.items,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
};

// Fetch all orders for a user
export const getOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [{ model: Product, as: 'product', attributes: ['name', 'price'] }],
        },
      ],
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ status });

    return res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ error: 'Failed to update order status' });
  }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ error: 'Failed to delete order' });
  }
};
