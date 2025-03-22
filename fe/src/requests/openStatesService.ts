/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENSTATES_API_KEY;
const BASE_URL = "https://v3.openstates.org";

const officialCache = new Map<string, any[]>();
const billCache = new Map<string, any>();
const billDetailsCache = new Map<string, any>();
const officialsCache = new Map<string, any>();

export const fetchWithRetry = async (
    fn: () => Promise<any>,
    retries = 1,
    delay = 5000
): Promise<any> => {
    try {
        return await fn();
    } catch (error: any) {
        const isRateLimit = error.response?.status === 429;

        if (isRateLimit && retries > 0) {
            const detail = error.response?.data?.detail || "Rate limit exceeded";
            console.warn(`⚠️ 429: ${detail}. Retrying in ${delay / 1000}s...`);
            await new Promise((res) => setTimeout(res, delay));
            return fetchWithRetry(fn, retries - 1, delay * 2);
        }
        // ✅ Propagate message to be handled in UI
        if (isRateLimit) {
            const detail = error.response?.data?.detail || "Rate limit exceeded";
            throw new Error(detail);
        }
        throw error;
    }
};

export const fetchOfficials = async (address: string) => {
    if (!address) throw new Error("Address is required");

    if (officialsCache.has(address)) {
        return officialsCache.get(address);
    }

    try {
        const response = await axios.post(`${BASE_URL}/api/officials`, { address }, {
            headers: { "Content-Type": "application/json" },
        });
        officialsCache.set(address, response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching officials:", error);
        throw error;
    }
};

export const fetchBillDetails = async (openstatesBillId: string) => {
    if (!openstatesBillId) throw new Error("Bill ID is required");

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
        billDetailsCache.set(openstatesBillId, response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching bill details:", error);
        throw error;
    }
};

// const fetchWithRetry = async (fn: () => Promise<any>, retries = 1, delay = 2000) => {
//     try {
//         return await fn();
//     } catch (error: any) {
//         if (error.response?.status === 429 && retries > 0) {
//             console.warn(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
//             await new Promise((res) => setTimeout(res, delay));
//             return fetchWithRetry(fn, retries - 1, delay * 2);
//         }
//         throw error;
//     }
// };

export const fetchOfficialsByState = async (stateAbbr: string) => {
    if (!stateAbbr) throw new Error("State abbreviation is required");

    if (officialCache.has(stateAbbr)) {
        return officialCache.get(stateAbbr);
    }

    const response = await
        // fetchWithRetry(() =>
        axios.get(`${BASE_URL}/people`, {
            params: { jurisdiction: stateAbbr, per_page: 50, include: ["offices", "links"] },
            headers: { "x-api-key": API_KEY },
        })
    // );

    officialCache.set(stateAbbr, response.data.results);
    return response.data.results;
};

export const fetchBillsByJurisdiction = async (jurisdiction: string) => {
    if (!jurisdiction) throw new Error("Jurisdiction is required");

    if (billCache.has(jurisdiction)) {
        return billCache.get(jurisdiction);
    }

    const response = await
        // fetchWithRetry(() =>
        axios.get(`${BASE_URL}/bills`, {
            params: { jurisdiction, per_page: 5, sort: "latest_action_desc" },
            headers: { "x-api-key": API_KEY },
        })
    // );

    billCache.set(jurisdiction, response.data.results);
    return response.data.results;
};

// export const fetchOfficialsByGeo = async (latitude: number, longitude: number) => {
//     try {
//         const response = await axios.post(
//             `${BASE_URL}/api/officials/geo`,
//             { latitude, longitude },
//             {
//                 headers: {
//                     "Authorization": `Bearer ${API_KEY}`,
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                 },
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching officials by geo:", error);
//         throw error;
//     }
// };

export const fetchOfficialsByGeo = async (latitude: number, longitude: number) => {
    try {
        // const response = await axios.post(`${BASE_URL}/proxy/officials/geo`, {
        //     latitude,
        //     longitude
        // });


        const response = await axios.get(`${BASE_URL}/officials/geo`, {
            params: { latitude, longitude, per_page: 50, include: ["offices", "links"] },
            headers: { "x-api-key": API_KEY },
        })


        return response.data;
    } catch (error) {
        console.error("Error fetching officials by geo:", error);
        throw error;
    }
};