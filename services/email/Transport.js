import nodemailer from "nodemailer";
// import { config } from "../../config/config.js";

export const EmailTransporter = () => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
};
