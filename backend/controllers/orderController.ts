import { Request, Response } from 'express';
import Order from '../models/Order.js'; 
import Product from '../models/Product.js'; 
import OrderItem from '../models/OrderItem.js'; 

// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, items, name, address, email, total } = req.body;

    // Validate that all required fields are present
    if (!userId || !items || !name || !address || !email || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields or no items in cart.' });
    }

    // Create the new order
    const order = await Order.create({ userId, total, status: 'pending' });

    let orderTotal = 0;

    // Loop through each item and handle stock updates
    for (let item of items) {
      const product = await Product.findByPk(item.productId);

      if (product) {
        if (product.stockQuantity >= item.quantity) {
          await OrderItem.create({
            orderId: order.id,
            productId: product.id,
            quantity: item.quantity,
            priceAtOrder: product.price,
          });

          product.stockQuantity -= item.quantity;
          await product.save();
          orderTotal += product.price * item.quantity;
        } else {
          return res.status(400).json({
            error: `Not enough stock for ${product.name}. Available: ${product.stockQuantity}`,
          });
        }
      } else {
        return res.status(404).json({ error: `Product with id ${item.productId} not found` });
      }
    }

    // Update the total price for the order
    await order.update({ total: orderTotal });

    return res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
};


// Fetch all orders
export const getOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const orders = await Order.findAll({ include: Product });
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Update an order by ID
export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.update(req.body);
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ error: 'Failed to update order' });
  }
};

// Delete an order by ID
export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    return res.status(204).json();
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ error: 'Failed to delete order' });
  }
};
