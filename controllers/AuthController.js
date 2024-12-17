import { ResponseClient } from "../middlewares/ResponseClient.js";
import { createNewSession } from "../models/session/SessionModal.js";
import { addUser } from "../models/users/UserModal.js";
import { UserActivationUrlEmail } from "../services/email/EmailServices.js";
import { hashPassword } from "../utils/bcryptjs.js";
import { v4 as uuidv4 } from "uuid";
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
