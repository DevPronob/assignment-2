import { Tproduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDb = async (payload: Tproduct) => {

    const result = await ProductModel.create(payload)
    return result;
};

const getProductByIdIntoDb = async (payload: string) => {
    const result = await ProductModel.find({ _id: payload });
    return result;
};

const getProductByQueryIntoDb = async (payload: string) => {
    var re = new RegExp(payload, 'i');
    const result = await ProductModel.find().or([{ 'name': { $regex: re } }, { 'description': { $regex: re } }, { 'category': { $regex: re } }])
    return result;
};


const updateProductByIdIntoDb = async (payload: string) => {
    const result = "pronob";
    return result;
};
export const ProductServices = {
    createProductIntoDb,
    getProductByQueryIntoDb,
    getProductByIdIntoDb,
    updateProductByIdIntoDb

};