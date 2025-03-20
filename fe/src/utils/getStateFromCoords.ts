export const getStateFromCoordinates = async (latitude: number, longitude: number): Promise<string | null> => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.address && data.address.state) {
            return data.address.state; // Returns the state name
        }

        return null;
    } catch (error) {
        console.error("Error fetching state data:", error);
        return null;
    }
};