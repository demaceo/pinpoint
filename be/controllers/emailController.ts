import { Request, Response } from "express";
// const { sendEmail } = require("../services/emailService");
import {sendEmail}  from "../services/emailService.js";

export const contactOfficial = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { toEmail, fromEmail, message } = req.body;
        if (!toEmail || !fromEmail || !message) {
            return res.status(400).json({ error: "Missing fields" });
        }

        await sendEmail(toEmail, fromEmail, message);
        return res.json({ success: "Email sent successfully!" });
    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({ error: "Failed to send email" });
    }
};
