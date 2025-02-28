import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Official {
  name: string;
}

const OfficialsGraph: React.FC<{ officials: Official[] }> = ({ officials }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!officials.length) return;

    const svg = d3
      .select(svgRef.current)
      .attr("width", 600)
      .attr("height", 400);

    const nodes = officials.map((official) => ({
      id: official.name,
      x: Math.random() * 600,
      y: Math.random() * 400,
    }));

    svg
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 20)
      .attr("fill", "steelblue")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
  }, [officials]);

  return <svg ref={svgRef}></svg>;
};

export default OfficialsGraph;
