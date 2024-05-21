import { Tproduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDb = async (payload: Tproduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getProductByIdIntoDb = async (payload: string) => {
  const result = await ProductModel.find({ _id: payload });
  return result;
};

const getProductByQueryIntoDb = async (payload: string) => {
  const re = new RegExp(payload, 'i');
  const result = await ProductModel.find().or([
    { name: { $regex: re } },
    { description: { $regex: re } },
    { category: { $regex: re } },
  ]);
  return result;
};

const updateProductByIdIntoDb = async (id: string, payload: Tproduct) => {
  const result = await ProductModel.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    { upsert: true, new: true },
  );
  return result;
};
const deleteProductByIdIntoDb = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};
export const ProductServices = {
  createProductIntoDb,
  getProductByQueryIntoDb,
  getProductByIdIntoDb,
  updateProductByIdIntoDb,
  deleteProductByIdIntoDb,
};
