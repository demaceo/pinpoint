// import { useEffect } from "react";
import usStates from "../../assets/statesData.json";
import stateSvgMap from "../../utils/StateSvgsLoader.ts";
import "./StateDisplay.css";
// import "../../pages/Officials/Officials.css";
// import { applyDynamicShadow } from "../../utils/applyDynamicShadow";

function StateDisplay({ selectedAbbr }: { selectedAbbr: string }) {
  const selectedObj = usStates.find((item) => item.abbr === selectedAbbr);
  if (!selectedObj) return null;

  const fileKey = selectedObj.state.replace(/\s/g, "");
  const svgPath = stateSvgMap[fileKey];

  // useEffect(() => {
  //   applyDynamicShadow();
  // }, [selectedAbbr]);

  return (
    <div className="stateDisplay-container">
      {svgPath ? (
        <img
          className='state-pic'
          src={svgPath}
          alt={selectedObj.state}
        />
      ) : (
        <p>No SVG found for {selectedObj.state}</p>
      )}
    </div>
  );
}

export default StateDisplay;
