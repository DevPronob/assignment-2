import mongoose, { Schema } from 'mongoose';
import { Torder } from './order.interface';
import { ProductModel } from '../product/product.model';
// import { Tproduct } from '../product/product.interface';
// import { number } from 'joi';

const OrderSchema: Schema<Torder> = new Schema({
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

OrderSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product: any | null = await ProductModel.findById(this.productId);
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
        await product.save();
        if (product.inventory.quantity < 1) {
            //if the product quantity is less then 1 or not have product then the product instock will be false
            product.inventory.inStock = false;
            await product.save();
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

export const OrderModel = mongoose.model('OrderModel', OrderSchema);
