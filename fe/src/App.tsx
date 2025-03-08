import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Officials from "./pages/Officials/Officials.tsx";
import OfficialsByLocation from "./components/OfficialsByLocation/OfficialsByLocation.tsx";

import Contact from "./pages/Contact/Contact.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import Footer from "./components/Footer/Footer.tsx";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
              <Officials />

              <Footer />
            </>
          }
        />
        <Route
          path="/officials"
          element={
            <>
              <NavBar />
              <OfficialsByLocation />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <NavBar />
              <Contact />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
