import { getSession } from "../models/session/SessionModal.js";
import { getOneUser, getUserByEmail } from "../models/users/UserModal.js";
import { Sign_Access_JWT, Verify_Access_JWT, Verify_Refresh_JWT } from "../utils/JWT.js";
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

export const renewaccessJWTMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";
  //get accessJWT
  if (authorization) {
    const token = authorization.split(" ")[1];

    //check if the token is valid
    const decoded = Verify_Refresh_JWT(token);

    if (decoded.email) {
      //check user in userTable
      const user = await getOneUser({
        email: decoded.email,
        refreshJWT: token,
      });

      if (user?._id) {
        //create new accessJWT
        const newToken = await Sign_Access_JWT(decoded.email);

        //return accessJWT
        return ResponseClient({
          req,
          res,
          message: "here is the accessJWT",
          payload: newToken,
        });
      }
    }
  }

  ResponseClient({ req, res, message, statusCode: 401 });
};
