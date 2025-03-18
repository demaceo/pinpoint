import React, { useState } from "react";
// import AnimatedPinpoint from "../../assets/pins/AnimatedPinpoint";
import "./Checkbox.css"; // Ensure CSS is linked
import { CustomCheckboxProps } from "../../assets/types";

const CustomCheckbox: React.FC<CustomCheckboxProps> = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      {/* <label className="checkbox-container"> */}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      {/* <span className="checkmark-pin">
        {checked && (
          <AnimatedPinpoint
            width={20}
            height={20}
            fill="white"
            stroke="black"
          />
        )}
      </span> */}
      {/* Check this box */}
      {/* </label> */}
    </>
  );
};

export default CustomCheckbox;
