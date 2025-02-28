const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchOfficials = async (address: string) => {
    const response = await fetch(`${API_BASE_URL}/api/officials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
    });

    return response.json();
};
