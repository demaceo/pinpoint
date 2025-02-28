import React, { useEffect, useState } from "react";
import { fetchOfficials } from "../services/api.ts";
import OfficialsGraph from "../components/OfficialsGraph.tsx";

const Officials: React.FC = () => {
  const [officials, setOfficials] = useState([]);

  useEffect(() => {
    fetchOfficials("New York, NY").then(setOfficials);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Elected Officials</h1>
      <OfficialsGraph officials={officials} />
    </div>
  );
};

export default Officials;
