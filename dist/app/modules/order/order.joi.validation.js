"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const OrderJoiValidationSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    productId: joi_1.default.string().required(),
    price: joi_1.default.number().required().min(1),
    quantity: joi_1.default.number().required().min(1),
});
exports.default = OrderJoiValidationSchema;
