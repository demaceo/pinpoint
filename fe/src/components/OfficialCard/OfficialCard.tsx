import React from "react";
import "./OfficialCard.css";
import { OfficialCardProps } from "../../assets/types";

const OfficialCard: React.FC<OfficialCardProps> = ({
  official,
  isJoker = false,
  onClose,
}) => {
  const partyInitial = official.party?.charAt(0) || "N/A";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}></div>
      <div
        className={`official-card ${isJoker ? "joker-card" : "business-card"}`}
      >
        {official.image && (
          <img
            src={official.image}
            alt={official.name}
            className="official-photo"
          />
        )}
        <h2 className="official-name">{official.name}</h2>
        <p className="official-role">
          {official.current_role?.title}, District{" "}
          {official.current_role?.district}{" "}
        </p>
        <p className="official-party">
          Party: {official.party || "Unknown"} ({partyInitial})
        </p>
        <p className="official-contact">
          Email: {official.email || "No email available"}
        </p>
      </div>
    </div>
  );
};

export default OfficialCard;
