/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { fetchOfficialById } from "../../services/openStatesService"; 
import OfficialCard from "../../components/OfficialCard/OfficialCard";
import "./OfficialDetails.css";
import { fetchOfficialsByGeo } from "../../services/openStatesService";

const OfficialDetails: React.FC = () => {
  // const { id } = useParams();
  const [official, setOfficial] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  // const official = location.state?.official;
  const isJoker = location.state?.isJoker;

  // useEffect(() => {
  //   if (location) {
  //     fetchOfficialById()
  //       .then(setOfficial)
  //       .catch(console.error)
  //       .finally(() => setLoading(false));
  //   }
  // }, [location]);
  // if (!official) return <p>Official not found.</p>;

  // useEffect(() => {
  //   if (id) {
  //     fetchOfficialById(id)
  //       .then(setOfficial)
  //       .catch(console.error)
  //       .finally(() => setLoading(false));
  //   }
  // }, [id]);

  // if (loading) return <p>Loading...</p>;
  // if (!official) return <p>Official not found.</p>;
 return (
   <div className="p-6">
     <h1 className="text-2xl font-bold">Official Details</h1>
     {/* Pass isJoker down to OfficialCard */}
     <OfficialCard official={official} isJoker={isJoker} />
   </div>
 );
  // return (
  //   <div className="p-6">
  //     <h1 className="text-2xl font-bold">Official Details</h1>
  //     <OfficialCard official={official} />
  //   </div>
  // );
};

export default OfficialDetails;
