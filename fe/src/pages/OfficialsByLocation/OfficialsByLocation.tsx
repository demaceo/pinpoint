/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useUserLocation } from "../../hooks/useUserLocation";
import { fetchOfficialsByGeo } from "../../services/OpenStates/openStatesService";
import "./OfficialsByLocation.css";
import { mockOfficials } from "../../utils/mockDataGenerator";
import { Link } from "react-router-dom";
import AnimatedPinpoint from "../../assets/pins/AnimatedPinpoint";
import Breathe from "../../components/LoadingSpinner/Breathe";
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
  if (loading) return <Breathe />;
  if (!location) return <Breathe />;
  if (!officials || officials.length === 0) {
    setOfficials(mockOfficials);
  }

  return (
    <>
      <div className="home-container">
        <h1 className="home-title">Welcome to Pinpoint</h1>
        <p className="home-welcome">
          Engage with <span className="fancy-font">your</span> elected
          representatives and make <span className="fancy-font">your</span>{" "}
          voice heard.
        </p>
        <Link to="/" className="link-officials">
          Find Elected Representatives by State
        </Link>
      </div>
      <h1 className="officials-header">
        Elected Representatives Near You
        <span className="pinpoint-wrapper">
          <AnimatedPinpoint />
        </span>
      </h1>
      <Suspense fallback={<Breathe />}>
        <Officials location={!location} setLoading={setLoading} />
      </Suspense>
    </>
  );
};

export default OfficialsByLocation;
