import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "../context/userContext";
import { useTranslation } from "react-i18next";
import { DarkThemeContext } from "../context/darkThemeContext";
import { AiOutlineLogout } from "react-icons/ai";
import logo from "../images/checked.png";
import logo__dark from "../images//checked1.png";

const Navbar = () => {
  const { userName, token, userID } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [tokenValue, setTokenValue] = token;
  const [, setUserIDValue] = userID;
  const [darkTheme] = useContext(DarkThemeContext);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, [width]);

  const [t] = useTranslation();

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
      <div className="nav__title">
        <div className="nav__logo">
          <div className="nav__logoImg">
            <img className="nav__img" src={darkTheme ? logo__dark : logo} alt="" />
          </div>

          <div className="nav__logoBar">
            <div
              className={darkTheme ? "nav__verticalBar dark" : "nav__verticalBar"}
            ></div>
          </div>

          <div className="nav__logoTitle">
            {width < 430 ? (
              <span className="nav__logoTitleText">
                by <span className="nav__logoSignature">M.G.</span>
              </span>
            ) : (
              <span className="nav__logoTitleText">
                TODO by <span className="nav__logoSignature">M.G.</span>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={darkTheme ? "nav__login dark" : "nav__login"}>
        <Login />
      </div>
      <div className={darkTheme ? "nav__register dark" : "nav__register"}>
        {userNameValue && tokenValue ? (
          width < 500 ? (
            <button
              onClick={logoutUser}
              className={darkTheme ? "nav__logout dark" : "nav__logout"}
            >
              <AiOutlineLogout />
            </button>
          ) : (
            <button
              onClick={logoutUser}
              className={darkTheme ? "nav__logout dark" : "nav__logout"}
            >
              {t("Navbar.Logout")}
            </button>
          )
        ) : (
          <Register />
        )}
      </div>
    </div>
  );
};

export default Navbar;
