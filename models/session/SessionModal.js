import SessionSchema from "./SessionSchema.js";

//create new session
export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};

export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};
