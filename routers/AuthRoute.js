import express from "express";

export const AuthRoute = express.Router();

//user signup
AuthRoute.post("/register", (req, res, next) => {
  try {
    //signup
    res.json({
      status: "success",
      message: "Registration success",
    });
  } catch (error) {
    next(error);
  }
});
