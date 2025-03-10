/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useUserLocation } from "../../hooks/useUserLocation";
import { fetchOfficialsByGeo } from "../../services/openStatesService";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./OfficialsByLocation.css";
// import OfficialCard from "../OfficialCard/OfficialCard";
import mockOfficials from "../../assets/mockOfficials.json";
import OfficialLink from "../OfficialLink/OfficialLink";
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

  // const randomIndex = Math.floor(Math.random() * officials.length);

  return (
    <div>
      <h1>Officials Near You</h1>
      <ul>
        {officials.length > 0
          ? officials.map((official, index) => {
              return <OfficialLink official={official} index={index} />;
            })
          : // : (
            //   <p>No officials found for this location.</p>
            // )
            mockOfficials.map((official, index) => {
              return <OfficialLink official={official} index={index} />;
            })}
      </ul>
    </div>
  );
};

export default OfficialsByLocation;
