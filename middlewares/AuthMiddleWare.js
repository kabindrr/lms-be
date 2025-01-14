import { getSession } from "../models/session/SessionModal.js";
import { getUserByEmail } from "../models/users/UserModal.js";
import { Verify_Access_JWT } from "../utils/JWT.js";
import { ResponseClient } from "./ResponseClient.js";

export const userAuthMiddleWare = async (req, res, next) => {
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
          req.userInfo = user;
          return next();
        }
      }
    }
    message = decoded === "jwt expired" ? decoded : "Unauthorized";
  }

  ResponseClient({ req, res, message, statusCode: 401 });
};
