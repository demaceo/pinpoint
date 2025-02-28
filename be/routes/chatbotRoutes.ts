import express from "express";
import { Request, Response } from "express";
import { getDraft } from "../controllers/chatbotController";

const router = express.Router();

router.post("/draft", async (req: Request, res: Response) => {
    try {
        const draft = await getDraft(req, res);
        if (draft) {
            res.json(draft);
        } else {
            res.status(404).json({ message: "Draft not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
