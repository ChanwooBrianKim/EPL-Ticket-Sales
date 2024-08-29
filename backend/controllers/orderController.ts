import { Request, Response } from 'express';
import Order from '../models/Order'; // Import the Order model
import Product from '../models/Product'; // Import the Product model
import OrderItem from '../models/OrderItem'; // Import the OrderItem model (Will be fixed once orderitem.js -> .ts)

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, items } = req.body as { userId: number, items: { productId: number, quantity: number }[] }; // Expect items to be an array of { productId, quantity }
    const order = await Order.create({ userId, total: 0, status: 'pending' });

    let total = 0;
    for (let item of items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        await OrderItem.create({
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
        });
        total += product.price * item.quantity;
      }
    }

    await order.update({ total });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.findAll({ include: Product });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    await order.update(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    await order.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
