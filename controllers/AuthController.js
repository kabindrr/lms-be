import { addUser } from "../models/users/UserModal.js";
import { hashPassword } from "../utils/bcryptjs.js";

export const insertUser = async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);

    const user = await addUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message: "New user registration successful",
        user,
      });
      return;
    }
    res.json({
      status: "error",
      message: "Unable to create new User, Try again later",
    });
  } catch (error) {
    next(error);
  }
};
