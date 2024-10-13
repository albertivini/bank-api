import Joi from "joi"

export const createSchema = Joi.object().keys({
    username: Joi.string().alphanum().strict().required()
})