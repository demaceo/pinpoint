import React from "react";
import "./AnimatedPinpoint.css";

interface AnimatedPinpointProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const AnimatedPinpoint: React.FC<AnimatedPinpointProps> = ({
  width = 35,
  height = 40,
  fill = "red",
  stroke = "black",
}) => {
  return (
    <svg
      className="pinpoint-container"
      width={width}
      height={height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grouping to animate rotation and movement together */}
      <g>
        {/* Needle (Extends as the pin moves down) */}
        <line
          x1="100"
          y1="20"
          x2="100"
          y2="20"
          stroke={stroke}
          strokeWidth="5"
          strokeLinecap="round"
        >
          {/* Needle follows the thumbtack's motion */}
          <animate
            attributeName="y1"
            from="10"
            to="120"
            begin="1s"
            dur="0.5s"
            fill="freeze"
          />
          <animate
            attributeName="y2"
            from="20"
            to="270"
            begin="1s"
            dur="0.5s"
            fill="freeze"
          />
        </line>

        {/* Pinhead (Starts above, drops down & slightly bounces) */}
        <circle
          cx="100"
          cy="20"
          r="2"
          fill={fill}
          stroke={stroke}
          strokeWidth="0"
        >
          {/* Moves downward to the final position */}
          <animate
            attributeName="cy"
            from="20"
            to="50"
            begin="1s"
            dur="0.4s"
            fill="freeze"
          />
          {/* Expands into full size after sticking */}
          <animate
            attributeName="r"
            from="2"
            to="50"
            begin="1.1s"
            dur="0.3s"
            fill="freeze"
          />
          <animate
            attributeName="strokeWidth"
            from="0"
            to="3"
            begin="1.1s"
            dur="0.3s"
            fill="freeze"
          />
        </circle>

        {/* Rotation effect for a slight tilt as it sticks */}
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 100 50"
          to="-10 100 50"
          begin="1.2s"
          dur="0.2s"
          fill="freeze"
        />
      </g>
    </svg>
  );
};

export default AnimatedPinpoint;
