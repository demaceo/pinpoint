import "./OfficialLink.css";
import { OfficialLinkProps } from "../../assets/types";

const OfficialLink: React.FC<OfficialLinkProps> = ({
  index,
  official,
  onSelect,
}) => {

  const partyInitial = official.party?.charAt(0) || "N/A";

  const handleClick = () => {
    onSelect();
  };

  return (
    <li key={index} className="list-item">
      <span onClick={handleClick}>{official.name}</span> -{" "}
      {official.current_role?.title} ({partyInitial})
    </li>
  );
};

export default OfficialLink;
