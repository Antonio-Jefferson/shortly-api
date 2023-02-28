import Joi from "joi"

const userValidation = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.string().min(4).valid(Joi.ref('password')).required()
});
const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

export {loginValidation, userValidation};