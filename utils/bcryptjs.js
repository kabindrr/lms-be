import bcryptjs from "bcryptjs";
const saltRound = 5;

// hashpassword
export const hashPassword = (plainPass) => {
  return bcryptjs.hashSync(plainPass, saltRound);
};

//comparepassword
export const comparepassword = (plainPass, hashPassword) => {
  return bcryptjs.compareSync(plainPass, hashPassword);
};
