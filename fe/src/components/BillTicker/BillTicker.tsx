import {
  fetchBillsByJurisdiction,
  fetchBillDetails,
} from "../../services/OpenStates/openStatesService";
import React, { useEffect, useRef, useState } from "react";
import "./BillTicker.css";
import { Bill, BillDetails, BillTickerProps } from "../../assets/types";
import { mockBills } from "../../utils/mockBillGenerator";

const BillTicker: React.FC<BillTickerProps> = ({ jurisdiction }) => {
  let hoverTimeout: NodeJS.Timeout | null = null;
  const billCache = new Map<string, BillDetails>();

  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredBill, setHoveredBill] = useState<BillDetails | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const tickerWrapperRef = useRef<HTMLDivElement | null>(null);

  const dummyBills: Bill[] = mockBills;

  useEffect(() => {
    if (!jurisdiction) return;

    setLoading(true);
    fetchBillsByJurisdiction(jurisdiction)
      .then((data) => {
        setBills(data);
        setTimeout(() => setIsVisible(true), 300); // Trigger slide-in effect
      })
      .catch((error) => console.error("Error fetching bills:", error))
      .finally(() => setLoading(false));
  }, [jurisdiction]);

  if (!bills || bills.length === 0) {
    setBills(dummyBills);
  }

  const handleMouseEnter = (_event: React.MouseEvent, bill: Bill) => {
    setIsPaused(true);
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
    }, 500); // Throttle API requests (prevents spamming)
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setHoveredBill(null);
  };

  const pauseTicker = () => {
    setIsPaused(true);
  };

  const playTicker = () => {
    setIsPaused(false);
  };

  const startDrag = (e: React.MouseEvent) => {
    if (!tickerWrapperRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tickerWrapperRef.current.offsetLeft);
    setScrollLeft(tickerWrapperRef.current.scrollLeft);
  };

  const onDragging = (e: React.MouseEvent) => {
    if (!isDragging || !tickerWrapperRef.current) return;
    const x = e.pageX - tickerWrapperRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust speed
    tickerWrapperRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => setIsDragging(false);

  if (loading)
    return <div className="ticker-loading">Loading latest bills...</div>;
  if (!bills.length)
    return <div className="ticker-no-results">No recent bills found.</div>;

  return (
    <div
      className={`ticker-container ${isVisible ? "visible" : "hidden"}`}
      onMouseEnter={pauseTicker}
      onMouseDown={startDrag}
      onMouseMove={onDragging}
      onMouseUp={stopDrag}
      onMouseLeave={playTicker}
    >
      <div className="ticker-wrapper" ref={tickerWrapperRef}>
        <div className={`ticker-content ${isPaused ? "paused" : ""}`}>
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
        <div ref={tooltipRef} className="bill-tooltip show">
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
