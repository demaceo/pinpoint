import { Request } from "express";
import {
    fetchOfficialsByState,
    fetchOfficialsByGeo,
    fetchBillsByState,
    fetchCommitteesByState,
    // fetchOfficialById
} from "../services/openStatesService.js";

/**
 * Fetch officials by state (Returns data only)
 */
export const getOfficialsByState = async (req: Request) => {
    const { jurisdiction } = req.query;
    if (!jurisdiction) throw new Error("Jurisdiction is required");
    return await fetchOfficialsByState(jurisdiction as string);
};

/**
 * Fetch officials by geolocation (Returns data only)
 */
export const getOfficialsByGeo = async (req: Request) => {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) throw new Error("Latitude and longitude are required");
    return await fetchOfficialsByGeo(latitude as string, longitude as string);
};

/**
 * Fetch bills by state (Returns data only)
 */
export const getBillsByState = async (req: Request) => {
    const { jurisdiction } = req.query;
    if (!jurisdiction) throw new Error("Jurisdiction is required");
    return await fetchBillsByState(jurisdiction as string);
};

/**
 * Fetch committees by state (Returns data only)
 */
export const getCommitteesByState = async (req: Request) => {
    const { jurisdiction } = req.query;
    if (!jurisdiction) throw new Error("Jurisdiction is required");
    return await fetchCommitteesByState(jurisdiction as string);
};
/**
 *Fetch an official by ID, name, or jurisdiction
 */
// export const getOfficialById = async (id?: string, name?: string, jurisdiction?: string) => {
//     if (!id && !name && !jurisdiction) throw new Error("Must provide id, name, or jurisdiction.");
//     return fetchOfficialById(id, name, jurisdiction);
// };