// import { Request, Response } from 'express';
// import Order from '../models/Order';
// import Product from '../models/Product';
// import OrderItem from '../models/OrderItem';

// export const createOrder = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { userId, items } = req.body; // Expect items to be an array of { productId, quantity }

//     // Create the order with a default status of 'pending'
//     const order = await Order.create({ userId, total: 0, status: 'pending' });

//     let total = 0;
//     for (const item of items) {
//       const product = await Product.findByPk(item.productId);
//       if (product) {
//         await OrderItem.create({
//           orderId: order.id,
//           productId: product.id,
//           quantity: item.quantity,
//         });
//         total += product.price * item.quantity;
//       }
//     }

//     await order.update({ total });
//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create order' });
//   }
// };
