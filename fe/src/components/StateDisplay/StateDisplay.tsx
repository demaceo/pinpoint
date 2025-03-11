import usStates from "../../assets/statesData.json";
import stateSvgMap from "../../utils/StateSvgsLoader.ts";
import './StateDisplay.css'

function StateDisplay({ selectedAbbr }: { selectedAbbr: string }) {
  const selectedObj = usStates.find((item) => item.abbr === selectedAbbr);
  if (!selectedObj) return null;

  const fileKey = selectedObj.state.replace(/\s/g, ""); 
  const svgPath = stateSvgMap[fileKey];

  return (
    <div className="stateDisplay-container">
      {svgPath ? (
        <img src={svgPath} alt={selectedObj.state} />
      ) : (
        <p>No SVG found for {selectedObj.state}</p>
      )}
    </div>
  );
}

export default StateDisplay;
