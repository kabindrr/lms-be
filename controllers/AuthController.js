import { ResponseClient } from "../middlewares/ResponseClient.js";
import {
  createNewSession,
  deleteManySession,
  deleteSession,
} from "../models/session/SessionModal.js";
import {
  addUser,
  getUserByEmail,
  updateUser,
} from "../models/users/UserModal.js";
import {
  UserActivatedNotificationEmail,
  UserActivationUrlEmail,
} from "../services/email/EmailServices.js";
import { comparepassword, hashPassword } from "../utils/bcryptjs.js";
import { v4 as uuidv4 } from "uuid";
import { getJWTs } from "../utils/JWT.js";
export const insertUser = async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);

    const user = await addUser(req.body);
    if (user?._id) {
      //create an unique user activation link and send to their email

      const session = await createNewSession({
        token: uuidv4(),
        associaton: user.email,
      });

      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;
        //send this url to the email
        console.log(url);
        const emailId = await UserActivationUrlEmail({
          email: user.email,
          url,
          name: user.fName,
        });
        if (emailId) {
          const message =
            "We have sent you an email with activation link, Please check your email and follow the instruction to activate your account";
          return ResponseClient({ req, res, message });
        }
      }
    }

    throw new Error("Unable to create an account,try again later");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "This email already exist for another user, use different email and try again later";
      error.statusCode = 400;
    }
    next(error);
  }
};

export const activateUser = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;
    console.log(sessionId, t);

    const session = await deleteSession({ _id: sessionId, token: t });
    if (session?._id) {
      //update user to active
      const user = await updateUser(
        { email: session.associaton },
        { isVerified: "true" }
      );

      if (user?._id) {
        //respond back to frontend

        //send email notification
        UserActivatedNotificationEmail({ email: user.email, name: user.fName });

        const message = "Your account has been activated, you may login now ";
        return ResponseClient({ req, res, message });
      }
    }
    const message = "Invalid link or token expired";
    const statusCode = 400;
    ResponseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    //get user by email

    const user = await getUserByEmail(email);

    if (!user?._id) {
      // User does not exist
      const message = "Invalid login details";
      const statusCode = 401;
      return ResponseClient({ req, res, message, statusCode });
    }

    //compare password
    if (user?._id) {
      const isPasswordCorrect = comparepassword(password, user.password);

      if (!isPasswordCorrect) {
        // Incorrect password
        const message = "Invalid login details";
        const statusCode = 401;
        return ResponseClient({ req, res, message, statusCode });
      }

      if (isPasswordCorrect) {
        console.log("User authenticated");

        //create jwts
        const jwts = await getJWTs(email);

        return ResponseClient({
          req,
          res,
          message: "Login Successful",
          payload: jwts,
        });
      }
    }

    //respons jwts
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    //get the token,
    //update refreshJWT to empty
    const { email } = req.userInfo;
    await updateUser({ email }, { refreshJWT: "" });
    //remove the accessJWT from session table

    await deleteManySession({ associaton: email });
    ResponseClient({ req, res, message: "you are logged out" });
  } catch (error) {
    next(error);
  }
};
