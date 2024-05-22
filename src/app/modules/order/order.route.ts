import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getOrder);
// router.get('/:productId', ProductControllers.getProductById);
// router.put('/:productId', ProductControllers.updateProductById);
// router.delete('/:productId', ProductControllers.deleteProductById);

export const OrderRoutes = router;
