const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const generateDraft = async (prompt: string) => {
    const response = await fetch(`${API_BASE_URL}/api/chatbot/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error(`Failed to generate draft: ${response.statusText}`);
    }

    const data = await response.json();
    return data.draft;
};
