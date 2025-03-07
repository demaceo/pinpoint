import  express  from "express";
import { Request, Response } from "express";

import { getOfficialsByState, getOfficialsByGeo, getBillsByState, getCommitteesByState } from "../controllers/openStatesController.js";

const router = express.Router();

// router.get("/officials/state", getOfficialsByState);
// router.get("/officials/geo", getOfficialsByGeo);
// router.get("/bills", getBillsByState);
// router.get("/committees", getCommitteesByState);


router.get("/officials/state", async (req: Request, res: Response) => {
    try {
        const officials = await getOfficialsByState(req, res);
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

router.get("/officials/geo", async (req: Request, res: Response) => {
    try {
        const officials = await getOfficialsByGeo(req, res);
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

router.get("/bills", async (req: Request, res: Response) => {
    try {
        const bills = await getBillsByState(req, res);
        if (bills) {
            res.json(bills);
        } else {
            res.status(404).json({ message: "bills not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/committees", async (req: Request, res: Response) => {
    try {
        const committees = await getCommitteesByState(req, res);
        if (committees) {
            res.json(committees);
        } else {
            res.status(404).json({ message: "committees not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
