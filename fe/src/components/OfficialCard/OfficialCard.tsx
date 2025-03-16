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
  // const [isLooking, setIsLooking] = useState<boolean>(true);
  // const [imageSize, setImageSize] = useState<number>(130); // Default image size
  // const gazeTimeout = React.useRef<NodeJS.Timeout | null>(null);
// const [selectedEmail, setSelectedEmail] = useState<string>("");

  const calculateAge = (birthDate?: string): number | null => {
    if (!birthDate) return null;
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };
  // const handleResize = () => {
  //   const width = window.innerWidth;
  //   setImageSize(width > 600? 600 : 130);
  // };

  const age = calculateAge(official.birth_date);


  // useEffect(() => {
  //   webgazer
  //     .setGazeListener(
  //       (data: { x: number; y: number } | null) => {
  //         if (data) {
  //           setIsLooking(true);
  //           if (gazeTimeout.current) clearTimeout(gazeTimeout.current);
  //         } else {
  //           setIsLooking(false);
  //         }
  //       }
  //     )
  //     .begin();

  //   webgazer.showPredictionPoints(false);
  //   webgazer.showVideo(false);
  //   webgazer.showFaceOverlay(false);
  //   webgazer.showFaceFeedbackBox(false);

  //   return () => {
  //     webgazer?.end?.();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!isLooking) {
  //     gazeTimeout.current = setInterval(() => {
  //       setImageSize((prevSize) => (prevSize < 600 ? prevSize + 10 : prevSize)); // Max growth
  //     }, 300);
  //   } else {
  //     setImageSize(130); // Reset image size when looking
  //     if (gazeTimeout.current) clearInterval(gazeTimeout.current);
  //   }

  //   return () => {
  //     if (gazeTimeout.current) clearInterval(gazeTimeout.current);
  //   };
  // }, [isLooking]);


  // function onChatClick(): void {
  //   alert(`Starting chat with ${official.name}`);
  // }
  return (
    <Modal onClose={onClose}>
      <div className="official-card">
        {/* 🏛 Official Image - Controlled by Gaze */}
        {official.image && (
          <img
            src={official.image}
            alt={official.name}
            className="official-photo"
            // style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
          />
        )}

        {/* 🏛 Official Name & Party */}
        <h2 className="official-name">{official.name}</h2>
        <p className="official-party">{official.party}</p>

        {/* 🎂 Age Display */}
        {age !== null && <p className="official-age">Age: {age}</p>}

        {/* 📩 Contact Info */}
        {/* <p>Email: {official.email || "Not available"}</p> */}
        {official.offices?.[0]?.voice && (
          <p>Phone: {official.offices[0].voice}</p>
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
        </div>

        {/* 🏛 Current Role */}
        {official.current_role && (
          <div className="official-role">
            <p>{official.current_role.title}</p>
            <p>District: {official.current_role.district}</p>
            <p>Chamber: {official.current_role.org_classification}</p>
          </div>
        )}

        {/* 🏛 Identifiers */}
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

        {/* ❌ Close Button */}
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
          {/* <button className="close-button" onClick={handleChatClick}>
            DM
          </button> */}
          {/* <button onClick={() => setIsLooking(false)}>Stop Gazing</button> */}
          {/* <button onClick={() => setImageSize(130)}>Reset Image Size</button> */}
          {/* <button onClick={() => webgazer.stop()}>Stop Gazing</button> */}
          {/* <button onClick={() => webgazer.reset()}>Reset Gaze</button> */}
          {/* <button onClick={() => webgazer.resume()}>Resume Gazing</button> */}
          {/* <button onClick={() => webgazer.pause()}>Pause Gazing</button> */}
          {/* <button onClick={() => webgazer.showPredictionPoints(true)}>Show Prediction Points</button> */}
          {/* <button onClick={() => webgazer.showVideo(true)}>Show Video</button> */}
          {/* <button onClick={() => webgazer.showFaceOverlay(true)}>Show Face Overlay</button> */}
          {/* <button onClick={() => webgazer.showFaceFeedbackBox(true)}>Show Face Feedback Box</button> */}
          {/* <button onClick={() => webgazer.setGazeListener((data) => console.log(data))}>Set Gaze Listener</button> */}
          {/* <a
            href={createMailtoLink()}
            className={`send-btn ${message === "" ? "disabled" : ""}`}
          >
            @me
          </a> */}
        </div>
      </div>
    </Modal>
  );
};

export default OfficialCard;
