/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import OrderJoiValidationSchema from './order.joi.validation';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { error, value } = OrderJoiValidationSchema.validate(orderData);
    const result = await OrderServices.createOrderIntoDb(value);
    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order Created successfully !',
      data: result,
    });
  } catch (err: any) {
    if (err.message === 'insufficient stock') {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
    }
    if (err.message === 'Product not found.') {
      return res
        .status(400)
        .json({ success: false, message: 'Order not found' });
    }
    return res.status(500).json({
      success: false,
      message: 'Order Not Created successfully !',
      error: err,
    });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrderServices.getOrderQueryIntoDb(email as string);
    const message = email
      ? 'Orders fetched successfully for user email!'
      : 'Orders fetched successfully!';
    return res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Orders not fetched successfully!',
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrder,
};
