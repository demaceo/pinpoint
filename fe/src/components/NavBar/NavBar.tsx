import { Link } from "react-router-dom";
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
          <Link to="/near-you" className="drop-down-item">
            Officials Near You
          </Link>
        </div>
        <div className="rela-block drop-down-container">
          <Link to="/map" className="drop-down-item">
            Map
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
