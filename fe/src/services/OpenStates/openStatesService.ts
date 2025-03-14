const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
 * Fetch an official by ID
 */
// export const fetchOfficialById = async (id?: string, name?: string, jurisdiction?: string) => {
//     const queryParams = new URLSearchParams();

//     if (id) queryParams.append("id", id);
//     if (name) queryParams.append("name", name);
//     if (jurisdiction) queryParams.append("jurisdiction", jurisdiction);

//     const response = await fetch(`${API_BASE_URL}/api/openstates/people?${queryParams.toString()}`);

//     if (!response.ok) {
//         throw new Error(`Failed to fetch official: ${response.statusText}`);
//     }

//     return response.json();
// };

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

