import React from "react";
import { Official } from "../../assets/types"; 
import "./xOfficialCard.css";
import Modal from "../Modal/Modal.tsx";

interface OfficialCardProps {
  official: Official;
  onClose: () => void;
}

const xOfficialCard: React.FC<OfficialCardProps> = ({ official, onClose }) => {
    console.log(official)
  return (
    <Modal onClose={onClose}>
      <div className="official-card">
        {official.image && (
          <img
            src={official.image}
            alt={official.name}
            className="official-photo"
          />
        )}

        {/* Official Details */}
        <h2 className="official-name">{official.name}</h2>
        <p className="official-party">Party: {official.party}</p>

        {/* Contact Info */}
        <p>Email: {official.email || "Not available"}</p>
        {official.offices?.[0]?.voice && (
          <p>Phone: {official.offices[0].voice}</p>
        )}
        {(official.links?.length ?? 0) > 0 && (
          <p>
            Website:{" "}
            <a
              href={official.links?.[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit
            </a>
          </p>
        )}

        {/* 📱 Social Media Links */}
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
          {official.socials?.instagram && (
            <a
              href={official.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          )}
          {official.socials?.linkedin && (
            <a
              href={official.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
        </div>

        {/* Current Role */}
        {official.current_role && (
          <>
            <p>Current Role: {official.current_role.title}</p>
            <p>District: {official.current_role.district}</p>
            <p>Chamber: {official.current_role.org_classification}</p>
            <p>Jurisdiction: {official.jurisdiction.name}</p>
          </>
        )}

        {/* Past Identifiers */}
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

        {/* Offices */}
        {(official.offices?.length ?? 0) > 0 && (
          <div className="official-terms">
            <h3>Offices</h3>
            <ul>
              {official.offices?.map((office, index) => (
                <li key={index}>
                  {office.name}: {office.address}{" "}
                  {office.voice && ` | Phone: ${office.voice}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/*Close Button */}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default xOfficialCard;
