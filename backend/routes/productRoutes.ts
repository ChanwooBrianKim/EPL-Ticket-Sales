import express, { Request, Response } from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router(); 

router.post('/', (req: Request, res: Response) => createProduct(req, res)); 
router.get('/', (req: Request, res: Response) => getProducts(req, res)); 
router.put('/:id', (req: Request, res: Response) => updateProduct(req, res)); 
router.delete('/:id', (req: Request, res: Response) => deleteProduct(req, res)); 

export default router;
