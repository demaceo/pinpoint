import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GOOGLE_CIVIC_API_URL = "https://www.googleapis.com/civicinfo/v2/representatives";
const API_KEY = process.env.GOOGLE_CIVIC_API_KEY;

export const fetchOfficials = async (address: string) => {
    const response = await axios.get(GOOGLE_CIVIC_API_URL, {
        params: { address, key: API_KEY },
    });
    return response.data;
};
