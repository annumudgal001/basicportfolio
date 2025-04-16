import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "annuronitmudgal2@gmail.com",
    pass: process.env.MAIL_PASS,
  },
});

export async function sendMail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: '"Annu-Mudgal👻" <annuronitmudgal2@gmail.com>',
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}