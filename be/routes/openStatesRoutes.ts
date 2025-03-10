import express from "express";
import { Request, Response } from "express";

import {
    getOfficialsByState, getOfficialsByGeo, getBillsByState, getCommitteesByState,
    // getOfficialById 
} from "../controllers/openStatesController.js";

const router = express.Router();

// router.get("/officials/state", getOfficialsByState);
// router.get("/officials/geo", getOfficialsByGeo);
// router.get("/bills", getBillsByState);
// router.get("/committees", getCommitteesByState);


router.get("/officials/state", async (req: Request, res: Response) => {
    try {
        const officials = await getOfficialsByState(req);
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
        const officials = await getOfficialsByGeo(req);
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
        const bills = await getBillsByState(req);
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
        const committees = await getCommitteesByState(req);
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

/**
 * ✅ Fetch an official by ID, name, or jurisdiction
 */
// router.get("/officials", async (req: Request, res: Response) => {
//     try {
//         const { id, name, jurisdiction } = req.query;

//         if (!id && !name && !jurisdiction) {
//             res.status(400).json({ error: "Must provide id, name, or jurisdiction." });
//         }

//         const official = await getOfficialById(id as string, name as string, jurisdiction as string);

//         if (!official) {
//             res.status(404).json({ message: "Official not found" });
//         }

//         res.json(official);
//     } catch (error) {
//         console.error("Error fetching official:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


export default router;
