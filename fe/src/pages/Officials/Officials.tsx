/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchOfficialsByState } from "../../services/OpenStates/openStatesService.ts";
// import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Breathe from "../../components/LoadingSpinner/Breathe.tsx";
import OfficialLink from "../../components/OfficialLink/OfficialLink";
import "./Officials.css";
import { useLocation } from "react-router-dom";
import { UsStateEntry, Official } from "../../assets/types.ts";
import usStatesData from "../../assets/statesData.json";
import StateDisplay from "../../components/StateDisplay/StateDisplay.tsx";
import { mockOfficials } from "../../utils/mockDataGenerator";
import Modal from "../../components/Modal/Modal.tsx";
import Filters from "../../components/Filter/Filter.tsx";
import ContactForm from "../../components/ContactForm/ContactForm.tsx";
import BillTicker from "../../components/BillTicker/BillTicker.tsx";
import OfficialCard from "../../components/OfficialCard/OfficialCard.tsx";

interface OfficialsPageProps {
  location: boolean;
  setLoading: (loading: boolean) => void; // ✅ Accept loading prop from Home
}
const Officials: React.FC<OfficialsPageProps> = ({ setLoading }) => {
  const location = useLocation();
  const isYourOfficialsPage = location.pathname === "/yourofficials";
  // const [showResults, setShowResults] = useState<boolean>(false); // ✅ New state for delaying results

  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLocalLoading] = useState<boolean>(true);
  const usStates: UsStateEntry[] = usStatesData;
  const mockData: Official[] = mockOfficials;

  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedOfficial, setSelectedOfficial] = useState<any | null>(null);
  const [selectedOfficials, setSelectedOfficials] = useState<Set<string>>(
    new Set()
  );

  // Filtering & Search
  const [selectedParty, setSelectedParty] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const hasSelectedOfficials = selectedOfficials.size > 0;

  // Contact Form State
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);

  const [selectedAgeRange, setSelectedAgeRange] = useState<[number, number]>([
    18, 100,
  ]);

  const calculateAge = (birthDate: string | undefined): number | null => {
    if (!birthDate) return null;
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const handleToggleContactForm = () => {
    setClosing(!closing);
    setTimeout(() => {
      setShowContactForm(!showContactForm);
      setClosing(!closing);
    }, 600);
  };

  const handleContactClick = () => {
    const validOfficials = filteredOfficials.filter(
      (official) => official.email
    );
    const validEmails = validOfficials.map((official) => official.email);

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
      setLocalLoading(false);
      setLoading(false);
      return;
    }
    setLocalLoading(true);
    setLoading(true);
    fetchOfficialsByState(selectedState)
      .then((data) => {
        setOfficials(data);
      })
      .catch((error) => console.error("Error fetching officials:", error))
      .finally(() => {
        setTimeout(() => {
          setLocalLoading(false);
          setLoading(false);
        }, 1000); //! Keep Breathe active for 3 seconds
      });
  }, [selectedState, setLoading]);

  if (!officials || officials.length === 0) {
    setOfficials(mockData);
  }

  if (loading) return <Breathe />;

  const selectedObj = usStates.find((obj) => obj.abbr === selectedState);
  const xstylesClass = selectedObj?.xstyles || "";

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "party") setSelectedParty(value);
    if (filterType === "role") setSelectedRole(value);
  };

  const handleSelectOfficial = (official: Official) => {
    setSelectedOfficials((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(official.name)) {
        newSelected.delete(official.name);
      } else {
        newSelected.add(official.name);
      }
      return newSelected;
    });
    setSelectedOfficial(official);
  };

  const handleSelectAll = (isChecked: boolean) => {
    setSelectedAll(isChecked);
    setSelectedOfficials(
      isChecked ? new Set(filteredOfficials.map((o) => o.name)) : new Set()
    );
  };

  const filteredOfficials = officials.filter((official) => {
    const age = calculateAge(official.birth_date);
    return (
      (searchQuery
        ? official.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true) &&
      (selectedParty ? official.party === selectedParty : true) &&
      (selectedRole ? official.current_role.title === selectedRole : true) &&
      (age ? age >= selectedAgeRange[0] && age <= selectedAgeRange[1] : true)
    );
  });

  return (
    <div className="officials-page-container">
      <Filters
        selectedParty={selectedParty}
        selectedRole={selectedRole}
        selectedAgeRange={selectedAgeRange}
        searchQuery={searchQuery}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onSelectAll={handleSelectAll}
        onAgeRangeChange={setSelectedAgeRange}
        onContactClick={handleContactClick}
        onChatClick={handleChatClick}
        hasSelectedOfficials={hasSelectedOfficials}
      />
      {!isYourOfficialsPage && (
        <h1 className="officials-header">
          Elected Representatives in{" "}
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
          </select>
          {selectedState && <StateDisplay selectedAbbr={selectedState} />}
        </h1>
      )}

      {selectedAll && (
        <p className="select-all-message">
          ✅ All {filteredOfficials.length} officials selected for future
          actions...
        </p>
      )}
      <div className="officials-container">
        {/* {loading || !showResults && (<Breathe />)}  */}
        <ul className="officials-list">
          {filteredOfficials.map((official, index) => (
            <OfficialLink
              key={index}
              official={official}
              index={index}
              isChecked={selectedOfficials.has(official.name)}
              onSelect={() => handleSelectOfficial(official)}
            />
          ))}
        </ul>
      </div>

      {selectedOfficial && (
        <Modal onClose={() => setSelectedOfficial(null)}>
          <OfficialCard
            official={selectedOfficial}
            onClose={() => setSelectedOfficial(null)}
            onContactClick={() => {}}
            onChatClick={() => {}}
          />
        </Modal>
      )}

      {showContactForm && (
        <div
          className={`form-overlay ${showContactForm ? "show" : ""}`}
          onClick={handleToggleContactForm}
        ></div>
      )}

      {showContactForm && (
        <div className={`contact-form-container ${closing ? "hide" : "show"}`}>
          <ContactForm
            selectedEmails={selectedEmails}
            selectedOfficials={filteredOfficials.filter(
              (official) => official.email
            )}
            onClose={handleToggleContactForm}
            onRemoveEmail={handleRemoveEmail}
          />
        </div>
      )}

      {selectedState && <BillTicker jurisdiction={selectedState} />}
    </div>
  );
};

export default Officials;
