/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchOfficialsByState } from "../../services/openStatesService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import OfficialLink from "../../components/OfficialLink/OfficialLink";
import OfficialCard from "../../components/OfficialCard/OfficialCard";
// import "./Officials.css";
import mockOfficials from "../../assets/mockOfficials.json";

const Officials: React.FC = () => {
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const state = "Colorado"; // Replace with user input later
  const [selectedOfficial, setSelectedOfficial] = useState<any | null>(null);

  useEffect(() => {
    fetchOfficialsByState(state)
      .then(setOfficials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [state]);

  if (loading) return <LoadingSpinner />;
  if (!officials) {
    setOfficials(mockOfficials);
    console.log(officials);
  }
  // !console.log(officials[0]);
  // const queryParams = new URLSearchParams();
  // if (id) queryParams.append("id", id);
  // if (name) queryParams.append("name", name);
  // if (jurisdiction) queryParams.append("jurisdiction", jurisdiction);
  // const randomIndex = Math.floor(Math.random() * officials.length);

  return (
    <div>
      <h1>Officials in {state}</h1>
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

export default Officials;
