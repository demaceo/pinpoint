import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Landing.css";
import Welcome from "../../components/Welcome/Welcome.tsx";

const Officials = lazy(
  () => import("../../components/Officials/Officials.tsx")
);

const Landing: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const currentEndpoint = useLocation();
  const isNearYouPage = currentEndpoint.pathname === "/near-you";
  const [headerText, setHeaderText] = useState<string>("");
  const [linkText, setLinkText] = useState<string>("");

  useEffect(() => {
    if (isNearYouPage) {
      setHeaderText("Elected Representatives Near You");
      setLinkText("Find Elected Representatives by State");
    } else {
      setHeaderText("Elected Representatives in:");
      setLinkText("Find Elected Representatives Near You");
    }
  }, [isNearYouPage]);

  return (
    <div className={`${loading ? "loading-page" : "home-officials-page"}`}>
      <div className={`${loading ? "loading-container" : "home-container"}`}>
        <Welcome />
        <Link to={isNearYouPage ? "/" : "/near-you"} className="link-officials">
          {linkText}
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Officials
          isNearYouPage={isNearYouPage}
          setLoading={setLoading}
          headerText={headerText}
        />
      </Suspense>
    </div>
  );
};

export default Landing;
