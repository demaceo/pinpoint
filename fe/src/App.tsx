import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
// import Officials from "./pages/Officials.tsx";
import OfficialsByLocation from "./components/OfficialsByLocation";

import Contact from "./pages/Contact.tsx";
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx"
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
              <Footer />
            </>
          }
        />
        <Route
          path="/officials"
          element={
            <>
              <NavBar />
              {/* <Officials /> */}
              <OfficialsByLocation/>
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
