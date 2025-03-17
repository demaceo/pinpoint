import React from "react";
import "./Country.css";
import USMap from "../../components/USMap/USMap";
const Country: React.FC = () => {
  return (
    <div className="contact-container">
      {/* <h1 className="">US Map</h1> */}
      <USMap />
    </div>
  );
};

export default Country;