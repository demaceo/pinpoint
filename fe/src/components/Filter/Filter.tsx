import React, { useState } from "react";
import "./Filter.css";
import { FiltersProps } from "../../assets/types";
import Button from "../Button/Button";
const Filters: React.FC<FiltersProps> = ({
  selectedParty,
  selectedRole,
  selectedAgeRange,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onSelectAll,
  onContactClick,
  onChatClick,
  onAgeRangeChange,

  hasSelectedOfficials,
}) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleFilter = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    onSelectAll(isChecked);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [minAge, maxAge] = selectedAgeRange;
    const newValue = parseInt(e.target.value);

    // Determine whether the change is closer to min or max
    const updatedRange: [number, number] =
      Math.abs(newValue - minAge) < Math.abs(newValue - maxAge)
        ? [newValue, maxAge] // Adjust min age
        : [minAge, newValue]; // Adjust max age

    if (updatedRange[0] <= updatedRange[1]) {
      onAgeRangeChange(updatedRange);
    }
  };

  return (
    <div className={`filters-container ${isOpen ? "open" : "closed"}`}>
      {/* Button to toggle filter */}
      <button
        className={`filter-toggle-btn ${isOpen ? "open" : "closed"}`}
        onClick={toggleFilter}
      >
        {isOpen ? "❮ Hide Filters" : "❯"}
      </button>

      {/* Filter Content */}
      {isOpen && (
        <div className="filters-content">
          <h2 className="filters-title">Filters</h2>
          <label>Search for Elected Representatives:</label>
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

          <label className="age-range-label">
            Age Range:
            {/* {selectedAgeRange[0]} - {selectedAgeRange[1]} */}
          </label>
          <div className="age-slider-container">
            <input
              type="number"
              min="18"
              max="110"
              value={selectedAgeRange[0]}
              onChange={(e) =>
                onAgeRangeChange([
                  parseInt(e.target.value),
                  selectedAgeRange[1],
                ])
              }
              // onChange={handleAgeChange}
              className="age-input"
            />
            
            <input
              type="range"
              min="18"
              max="110"
              step="1"
              value={selectedAgeRange[1]}
              onChange={handleAgeChange}
              className="age-slider"
            />
          
            <input
              type="number"
              min="18"
              max="100"
              value={selectedAgeRange[1]}
              onChange={(e) =>
                onAgeRangeChange([
                  selectedAgeRange[0],
                  parseInt(e.target.value),
                ])
              }
              className="age-input"
            />
            
          </div>
          <label className="select-all-label">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            Select All Results
          </label>

          <div className="filter-buttons-container">
            <Button
              label="contact"
              className="filter-btn contact-btn"
              onClick={onContactClick}
              disabled={!hasSelectedOfficials}
            />
            <Button
              label="chat"
              className="filter-btn chat-btn"
              onClick={onChatClick}
              disabled={!hasSelectedOfficials}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
