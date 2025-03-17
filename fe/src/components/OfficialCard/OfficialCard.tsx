import React from "react";
// import webgazer from "webgazer";
import Button from "../Button/Button.tsx";
import { Official } from "../../assets/types.ts";
import "./OfficialCard.css";
import Modal from "../Modal/Modal.tsx";

interface OfficialCardProps {
  official: Official;
  onClose: () => void;
  onContactClick: () => void;
  onChatClick: () => void;
}
const OfficialCard: React.FC<OfficialCardProps> = ({ official, onClose, onContactClick, onChatClick }) => {
  
  const calculateAge = (birthDate?: string): number | null => {
    if (!birthDate) return null;
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };


  const age = calculateAge(official.birth_date);

  return (
    <Modal onClose={onClose}>
      <div className="official-card">

        {official.image && (
          <img
            src={official.image}
            alt={official.name}
            className="official-photo"
            // style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
          />
        )}
        <h2 className="official-name">{official.name}</h2>
        <p className="official-party">{official.party}</p>

        {age !== null && <p className="official-age">Age: {age}</p>}

        {/* <p>Email: {official.email || "Not available"}</p> */}

        {official.offices?.[0]?.voice && (
          <p>Phone: {official.offices[0].voice}</p>
        )}

        <div className="official-socials">
          {official.socials?.twitter && (
            <a
              href={official.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          )}
          {official.socials?.facebook && (
            <a
              href={official.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          )}
        </div>
        {official.current_role && (
          <div className="official-role">
            <p>{official.current_role.title}</p>
            <p>District: {official.current_role.district}</p>
            <p>Chamber: {official.current_role.org_classification}</p>
          </div>
        )}
        {(official.other_identifiers?.length ?? 0) > 0 && (
          <div className="official-terms">
            <h3>Identifiers</h3>
            <ul>
              {official.other_identifiers?.map((id, index) => (
                <li key={index}>
                  {id.identifier} ({id.scheme})
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="buttons-container">
          <Button
            label="@me"
            className="contact-button c-btn"
            onClick={onContactClick}
          />
          <Button
            label="DM"
            className="chat-button c-btn"
            onClick={onChatClick}
          />
        </div>
      </div>
    </Modal>
  );
};

export default OfficialCard;
