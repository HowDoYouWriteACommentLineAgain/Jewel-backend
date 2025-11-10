import express from 'express';

import { 
    createProductController,
    getProductController,
    getProductsController,
    updateProductControllers,
    deleteProductController
 } from '../controllers/ProductController.js';

const router = express.Router();

router.get('/products', getProductsController);
router.post('/products', createProductController);
router.get('/products/:id', getProductController);
router.put('/products/:id', updateProductControllers);
router.delete('/products/:id', deleteProductController);
console.log("Product routes active");
export default router;