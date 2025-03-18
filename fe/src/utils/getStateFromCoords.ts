// export const getStateFromCoordinates = async (latitude: number, longitude: number): Promise<string | null> => {

//     const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.status === "OK") {
//             for (const result of data.results) {
//                 for (const component of result.address_components) {
//                     if (component.types.includes("administrative_area_level_1")) {
//                         return component.long_name; // Returns full state name (e.g., "California")
//                     }
//                 }
//             }
//         }
//         return null; // No state found
//     } catch (error) {
//         console.error("Error fetching state data:", error);
//         return null;
//     }
// };

export const getStateFromCoordinates = async (latitude: number, longitude: number): Promise<string | null> => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=5
}`;
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