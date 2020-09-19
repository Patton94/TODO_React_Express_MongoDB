import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import LoadingBar from "./LoadingBar";
import { UserContext } from "../context/userContext";
import { useTranslation } from "react-i18next";
import { AiOutlineLogin } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";

const Login = () => {
  const { userName, token, userID } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [tokenValue, setTokenValue] = token;
  const [userIDValue, setUserIDValue] = userID;
  const [t, i18n] = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, [width]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const fetchData = () => {
    const userToLog = {
      email,
      password,
    };

    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToLog),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "OK") {
          setUserNameValue(data.user.name);
          setTokenValue(data.token);
          setUserIDValue(data.user.id);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userName", data.user.name);
          localStorage.setItem("userID", data.user.id);
          setIsLoading(true); ////
          setEmail("");
          setPassword("");
          setIsLoggedIn(true);
          setTimeout(() => {
            toggle();
            setIsLoading(false); /////
            setIsLoggedIn(false);
            setLoginFailed("");
          }, 2000);
        } else
          return setLoginFailed(
            data.msg === "User does not exist"
              ? t("Login.NotExistError")
              : t("Login.CredentialsError")
          );
      });
  };

  const loginUser = (e) => {
    e.preventDefault();
    if (!email) setEmailError(t("Login.EmailError"));
    if (!password) setPasswordError(t("Login.PasswordError"));

    if (email && password && !emailError && !emailError) {
      fetchData();
    } else return;
  };

  return (
    <>
      {userNameValue && tokenValue ? (
        userNameValue
      ) : width < 450 ? (
        <button onClick={toggle} className="login">
          <AiOutlineLogin />
        </button>
      ) : (
        <button onClick={toggle} className="login">
          {t("Login.Login")} <AiOutlineLogin />
        </button>
      )}
      <div className={isOpen ? "login__active" : "login__background"}>
        {" "}
        <div className="login__modal">
          <div onClick={toggle} className="login__close">
            {/* <span>X</span> */}
            <GrFormClose className="login__closeIcon" />
          </div>
          <h2 className="login__modalTitle">{t("Login.ModalTitle")}</h2>
          <LoadingBar class={isLoading ? "loadingBar__on" : ""} />
          <form action="" className="login__form">
            <div className="login__container">
              <label className="login__label">Email</label>
              <input
                type="email"
                className="login__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => {
                  setEmailError("");
                  setLoginFailed(false);
                }}
              />
            </div>
            {emailError ? <span className="login__inputError">{emailError}</span> : ""}
            <div className="login__container">
              <label className="login__label">{t("Login.ModalPassword")}</label>
              <input
                type="password"
                className="login__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => {
                  setPasswordError("");
                  setLoginFailed(false);
                }}
              />
            </div>
            {passwordError ? (
              <span className="login__inputError">{passwordError}</span>
            ) : (
              ""
            )}

            {isLoggedIn ? (
              <h3 className="login__message">
                {t("Login.ModalHello")} {userNameValue}
              </h3>
            ) : (
              <input
                className="login__btn"
                type="submit"
                value={t("Login.ModalButton")}
                onClick={loginUser}
              />
            )}
            {loginFailed ? <h3 className="login__message">{loginFailed}</h3> : ""}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
