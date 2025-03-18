import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing.tsx";
import "./App.css";
import Country from "./pages/Country/Country.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import NeonSmoke from "./components/LoadingSpinner/NeonSmoke.tsx";

const App: React.FC = () => {
  const HomeLayout = () => (
    <div className="app-container">
      <NavBar />
      <div className="main-content">
        <Landing />
      </div>
      <Footer />
    </div>
  );
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <div className="app-container">
              <NavBar />
              <div className="main-content">
                <NeonSmoke />
              </div>
              <Footer />
            </div>
          }
        />
        <Route path="/" element={<HomeLayout />} />
        <Route path="/near-you" element={<HomeLayout />} />
        <Route
          path="/map"
          element={
            <div className="app-container">
              <NavBar />
              <div className="main-content">
                <Country />
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
