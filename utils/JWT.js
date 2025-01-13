import JWT from "jsonwebtoken";
import { createNewSession } from "../models/session/SessionModal.js";
import { updateUser } from "../models/users/UserModal.js";

export const Sign_Access_JWT = async (email) => {
  //create
  const token = JWT.sign({ email }, process.env.JWT_Access_Secret, {
    expiresIn: "1d",
  });

  //store
  const obj = {
    token,
    association: email,
    expire: new Date(Date.now() + 3600000),
  };
  const newSession = await createNewSession(obj);
  return newSession?._id ? token : null;
};

export const Verify_Access_JWT = (token) => {
  try {
    return JWT.verify(token, process.env.JWT_Access_Secret);
  } catch (error) {
    console.log(error.message);
  }
};

export const Create_Refresh_JWT = async (email) => {
  //create
  const refreshJWT = JWT.sign({ email }, process.env.JWT_refresh_Secret, {
    expiresIn: "30d",
  });

  //store
  console.log(4000, refreshJWT);
  const user = await updateUser({ email }, { refreshJWT });
  console.log(5000, user);
  return user?._id ? refreshJWT : null;
};

export const getJWTs = async (email) => {
  return {
    accessJWT: await Sign_Access_JWT(email),
    refreshJWT: await Create_Refresh_JWT(email),
  };
};
