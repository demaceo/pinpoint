import "./OfficialLink.css";
import { OfficialLinkProps } from "../../assets/types";
// import { useState } from "react";
// import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
// import AnimatedPinpoint from "../../assets/pins/AnimatedPinpoint";

const OfficialLink: React.FC<OfficialLinkProps> = ({
  index,
  official,
  onSelect,
  isChecked,
}) => {
  const partyInitial = official.party?.charAt(0) || "N/A";
  // const [isHovered, setIsHovered] = useState(false);

  // const handleClick = () => {
  //   onSelect();
  // };

  return (
    <div key={index} className="checkbox-container">
      {/* {isHovered && (
        <div className="balloon-container">
          <AnimatedPinpoint />
        </div>
      )} */}
      <input
        type="checkbox"
        id={`official-${index}`}
        checked={isChecked}
        onChange={onSelect}
      />
      {/* <CustomCheckbox
        label={`official-${index}`}
        checked={isChecked}
        onChange={onSelect}
      /> */}

      <label htmlFor={`official-${index}`} className="official-label">
        <span
          // onMouseEnter={() => setIsHovered(true)}
          // onMouseLeave={() => setIsHovered(false)}
          // className={`o-name ${isHovered ? "inflate" : "deflate"}`}
        >
          {official.name}
        </span>{" "}
        {""}- {official.current_role?.title}
        <span id={partyInitial}>({partyInitial})</span>
      </label>
    </div>
  );
};

export default OfficialLink;
