/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";

import { OpenStatesResponse } from "../assets/types";

const API_KEY = import.meta.env.VITE_OPENSTATES_API_KEY;
const BASE_URL = "https://v3.openstates.org";

const officialCache = new Map<string, any[]>();
const billCache = new Map<string, any>();
const billDetailsCache = new Map<string, any>();
const officialsCache = new Map<string, any>();

export const fetchWithRetry = async (
    fn: () => Promise<any>,
    retries = 3,
    delay = 1000
): Promise<any> => {
    try {
        return await fn();
    } catch (error: any) {
        const isRateLimit = error.response?.status === 429;
        const detailMessage = error.response?.data?.detail || error.message;

        if (isRateLimit && retries > 0) {
            console.warn(`⚠️🧨FRONTEND/OPENSTATESSERVICE.TS⚠️🧨 Rate limit: ${detailMessage} — retrying in ${delay / 1000}s...⚠️🧨FRONTEND/OPENSTATESSERVICE.TS⚠️🧨`);
            await new Promise((res) => setTimeout(res, delay));
            return fetchWithRetry(fn, retries - 1, delay * 2);
        }
        // 🧨 Final throw, detail included
        throw new Error(detailMessage || "API request failed");
    }
};


export const fetchOfficials = async (address: string) => {
    if (!address) throw new Error("Address is required");

    if (officialsCache.has(address)) {
        return officialsCache.get(address);
    }

    try {
        // const response = await axios.post(`${BASE_URL}/api/officials`, { address }, {
        //     headers: { "Content-Type": "application/json" },
        // });
        // const data = await response.json();

        const response = await fetch(
            `${BASE_URL}/api/people?jurisdiction=${address}&apikey=${API_KEY}&per_page=50`,
        );
        const data = await response.json();
        officialsCache.set(address, data);
        return data;
    } catch (error) {
        console.error("Error fetching officials:", error);
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

    // const response = await
    // fetchWithRetry(() =>
    // axios.get(`${BASE_URL}/people`, {
    // params: { jurisdiction: stateAbbr, per_page: 50, include: ["offices", "links"] },
    // headers: { "x-api-key": API_KEY },
    // })
    // );

    const response = await fetch(
        `https://v3.openstates.org/people?jurisdiction=${stateAbbr}&apikey=${API_KEY}&per_page=50`,
    );
    const data = await response.json();
    console.log('data', data)
    officialCache.set(stateAbbr, data);
    return data;
};

export const fetchBillsByJurisdiction = async (jurisdiction: string) => {
    if (!jurisdiction) throw new Error("Jurisdiction is required");

    if (billCache.has(jurisdiction)) {
        return billCache.get(jurisdiction);
    }

    // const response = await
    // fetchWithRetry(() =>
    // axios.get(`${BASE_URL}/bills`, {
    // params: { jurisdiction, per_page: 5, sort: "latest_action_desc" },
    // headers: { "x-api-key": API_KEY },
    // })
    // );

    const response = await fetch(
        `https://v3.openstates.org/bills?jurisdiction=${jurisdiction}&apikey=${API_KEY}&per_page=10&sort=latest_action_desc`,
    );
    const data = await response.json();

    billCache.set(jurisdiction, data.results);
    return data.results;
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


export const fetchBillDetails = async (openstatesBillId: string) => {
    if (!openstatesBillId) throw new Error("Bill ID is required");

    if (billDetailsCache.has(openstatesBillId)) {
        return billDetailsCache.get(openstatesBillId);
    }

    try {
        // const response = await axios.get(`${BASE_URL}/bills/${openstatesBillId}`, {
        //     params: {
        //         include: [
        //             "sponsorships",
        //             "abstracts",
        //             "actions",
        //             "sources",
        //             "documents",
        //             "versions",
        //             "votes",
        //             "related_bills",
        //         ],
        //     },
        //     headers: { "x-api-key": API_KEY },
        const response = await fetch(
            `https://v3.openstates.org/bills?${openstatesBillId}?apikey=${API_KEY}&include=sponsorships,abstracts,actions,sources,documents,versions,votes,related_bills`
        ).then(async (response) => {
            if (!response.ok) throw new Error(`Failed to fetch bill details: ${response.statusText}`);
            const data = await response.json();
            return data;
        });
        billDetailsCache.set(openstatesBillId, response);
        return response;
    } catch (error) {
        console.error("Error fetching bill details:", error);
        throw error;
    }
};

export const fetchOfficialsByGeo = async (lat: number, lng: number) => {
    try {
        // const response = await axios.post(`${BASE_URL}/proxy/officials/geo`, {
        //     latitude,
        //     longitude
        // });
        // const response = await axios.get(`${BASE_URL}/people.geo`, {
        //     params: { lat, lng, per_page: 50, include: ["other_names", "other_identifiers", "sources", "offices", "links"] },
        //     headers: { "x-api-key": API_KEY },
        // })

        const response = await fetch(
            `https://v3.openstates.org/people.geo?lat=${lat}&lng=${lng}&apikey=${API_KEY}&per_page=50`,
        );

        console.log("Response from fetchOfficialsByGeo:", response);

        if (!response.ok) throw new Error(`Failed to fetch officials by geo: ${response.statusText}`);
        // const data = await response.json();
        console.log("RESPONSE fetched from fetchOfficialsByGeo:", response);
        const data = await response.json();
        console.log("DATA fetched from fetchOfficialsByGeo:", data);
        return data;
    } catch (error) {
        console.error("Error fetching officials by geo:", error);
        throw error;
    }
};