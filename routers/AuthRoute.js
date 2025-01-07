import express from "express";
import { activateUser, insertUser } from "../controllers/AuthController.js";

export const AuthRoute = express.Router();

//user signup
AuthRoute.post("/register", insertUser);
AuthRoute.post("/activate-user", activateUser);
