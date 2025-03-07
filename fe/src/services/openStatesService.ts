const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Load API base URL from .env
/**
 * Fetch elected officials by state.
 */
export const fetchOfficialsByState = async (state: string) => {
    const response = await fetch(`${API_BASE_URL}/api/openstates/officials/state?jurisdiction=${state}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch officials: ${response.statusText}`);
    }
    return response.json();
};

/**
 * Fetch elected officials by geolocation.
 */
export const fetchOfficialsByGeo = async (latitude: number, longitude: number) => {
    const response = await fetch(`${API_BASE_URL}/api/openstates/officials/geo?latitude=${latitude}&longitude=${longitude}`);
    if (!response.ok) { throw new Error("Failed to fetch officials by geolocation"); }
    return response.json();
};

/**
 * Fetch recent bills by state.
 */
export const fetchBillsByState = async (state: string) => {
    const response = await fetch(`${API_BASE_URL}/api/openstates/bills?jurisdiction=${state}`);
    if (!response.ok) throw new Error("Failed to fetch bills");
    return response.json();
};

/**
 * Fetch committees by state.
 */
export const fetchCommitteesByState = async (state: string) => {
    const response = await fetch(`${API_BASE_URL}/api/openstates/committees?jurisdiction=${state}`);
    if (!response.ok) throw new Error("Failed to fetch committees");
    return response.json();
};

