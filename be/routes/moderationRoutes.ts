import express from "express";
import { Request, Response } from "express";
import { checkContent } from "../controllers/moderationController";

const router = express.Router();
// router.post("/check", checkContent);
router.post("/check", async (req: Request, res: Response) => {
    try {
        const content = await checkContent(req, res);
        if (content) {
            res.json(content);
        } else {
            res.status(404).json({ message: "Content not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;
