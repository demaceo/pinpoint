import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const generateDraft = async (prompt: string): Promise<string> => {
    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-4",
            messages: [
                { role: "system", content: "Help draft a professional message to a government official." },
                { role: "user", content: prompt },
            ],
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        }
    );

    return response.data.choices[0].message.content;
};
