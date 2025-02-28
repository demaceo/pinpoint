import { Request, Response } from "express";
import { moderateContent } from "../services/moderationService";

export const checkContent = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "No text provided" });
        }

        const flagged = await moderateContent(text);
        return res.json({ flagged });
    } catch (error) {
        return res.status(500).json({ error: "Content moderation failed" });
    }
};
