import "./OfficialLink.css";
import { OfficialLinkProps } from "../../assets/types";

const OfficialLink: React.FC<OfficialLinkProps> = ({
  index,
  official,
  onSelect,
  isChecked,
}) => {

  const partyInitial = official.party?.charAt(0) || "N/A";

  const handleClick = () => {
    onSelect();
  };

  return (
    // <li key={index} className="list-item">
    //   <span onClick={handleClick}>{official.name}</span> -{" "}
    //   {official.current_role?.title} ({partyInitial})
    // </li>
    <div key={index} className="checkbox-container">
      <input
        type="checkbox"
        id={`official-${index}`}
        checked={isChecked} 
        onChange={onSelect}
      />
      <label htmlFor={`official-${index}`}>
        <span onClick={handleClick}>{official.name}</span> {""}-{" "}
        {official.current_role?.title}{" "}
        <span id={partyInitial}>({partyInitial})</span>
      </label>
    </div>
  );
};

export default OfficialLink;
