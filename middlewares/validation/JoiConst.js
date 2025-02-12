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
export const OTP = Joi.number().min(999).max(9999).required();

//Book validation
// "title": "JavaScript: The Definitive Guide",
// "year": 2024,
// "author": "David Flanagan",
// "imgUrl": "https://images-na.ssl-images-amazon.com/images/I/41IeqdW9k8L._SX379_BO1,204,203,200_.jpg",
// "isbn": "9781491952023",
// "genre": "Programming"
export const SHORT_STR = Joi.string().min(1).max(100);
export const SHORT_STR_REQ = SHORT_STR.required();

export const LONG_STR = Joi.string().min(10).max(5000);
export const LONG_STR_REQ = LONG_STR.required();
export const YEAR = Joi.number()
  .integer()
  .min(1901)
  .max(new Date().getFullYear());
export const YEAR_REQ = YEAR.required();
export const ISBN_REQ = Joi.string()
  .pattern(/^(?:\d{9}X|\d{10}|\d{13})$/) // Supports ISBN-10 & ISBN-13 formats
  .message("ISBN must be a valid ISBN-10 or ISBN-13 format")
  .required();
