// import { fetchBills } from "../../services/OpenStates/fetchBills";
import {
  fetchBillsByJurisdiction,
  fetchBillDetails,
} from "../../services/OpenStates/openStatesService";

import React, { useEffect, useRef, useState } from "react";
import "./BillTicker.css";
import { Bill, BillDetails, BillTickerProps } from "../../assets/types";
// import { fetchBillDetails } from "../../services/OpenStates/fetchBillDetails";

const BillTicker: React.FC<BillTickerProps> = ({ jurisdiction }) => {
  let hoverTimeout: NodeJS.Timeout | null = null;
  const billCache = new Map<string, BillDetails>();

  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredBill, setHoveredBill] = useState<BillDetails | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false); // Track visibility

    useEffect(() => {
      if (!jurisdiction) return;

      setLoading(true);
      fetchBillsByJurisdiction(jurisdiction)
        .then((data) => {
          setBills(data);
          setTimeout(() => setIsVisible(true), 500); // Trigger slide-in effect
        })
        .catch((error) => console.error("Error fetching bills:", error))
        .finally(() => setLoading(false));
    }, [jurisdiction]);

  const handleMouseEnter = (_event: React.MouseEvent, bill: Bill) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);

    hoverTimeout = setTimeout(async () => {
      if (billCache.has(bill.id)) {
        setHoveredBill(billCache.get(bill.id)!);
      } else {
        try {
          const billDetails = await fetchBillDetails(bill.id);
          billCache.set(bill.id, billDetails);
          setHoveredBill(billDetails);
        } catch (error) {
          console.error("Error loading bill details:", error);
        }
      }
    }, 300); // Throttle API requests (prevents spamming)
  };

  const handleMouseLeave = () => {
    setHoveredBill(null);
  };

  if (loading)
    return <div className="ticker-loading">Loading latest bills...</div>;
  if (!bills.length)
    return <div className="ticker-no-results">No recent bills found.</div>;

  return (
    <div className={`ticker-container ${isVisible ? "visible" : "hidden"}`}>
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
        <div ref={tooltipRef} className="bubble-tooltip show">
          <strong>{hoveredBill.identifier}</strong>
          <p>{hoveredBill.title}</p>
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

          {/* Latest Action */}
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

          {/* Bill Summary (Abstracts) */}
          {hoveredBill.abstracts?.length ? (
            <p>
              <em>Summary:</em>{" "}
              {hoveredBill.abstracts[0]?.abstract || "No summary available."}
            </p>
          ) : (
            <p>
              <em>Summary:</em> Not available
            </p>
          )}

          {/* Sponsors */}
          {hoveredBill.sponsorships?.length ? (
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

          {/* Related Bills */}
          {hoveredBill.related_bills?.length ? (
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

          {/*  Documents */}
          {hoveredBill.documents?.length ? (
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

          {/*  Bill Versions */}
          {hoveredBill.versions?.length ? (
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
