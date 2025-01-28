import express from "express";
import {
  activateUser,
  insertUser,
  loginUser,
  logoutUser,
} from "../controllers/AuthController.js";
import {
  loginValidation,
  newUserValidation,
  userActivationValidation,
} from "../middlewares/validation/AuthValidation.js";
import { renewaccessJWTMiddleware, userAuthMiddleWare } from "../middlewares/AuthMiddleWare.js";

export const AuthRoute = express.Router();

//user signup
AuthRoute.post("/register", newUserValidation, insertUser);
AuthRoute.post("/activate-user", userActivationValidation, activateUser);
AuthRoute.post("/login", loginValidation, loginUser);
AuthRoute.get("/renew-access-JWT", renewaccessJWTMiddleware);
AuthRoute.get("/logout",userAuthMiddleWare, logoutUser);
