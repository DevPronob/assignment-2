import Joi from 'joi';

const OrderJoiValidationSchema = Joi.object({
  email: Joi.string().required(),
  productId: Joi.string().required(),
  price: Joi.number().required().min(1),
  quantity: Joi.number().required().min(1),
});

export default OrderJoiValidationSchema;
