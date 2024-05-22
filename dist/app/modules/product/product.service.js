"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(payload);
    return result;
});
const getProductByIdIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find({ _id: payload });
    return result;
});
const getProductByQueryIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const re = new RegExp(payload, 'i');
    const result = yield product_model_1.ProductModel.find().or([
        { name: { $regex: re } },
        { description: { $regex: re } },
        { category: { $regex: re } },
    ]);
    return result;
});
const updateProductByIdIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOneAndUpdate({ _id: id }, { $set: payload }, { upsert: true, new: true });
    return result;
});
const deleteProductByIdIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.deleteOne({ _id: id });
    return result;
});
exports.ProductServices = {
    createProductIntoDb,
    getProductByQueryIntoDb,
    getProductByIdIntoDb,
    updateProductByIdIntoDb,
    deleteProductByIdIntoDb,
};
