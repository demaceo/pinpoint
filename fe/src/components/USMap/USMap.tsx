/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  //   Feature,
  FeatureCollection,
  //   GeoJsonProperties,
  //   Geometry,
} from "geojson";
import geoJsonData from "./geoJSON.json";
import OfficialLink from "../OfficialLink/OfficialLink";
// import { fetchOfficialsByState } from "../../services/openStatesService";

const API_KEY = import.meta.env.VITE_OPENSTATES_API_KEY;

const USMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [representatives, setRepresentatives] = useState<any[]>([]);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 960;
    const height = 600;

    // Define projection
    const projection = d3
      .geoAlbersUsa()
      .scale(1000)
      .translate([width / 2, height / 2]);
    const pathGenerator = d3.geoPath().projection(projection);

    // Select SVG element
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const geoJson: FeatureCollection = geoJsonData as FeatureCollection;

    // Create tooltip
    const tooltip = d3.select(tooltipRef.current);
    tooltip.text("");

    // Draw state boundaries
    const states = svg.selectAll(".state").data(geoJson.features);

    states
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("d", pathGenerator)
      .attr("fill", "#ccc")
      .attr("stroke", "#333")
      .attr("stroke-width", 1)
      .on("mouseover", function (_, d) {
        tooltip
          .style("visibility", "visible")
          .text(d.properties?.name ?? "Unknown State");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", `${event.pageY - 30}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
      });

    // Place state SVGs at centroid positions
    geoJson.features.forEach((state) => {
      const [x, y] = projection(d3.geoCentroid(state)) || [0, 0];

      svg
        .append("image")
        .attr("class", "state-svg")
        .attr("x", x - 20)
        .attr("y", y - 20)
        .attr("width", 40)
        .attr("height", 40)
        .attr(
          "xlink:href",
          `/StateSVGs/${state?.properties?.name.replace(/\s+/g, "_")}.svg`
        )
        .style("cursor", "pointer") // Add pointer cursor on hover
        .on("mouseover", function () {
          d3.select(this).style("filter", "brightness(1.5)");
          tooltip
            .style("visibility", "visible")
            .text(state.properties?.name || "Unknown State");
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", `${event.pageY - 30}px`)
            .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", function () {
          d3.select(this).style("filter", "none");
          tooltip.style("visibility", "hidden");
        })
        .on("click", function () {
          const stateName = state.properties?.name;
          setSelectedState(stateName);
          fetchStateRepresentatives(stateName);

          // Highlight the selected SVG while resetting others
          svg.selectAll(".state-svg").style("filter", "none"); // Reset all
          d3.select(this).style("filter", "drop-shadow(0px 0px 10px yellow)"); // Highlight selected
        });
    });
  }, [selectedState]);

  // Fetch representatives from OpenStates API
  const fetchStateRepresentatives = async (stateName: string) => {
    try {
      // fetchOfficialsByState(stateName)
      //   .then(setRepresentatives)
      //   .catch(console.error);
      const response = await fetch(
        `https://v3.openstates.org/people?jurisdiction=${stateName}&apikey=${API_KEY}&per_page=50`
      );
      const data = await response.json();
      setRepresentatives(data.results || []);
    } catch (error) {
      console.error("Error fetching representatives:", error);
    }
  };

  function setSelectedOfficial(rep: any): void {
    console.log("Selected official:", rep);
  }

  return (
    <div>
      {/* <div ref={tooltipRef} style={tooltipStyles}></div>
      <svg ref={svgRef}></svg> */}
      {selectedState && (
        <div>
          <h2>Elected Officials for {selectedState}</h2>
          <ul>
            {representatives.length > 0 ? (
              representatives.map((rep, index) => (
                <>
                  {" "}
                  {/* <li key={index}>
                    {rep.name} - {rep.party}
                  </li> */}
                  <OfficialLink
                    key={index}
                    official={rep}
                    index={index}
                    onSelect={() => setSelectedOfficial(rep)}
                  />
                </>
              ))
            ) : (
              <p>Loading representatives...</p>
            )}
          </ul>
          <button onClick={() => setSelectedState(null)}>Reset</button>
        </div>
      )}
      <div ref={tooltipRef} style={tooltipStyles}></div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

// Tooltip styles
const tooltipStyles: React.CSSProperties = {
  position: "absolute",
  backgroundColor: "black",
  color: "white",
  padding: "5px 10px",
  borderRadius: "4px",
  fontSize: "12px",
  visibility: "hidden",
  pointerEvents: "none",
//   display: "none",
};

export default USMap;
