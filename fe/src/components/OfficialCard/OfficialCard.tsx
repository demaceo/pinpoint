import React, { useEffect, useState } from "react";
import "./OfficialCard.css";
import { OfficialCardProps } from "../../assets/types";
import AmericanFlag from "/american-flag.gif";
// import ContactForm from "../ContactForm/ContactForm";
import Button from "../Button/Button"; // Import Button
// import Modal from "../Modal/Modal";

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
  const [isContactFormVisible, setIsContactFormVisible] =
    useState<boolean>(false);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const font = elegantFonts[Math.floor(Math.random() * elegantFonts.length)];
    setRandomFont(font);
  }, [setRandomFont]);

  const toggleContactForm = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // Prevent modal from closing
    setIsContactFormVisible(!isContactFormVisible);
  };

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
        <div className="official-details">
          <h2 className="official-name" style={{ fontFamily: randomFont }}>
            {official.name}
            <img src={AmericanFlag} alt="American Flag" className="flag-gif" />
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
              {official.party || "Unknown"}{" "}
              <span id={partyInitial}>({partyInitial})</span>
            </span>
          </p>
          <p className="official-contact span-wrapper">
            Email:{" "}
            <span className="card-span" style={{ fontFamily: randomFont }}>
              {official.email ? (
                official.email.startsWith("http") ? (
                  <a
                    href={official.email}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Contact Page
                  </a>
                ) : (
                  official.email
                )
              ) : (
                "No email available"
              )}
            </span>
          </p>

          <Button label="hmu" onClick={toggleContactForm} />

          {/* 📩 ContactForm (Slides in from Right) */}
          <div
            // className={`contact-form-container ${
            //   isContactFormVisible ? "show" : ""
            // }`}
          >
            {/* <Modal
              classStyles={`contact-form ${isContactFormVisible ? "show" : ""}`}
              onClose={onClose}
            >
              <ContactForm official={official} onClose={onClose} />
            </Modal> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialCard;
