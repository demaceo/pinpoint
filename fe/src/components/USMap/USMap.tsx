/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { FeatureCollection } from "geojson";
// import geoJsonData from "./geoJSON.json";
import geoData from "../../assets/geoData.json";
import OfficialLink from "../OfficialLink/OfficialLink";
import "./USMap.css";

const API_KEY = import.meta.env.VITE_OPENSTATES_API_KEY;
const stateSvgs = import.meta.glob("/src/StateSVGs/*.svg", { eager: true });

const getStateSvg = (stateName?: string) => {
  if (!stateName) return "";
  const fileName = stateName.replace(/\s+/g, "_") + ".svg";
  return (
    (stateSvgs[`/src/StateSVGs/${fileName}`] as { default: string })?.default ||
    ""
  );
};

const USMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [representatives, setRepresentatives] = useState<any[]>([]);

  useEffect(() => {
    if (!svgRef.current) return;
    const width = 800;
    const height = 750;

    // Define projection
    const projection = d3
      .geoAlbersUsa()
      .scale(1500)
      .translate([width / 2, height / 2]);
    const pathGenerator = d3.geoPath().projection(projection);

    // Select SVG element
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const geoJson: FeatureCollection = geoData as FeatureCollection;

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
      .attr("fill", "transparent")
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

    geoJson.features.forEach((state) => {
      const stateName = state.properties?.name;
      if (!stateName) return;
      const [x, y] = projection(d3.geoCentroid(state)) || [0, 0];

      svg
        .append("image")
        .attr("class", "state-svg")
        .attr("x", x - 20)
        .attr("y", y - 20)
        .attr("width", 70)
        .attr("height", 70)
        .attr("fill", "#fff")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("xlink:href", getStateSvg(stateName))
        .attr("key", (_d: any, i: number) => `state-svg-${i}`)
        .style("cursor", "pointer")
        .on("mouseover", function () {
          // d3.select(this).style("filter", "brightness(2.5)");
          d3.select(this).style("filter", "drop-shadow(0px 2px 7px orange)");
          tooltip
            .text("")
            .style("visibility", "visible")
            .style("display", "")
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
          tooltip.style("display", "none").text("");
        })
        .on("click", function () {
          const stateName = state.properties?.name;
          setSelectedState(stateName);
          fetchStateRepresentatives(stateName);
          svg.selectAll(".state-svg").style("filter", "none");
          d3.select(this).style("filter", "drop-shadow(0px 0px 10px yellow)");
        });
    });
  }, [selectedState]);

  const fetchStateRepresentatives = async (stateName: string) => {
    try {
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
    <div className="usmap-page">
      {selectedState && (
        <div className="usmap-results-container">
          <h2>Elected Officials for {selectedState}</h2>
          <ul className="officials-list">
            {representatives.length > 0 ? (
              representatives.map((rep, index) => (
                <OfficialLink
                  key={index}
                  official={rep}
                  index={index}
                  onSelect={() => setSelectedOfficial(rep)}
                />
              ))
            ) : (
              <p>Loading representatives...</p>
            )}
          </ul>
          <button onClick={() => setSelectedState(null)}>Reset</button>
        </div>
      )}
      <div ref={tooltipRef} className="state-tooltip" style={tooltipStyles}></div>
      <svg className="usmap-container" ref={svgRef}></svg>
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
  content: "",
};

export default USMap;
