import Joi from "joi";

export const registerSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(1).max(30).required(),
  lastName: Joi.string().alphanum().min(1).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(3).max(30).required(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(3).max(30).required(),
});
