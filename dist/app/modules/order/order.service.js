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
exports.OrderServices = void 0;
const order_model_1 = require("./order.model");
const createOrderIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.create(payload);
    return result;
});
const getOrderQueryIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const re = new RegExp(payload, 'i');
    const result = yield order_model_1.OrderModel.find().or([{ email: { $regex: re } }]);
    return result;
});
// const getOrderByIdIntoDb = async (payload: string) => {
//     const result = await OrderModel.find({ _id: payload });
//     return result;
// };
exports.OrderServices = {
    createOrderIntoDb,
    getOrderQueryIntoDb,
};
