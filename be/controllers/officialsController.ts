import { Request, Response } from "express";
import { fetchOfficials } from "../services/officialsService.js";
// const { fetchOfficials } = require("../services/officialsService");

export const getOfficials = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { address } = req.body;
        if (!address) {
            return res.status(400).json({ error: "Address is required" });
        }

        const data = await fetchOfficials(address);
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch officials" });
    }
};
