import SessionSchema from "./SessionSchema.js";

//create new session
export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};
