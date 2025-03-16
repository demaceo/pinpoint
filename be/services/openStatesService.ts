import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENSTATES_API_URL = "https://v3.openstates.org";
const API_KEY = process.env.OPENSTATES_API_KEY;

const apiClient = axios.create({
    baseURL: OPENSTATES_API_URL,
    headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
    },
});



/**
 * Fetch elected officials by state.
 */
export const fetchOfficialsByState = async (jurisdiction: string) => {
    try {
        const response = await apiClient.get("/people", {
            params: { jurisdiction, per_page: 50 },
        });
        return response.data.results;
    } catch (error: any) {
        console.error("Open States API Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch officials from Open States API");
    }
};

/**
 * Fetch elected officials by geolocation.
 */
export const fetchOfficialsByGeo = async (latitude: string, longitude: string) => {
    try {
        const response = await apiClient.get("/people.geo", {
            params: { lat: latitude, lng: longitude, per_page: 50 },
        });
        return response.data.results;
    } catch (error: any) {
        console.error("Open States API Error:", error.response?.data || error.message);

        throw new Error("Failed to fetch officials by geolocation");
    }
};

/**
 * Fetch recent bills for a jurisdiction.
 */
export const fetchBillsByState = async (jurisdiction: string) => {
    try {
        const response = await apiClient.get("/bills", {
            params: { jurisdiction },
        });
        return response.data.results;
    } catch (error) {
        throw new Error("Failed to fetch bills");
    }
};

/**
 * Fetch committees for a jurisdiction.
 */
export const fetchCommitteesByState = async (jurisdiction: string) => {
    try {
        const response = await apiClient.get("/committees", {
            params: { jurisdiction },
        });
        return response.data.results;
    } catch (error) {
        throw new Error("Failed to fetch committees");
    }
};
/**
 * Fetch an official by ID, Name, or Jurisdiction
 */
// export const fetchOfficialById = async (id?: string, name?: string, jurisdiction?: string) => {
//     const queryParams = new URLSearchParams();

//     if (id) queryParams.append("id", id);
//     if (name) queryParams.append("name", name);
//     if (jurisdiction) queryParams.append("jurisdiction", jurisdiction);

//     const response = await apiClient.get(`/people?${queryParams.toString()}`);

//     return response.data.results.length ? response.data.results[0] : null;
// };