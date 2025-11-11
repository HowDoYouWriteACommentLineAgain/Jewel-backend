import express from 'express';

import * as ProductController from '../controllers/ProductController.js';

const router = express.Router();

router.get('/products', ProductController.fetchAll);
router.post('/products', ProductController.create);
router.get('/products/:id', ProductController.fetchById);
router.put('/products/:id', ProductController.putById);
router.delete('/products/:id', ProductController.deleteById);
console.log("Product routes active");
export default router;