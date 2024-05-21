import Joi from "joi";

const varientJoiValidationSchema = Joi.object({
    type: Joi.string().required(),
    value: Joi.string()
})
const InventoryJoiValidationSchema = Joi.object({
    quantity: Joi.number().required().min(1),
    inStock: Joi.boolean().required()
})
const ProductJoiValidationSchema = Joi.object({
    name: Joi.string().max(20)
        .required(),
    description: Joi.string().required(),
    price: Joi.number(),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    variants: Joi.array().items(varientJoiValidationSchema),
    inventory: InventoryJoiValidationSchema.required()
})

export default ProductJoiValidationSchema;