import express from 'express';
import { createOrder, getOrders, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder); // Create a new order
router.get('/', getOrders); // Get all orders
router.put('/:id', updateOrder); // Update an order by ID
router.delete('/:id', deleteOrder); // Delete an order by ID

export default router;
