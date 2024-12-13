import { getUser } from "../models/users/UserModal.js";
import { Verify_Access_JWT } from "../utils/JWT.js";

export const Auth = async (req, res, next) => {
  try {
    //create auth middleware

    //get user email from the token
    const { authorization } = req.headers;
    console.log(authorization);
    const result = Verify_Access_JWT(authorization);
    console.log(5000, result);

    if (result?.email) {
      //if the user is exist extract email from database

      const user = await getUser(result.email);
      if (user?._id) {
        // store userinfo in req.headers
        user.password = undefined;
        req.userInfo = user;
        return next();
      }
    }
    res.status(500).json({
      status: "error",
      message: "unauthorized",
    });
  } catch (error) {
    res.status(500).json({
      staus: "error",
      message: error.message,
    });
  }
};
