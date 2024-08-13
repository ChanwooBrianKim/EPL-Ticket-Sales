import Order from '../models/Order.js'; // Import the Order model
import Product from '../models/Product.js'; // Import the Product model
import OrderItem from '../models/OrderItem.js'; // Import the OrderItem model

export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body; // Expect items to be an array of { productId, quantity }
    const order = await Order.create({ userId, total: 0 });

    let total = 0;
    for (let item of items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        const orderItem = await OrderItem.create({
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

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ include: Product });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
        return res.status(404).json({ error: 'Order not found' });
        }
        await order.update(req.body);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
        return res.status(404).json({ error: 'Order not found' });
        }
        await order.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
};