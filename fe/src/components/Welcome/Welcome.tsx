import React from "react";
import "./Welcome.css";
import AnimatedPinpoint from "../../assets/pins/AnimatedPinpoint";

const Welcome: React.FC = () => {
  return (
    <>
      <h1 className="home-title">Welcome to Pinpoint <AnimatedPinpoint/></h1>
      <p className="home-welcome">
        Engage with <span className="fancy-font">your</span> elected
        representatives and make <span className="fancy-font">your </span> voice
        heard.
      </p>
    </>
  );
};

export default Welcome;
