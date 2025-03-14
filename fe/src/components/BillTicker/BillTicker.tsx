import { fetchBills } from "../../services/OpenStates/fetchBills";
import React, { useEffect, useRef, useState } from "react";
import "./BillTicker.css";
import { Bill, BillDetails, BillTickerProps } from "../../assets/types";
import { fetchBillDetails } from "../../services/OpenStates/fetchBillDetails";

const BillTicker: React.FC<BillTickerProps> = ({ jurisdiction }) => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredBill, setHoveredBill] = useState<BillDetails | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!jurisdiction) return;

    setLoading(true);
    fetchBills({
      jurisdiction,
      perPage: 5,
      sort: "latest_action_desc",
    })
      .then((data) => {
        setBills(data.results || []);
        console.log("Fetched Bills:", data.results); // Debugging
      })
      .catch((error) => console.error("Error fetching bills:", error))
      .finally(() => setLoading(false));
  }, [jurisdiction]);

  const handleMouseEnter = async (event: React.MouseEvent, bill: Bill) => {
    try {
      const billDetails = await fetchBillDetails(bill.id);
      setHoveredBill(billDetails);
      console.log("Fetched Bill Details:", billDetails); // Debugging

      // Ensure tooltip stays inside viewport
      const tooltipWidth = tooltipRef.current?.offsetWidth || 280;
      const tooltipHeight = tooltipRef.current?.offsetHeight || 150;
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

  if (loading)
    return <div className="ticker-loading">Loading latest bills...</div>;
  if (!bills.length)
    return <div className="ticker-no-results">No recent bills found.</div>;

  return (
    <div className="ticker-container">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {bills.map((bill, index) => (
            <span
              key={index}
              className="ticker-item"
              onMouseEnter={(e) => handleMouseEnter(e, bill)}
              onMouseLeave={handleMouseLeave}
            >
              <strong>{bill.identifier}</strong>: {bill.title} {" | "}
            </span>
          ))}
        </div>
      </div>
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

          {/* ✅ Ensure Session & Jurisdiction Exist */}
          {hoveredBill.session && hoveredBill.jurisdiction?.name ? (
            <p>
              <em>Session:</em> {hoveredBill.session} (
              {hoveredBill.jurisdiction.name})
            </p>
          ) : (
            <p>
              <em>Session:</em> Not available
            </p>
          )}

          {/* ✅ Ensure Latest Action Exists */}
          {hoveredBill.latest_action_description &&
          hoveredBill.latest_action_date ? (
            <p>
              <em>Last Action:</em> {hoveredBill.latest_action_description} (
              {hoveredBill.latest_action_date})
            </p>
          ) : (
            <p>
              <em>Last Action:</em> Not available
            </p>
          )}

          {/* ✅ Ensure Abstract Exists */}
          {hoveredBill.abstracts && hoveredBill.abstracts.length > 0 ? (
            <p>
              <em>Summary:</em>{" "}
              {hoveredBill.abstracts[0]?.abstract || "No summary available."}
            </p>
          ) : (
            <p>
              <em>Summary:</em> Not available
            </p>
          )}

          {/* ✅ Ensure Sponsors Exist */}
          {hoveredBill.sponsorships && hoveredBill.sponsorships.length > 0 ? (
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
          ) : (
            <p>
              <em>Sponsored by:</em> No sponsors listed
            </p>
          )}

          {/* ✅ Ensure Related Bills Exist */}
          {hoveredBill.related_bills && hoveredBill.related_bills.length > 0 ? (
            <p>
              <em>Related Bills:</em>{" "}
              {hoveredBill.related_bills
                .map(
                  (b) =>
                    `${b.identifier} (${b.relation_type}, ${b.legislative_session})`
                )
                .join(", ")}
            </p>
          ) : (
            <p>
              <em>Related Bills:</em> None found
            </p>
          )}

          {/* ✅ Ensure Documents Exist */}
          {hoveredBill.documents && hoveredBill.documents.length > 0 ? (
            <p>
              <em>Documents:</em>{" "}
              {hoveredBill.documents.map((doc, i) => (
                <a
                  key={i}
                  href={doc.links[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc.note || "View Document"}
                </a>
              ))}
            </p>
          ) : (
            <p>
              <em>Documents:</em> None available
            </p>
          )}

          {/* ✅ Ensure Bill Versions Exist */}
          {hoveredBill.versions && hoveredBill.versions.length > 0 ? (
            <p>
              <em>Versions:</em>{" "}
              {hoveredBill.versions.map((ver, i) => (
                <a
                  key={i}
                  href={ver.links[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ver.note || "View Version"}
                </a>
              ))}
            </p>
          ) : (
            <p>
              <em>Versions:</em> None available
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BillTicker;
