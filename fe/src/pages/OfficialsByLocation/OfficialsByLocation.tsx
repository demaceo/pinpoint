/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useUserLocation } from "../../hooks/useUserLocation";
import { fetchOfficialsByGeo } from "../../services/OpenStates/openStatesService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./OfficialsByLocation.css";
import { mockOfficials } from "../../utils/mockDataGenerator";
import { Link } from "react-router-dom";
const Officials = lazy(() => import("../Officials/Officials"));

const OfficialsByLocation: React.FC = () => {
  const { location, error } = useUserLocation();
  const [officials, setOfficials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      <Suspense fallback={<div>Loading...</div>}>
        <Officials location={!location} setLoading={setLoading} />
      </Suspense>
    </>
  );
};

export default OfficialsByLocation;
