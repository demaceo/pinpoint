import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          Pinpoint
        </Link>
        <div>
          <Link to="/officials" className="mx-4">
            Officials
          </Link>
          <Link to="/contact" className="mx-4">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
