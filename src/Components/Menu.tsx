import React from "react";
import { Link } from "react-router-dom";

// Project:     Reactjs Practice
// Module:      View Module
// Component:   Menu Component
// Author:      Advyta
// Date:        22 Nov 2024
// Logic:
// This component renders a Navbar. It helps the user navigate between pages: Homepage and View


const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item px-3">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/students"
              >
                View Students
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
