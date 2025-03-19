import React, { useState, useRef } from "react";
import "./DragFilter.css";
import { FiltersProps } from "../../assets/types";
import Button from "../Button/Button";

const DragFilter: React.FC<FiltersProps> = ({
  selectedParty,
  selectedRole,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onSelectAll,
  onContactClick,
  onChatClick,

}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Default to open so it's visible
  const [position, setPosition] = useState({ x: 1, y: 1 }); // Start slightly visible
  const [size, setSize] = useState({ width: 320, height: 450 });
  const filterRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });

  /** Toggle Filter Panel */
  const toggleFilter = () => setIsOpen((prev) => !prev);

  /** Dragging Logic */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: Math.max(
          0,
          Math.min(
            window.innerWidth - size.width,
            event.clientX - dragStart.current.x
          )
        ), // Keeps within screen bounds
        y: Math.max(
          0,
          Math.min(
            window.innerHeight - size.height,
            event.clientY - dragStart.current.y
          )
        ),
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  /** Resizing Logic */
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragStart.current = { x: e.clientX, y: e.clientY };

    const handleResizeMouseMove = (event: MouseEvent) => {
      setSize({
        width: Math.max(
          250,
          size.width + (event.clientX - dragStart.current.x)
        ),
        height: Math.max(
          300,
          size.height + (event.clientY - dragStart.current.y)
        ),
      });
      dragStart.current = { x: event.clientX, y: event.clientY };
    };

    const handleResizeMouseUp = () => {
      document.removeEventListener("mousemove", handleResizeMouseMove);
      document.removeEventListener("mouseup", handleResizeMouseUp);
    };

    document.addEventListener("mousemove", handleResizeMouseMove);
    document.addEventListener("mouseup", handleResizeMouseUp);
  };

  return (
    <div
      ref={filterRef}
      className={`filters-container ${isOpen ? "open" : "closed"}`}
      style={{
        left: isOpen ? `${position.x}px` : "-310px",
        top: `${position.y}px`,
        width: `${size.width}px`,
        // height: `${size.height}px`,
      }}
    >
      {/* Grab Handle for Dragging */}
      <div className="filter-grab-handle" onMouseDown={handleMouseDown}>
        ☰ Filter:
      </div>

      {/* Resize Handle */}
      <div className="resize-handle" onMouseDown={handleResizeMouseDown}></div>

      {/* Toggle Button */}
      <button
        className={`filter-toggle-btn ${isOpen ? "open" : "closed"}`}
        onClick={toggleFilter}
      >
        {isOpen ? "❮" : "❯"}
      </button>

      {/* Filter Content */}
      {isOpen && (
        <div className="filters-content">
          {/* <h2 className="filters-title">Filters</h2> */}
          <label>Search by Name:</label>
          <input
            type="text"
            placeholder="Enter name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-bar"
          />

          <label>Political Party:</label>
          <select
            value={selectedParty}
            onChange={(e) => onFilterChange("party", e.target.value)}
          >
            <option value="">All</option>
            <option value="Democratic">Democratic</option>
            <option value="Republican">Republican</option>
          </select>

          <label>Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => onFilterChange("role", e.target.value)}
          >
            <option value="">All</option>
            <option value="Governor">Governor</option>
            <option value="Senator">Senator</option>
          </select>

          <label className="select-all-label">
            <input type="checkbox" onChange={(e) => onSelectAll(e.target.checked)} />
            Select All Results
          </label>

          <div className="filter-buttons-container">
            <Button
              label="chat"
              className="filter-btn chat-btn"
              onClick={onChatClick}
            />
            <Button
              label="contact"
              className="filter-btn contact-btn"
              onClick={onContactClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DragFilter;
