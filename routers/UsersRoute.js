import express from "express";
import { ResponseClient } from "../middlewares/ResponseClient.js";

import { userAuthMiddleWare } from "../middlewares/AuthMiddleWare.js";

const UserRouter = express.Router();

UserRouter.get("/profile", userAuthMiddleWare, async (req, res) => {
  const user = req.userInfo;
  user.password = undefined;
  user.__v = undefined;
  user.refreshJWT = undefined;

  return ResponseClient({
    req,
    res,
    message: "User Profile",
    payload: user,
  });
});

export default UserRouter;
