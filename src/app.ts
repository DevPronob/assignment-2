import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';
const app: Application = express();

app.use(express.json());
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.get('*', (req: Request, res: Response) => {
  return res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
