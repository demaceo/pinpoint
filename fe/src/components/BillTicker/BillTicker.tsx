import {
  fetchBillsByJurisdiction,
  fetchBillDetails,
} from "../../requests/openStatesService";
import React, { useEffect, useRef, useState } from "react";
import "./BillTicker.css";
import { Bill, BillDetails, BillTickerProps } from "../../assets/types";
import { formatDate } from "../../utils/formatDate";
import { mockBills } from "../../utils/mockBillGenerator";

const BillTicker: React.FC<BillTickerProps> = ({ jurisdiction }) => {
  let hoverTimeout: NodeJS.Timeout | null = null;
  const billCache = new Map<string, BillDetails>();
  // const [pinnedBills, setPinnedBills] = useState<string[]>([]);

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
    // const savedBills = JSON.parse(localStorage.getItem("pinnedBills") || "[]");
    // setPinnedBills(savedBills.map((bill: Bill) => bill.id));
    fetchBillsByJurisdiction(jurisdiction)
      .then((data) => {
        setBills(data);
        setTimeout(() => setIsVisible(true), 600); // Trigger slide-in effect
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
    }, 1000); // Throttle API requests (prevents spamming)
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
              {/* {pinnedBills.includes(bill.id) && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="100"
                    cy="50"
                    r="40"
                    fill="gold"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <line
                    x1="100"
                    y1="90"
                    x2="100"
                    y2="190"
                    stroke="black"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              )} */}
              <strong>{bill.identifier}</strong>: {bill.title} {" | "}
            </span>
          ))}
        </div>
      </div>
      {hoveredBill && (
        <div ref={tooltipRef} className="bill-tooltip show">
          <p>
            <em>#ID_ </em>
            <strong>{hoveredBill.identifier}</strong>{" "}
          </p>
          <p>
            <em>Title_ </em>
            {hoveredBill.title}
          </p>
          {hoveredBill.session && hoveredBill.jurisdiction?.name ? (
            <p>
              <em>Session_ </em> {hoveredBill.session} (
              {hoveredBill.jurisdiction.name})
            </p>
          ) : (
            <p>
              <em>Session_</em> Not available
            </p>
          )}
          {hoveredBill.latest_action_description &&
          hoveredBill.latest_action_date ? (
            <p>
              <em>Last Action_</em> {hoveredBill.latest_action_description}{" "}
              <br />
              <em>On Date_</em> {formatDate(hoveredBill.latest_action_date)}
            </p>
          ) : (
            <p>
              <em>Last Action_</em> Not available
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BillTicker;
