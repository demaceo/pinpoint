import nodemailer from "nodemailer";
import dotenv from "dotenv";
// const { nodemailer } = require("nodemailer");
// const { dotenv } = require("dotenv")
dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (toEmail: string, fromEmail: string, message: string): Promise<void> => {
    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: "Message from a constituent",
        text: message,
    };

    await transporter.sendMail(mailOptions);
};
