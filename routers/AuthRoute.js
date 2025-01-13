import express from "express";
import {
  activateUser,
  insertUser,
  loginUser,
} from "../controllers/AuthController.js";
import {
  loginValidation,
  newUserValidation,
  userActivationValidation,
} from "../middlewares/validation/AuthValidation.js";

export const AuthRoute = express.Router();

//user signup
AuthRoute.post("/register", newUserValidation, insertUser);
AuthRoute.post("/activate-user", userActivationValidation, activateUser);
AuthRoute.post("/login",loginValidation, loginUser);
