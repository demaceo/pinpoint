import { useState, useEffect } from "react";

export const useUserLocation = () => {
    const [location, setLocation] = useState<null | string>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setLocation(`${pos.coords.latitude},${pos.coords.longitude}`),
            () => setLocation("Location access denied")
        );
    }, []);

    return location;
};
