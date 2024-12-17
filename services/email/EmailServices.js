import { UserActivationUrlEmailTemplate } from "./EmailTemplate.js";
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
