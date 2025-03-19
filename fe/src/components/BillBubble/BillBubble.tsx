// import React from "react";
// import { BillTooltipProps } from "../../assets/types";

// const BubbleTooltip: React.FC<BillTooltipProps> = ({
//   content,
//   visible,
//   position,
// }) => {
//   if (!visible) return null;

//   return (
//     <div className="bill-tooltip show" style={position}>
//       {content}
//     </div>
//   );
// };

// export default BubbleTooltip;

import React, { useState, useEffect } from "react";
import "./BillBubble.css";
import { BillDetails } from "../../assets/types";
// import AnimatedPinpoint from "../../assets/pins/AnimatedPinpoint";

interface BillBubbleProps {
  bill: BillDetails;
}

const BillBubble: React.FC<BillBubbleProps> = ({ bill }) => {
  const [isPinned, setIsPinned] = useState<boolean>(false);
  // Check if the bill is already pinned in localStorage
  useEffect(() => {
    const pinnedBills = JSON.parse(localStorage.getItem("pinnedBills") || "[]");
    setIsPinned(
      pinnedBills.some((pinnedBill: BillDetails) => pinnedBill.id === bill.id)
    );
  }, [bill.id]);

  const togglePin = () => {
    const pinnedBills = JSON.parse(localStorage.getItem("pinnedBills") || "[]");

    if (isPinned) {
      // Remove from pinned list
      const updatedBills = pinnedBills.filter(
        (b: BillDetails) => b.id !== bill.id
      );
      localStorage.setItem("pinnedBills", JSON.stringify(updatedBills));
      setIsPinned(false);
    } else {
      // Add to pinned list
      pinnedBills.push(bill);
      localStorage.setItem("pinnedBills", JSON.stringify(pinnedBills));
      setIsPinned(true);
    }
  };

  return (
    <div className="bill-bubble">
      <div className="pin-container" onClick={togglePin}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head of the Pin */}
          <circle
            cx="100"
            cy="50"
            r="40"
            fill={isPinned ? "gold" : "gray"}
            stroke="black"
            strokeWidth="3"
          />

          {/* Needle */}
          <line
            x1="100"
            y1="90"
            x2="100"
            y2="190"
            stroke="black"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3>{bill.identifier}</h3>
      <p>{bill.title}</p>
    </div>
  );
};

export default BillBubble;
