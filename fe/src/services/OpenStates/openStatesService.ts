/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENSTATES_API_KEY;
const BASE_URL = "https://v3.openstates.org";

const officialCache = new Map<string, any[]>();
const billCache = new Map<string, any>();
const billDetailsCache = new Map<string, any>();
const officialsCache = new Map<string, any>();

export const fetchOfficials = async (address: string) => {
    if (!address) throw new Error("Address is required");

    // ✅ Check if officials for this address are already cached
    if (officialsCache.has(address)) {
        return officialsCache.get(address);
    }

    try {
        const response = await axios.post(`${BASE_URL}/api/officials`, { address }, {
            headers: { "Content-Type": "application/json" },
        });

        // ✅ Cache the response
        officialsCache.set(address, response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching officials:", error);
        throw error;
    }
};
export const fetchBillDetails = async (openstatesBillId: string) => {
    if (!openstatesBillId) throw new Error("Bill ID is required");

    //  Check if data is already cached
    if (billDetailsCache.has(openstatesBillId)) {
        return billDetailsCache.get(openstatesBillId);
    }

    try {
        const response = await axios.get(`${BASE_URL}/bills/${openstatesBillId}`, {
            params: {
                include: [
                    "sponsorships",
                    "abstracts",
                    "actions",
                    "sources",
                    "documents",
                    "versions",
                    "votes",
                    "related_bills",
                ],
            },
            headers: { "x-api-key": API_KEY },
        });

        // Cache the response
        billDetailsCache.set(openstatesBillId, response.data);

        return response.data;
    } catch (error) {
        console.error("Error fetching bill details:", error);
        throw error;
    }
};

const fetchWithRetry = async (fn: () => Promise<any>, retries = 3, delay = 2000) => {
    try {
        return await fn();
    } catch (error: any) {
        if (error.response?.status === 429 && retries > 0) {
            console.warn(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
            await new Promise((res) => setTimeout(res, delay));
            return fetchWithRetry(fn, retries - 1, delay * 2);
        }
        throw error;
    }
};

//  Fetch Officials (Cache Enabled)
export const fetchOfficialsByState = async (stateAbbr: string) => {
    if (!stateAbbr) throw new Error("State abbreviation is required");

    if (officialCache.has(stateAbbr)) {
        return officialCache.get(stateAbbr);
    }

    const response = await fetchWithRetry(() =>
        axios.get(`${BASE_URL}/people`, {
            params: { jurisdiction: stateAbbr, per_page: 50, include: ["offices", "links"] },
            headers: { "x-api-key": API_KEY },
        })
    );

    officialCache.set(stateAbbr, response.data.results);
    return response.data.results;
};

//  Fetch Bills (Cache Enabled)
export const fetchBillsByJurisdiction = async (jurisdiction: string) => {
    if (!jurisdiction) throw new Error("Jurisdiction is required");

    if (billCache.has(jurisdiction)) {
        return billCache.get(jurisdiction);
    }

    const response = await fetchWithRetry(() =>
        axios.get(`${BASE_URL}/bills`, {
            params: { jurisdiction, per_page: 5, sort: "latest_action_desc" },
            headers: { "x-api-key": API_KEY },
        })
    );

    billCache.set(jurisdiction, response.data.results);
    return response.data.results;
};

export const fetchOfficialsByGeo = async (lat: number, lng: number) => {
    if (!lat || !lng) throw new Error("Latitude and longitude are required");

    try {
        const response = await axios.post(`${BASE_URL}/api/officials/geo`, {
            lat,
            lng,
        }, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching officials by geo:", error);
        throw error;
    }
};