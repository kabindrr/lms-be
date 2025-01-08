import express from "express";
import { activateUser, insertUser } from "../controllers/AuthController.js";
import { validateData } from "../middlewares/validation/JoiValidation.js";

export const AuthRoute = express.Router();

//user signup
AuthRoute.post("/register", validateData, insertUser);
AuthRoute.post("/activate-user", activateUser);
