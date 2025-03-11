import { Link } from "react-router-dom";
// import pinpoint from "../../assets/pinpoint5.avif";
import React, { useState, useEffect } from "react";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
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
        <Link to="/" className="logo">
          {/* <img src={pinpoint} /> */}
          <span>Pin</span>point
        </Link>

        {/* Menu Button */}
        <div className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="white-bar red"></div>
          <div className="white-bar blue"></div>
          <div className="white-bar red"></div>
          <div className="white-bar blue"></div>
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
          <Link to="/yourofficials" className="drop-down-item">
            Officials
          </Link>
        </div>
        <div className="rela-block drop-down-container">
          <Link to="/contact" className="drop-down-item">
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
