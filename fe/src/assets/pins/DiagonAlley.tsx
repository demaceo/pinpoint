const AnimatedPinpoint = () => {
  return (
    <svg
      width="50"
      height="100"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Group to animate both the pinhead and needle together */}
      <g>
        {/* Needle (Starts short, extends diagonally) */}
        <line
          x1="170" /* Bottom-right start */
          y1="190"
          x2="170"
          y2="190"
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
        >
          {/* Moves the needle diagonally */}
          <animate
            attributeName="x1"
            from="170"
            to="90"
            begin="0.5s"
            dur="0.8s"
            fill="freeze"
          />
          <animate
            attributeName="y1"
            from="190"
            to="150"
            begin="0.5s"
            dur="0.8s"
            fill="freeze"
          />
          <animate
            attributeName="x2"
            from="170"
            to="100"
            begin="0.5s"
            dur="0.8s"
            fill="freeze"
          />
          <animate
            attributeName="y2"
            from="190"
            to="50"
            begin="0.5s"
            dur="0.8s"
            fill="freeze"
          />
        </line>

        {/* Thumbtack Head (Moves diagonally & expands) */}
        <circle
          cx="170"
          cy="190"
          r="2"
          fill="red"
          stroke="black"
          strokeWidth="0"
        >
          {/* Moves diagonally up-left */}
          <animate
            attributeName="cx"
            from="170"
            to="100"
            begin="0.5s"
            dur="0.8s"
            fill="freeze"
          />
          <animate
            attributeName="cy"
            from="190"
            to="50"
            begin="0.5s"
            dur="0.8s"
            fill="freeze"
          />
          {/* Expands in size */}
          <animate
            attributeName="r"
            from="2"
            to="40"
            begin="0.5s"
            dur="0.8s"
            fill="freeze"
          />
          <animate
            attributeName="strokeWidth"
            from="0"
            to="3"
            begin="0.5s"
            dur="0.8s"
            fill="freeze"
          />
        </circle>
      </g>
    </svg>
  );
};

export default AnimatedPinpoint;
