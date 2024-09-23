import express, { Request, Response } from 'express'; 
import { createOrder, getOrders, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', (req: Request, res: Response) => createOrder(req, res)); 
router.get('/', (req: Request, res: Response) => getOrders(req, res)); 
router.put('/:id', (req: Request, res: Response) => updateOrderStatus(req, res)); 
router.delete('/:id', (req: Request, res: Response) => deleteOrder(req, res)); 

export default router;
