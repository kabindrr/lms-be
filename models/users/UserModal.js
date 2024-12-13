import UserSchema from "./UserSchema.js";

export const addUser = (userObj) => {
  return UserSchema(userObj).save();
};

export const getUser = (email) => {
  return UserSchema.findOne({ email });
};
