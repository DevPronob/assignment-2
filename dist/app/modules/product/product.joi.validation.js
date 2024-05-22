"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const varientJoiValidationSchema = joi_1.default.object({
    type: joi_1.default.string().required(),
    value: joi_1.default.string(),
});
const InventoryJoiValidationSchema = joi_1.default.object({
    quantity: joi_1.default.number().required().min(1),
    inStock: joi_1.default.boolean().required(),
});
const ProductJoiValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number(),
    category: joi_1.default.string(),
    tags: joi_1.default.array().items(joi_1.default.string()),
    variants: joi_1.default.array().items(varientJoiValidationSchema),
    inventory: InventoryJoiValidationSchema.required(),
});
exports.default = ProductJoiValidationSchema;
