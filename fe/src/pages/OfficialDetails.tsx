import React from "react";
import { useParams } from "react-router-dom";

const OfficialDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Official Details</h1>
      <p>Details for official with ID: {id}</p>
    </div>
  );
};

export default OfficialDetails;
