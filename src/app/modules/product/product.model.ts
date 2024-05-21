import mongoose, { Schema } from "mongoose";
import { Tinventory, Tproduct, Tvariants } from "./product.interface";

const variantsSchema = new Schema<Tvariants>({
    type: {
        type: String,
        required: [true, " varient type is required"],
    },
    value: {
        type: String,
        required: [true, "varient value is required"],
    }
});

const invantorySchema = new Schema<Tinventory>({
    quantity: {
        type: Number,
    },
    inStock: {
        type: Boolean,
        required: true
    }
});
const productSchema = new Schema<Tproduct>({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    category: {
        type: String,
        required: [true, "category is required"]
    },
    tags: {

        type: [String],
        required: [true, "tags are requred"],

    },
    variants: [variantsSchema],
    inventory: invantorySchema
});

export const ProductModel = mongoose.model('ProductModel', productSchema);