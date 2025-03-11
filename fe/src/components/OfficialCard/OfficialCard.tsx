/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import "./OfficialCard.css";
import { OfficialCardProps } from "../../assets/types";
import AmericanFlag from "../../assets/american-flag.gif";

const elegantFonts = [
  "'Garamond', serif",
  "'Playfair Display', serif",
  "'Cormorant Garamond', serif",
  "'Cinzel', serif" /*! randomFont*/,
  "'Bodoni Moda', serif",
  "'Merriweather', serif",
  "'Lora', serif",
  "'Libre Baskerville', serif",
  "'Della Respira', serif",
  "'Prata', serif",
  "'EB Garamond', serif",
  "'Times New Roman', serif",
  "'Georgia', serif",
];

const OfficialCard: React.FC<OfficialCardProps> = ({
  official,
  isJoker = false,
  onClose,
}) => {
  const [randomFont, setRandomFont] = useState<string>("");

  useEffect(() => {
    const font = elegantFonts[Math.floor(Math.random() * elegantFonts.length)];
    setRandomFont(font);
  }, [setRandomFont]);

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
        <h2 className="official-name" style={{ fontFamily: randomFont }}>
          {official.name}
          <img
            src={AmericanFlag}
            alt="American Flag"
            className="flag-gif"
          />
        </h2>
        <p className="official-role span-wrapper">
          {official.current_role?.title},{" "}
          <span className="card-span">
            District {official.current_role?.district}{" "}
          </span>
        </p>
        <p className="official-party span-wrapper">
          Party:{" "}
          <span className="card-span" style={{ fontFamily: randomFont }}>
            {official.party || "Unknown"} ({partyInitial})
          </span>
        </p>
        <p className="official-contact span-wrapper">
          Email:{" "}
          <span className="card-span" style={{ fontFamily: randomFont }}>
            {official.email || "No email available"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OfficialCard;
