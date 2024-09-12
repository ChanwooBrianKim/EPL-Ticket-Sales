import { Request, Response } from 'express';
import Order from '../models/Order.js'; 
import Product from '../models/Product.js'; 
import OrderItem from '../models/OrderItem.js'; 

// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, items } = req.body as { userId: number, items: { productId: number, quantity: number }[] };

    // Validate that there are items and a userId
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ error: 'Invalid input. User ID and items are required.' });
    }
    
    // Create the new order
    const order = await Order.create({ userId, total: 0, status: 'pending' });

    let total = 0;
    const stockErrors: string[] = []; // Array to store stock-related errors

    // Loop through each item and handle stock updates
    for (let item of items) {
      const product = await Product.findByPk(item.productId);
      
      if (product) {
        // Check if there's enough stock
        if (product.stockQuantity >= item.quantity) {
          // Create the order item
          await OrderItem.create({
            orderId: order.id,
            productId: product.id,
            quantity: item.quantity,
            priceAtOrder: product.price,
          });

          // Reduce stock quantity
          product.stockQuantity -= item.quantity;
          await product.save(); // Save the updated product stock

          total += product.price * item.quantity;
        } else {
          stockErrors.push(`Not enough stock for ${product.name}. Available: ${product.stockQuantity}`);
        }
      } else {
        return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
      }
    }

    // If there are stock-related errors, respond with them and cancel the order
    if (stockErrors.length > 0) {
      await order.destroy(); // Delete the order if there were stock issues
      return res.status(400).json({ error: 'Stock issues with the following products:', stockErrors });
    }

    // Update the total price for the order
    await order.update({ total });

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
