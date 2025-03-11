import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Officials from "../Officials/Officials";
const Home: React.FC = () => {
  return (
    <>
      <div className="home-container">
        <h1 className="home-title">Welcome to Pinpoint</h1>
        <p className="home-welcome">
          Engage with your elected officials and make your voice heard.
        </p>
        <Link to="/yourofficials" className="link-officials">
          Find Your Representatives
        </Link>
      </div>
      <Officials />
    </>
  );
};

export default Home;