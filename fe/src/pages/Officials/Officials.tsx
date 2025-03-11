/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchOfficialsByState } from "../../services/openStatesService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import OfficialLink from "../../components/OfficialLink/OfficialLink";
import OfficialCard from "../../components/OfficialCard/OfficialCard";
import "./Officials.css";
import mockOfficials from "../../assets/mockOfficials.json";
import { UsStateEntry } from "../../assets/types.ts";
import usStatesData from "../../assets/statesData.json";
import StateDisplay from "../../components/StateDisplay/StateDisplay.tsx";

const Officials: React.FC = () => {
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedOfficial, setSelectedOfficial] = useState<any | null>(null);
  const usStates: UsStateEntry[] = usStatesData;

  useEffect(() => {
    if (!selectedState) {
      setOfficials([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchOfficialsByState(selectedState)
      .then(setOfficials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedState]);

  if (loading) return <LoadingSpinner />;

  if (!officials || officials.length === 0) {
    setOfficials(mockOfficials);
  }

  const selectedObj = usStates.find(
    (obj) => obj.abbr === selectedState
  );
  const xstylesClass = selectedObj?.xstyles || "";

  return (
    <div className="officials-page-container">
      <h1 className="officials-header">
        Officials in{" "}
        <select
          className={`states-dropdown ${xstylesClass}`}
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {usStates.map((item) => (
            <option key={item.abbr} value={item.abbr}>
              {item.abbr}
            </option>
          ))}
        </select>{" "}

        {selectedState
          ? usStates.find((item) => item.abbr === selectedState)?.state && ( // Find the state object
              <StateDisplay selectedAbbr={selectedState} />
            )
          : <p>...</p>}

      </h1>

      <ul>
        {officials.map((official, index) => (
          <OfficialLink
            key={index}
            official={official}
            index={index}
            onSelect={() => setSelectedOfficial(official)}
          />
        ))}
      </ul>

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
