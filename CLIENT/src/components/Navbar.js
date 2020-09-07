import React, { useContext } from "react";
import "./Navbar.css";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../context/userContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { userName, token, userID } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [tokenValue, setTokenValue] = token;
  const [userIDValue, setUserIDValue] = userID;

  const [t, i18n] = useTranslation();

  const logoutUser = (e) => {
    e.preventDefault();
    setUserNameValue("");
    setTokenValue("");
    setUserIDValue("");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
  };

  return (
    <div className="nav">
      <div className="nav__todo">
        <span>
          <a className="nav__a" href="/">
            {userIDValue ? t("Navbar.Title") : t("Navbar.DemoTitle")}
          </a>
        </span>
      </div>
      <div className="nav__login">
        <Login />
      </div>
      <div className="nav__register">
        {userNameValue && tokenValue ? (
          <button onClick={logoutUser} className="nav__logout">
            {t("Navbar.Logout")}
          </button>
        ) : (
          <Register />
        )}
      </div>
    </div>
  );
};

export default Navbar;
