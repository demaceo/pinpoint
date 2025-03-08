/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useUserLocation } from "../../hooks/useUserLocation";
import { fetchOfficialsByGeo } from "../../services/openStatesService";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./OfficialsByLocation.css"
const OfficialsByLocation: React.FC = () => {
  const { location, error } = useUserLocation();
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (location) {
      fetchOfficialsByGeo(location.lat, location.lng)
        .then(setOfficials)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [location]);

  if (error) return <p>{error}</p>;
  if (loading) return <LoadingSpinner />;
  if (!location) return <p>Fetching location...</p>;

  return (
    <div>
      <h1>Officials Near You</h1>
      <ul>
        {officials.length > 0 ? (
          officials.map((official, index) => (
            <li key={index}>
              {official.name} - {official.current_role?.title}
            </li>
          ))
        ) : (
          <p>No officials found for this location.</p>
        )}
      </ul>
    </div>
  );
};

export default OfficialsByLocation;
