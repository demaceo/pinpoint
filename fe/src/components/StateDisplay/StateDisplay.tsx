/* eslint-disable @typescript-eslint/no-explicit-any */
import usStates from "../../assets/statesData.json";
import stateSvgMap from "../../utils/StateSvgsLoader.ts";
import "./StateDisplay.css";

function StateDisplay({
  selectedAbbr,
  xstylesClass,
}: {
  selectedAbbr: string;
  xstylesClass: string;
}) {
  const selectedObj = usStates.find((item) => item.abbr === selectedAbbr);
  if (!selectedObj) return null;

  const fileKey = selectedObj.state.replace(/\s/g, "");
  const svgPath = stateSvgMap[fileKey];
  console.log(xstylesClass);
  return (
    <div className="stateDisplay-container">
      {svgPath ? (
        <img
          className={xstylesClass}
          src={svgPath}
          alt={selectedObj.state}
          // style={{ filter: `${xstylesClass})` }}
        />
      ) : (
        <p>No SVG found for {selectedObj.state}</p>
      )}
    </div>
  );
}

export default StateDisplay;
