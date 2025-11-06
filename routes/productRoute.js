import express from 'express';

import { 
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
 } from '../controllers/ProductController.js';

const router = express.Router();

router.get('/products', getProducts);
router.post('/products', createProduct);
router.get('/products/:id', getProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
console.log("Product routes active");
export default router;