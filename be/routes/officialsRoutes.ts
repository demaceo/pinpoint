import express from "express";
// const {express} = require("express");
import { Request, Response } from "express";
import { getOfficials } from "../controllers/officialsController.js";
// const { getOfficials } = require("../controllers/officialsController");

const router = express.Router();
// router.post("/", getOfficials);

router.post("/", async (req: Request, res: Response) => {
    try {
        const officials = await getOfficials(req, res);
        if (officials) {
            res.json(officials);
        } else {
            res.status(404).json({ message: "officials not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// router.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
// });

// router.use((req, res) => {
//     res.status(404).json({ error: "Not found" });
// });

export default router;
