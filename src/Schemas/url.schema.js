import Joi from "joi"

const validationUrl = Joi.object({
    url: Joi.string().uri().required()
})

export {validationUrl}