import React, { useState } from "react";
import "./Navbar.css";
import Login from "./Login";
import Register from "./Register";

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
        <Login />
      </div>
      <div className="nav__register">
        <Register />
      </div>
    </div>
  );
};

export default Navbar;
