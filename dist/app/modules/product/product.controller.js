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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_joi_validation_1 = __importDefault(require("./product.joi.validation"));
// import { MovieServices } from "./movie.service";
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const { error, value } = product_joi_validation_1.default.validate(productData);
        const result = yield product_service_1.ProductServices.createProductIntoDb(value);
        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Product Created successfully !',
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Product Not Created successfully !',
            error: err,
        });
    }
});
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield product_service_1.ProductServices.getProductByQueryIntoDb(searchTerm);
        const message = searchTerm
            ? `Products matching search term '${searchTerm}' fetched successfully!`
            : 'Products fetched successfully!';
        return res.status(200).json({
            success: true,
            message: message,
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Products not fetched successfully!',
            error: err,
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getProductByIdIntoDb(productId);
        return res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Products not fetched successfully!',
            error: err,
        });
    }
});
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = req.body;
        const result = yield product_service_1.ProductServices.updateProductByIdIntoDb(productId, data);
        return res.status(200).json({
            success: true,
            message: 'Product updated successfully !',
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Product Not updated successfully !',
            error: err,
        });
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_service_1.ProductServices.deleteProductByIdIntoDb(productId);
        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully !',
            data: null,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Product Not deleted successfully !',
            error: err,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getProduct,
    getProductById,
    updateProductById,
    deleteProductById,
};
