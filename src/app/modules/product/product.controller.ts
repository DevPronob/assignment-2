import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import ProductJoiValidationSchema from "./product.joi.validation";
// import { MovieServices } from "./movie.service";

const createProduct = async (req: Request, res: Response) => {

    try {
        const productData = req.body;
        const { error, value } = ProductJoiValidationSchema.validate(productData)
        const result = await ProductServices.createProductIntoDb(value);
        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product Created successfully !",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Product Not Created successfully !",
            error: err,
        });
    }
};

const getProduct = async (req: Request, res: Response) => {


    try {
        const { searchTerm } = req.query;
        const result = await ProductServices.getProductByQueryIntoDb(searchTerm as string);
        return res.status(200).json({
            success: true,
            message: "Product rectrive successfully !",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Product Not rectrive successfully !",
            error: err,
        });
    }
};

const getProductById = async (req: Request, res: Response) => {


    try {
        const { productId } = req.params;
        const result = await ProductServices.getProductByIdIntoDb(productId);
        return res.status(200).json({
            success: true,
            message: "Product rectrive by id successfully !",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Product Not rectrive successfully !",
            error: err,
        });
    }
};

const updateProductById = async (req: Request, res: Response) => {


    try {
        const { productId } = req.params;
        const result = await ProductServices.updateProductByIdIntoDb(productId);
        return res.status(200).json({
            success: true,
            message: "Product updated successfully !",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Product Not updated successfully !",
            error: err,
        });
    }
};

export const ProductControllers = {
    createProduct,
    getProduct,
    getProductById,
    updateProductById
};