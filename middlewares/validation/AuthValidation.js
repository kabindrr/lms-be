import {
  EMAIL_REQ,
  FNAME_REQ,
  LNAME_REQ,
  OTP,
  PASSWORD_REQ,
  PHONE,
  SESSION_REQ,
  TOKEN_REQ,
} from "./JoiConst.js";
import { validateData } from "./JoiValidation.js";

export const newUserValidation = (req, res, next) => {
  const obj = {
    fName: FNAME_REQ,
    lName: LNAME_REQ,
    email: EMAIL_REQ,
    phone: PHONE,
    password: PASSWORD_REQ,
  };

  validateData({ req, res, next, obj });
};

export const userActivationValidation = (req, res, next) => {
  const obj = {
    sessionId: SESSION_REQ,
    t: TOKEN_REQ,
  };
  validateData({ req, res, next, obj });
};

export const loginValidation = (req, res, next) => {
  const obj = {
    email: EMAIL_REQ,
    password: PASSWORD_REQ,
  };
  validateData({ req, res, next, obj });
};

export const newPasswordResetValidation = (req, res, next) => {
  const obj = {
    email: EMAIL_REQ,
    password: PASSWORD_REQ,
    otp: OTP,
  };
  validateData({ req, res, next, obj });
};
