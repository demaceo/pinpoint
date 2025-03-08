import React from "react";
import "./OfficialCard.css"
interface Official {
  name: string;
  office: string;
  party: string;
}

const OfficialCard: React.FC<{ official: Official }> = ({ official }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold">{official.name}</h2>
      <p>{official.office}</p>
      <p className="text-sm text-gray-500">{official.party}</p>
    </div>
  );
};

export default OfficialCard;
