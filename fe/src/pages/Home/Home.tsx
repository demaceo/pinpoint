import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home: React.FC = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold">Welcome to Pinpoint</h1>
      <p className="mt-2 text-lg">
        Engage with your elected officials and make your voice heard.
      </p>
      <Link
        to="/officials"
        className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded"
      >
        Find Your Representatives
      </Link>
    </div>
  );
};

export default Home;
