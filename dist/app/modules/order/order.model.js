"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.OrderModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const product_model_1 = require("../product/product.model");
// import { Tproduct } from '../product/product.interface';
// import { number } from 'joi';
const OrderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
    },
    productId: {
        type: String,
        required: [true, 'productId is required'],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required'],
    },
});
OrderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const product = yield product_model_1.ProductModel.findById(this.productId);
        //if the provided provided productId not match the product
        if (!product) {
            return next(new Error('Product not found.'));
        }
        //if the order quantity is bigger then product quantity
        if (product.inventory.quantity < this.quantity) {
            console.log('1');
            return next(new Error('insufficient stock'));
        }
        //if the product  is available
        if (product.inventory.quantity > 1) {
            console.log('2');
            product.inventory.quantity -= this.quantity;
            yield product.save();
            if (product.inventory.quantity < 1) {
                //if the product quantity is less then 1 or not have product then the product instock will be false
                product.inventory.inStock = false;
                yield product.save();
            }
        }
        // eslint-disable-next-line no-dupe-else-if
        // } else if (product.inventory.quantity === 0) {
        //     console.log("3")
        //     product.inventory.inStock = false;
        //     await product.save();
        //     return next(new Error('insufficient stock'));
        // }
        next();
    });
});
exports.OrderModel = mongoose_1.default.model('OrderModel', OrderSchema);
