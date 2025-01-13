import Joi from "joi";

export const FNAME = Joi.string().min(2).max(15);
export const FNAME_REQ = Joi.string().min(2).max(15).required();
export const LNAME = Joi.string().min(2).max(15);
export const LNAME_REQ = Joi.string().min(2).max(15).required();
export const EMAIL = Joi.string().email({ minDomainSegments: 2 });
export const EMAIL_REQ = Joi.string()
  .email({ minDomainSegments: 2 })
  .required();
export const PASSWORD = Joi.string();
export const PASSWORD_REQ = Joi.string().required();
export const PHONE = Joi.number();
export const PHONE_REQ = Joi.number().required();
export const SESSION = Joi.string().min(10).max(30);
export const SESSION_REQ = Joi.string().min(10).max(30).required();
export const TOKEN = Joi.string().min(10).max(30);
export const TOKEN_REQ = Joi.string().min(10).max(50).required();
