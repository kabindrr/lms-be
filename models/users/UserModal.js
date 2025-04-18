import UserSchema from "./UserSchema.js";

export const addUser = (userObj) => {
  return UserSchema(userObj).save();
};

export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};
export const getOneUser = (filter) => {
  return UserSchema.findOne(filter);
};
export const updateUser = (filter, update) => {
  return UserSchema.findOneAndUpdate(filter, update, { new: true });
};
