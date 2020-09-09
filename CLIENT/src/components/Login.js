import React, { useState, useContext } from "react";
import "./Login.css";
import LoadingBar from "./LoadingBar";
import { UserContext } from "../context/userContext";
import { useTranslation } from "react-i18next";
import { AiOutlineLogin } from "react-icons/ai";

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
      ) : (
        <button onClick={toggle} className="login">
          {t("Login.Login")} <AiOutlineLogin />
        </button>
      )}
      <div className={isOpen ? "login__active" : "login__background"}>
        {" "}
        <div className="login__modal">
          <div onClick={toggle} className="login__close">
            <span>X</span>
          </div>
          <h2 className="login__modalTitle">{t("Login.ModalTitle")}</h2>
          <LoadingBar class={isLoading ? "loadingBar__on" : ""} />
          <form action="" className="login__form">
            <div className="login__container">
              <label htmlFor="user" className="login__label">
                Email
              </label>
              <input
                id="user"
                type="email"
                className="login__user login__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => {
                  setEmailError("");
                  setLoginFailed(false);
                }}
              />
            </div>
            {emailError ? emailError : ""}
            <div className="login__container">
              <label htmlFor="password" className="login__label">
                {t("Login.ModalPassword")}
              </label>
              <input
                id="password"
                type="password"
                className="login__password login__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => {
                  setPasswordError("");
                  setLoginFailed(false);
                }}
              />
            </div>
            {passwordError ? passwordError : ""}

            {isLoggedIn ? (
              <h3>
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
            {loginFailed ? <h3>{loginFailed}</h3> : ""}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
