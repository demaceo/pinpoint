import React from "react";
import { Official } from "../../assets/types";



const OfficialCard: React.FC<{ official: Official; isJoker?: boolean }> = ({
  official,
  isJoker = false,
}) => {
  const partyInitial = official.party?.charAt(0) || "N/A";
    console.log('OFFICIAL:', official);

  return (
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
        {official.current_role?.title}, District {official.current_role?.district}{" "}
        {/* ({official.current_role?.state}) */}
      </p>
      <p className="official-party">
        Party: {official.party || "Unknown"} ({partyInitial})
      </p>
      <p className="official-contact">
        Email:{" "}
        {official.email ||
          "No email available"}
      </p>
    </div>
  );
};

// const OfficialCard: React.FC<{ official: Official; key: number }> = ({
//   official,
//   key,
// }) => {
  
//   console.log('OFFICIAL:', official);
//   return (
//     <div className="card" key={key}>
//       {official.photo_url && (
//         <img
//           src={official.photo_url}
//           alt={official.name}
//           className="official-photo"
//         />
//       )}
//       <h2>{official.name}</h2>
//       <p>
//         {official.current_role.title}, District {official.current_role.district}{" "}
//         ({official.current_role.state})
//       </p>
//       <p>Contact: {official.email || "No email available"}</p>
//     </div>
//   );
// };

export default OfficialCard;
