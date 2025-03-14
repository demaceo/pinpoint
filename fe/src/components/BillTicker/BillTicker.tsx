import { fetchBills } from "../../services/OpenStates/fetchBills";
import React, { useEffect, useRef, useState } from "react";
import "./BillTicker.css";
import { Bill, BillDetails, BillTickerProps } from "../../assets/types";
import { fetchBillDetails } from "../../services/OpenStates/fetchBillDetails";

const BillTicker: React.FC<BillTickerProps> = ({ jurisdiction }) => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredBill, setHoveredBill] = useState<BillDetails | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!jurisdiction) return;
    setLoading(true);
    fetchBills({
      jurisdiction,
      perPage: 5, // Limit to 5 recent bills for display
      sort: "latest_action_desc",
    })
      .then((data) => setBills(data.results || []))
      .catch((error) => console.error("Error fetching bills:", error))
      .finally(() => setLoading(false));
  }, [jurisdiction]);

  // const handleMouseEnter = (event: React.MouseEvent, bill: Bill) => {
  //   setHoveredBill(bill);

  //   const tooltipWidth = tooltipRef.current?.offsetWidth || 250;
  //   const tooltipHeight = tooltipRef.current?.offsetHeight || 100;

  //   const newX = Math.min(
  //     event.clientX + 15,
  //     window.innerWidth - tooltipWidth - 10
  //   );
  //   const newY = Math.min(
  //     event.clientY + 15,
  //     window.innerHeight - tooltipHeight - 10
  //   );

  //   setTooltipPosition({ x: newX, y: newY });
  // };

    const handleMouseEnter = async (event: React.MouseEvent, bill: Bill) => {
      try {
        const billDetails = await fetchBillDetails(bill.id); // Fetch full details
        setHoveredBill(billDetails);
        console.log('hoverBill', hoveredBill)
        // Ensure tooltip stays inside viewport
        const tooltipWidth = tooltipRef.current?.offsetWidth || 250;
        const tooltipHeight = tooltipRef.current?.offsetHeight || 100;
        const newX = Math.min(
          event.clientX + 15,
          window.innerWidth - tooltipWidth - 10
        );
        const newY = Math.min(
          event.clientY + 15,
          window.innerHeight - tooltipHeight - 10
        );

        setTooltipPosition({ x: newX, y: newY });
      } catch (error) {
        console.error("Error loading bill details:", error);
      }
    };

  const handleMouseLeave = () => {
    setHoveredBill(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (tickerRef.current?.offsetLeft || 0));
    setScrollLeft(tickerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !tickerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (tickerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Speed factor
    tickerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (loading)
    return <div className="ticker-loading">Loading latest bills...</div>;
  if (!bills.length)
    return <div className="ticker-no-results">No recent bills found.</div>;

  return (
    <div className="ticker-container">
      <div
        className="ticker-wrapper"
        ref={tickerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className={`ticker-content ${isDragging ? "dragging" : ""}`}>
          {bills.map((bill, index) => (
            <span
              key={index}
              className="ticker-item"
              onMouseEnter={(e) => handleMouseEnter(e, bill)}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <strong>{bill.identifier}</strong>: {bill.title} {" | "}
            </span>
          ))}
        </div>
      </div>
      {/* ✅ Show tooltip only if hoveredBill exists */}
      {/* {hoveredBill && (
        <div
          ref={tooltipRef}
          className="bubble-tooltip show"
          style={{
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
          }}
        >
          <strong>{hoveredBill.identifier}</strong>
          <p>{hoveredBill.title}</p>
          {hoveredBill.session && (
            <p>
              <em>Session:</em> {hoveredBill.session}
            </p>
          )}
          {hoveredBill.latest_action_description && (
            <p>
              <em>Last Action:</em> {hoveredBill.latest_action_description} (
              {hoveredBill.latest_action_date})
            </p>
          )}
          {hoveredBill.abstracts && hoveredBill.abstracts.length > 0 && (
            <p>
              <em>Summary:</em> {hoveredBill.abstracts[0].abstract}
            </p>
          )}
          {hoveredBill.sponsorships && hoveredBill.sponsorships.length > 0 && (
            <p>
              <em>Sponsored by:</em>{" "}
              {hoveredBill.sponsorships.map((s) => s.name).join(", ")}
            </p>
          )}
        </div>
      )} */}

      {/* ✅ Expanded Tooltip with More Details */}
      {hoveredBill && (
        <div
          ref={tooltipRef}
          className="bubble-tooltip show"
          style={{
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
          }}
        >
          <strong>{hoveredBill.identifier}</strong>
          <p>{hoveredBill.title}</p>
          {hoveredBill.session && hoveredBill.jurisdiction && (
            <p>
              <em>Session:</em> {hoveredBill.session} (
              {hoveredBill.jurisdiction.name})
            </p>
          )}
          {hoveredBill.latest_action_description && (
            <p>
              <em>Last Action:</em> {hoveredBill.latest_action_description} (
              {hoveredBill.latest_action_date})
            </p>
          )}
          {hoveredBill.abstracts && hoveredBill.abstracts.length > 0 && (
            <p>
              <em>Summary:</em> {hoveredBill.abstracts[0].abstract}
            </p>
          )}
          {hoveredBill.sponsorships && hoveredBill.sponsorships.length > 0 && (
            <p>
              <em>Sponsored by:</em>{" "}
              {hoveredBill.sponsorships
                .map(
                  (s) =>
                    `${s.current_role?.title || ""} ${s.name} (${
                      s.party || "Unknown"
                    })`
                )
                .join(", ")}
            </p>
          )}
          {hoveredBill.related_bills &&
            hoveredBill.related_bills.length > 0 && (
              <p>
                <em>Related Bills:</em>{" "}
                {hoveredBill.related_bills
                  .map(
                    (b) =>
                      `${b.identifier} (${b.relation_type}, ${b.legislative_session})`
                  )
                  .join(", ")}
              </p>
            )}
          {hoveredBill.documents && hoveredBill.documents.length > 0 && (
            <p>
              <em>Documents:</em>{" "}
              {hoveredBill.documents.map((doc, i) => (
                <a
                  key={i}
                  href={doc.links[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc.note}
                </a>
              ))}
            </p>
          )}
          {hoveredBill.versions && hoveredBill.versions.length > 0 && (
            <p>
              <em>Versions:</em>{" "}
              {hoveredBill.versions.map((ver, i) => (
                <a
                  key={i}
                  href={ver.links[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ver.note}
                </a>
              ))}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BillTicker;
