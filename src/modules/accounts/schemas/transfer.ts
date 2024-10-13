import Joi from "joi"

export const transfeSchema = Joi.object().keys({
    from: Joi.number().strict().required(),
    to: Joi.number().strict().required().invalid(Joi.ref('from')),
    value: Joi.number().positive().strict().required(),
})