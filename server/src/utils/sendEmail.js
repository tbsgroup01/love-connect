import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, text, html }) => {
  return await transporter.sendMail({
    from: `"LoveConnect" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
};
