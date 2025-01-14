import express from "express";
import { ResponseClient } from "../middlewares/ResponseClient.js";
import { Verify_Access_JWT } from "../utils/JWT.js";
import { token } from "morgan";
import { getSession } from "../models/session/SessionModal.js";
import { getUserByEmail } from "../models/users/UserModal.js";

const UserRouter = express.Router();

UserRouter.get("/profile", async (req, res) => {
  // get access JWT
  const { authorization } = req.headers;
  let message = "Unauthorized";

  if (authorization) {
    const token = authorization.split(" ")[1];

    //check if the token is valid
    const decoded = Verify_Access_JWT(token);

    //check if it exist in session table
    if (decoded.email) {
      const tokenSession = await getSession({ token });

      if (tokenSession?._id) {
        //get user by email
        const user = await getUserByEmail(decoded.email);
        //return the user back to frontend
        if (user?._id && user.isVerified === true) {
          return ResponseClient({
            req,
            res,
            message: "User Profile",
            payload: user,
          });
        }
      }
    }
    message = decoded === "jwt expired" ? decoded : "Unauthorized";
  }

  ResponseClient({ req, res, message, statusCode: 401 });
});

export default UserRouter;
