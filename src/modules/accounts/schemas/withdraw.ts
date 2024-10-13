import Joi from "joi"

export const withdrawSchema = Joi.object().keys({
    account: Joi.number().strict().required(),
    value: Joi.number().positive().strict().required(),
})