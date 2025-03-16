/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useUserLocation } from "../../hooks/useUserLocation";
import { fetchOfficialsByGeo } from "../../services/OpenStates/openStatesService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./OfficialsByLocation.css";
// import OfficialCard from "../../components/OfficialCard/OfficialCard";
// import XOfficialCard from "../../components/OfficialCard/xOfficialCard";
// import OfficialLink from "../../components/OfficialLink/OfficialLink";
import { mockOfficials } from "../../utils/mockDataGenerator";
// import Filters from "../../components/Filter/Filter";
import { Link } from "react-router-dom";
import Officials from "../Officials/Officials";

const OfficialsByLocation: React.FC = () => {
  const { location, error } = useUserLocation();
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [selectedOfficial, setSelectedOfficial] = useState<any | null>(null);

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
  if (!officials || officials.length === 0) {
    setOfficials(mockOfficials);
  }

  return (
    <>
      <div className="home-container">
        <h1 className="home-title">Welcome to Pinpoint</h1>
        <p className="home-welcome">
          Engage with your elected officials and make your voice heard.
        </p>
        <Link to="/" className="link-officials">
          Find Elected Representatives by State
        </Link>
      </div>
      <h1 className="officials-header">Officials Near You </h1>
      <Officials location={!location} />
    </>
  );
  // return (
  //   <div className="yourofficials-container">
  //     <h1>Officials Near You</h1>
  //     <ul>
  //       {officials.length > 0 ? (
  //         officials.map((official, index) => {
  //           return (
  //             <OfficialLink
  //               key={index}
  //               official={official}
  //               index={index}
  //               onSelect={() => setSelectedOfficial(official)}
  //             />
  //           );
  //         })
  //       ) : (
  //         <p>No officials found for this location.</p>
  //       )}
  //     </ul>
  //     {selectedOfficial && (
  //       <XOfficialCard
  //         official={selectedOfficial}
  //         onClose={() => setSelectedOfficial(null)}
  //       />
  //     )}
  //   </div>
  // );
};

export default OfficialsByLocation;
