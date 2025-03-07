import { Request, Response } from "express";
import { fetchOfficialsByState, fetchOfficialsByGeo, fetchBillsByState, fetchCommitteesByState } from "../services/openStatesService.js";

/**
 * Controller to fetch elected officials by state.
 */
export const getOfficialsByState = async (req: Request, res: Response): Promise<Response> => {
    const { jurisdiction } = req.query;
    if (!jurisdiction) return res.status(400).json({ error: "Jurisdiction is required" });

    try {
        const officials = await fetchOfficialsByState(jurisdiction as string);
        return res.json(officials);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    return res.status(500).json({ error: "Unexpected error" });
};

/**
 * Controller to fetch elected officials by geolocation.
 */
export const getOfficialsByGeo = async (req: Request, res: Response): Promise<Response> => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) return res.status(400).json({ error: "Latitude and Longitude are required" });

    try {
        const officials = await fetchOfficialsByGeo(latitude as string, longitude as string);
        return res.json(officials);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    return res.status(500).json({ error: "Unexpected error" });
};

/**
 * Controller to fetch bills for a state.
 */
export const getBillsByState = async (req: Request, res: Response): Promise<Response> => {
    const { jurisdiction } = req.query;
    if (!jurisdiction) return res.status(400).json({ error: "Jurisdiction is required" });

    try {
        const bills = await fetchBillsByState(jurisdiction as string);
        return res.json(bills);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    return res.status(500).json({ error: "Unexpected error" });
};

/**
 * Controller to fetch committees for a state.
 */
export const getCommitteesByState = async (req: Request, res: Response): Promise<Response> => {
    const { jurisdiction } = req.query;
    if (!jurisdiction) return res.status(400).json({ error: "Jurisdiction is required" });

    try {
        const committees = await fetchCommitteesByState(jurisdiction as string);
        return res.json(committees);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
    return res.status(500).json({ error: "Unexpected error" });
};
