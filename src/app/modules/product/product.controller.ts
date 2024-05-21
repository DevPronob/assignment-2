import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import ProductJoiValidationSchema from './product.joi.validation';
// import { MovieServices } from "./movie.service";

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const { error, value } = ProductJoiValidationSchema.validate(productData);
        const result = await ProductServices.createProductIntoDb(value);
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
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Product Not Created successfully !',
            error: err,
        });
    }
};

const getProduct = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;
        const result = await ProductServices.getProductByQueryIntoDb(
            searchTerm as string,
        );
        const message = searchTerm ? "Products matching search term 'iphone' fetched successfully!" : "Products fetched successfully!"
        return res.status(200).json({
            success: true,
            message: message,
            data: result,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Products not fetched successfully!',
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
            message: 'Products fetched successfully!',
            data: result,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Products not fetched successfully!',
            error: err,
        });
    }
};

const updateProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const data = req.body;
        const result = await ProductServices.updateProductByIdIntoDb(
            productId,
            data,
        );
        return res.status(200).json({
            success: true,
            message: 'Product updated successfully !',
            data: result,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Product Not updated successfully !',
            error: err,
        });
    }
};
const deleteProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductServices.deleteProductByIdIntoDb(productId);
        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully !',
            data: null,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Product Not deleted successfully !',
            error: err,
        });
    }
};

export const ProductControllers = {
    createProduct,
    getProduct,
    getProductById,
    updateProductById,
    deleteProductById,
};
