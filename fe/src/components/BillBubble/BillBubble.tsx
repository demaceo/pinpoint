import React from "react";
// import "./BillBubble.css";
import { BillTooltipProps } from "../../assets/types";

const BubbleTooltip: React.FC<BillTooltipProps> = ({
  content,
  visible,
  position,
}) => {
  if (!visible) return null;

  return (
    <div className="bill-tooltip show" style={position}>
      {content}
    </div>
  );
};

export default BubbleTooltip;
