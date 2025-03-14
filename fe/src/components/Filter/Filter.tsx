import React, { useState } from "react";
import "./Filter.css";
import { FiltersProps } from "../../assets/types";
import Button from "../Button/Button";
const Filters: React.FC<FiltersProps> = ({
  selectedParty,
  selectedRole,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onSelectAll,
  onContactClick,
  onChatClick,
  hasSelectedOfficials,
}) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    onSelectAll(isChecked);
  };

  return (
    <div className="filters-container">
      <h2>Filters</h2>

      <label>Search Official:</label>
      <input
        type="text"
        placeholder="Enter name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-bar"
      />

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

      {/* Select All checkbox */}
      <label className="select-all-label">
        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
        Select All Results
      </label>

      {/* Contact & Chat Buttons */}
      <Button
        label="contact"
        className="contact-button"
        onClick={onContactClick}
        disabled={!hasSelectedOfficials}
      />
      <Button
        label="chat"
        className="chat-button"
        onClick={onChatClick}
        disabled={!hasSelectedOfficials}
      />
    </div>
  );
};

export default Filters;
