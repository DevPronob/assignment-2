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
exports.OrderControllers = void 0;
const order_joi_validation_1 = __importDefault(require("./order.joi.validation"));
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const { error, value } = order_joi_validation_1.default.validate(orderData);
        const result = yield order_service_1.OrderServices.createOrderIntoDb(value);
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
    }
    catch (err) {
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
});
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const result = yield order_service_1.OrderServices.getOrderQueryIntoDb(email);
        const message = email
            ? 'Orders fetched successfully for user email!'
            : 'Orders fetched successfully!';
        return res.status(200).json({
            success: true,
            message: message,
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Orders not fetched successfully!',
            error: err,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getOrder,
};
