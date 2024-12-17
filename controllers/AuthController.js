import { ResponseClient } from "../middlewares/ResponseClient.js";
import { addUser } from "../models/users/UserModal.js";
import { hashPassword } from "../utils/bcryptjs.js";

export const insertUser = async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);

    const user = await addUser(req.body);
    if (user?._id) {
      const message =
        "We have sent you an email with activation link, Please check your email and follow the instruction to activate your account";
      return ResponseClient({ req, res, message });
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
