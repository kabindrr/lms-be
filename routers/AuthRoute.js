import express from "express";
import { insertUser } from "../controllers/AuthController.js";

export const AuthRoute = express.Router();

//user signup
AuthRoute.post("/register", insertUser);
