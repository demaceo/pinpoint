import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import "./App.css";
import OfficialsByLocation from "./pages/OfficialsByLocation/OfficialsByLocation.tsx";
import Country from "./pages/Country/Country.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import Footer from "./components/Footer/Footer.tsx";
// import NeonSmoke from "./components/LoadingSpinner/NeonSmoke.tsx";
import RandomLetter from "./components/LoadingSpinner/RandomLetter.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <div className="app-container">
              <NavBar />
              <div className="main-content">
                <RandomLetter />
               </div>
              <Footer />
            </div> 
          }
        />
        <Route
          path="/"
          element={
            <div className="app-container">
              <NavBar />
              <div className="main-content">
                <Home />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/yourofficials"
          element={
            <div className="app-container">
              <NavBar />
              <div className="main-content">
                <OfficialsByLocation />
              </div>
              <Footer />
            </div>
          }
        />

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
