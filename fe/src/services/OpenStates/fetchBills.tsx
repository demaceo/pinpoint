/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { FetchBillsParams } from "../../assets/types";

const API_KEY = import.meta.env.VITE_OPENSTATES_API_KEY; // Ensure API Key is set in env variables
const BASE_URL = "https://v3.openstates.org/bills";

/**
 * Fetch bills from OpenStates API with the given filters.
 * @param {string} jurisdiction - Required jurisdiction name or ID.
 * @param {string} session - Optional session identifier.
 * @param {string} chamber - Optional chamber (e.g., "upper", "lower").
 * @param {string[]} identifiers - Optional array of bill identifiers.
 * @param {string} classification - Optional classification (e.g., "bill", "resolution").
 * @param {string} sponsor - Optional sponsor name or ID.
 * @param {string} sort - Sort order (default: "updated_desc").
 * @param {number} page - Page number (default: 1).
 * @param {number} perPage - Number of results per page (default: 10).
 * @returns {Promise<any>} - API response containing bills.
 */


export const fetchBills = async ({
  jurisdiction,
  session = "",
  chamber = "",
  identifiers = [],
  classification = "",
  sponsor = "",
  sort = "updated_desc",
  page = 1,
  perPage = 10,
}: FetchBillsParams): Promise<any> => {
  if (!jurisdiction) {
    throw new Error("Jurisdiction is required to fetch bills.");
  }

  const params: Record<string, any> = {
    jurisdiction,
    session,
    chamber,
    classification,
    sponsor,
    sort,
    page,
    per_page: perPage,
    include: ["sponsorships", "abstracts", "actions", "sources"], // Additional details
  };

  // Add identifiers if provided
  if (identifiers.length > 0) {
    params.identifier = identifiers;
  }

  try {
    const response = await axios.get(BASE_URL, {
      params,
      headers: {
        "x-api-key": API_KEY, // API key in header
      },
    });

    return response.data; // Return API response
  } catch (error) {
    console.error("Error fetching bills:", error);
    throw error;
  }
};
