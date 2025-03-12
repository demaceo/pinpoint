import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import OfficialsByLocation from "./pages/OfficialsByLocation/OfficialsByLocation.tsx";
// import Contact from "./pages/Contact/Contact.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import "./App.css";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
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

        {/* <Route
          path="/contact"
          element={
            <div className="app-container">
              <NavBar />
              <div className="main-content">
                <Contact />
              </div>
              <Footer />
            </div>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
