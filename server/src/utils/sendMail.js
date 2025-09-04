import { transporter } from "../config/mailer.js";

export const sendResetEmail = async (to, url, isNewUser = false) => {
  const subject = isNewUser ? "Welcome! Set your password" : "Password Reset Request";

  const actionText = isNewUser ? "Set Password" : "Reset Password";
  const description = isNewUser
    ? "Welcome aboard! Please click the button below to set your password and activate your account."
    : "We received a request to reset your password. If you did not make this request, you can ignore this email.";

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #6b46c1;">${subject}</h2>
      <p>${description}</p>
      <p style="text-align: center; margin: 20px 0;">
        <a href="${url}" style="background:#6b46c1;color:white;padding:12px 18px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:bold;">
          ${actionText}
        </a>
      </p>
      <p>This link will expire in <b>1 hour</b>.</p>
      <p style="font-size: 12px; color: #888;">If the button above doesn't work, copy and paste this URL into your browser:</p>
      <p style="font-size: 12px; word-break: break-all;">${url}</p>
    </div>
  `;

  await transporter.sendMail({
    to,
    from: process.env.EMAIL_FROM,
    subject,
    html,
  });
};
