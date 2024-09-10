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
// import { Request, Response } from 'express';
// import Order from '../models/Order.js'; 
// import Product from '../models/Product.js'; 
// import OrderItem from '../models/OrderItem.js'; 

// // Create a new order
// export const createOrder = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { userId, items } = req.body as { userId: number, items: { productId: number, quantity: number }[] };
    
//     // Create the new order
//     const order = await Order.create({ userId, total: 0, status: 'pending' });

//     let total = 0;

//     // Loop through each item and handle stock updates
//     for (let item of items) {
//       const product = await Product.findByPk(item.productId);
      
//       if (product) {
//         // Check if there's enough stock
//         if (product.stockQuantity >= item.quantity) {
//           // Create the order item
//           await OrderItem.create({
//             orderId: order.id,
//             productId: product.id,
//             quantity: item.quantity,
//             priceAtOrder: product.price,
//           });

//           // Reduce stock quantity
//           product.stockQuantity -= item.quantity;
//           await product.save(); // Save the updated product stock

//           total += product.price * item.quantity;
//         } else {
//           return res.status(400).json({ 
//             error: `Not enough stock for ${product.name}. Available: ${product.stockQuantity}` 
//           });
//         }
//       } else {
//         return res.status(404).json({ error: `Product with id ${item.productId} not found` });
//       }
//     }

//     // Update the total price for the order
//     await order.update({ total });

//     res.status(201).json({ message: 'Order created successfully', order });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ error: 'Failed to create order' });
//   }
// };

// // Fetch all orders
// export const getOrders = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const orders = await Order.findAll({ include: [OrderItem] }); // Include order items in the response
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// };

// // Update an order by ID
// export const updateOrder = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const order = await Order.findByPk(req.params.id);
//     if (!order) {
//       res.status(404).json({ error: 'Order not found' });
//       return;
//     }
//     await order.update(req.body);
//     res.status(200).json(order);
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).json({ error: 'Failed to update order' });
//   }
// };

// // Delete an order by ID
// export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const order = await Order.findByPk(req.params.id);
//     if (!order) {
//       res.status(404).json({ error: 'Order not found' });
//       return;
//     }
//     await order.destroy();
//     res.status(204).json();
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     res.status(500).json({ error: 'Failed to delete order' });
//   }
// };
