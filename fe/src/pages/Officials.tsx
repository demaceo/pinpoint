/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchOfficialsByState } from "../services/openStatesService";

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

  if (loading) return <p>Loading...</p>;

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
