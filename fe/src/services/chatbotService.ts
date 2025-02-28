export const generateDraft = async (prompt: string) => {
    const response = await fetch("http://localhost:5000/api/chatbot/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return data.draft;
};
