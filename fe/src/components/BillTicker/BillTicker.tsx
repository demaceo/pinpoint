import { fetchBills } from "../../services/OpenStates/fetchBills";
import React, { useEffect, useRef, useState } from "react";
import "./BillTicker.css";
import { Bill, BillTickerProps } from "../../assets/types";

const BillTicker: React.FC<BillTickerProps> = ({ jurisdiction }) => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
            <span key={index} className="ticker-item">
              <strong>{bill.identifier}</strong>: {bill.title} {" | "}
            </span>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default BillTicker;
