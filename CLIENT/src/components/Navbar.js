import React, { useContext } from "react";
import "./Navbar.css";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const { userName, token, userID } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [tokenValue, setTokenValue] = token;
  const [userIDValue, setUserIDValue] = userID;

  const logoutUser = (e) => {
    e.preventDefault();
    setUserNameValue("");
    setTokenValue("");
    setUserIDValue("");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userID");

    // setItems - demo
  };

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
        {userNameValue && tokenValue ? (
          <button onClick={logoutUser} className="nav__logout">
            LOGOUT
          </button>
        ) : (
          <Register />
        )}
      </div>
    </div>
  );
};

export default Navbar;
