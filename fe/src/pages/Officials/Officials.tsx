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
import ContactForm from "../../components/ContactForm/ContactForm.tsx";

const Officials: React.FC = () => {
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const usStates: UsStateEntry[] = usStatesData;
  const mockData: Official[] = mockOfficials;

  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedOfficial, setSelectedOfficial] = useState<any | null>(null);
  const [selectedOfficials, setSelectedOfficials] = useState<Set<string>>(
    new Set()
  );
  // const [useMockData, setUseMockData] = useState<boolean>(false);

  // Filtered states:
  const [selectedParty, setSelectedParty] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAll, setSelectedAll] = useState<boolean>(false);

  const hasSelectedOfficials = selectedOfficials.size > 0;

  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  const handleContactClick = () => {
    // Get only officials with valid emails
    const validEmails = filteredOfficials
      .filter((official) => official.email)
      .map((official) => official.email);

    setSelectedEmails(validEmails);
    setShowContactForm(true);
  };

  const handleRemoveEmail = (email: string) => {
    setSelectedEmails(selectedEmails.filter((e) => e !== email));
  };

  const handleChatClick = () => {
    alert(`Opening AI chat with ${selectedOfficials.size} officials.`);
    // TODO: Implement AI chat integration
  };

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
    // setUseMockData(true);
  }

  const selectedObj = usStates.find((obj) => obj.abbr === selectedState);
  const xstylesClass = selectedObj?.xstyles || "";

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "party") setSelectedParty(value);
    if (filterType === "role") setSelectedRole(value);
  };

  const handleSelectOfficial = (officialName: string) => {
    setSelectedOfficials((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(officialName)) {
        newSelected.delete(officialName);
      } else {
        newSelected.add(officialName);
      }
      return newSelected;
    });
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectedAll(isChecked);
    if (isChecked) {
      setSelectedOfficials(new Set(filteredOfficials.map((o) => o.name)));
    } else {
      setSelectedOfficials(new Set());
    }
  };

  const filteredOfficials = officials.filter((official) => {
    const matchesSearch = searchQuery
      ? official.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesParty = selectedParty
      ? official.party === selectedParty
      : true;
    const matchesRole = selectedRole
      ? official.current_role.title === selectedRole
      : true;

    return matchesSearch && matchesParty && matchesRole;
  });

  return (
    <div className="officials-page-container">
      <Filters
        selectedParty={selectedParty}
        selectedRole={selectedRole}
        searchQuery={searchQuery}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onSelectAll={handleSelectAll}
        onContactClick={handleContactClick}
        onChatClick={handleChatClick}
        hasSelectedOfficials={hasSelectedOfficials}
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
      {selectedAll && (
        <p className="select-all-message">
          ✅ All {filteredOfficials.length} officials selected for future
          actions...
        </p>
      )}
      {/* {useMockData && (
        <div className="mock-data-message">
          <u>placeholder dummy data below:</u>
        </div>
      )} */}
      <ul>
        {filteredOfficials.map((official, index) => (
          <OfficialLink
            key={index}
            official={official}
            index={index}
            isChecked={selectedOfficials.has(official.name)} // ✅ Controls checkbox state
            onSelect={() => handleSelectOfficial(official.name)}
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
      )}
      {/* Sliding Contact Form */}
      {showContactForm && (
        <ContactForm
          selectedEmails={selectedEmails}
          onClose={() => setShowContactForm(false)}
          onRemoveEmail={handleRemoveEmail}
        />
      )}
    </div>
  );
};

export default Officials;
