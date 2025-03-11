/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useUserLocation } from "../../hooks/useUserLocation";
import { fetchOfficialsByGeo } from "../../services/openStatesService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./OfficialsByLocation.css";
import OfficialCard from "../../components/OfficialCard/OfficialCard";
import mockOfficials from "../../assets/mockOfficials.json";
import OfficialLink from "../../components/OfficialLink/OfficialLink";

const OfficialsByLocation: React.FC = () => {
  const { location, error } = useUserLocation();
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOfficial, setSelectedOfficial] = useState<any | null>(null);

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
  if (!officials) return <p>No officials found for this location.</p>;

  // const randomIndex = Math.floor(Math.random() * officials.length);

  return (
    <div>
      <h1>Officials Near You</h1>
      <ul>
        {officials.length > 0
          ? officials.map((official, index) => {
              return (
                <OfficialLink
                  official={official}
                  index={index}
                  onSelect={() => setSelectedOfficial(official)}
                />
              );
            })
          : mockOfficials.map((official, index) => {
              return (
                <OfficialLink
                  official={official}
                  index={index}
                  onSelect={() => setSelectedOfficial(official)}
                />
              );
            })}
      </ul>
      {/* Modal overlay + content */}
      {selectedOfficial && (
        <OfficialCard
          official={selectedOfficial}
          onClose={() => setSelectedOfficial(null)}
        />
      )}
    </div>
  );
};

export default OfficialsByLocation;
