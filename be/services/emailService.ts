import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (toEmail: string, fromEmail: string, message: string) => {
    await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: "Message from a constituent",
        text: message,
    });
};
