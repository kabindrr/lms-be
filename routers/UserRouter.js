import express from "express";
import { comparepassword, hashPassword } from "../utils/bcryptjs.js";
import { addUser, getUser } from "../models/users/UserModal.js";
import { Sign_Access_JWT } from "../utils/JWT.js";
import { Auth } from "../middlewares/AuthMiddleware.js";

export const UserRouter = express.Router();

UserRouter.post("/", async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    console.log(req.body.password);

    const user = await addUser(req.body);

    user?._id
      ? res.json({
          user,
          status: "Success",
          message: "New user created",
        })
      : res.json({
          status: "error",
          message: "Unable to create new user",
        });
  } catch (error) {
    let msg = error.message;
    if (msg.includes("E11000 duplicate key error collection")) {
      msg =
        "Email Address already exists please try again with different email";
    }
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

UserRouter.post("/login", async (req, res, next) => {
  try {
    //receive email and password
    const { email, password } = req.body;
    console.log(1000,email, password);
    const user = await getUser(email);

    //verify the password
    if (user?._id) {
      const isPasswordCorrect = comparepassword(password, user.password);

      if (isPasswordCorrect) {
        const JWT_token = Sign_Access_JWT({ email: email });

        user.password = undefined;

        //user authenticated
        if (email && password) {
          res.json({
            stauts: "Success",
            message: "login success",
            user,
            JWT_token,
          });
        }
        return;
      }
    }
    res.status(401).json({
      status: "error",
      error: "Invalid email and password",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

UserRouter.get("/", Auth, (req, res, next) => {
  try {
    const user = req.userInfo;
    res.json({
      status: "success",
      message: "here is the user profile",
      user,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
