export const fetchOfficials = async (address: string) => {
    const response = await fetch("http://localhost:5000/api/officials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
    });
    return response.json();
};
