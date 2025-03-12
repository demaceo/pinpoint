import React from "react";
import "./Filter.css";

interface FiltersProps {
  selectedParty: string;
  selectedRole: string;
  onFilterChange: (filterType: string, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedParty,
  selectedRole,
  onFilterChange,
}) => {
  return (
    <div className="filters-container">
      <h2>Filters</h2>

      {/* 🏛 Filter by Party */}
      <label>Party:</label>
      <select
        value={selectedParty}
        onChange={(e) => onFilterChange("party", e.target.value)}
      >
        <option value="">All</option>
        <option value="Democratic">Democratic</option>
        <option value="Republican">Republican</option>
        <option value="Independent">Independent</option>
        <option value="Libertarian">Libertarian</option>
        <option value="Green">Green</option>
      </select>

      {/* 🏛 Filter by Role */}
      <label>Role:</label>
      <select
        value={selectedRole}
        onChange={(e) => onFilterChange("role", e.target.value)}
      >
        <option value="">All</option>
        <option value="Governor">Governor</option>
        <option value="Senator">Senator</option>
        <option value="Mayor">Mayor</option>
        <option value="Representative">Representative</option>
        <option value="Attorney General">Attorney General</option>
        <option value="Council Member">Council Member</option>
        <option value="Secretary of State">Secretary of State</option>
      </select>
      {/* additional Filters:
      age (slider scale), name (search bar input), district, select all box, batch contact button */}
    </div>
  );
};

export default Filters;
