import express from "express";
import { activateUser, insertUser } from "../controllers/AuthController.js";
import {
  newUserValidation,
  userActivationValidation,
} from "../middlewares/validation/AuthValidation.js";

export const AuthRoute = express.Router();

//user signup
AuthRoute.post("/register", newUserValidation, insertUser);
AuthRoute.post("/activate-user", userActivationValidation, activateUser);
AuthRoute.post("/login");
