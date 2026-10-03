import nodemailer from "nodemailer";

/**
 * Creates Nodemailer transporter using ONLY .env email credentials
 */
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS
    ? process.env.EMAIL_PASS.replace(/\s+/g, "")
    : "";

  if (!emailUser || !emailPass) {
    throw new Error("EMAIL_USER or EMAIL_PASS is not configured in .env");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

/**
 * Sends email using only .env credentials
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = createTransporter();
  const fromEmail = process.env.EMAIL_USER;

  return await transporter.sendMail({
    from: `"LoveConnect" <${fromEmail}>`,
    to,
    subject,
    text,
    html,
  });
};
