// import React from "react";
import { Link } from "react-router-dom";
// import "./NavBar.css";
// const NavBar: React.FC = () => {
//   return (
//     <nav className="nav-wrapper">
//       <div className="nav-container">
//         <Link to="/" className="link nav-links-left link-home">
//           Pinpoint
//         </Link>
//         <div className="nav-links-right">
//           <Link to="/officials" className="link link-officials">
//             Officials
//           </Link>
//           <Link to="/contact" className="link link-contact">
//             Contact
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import React, { useState, useEffect } from "react";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Change navbar styles on scroll
    const handleScroll = () => {
      setScrolled(window.scrollY >= 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${
          menuOpen ? "menu-open" : ""
        }`}
      >
        {/* Logo */}
        <Link to="/" className="logo">
          <span>Pin</span>point
        </Link>

        {/* Menu Button */}
        <div className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="white-bar"></div>
          <div className="white-bar"></div>
          <div className="white-bar"></div>
          <div className="white-bar"></div>
        </div>
      </nav>
      {/* Dropdown Menu */}
      <div className={`the-bass ${menuOpen ? "menu-open" : ""}`}>
        <div className="rela-block drop-down-container">
          <Link to="/" className="drop-down-item">
            Home
          </Link>
        </div>
        <div className="rela-block drop-down-container">
          <Link to="/officials" className="drop-down-item">
            Officials
          </Link>
        </div>
        <div className="rela-block drop-down-container">
          <Link to="/contact" className="drop-down-item">
            Contact
          </Link>
        </div>

        {/* {[...Array(6)].map((_, index) => (
          <div key={index} className="drop-down-container">
            <div className="drop-down-item"></div>
          </div>
        ))} */}
      </div>
    </>
  );
};

export default NavBar;
