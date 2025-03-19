import React, { useEffect, useState } from "react";
import {
  fetchOfficialsByState,
  fetchOfficialsByGeo,
} from "../../services/OpenStates/openStatesService.ts";
import { useUserLocation } from "../../hooks/useUserLocation";
import Breathe from "../../components/LoadingSpinner/Breathe.tsx";
import OfficialLink from "../../components/OfficialLink/OfficialLink";
import "./Officials.scss";
import "./usStateStylings.css";
import { UsStateEntry, Official } from "../../assets/types.ts";
import usStatesData from "../../assets/statesData.json";
import StateDisplay from "../../components/StateDisplay/StateDisplay.tsx";
import { mockOfficials } from "../../utils/mockDataGenerator";
import Modal from "../../components/Modal/Modal.tsx";
// import Filters from "../../components/Filter/Filter.tsx";
import DragFilter from "../../components/Filter/DragFilter.tsx";
import ContactForm from "../../components/ContactForm/ContactForm.tsx";
import BillTicker from "../../components/BillTicker/BillTicker.tsx";
import OfficialCard from "../../components/OfficialCard/OfficialCard.tsx";
import AnimatedText from "../../components/LoadingSpinner/AnimatedText.tsx";
import { getStateFromCoordinates } from "../../utils/getStateFromCoords.ts";
import AnimatedPinpoint from "../../assets/pins/AnimatedPinpoint.tsx";

interface OfficialsPageProps {
  headerText: string;
  isNearYouPage: boolean;
  setLoading: (loading: boolean) => void;
}
const Officials: React.FC<OfficialsPageProps> = ({
  isNearYouPage,
  setLoading,
  headerText,
}) => {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [loading, setLocalLoading] = useState<boolean>(true);
  const { location, error } = useUserLocation();

  const usStates: UsStateEntry[] = usStatesData;
  const mockData: Official[] = mockOfficials;

  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedOfficial, setSelectedOfficial] = useState<Official | null>(
    null
  );
  const [selectedOfficials, setSelectedOfficials] = useState<Set<string>>(
    new Set()
  );

  // Filtering & Search
  const [selectedParty, setSelectedParty] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const hasSelectedOfficials = selectedOfficials.size > 0;

  // Contact Form State
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
  const [selectedAgeRange, setSelectedAgeRange] = useState<[number, number]>([
    18, 100,
  ]);

  const [animationClass, setAnimationClass] = useState<
    "makisuDrop" | "makisuFold"
  >("makisuDrop");

  useEffect(() => {
    setAnimationClass("makisuFold");

    if (isNearYouPage && location) {
      getStateFromCoordinates(location.lat, location.lng).then((state) => {
        if (state) {
          console.log("coords", state);
          setSelectedState(state);
        }
      });
      fetchOfficialsByGeo(location.lat, location.lng)
        .then(setOfficials)
        .catch((error) =>
          console.error("Error fetching official by GEO:", error)
        )
        .finally(() => {
          setTimeout(() => {
            setLocalLoading(false);
            setLoading(false);
          }, 1000); //! Keep Breathe active for 1 seconds
        });
    } else {
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
          setAnimationClass("makisuDrop"); // Step 3: Animate new list in
        })
        .catch((error) =>
          console.error("Error fetching officials STATE:", error)
        )
        .finally(() => {
          setTimeout(() => {
            setLocalLoading(false);
            setLoading(false);
          }, 1000); //! Keep Breathe active for 1 seconds
        });
    }
  }, [isNearYouPage, location, selectedState, setLoading]);

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
    const validEmails = validOfficials
      .map((official) => official.email)
      .filter((email): email is string => email !== undefined);

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

  const resetFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedParty("");
    setSelectedRole("");
    setSearchQuery("");
    setSelectedOfficials(new Set());
    setSelectedOfficial(null);
    setSelectedState(e.target.value);
  };

  if (error) return <p>{error}</p>;
  if (loading) return <Breathe />;
  if (!officials || officials.length === 0) {
    setOfficials(mockData);
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
    // setSelectedAll(isChecked);
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
      <DragFilter
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

      {!isNearYouPage && (
        <h1 className="officials-header">
          <AnimatedText text={headerText} />
          {"  "}
          <select
            className={`states-dropdown ${xstylesClass}`}
            value={selectedState}
            onChange={(e) => resetFilter(e)}
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

      {isNearYouPage && (
        <h1 className="officials-header">
          {" "}
          <AnimatedText text={headerText} />{" "}
          <span className="pinpoint-wrapper">
            <AnimatedPinpoint />
          </span>
        </h1>
      )}

      {/* {selectedAll && (
        <p className="select-all-message">
          ✅ All {filteredOfficials.length} officials selected for future
          actions...
        </p>
      )} */}
      <div className="officials-container">
        <ul className={`officials-list ${animationClass}`}>
          {/* <ul className="officials-list"> */}
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
