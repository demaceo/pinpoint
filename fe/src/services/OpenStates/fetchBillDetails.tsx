import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENSTATES_API_KEY; // Ensure API Key is set in .env
const BASE_URL = "https://v3.openstates.org";

/**
 * Fetch bill details from OpenStates API.
 * @param {string} openstatesBillId - The unique OpenStates bill ID (UUID format).
 * @returns {Promise<any>} - Detailed bill data.
 */
export const fetchBillDetails = async (openstatesBillId: string) => {
  if (!openstatesBillId) throw new Error("Bill ID is required");

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
      headers: {
        "x-api-key": API_KEY, // Pass API Key in headers
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching bill details:", error);
    throw error;
  }
};
