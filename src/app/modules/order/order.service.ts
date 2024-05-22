import { Torder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDb = async (payload: Torder) => {
  const result = await OrderModel.create(payload);
  return result;
};

const getOrderQueryIntoDb = async (payload: string) => {
  const re = new RegExp(payload, 'i');
  const result = await OrderModel.find().or([{ email: { $regex: re } }]);
  return result;
};

// const getOrderByIdIntoDb = async (payload: string) => {
//     const result = await OrderModel.find({ _id: payload });
//     return result;
// };

export const OrderServices = {
  createOrderIntoDb,
  getOrderQueryIntoDb,
};
