import {
  passwordResetOTPSendTemplate,
  UserAccountActivationNotificationTemplate,
  UserActivationUrlEmailTemplate,
  userProfileUpdatedNotificationTemplate,
} from "./EmailTemplate.js";
import { EmailTransporter } from "./Transport.js";

export const UserActivationUrlEmail = async (obj) => {
  //get the transporter
  const transport = EmailTransporter();
  //get the template
  const info = await transport.sendMail(UserActivationUrlEmailTemplate(obj));
  console.log(info.messageId);
  return info.messageId;
  //
};
export const UserActivatedNotificationEmail = async (obj) => {
  //get the transporter
  const transport = EmailTransporter();
  //get the template
  const info = await transport.sendMail(
    UserAccountActivationNotificationTemplate(obj)
  );
  console.log(info.messageId);
  return info.messageId;
  //
};
export const passwordResetOTPSendNotificationEmail = async (obj) => {
  //get the transporter
  const transport = EmailTransporter();
  //get the template
  const info = await transport.sendMail(passwordResetOTPSendTemplate(obj));
  console.log(info.messageId);
  return info.messageId;
  //
};
export const userProfileUpdatedNotificationEmail = async (obj) => {
  //get the transporter
  const transport = EmailTransporter();
  //get the template
  const info = await transport.sendMail(
    userProfileUpdatedNotificationTemplate(obj)
  );
  console.log(info.messageId);
  return info.messageId;
  //
};
