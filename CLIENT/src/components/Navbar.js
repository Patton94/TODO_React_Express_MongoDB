import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav__todo">
        <span>
          <a className="nav__a" href="/">
            TO DO
          </a>
        </span>
      </div>
      <div className="nav__login">
        <span>
          <a className="nav__a" href="/">
            Login
          </a>
        </span>
      </div>
      <div className="nav__register">
        <span>
          <a class="nav__a" href="/">
            Register
          </a>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
