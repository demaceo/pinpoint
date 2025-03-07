import { Request, Response } from "express";
import { moderateContent } from "../services/moderationService.js";

export const checkContent = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    try {
        const flagged = await moderateContent(text);
        if (!flagged) return res.status(404).json({ error: "No issues found in the content" });
        res.json({ flagged });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Content moderation failed" });
    }
};
    