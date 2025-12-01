import React from "react";
import { Link } from "react-router-dom";

function Navbar({ currentUserEmail, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Accounts App
        </Link>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav ms-auto">
            {currentUserEmail ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Logged in as: <strong>{currentUserEmail}</strong>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
