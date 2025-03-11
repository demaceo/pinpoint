import { useState, useEffect } from "react";
import { Location } from "../assets/types";

export const useUserLocation = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            },
            () => {
                setError("Location access denied");
            }
        );
    }, []);

    return { location, error };
};
