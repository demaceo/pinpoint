import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Officials = lazy(() => import("../Officials/Officials"));

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className={`${loading ? "loading-page" : "home-officials-page"}`}>
      <div className={`${loading ? "loading-container" : "home-container"}`}>
        <h1 className="home-title">Welcome to Pinpoint</h1>
        <p className="home-welcome">
          Engage with your elected officials and make your voice heard.
        </p>
        <Link to="/yourofficials" className="link-officials">
          Find Elected Representatives Near You
        </Link>
      </div>
      {/* <Officials location={false} setLoading={setLoading} /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Officials location={false} setLoading={setLoading} />
      </Suspense>
    </div>
  );
};

export default Home;
