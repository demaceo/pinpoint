import { Request, Response } from "express";
// const { generateDraft } = require("../services/chatbotService");
import { generateDraft } from "../services/chatbotService.js";
export const getDraft = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "No prompt provided" });
        }

        const draft = await generateDraft(prompt);
        return res.json({ draft });
    } catch (error) {
        return res.status(500).json({ error: "Failed to generate draft" });
    }
};
