import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const moderateContent = async (text: string) => {
    const response = await axios.post(
        "https://api.openai.com/v1/moderations",
        { input: text },
        { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    return response.data.results[0].flagged;
};
