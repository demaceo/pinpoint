/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchOfficialsByState } from "../../services/openStatesService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import './Officials.css'
const Officials: React.FC = () => {
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const state = "California"; // Replace with user input later

  useEffect(() => {
    fetchOfficialsByState(state)
      .then(setOfficials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [state]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Officials in {state}</h1>
      <ul>
        {officials.map((official, index) => (
          <li key={index}>
            {official.name} - {official.current_role?.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Officials;
