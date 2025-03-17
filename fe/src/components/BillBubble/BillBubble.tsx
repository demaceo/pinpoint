import React from "react";
import "./BubbleTooltip.css";

interface BubbleTooltipProps {
  content: React.ReactNode;
  visible: boolean;
  position?: { top?: number; left?: number; right?: number; bottom?: number };
}

const BubbleTooltip: React.FC<BubbleTooltipProps> = ({
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
