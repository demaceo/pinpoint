import "./OfficialLink.css";
import { Official } from "../../assets/types";
import { Link } from "react-router-dom";
// import OfficialCard from "../OfficialCard/OfficialCard";

const OfficialLink: React.FC<{ official: Official; index: number }> = ({
  index,
  official,
}) => {
  const partyInitial = official.party?.charAt(0) || "N/A";
  return (
    <li key={index} className="list-item">
      <Link to={`/official/${official.id}`} state={{ official }}>
        <span>{official.name}</span>
      </Link>{" "}
      - {official.current_role?.title} ({partyInitial}){" "}
    </li>
  );
};

export default OfficialLink;
