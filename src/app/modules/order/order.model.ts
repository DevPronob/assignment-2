import mongoose, { Schema } from 'mongoose';
import { Torder } from './order.interface';
import { ProductModel } from '../product/product.model';
// import { Tproduct } from '../product/product.interface';
// import { number } from 'joi';


const OrderSchema: Schema<Torder> = new Schema({
    email:
    {
        type: String,
        required: [true, "email is required"]
    },
    productId: {
        type: String,
        required: [true, "productId is required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    quantity: {
        type: Number,
        required: [true, "quantity is required"]
    }
});

OrderSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product: any | null = await ProductModel.findById(this.productId);
    if (!product) {
        return next(new Error('Product not found.'));
    }
    if (product.inventory < this.quantity) {
        product.inventory.inStock = false;
        await product.save();
        return next(new Error('insufficient stock'));
    }
    product.inventory.quantity -= this.quantity;
    await product.save();
    next();
    console.log(product)
});

export const OrderModel = mongoose.model('OrderModel', OrderSchema);