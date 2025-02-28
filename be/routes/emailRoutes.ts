import express from "express";
import { Request, Response } from "express";
import { contactOfficial } from "../controllers/emailController";

const router = express.Router();

// router.post("/send", contactOfficial);

router.post("/send", async (req: Request, res: Response) => {
    try {
        const draft = await contactOfficial(req, res);
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
