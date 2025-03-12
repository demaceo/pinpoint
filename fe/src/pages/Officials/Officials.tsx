/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchOfficialsByState } from "../../services/openStatesService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import OfficialLink from "../../components/OfficialLink/OfficialLink";
import OfficialCard from "../../components/OfficialCard/OfficialCard";
import "./Officials.css";
// import mockOfficials from "../../assets/mockOfficials.json";
import { UsStateEntry, Official } from "../../assets/types.ts";
import usStatesData from "../../assets/statesData.json";
import StateDisplay from "../../components/StateDisplay/StateDisplay.tsx";
import { mockOfficials } from "../../utils/mockDataGenerator";
import Modal from "../../components/Modal/Modal.tsx";
import Filters from "../../components/Filter/Filter.tsx";


const Officials: React.FC = () => {
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedOfficial, setSelectedOfficial] = useState<any | null>(null);
  const [selectedParty, setSelectedParty] = useState<string>(""); // 🏛 Filter by party
  const [selectedRole, setSelectedRole] = useState<string>(""); // 🏛 Filter by role
  const usStates: UsStateEntry[] = usStatesData;
  const mockData: Official[] = mockOfficials;

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
    setOfficials(mockData);
  }

  const selectedObj = usStates.find((obj) => obj.abbr === selectedState);
  const xstylesClass = selectedObj?.xstyles || "";

  // 🏛 Function to handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "party") setSelectedParty(value);
    if (filterType === "role") setSelectedRole(value);
  };

  // 🏛 Apply filters to officials list
  const filteredOfficials = officials.filter((official) => {
    return (
      (selectedParty ? official.party === selectedParty : true) &&
      (selectedRole ? official.current_role.title === selectedRole : true)
    );
  });


  return (
    <div className="officials-page-container">
      <Filters
        selectedParty={selectedParty}
        selectedRole={selectedRole}
        onFilterChange={handleFilterChange}
      />
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
        {selectedState ? (
          usStates.find((item) => item.abbr === selectedState)?.state && (
            <StateDisplay selectedAbbr={selectedState} />
          )
        ) : (
          <p>{"  "}</p>
        )}
      </h1>
      <ul>
        {filteredOfficials.map((official, index) => (
          <OfficialLink
            key={index}
            official={official}
            index={index}
            onSelect={() => setSelectedOfficial(official)}
          />
        ))}
      </ul>

      {selectedOfficial && (
        <Modal onClose={() => setSelectedOfficial(null)}>
          <OfficialCard
            official={selectedOfficial}
            onClose={() => setSelectedOfficial(null)}
          />
        </Modal>
        // <OfficialCard
        //   official={selectedOfficial}
        //   onClose={() => setSelectedOfficial(null)}
        // />
      )}
    </div>
  );
};

export default Officials;
