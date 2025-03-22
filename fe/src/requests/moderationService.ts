export const moderateContent = async (text: string) => {
    const response = await fetch("http://localhost:5000/api/moderation/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return data.flagged;
};
