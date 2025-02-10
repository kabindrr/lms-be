export const UserActivationUrlEmailTemplate = ({ email, name, url }) => {
  console.log(email);
  return {
    from: `Local Library <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Action Required - Activate your new Account",
    text: `Hello to ${name} please follow the link to activate your account! ${url}`,
    html: `
    <br />
<br />
<p>Your account has been created. Click the button below to activate your account</p>
<br />
<br />
<a href = ${url}>
<button style="background: green; color: white; padding: 2rem">Activate Now</button></a>
<br />
<br />
    
    `,
  };
};
export const passwordResetOTPSendTemplate = ({ email, name, otp }) => {
  console.log(email);
  return {
    from: `Local Library <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your OTP to reset Password, Please do not share OTP with anyone.",
    text: `Dear ${name} Here is your OTP to reset the password. OTP ${otp}.  This OTP will expire in 5 minutes`,
    html: `
    <br />
<br />
<p>Dear ${name} Here is your OTP to reset the password. OTP ${otp}.  This OTP will expire in 5 minutes</p>
<br />
<br />


<br />
<br />
    
    `,
  };
};
export const UserAccountActivationNotificationTemplate = ({ email, name }) => {
  console.log(email);
  return {
    from: `Local Library <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your account is now Active, You may login now",
    text: `Hello to ${name} Your account is ready to use, you may login now`,
    html: `
    <br />
<br />
<p>Your account is Ready to use now, You may login now</p>
<br />
<br />


<br />
<br />
    
    `,
  };
};
export const userProfileUpdatedNotificationTemplate = ({ email, name }) => {
  console.log(email);
  return {
    from: `Local Library <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your account has been updated",
    text: `Hello  ${name} Your account has been updated, If this wasn't you, Change your password and contact us immediately`,
    html: `
    <br />
<br />
<p> Your account has been updated, If this wasn't you, Change your password and contact us immediately</p>
<br />
<br />


<br />
<br />
    
    `,
  };
};
