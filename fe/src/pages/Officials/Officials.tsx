/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchOfficialsByState } from "../../services/openStatesService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
// import OfficialCard  from "../../components/OfficialCard/OfficialCard";
import OfficialLink from "../../components/OfficialLink/OfficialLink";
import "./Officials.css";
import mockOfficials from "../../assets/mockOfficials.json";
const Officials: React.FC = () => {
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const state = "Colorado"; // Replace with user input later

  useEffect(() => {
    fetchOfficialsByState(state)
      .then(setOfficials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [state]);

  if (loading) return <LoadingSpinner />;
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
              return <OfficialLink official={official} index={index} />;
            })
          : mockOfficials.map((official, index) => {
              return <OfficialLink official={official} index={index} />;
            })}
      </ul>
    </div>
  );
};

export default Officials;
