import React, { useState, useContext, useEffect } from "react";
import "./Register.css";
import LoadingBar from "./LoadingBar";
import { UserContext } from "../context/userContext";
import { useTranslation } from "react-i18next";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";

const Register = () => {
  const { userName, token, userID } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [userIDValue, setUserIDValue] = userID;
  const [tokenValue, setTokenValue] = token;
  const [t, i18n] = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nameError, setNameError] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationFailed, setRegistrationFailed] = useState(false);
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
    const newUser = {
      name,
      email,
      password,
    };
    fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "OK") {
          setIsLoading(true);
          setName("");
          setEmail("");
          setPassword("");
          setPasswordConfirm("");
          setIsRegistered(true);
          setTimeout(() => {
            toggle();
            setIsLoading(false);
            setIsRegistered(false);
          }, 3000);
        } else return setRegistrationFailed(t("Register.ExistError"));
      });
  };

  const addUser = (e) => {
    e.preventDefault();
    if (!name) setNameError(t("Register.EmptyError"));
    if (!email) setEmailError(t("Register.EmptyError"));
    if (!email.includes("@")) setEmailError(t("Register.EmailError"));
    if (!password) setPasswordError(t("Register.EmptyError"));
    if (!passwordConfirm) setPasswordConfirmError(t("Register.EmptyError"));
    if (password !== passwordConfirm) setPasswordError(t("Register.ConfirmError"));

    if (
      name &&
      email &&
      email.includes("@") &&
      password === passwordConfirm &&
      password &&
      passwordConfirm &&
      !nameError &&
      !emailError &&
      !passwordError &&
      !passwordConfirmError
    ) {
      fetchData();
    } else return;
  };

  return (
    <>
      {width < 500 ? (
        <button onClick={toggle} className="register">
          <AiOutlineUserAdd />
        </button>
      ) : (
        <button onClick={toggle} className="register">
          {t("Register.Register")}
        </button>
      )}
      <div className={isOpen ? "register__active" : "register__background"}>
        <div className="register__modal">
          <div onClick={toggle} className="register__close">
            <GrFormClose className="register__closeIcon" />
          </div>
          <h2 className="register__modalTitle">{t("Register.ModalTitle")}</h2>
          <LoadingBar class={isLoading ? "loadingBar__on" : ""} />
          <form action="" className="register__form">
            <div className="register__container">
              <label className="register__label">{t("Register.ModalUser")}</label>
              <input
                type="text"
                className="register__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => {
                  setNameError("");
                }}
              />
            </div>
            {nameError ? <span className="register__inputError">{nameError}</span> : ""}
            <div className="register__container">
              <label className="register__label">Email</label>
              <input
                type="email"
                className="register__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => {
                  setEmailError("");
                  setRegistrationFailed(false);
                }}
              />
            </div>
            {emailError ? <span className="register__inputError">{emailError}</span> : ""}
            <div className="register__container">
              <label className="register__label">{t("Register.ModalPassword")}</label>
              <input
                type="password"
                className="register__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => {
                  setPasswordError("");
                }}
              />
            </div>
            {passwordError ? (
              <span className="register__inputError">{passwordError}</span>
            ) : (
              ""
            )}
            <div className="register__container">
              <label className="register__label">
                {t("Register.ModalConfirmPassword")}
              </label>
              <input
                type="password"
                className="register__input"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                onFocus={() => {
                  setPasswordConfirmError("");
                }}
              />
            </div>
            {passwordConfirmError ? (
              <span className="register__inputError">{passwordConfirmError}</span>
            ) : (
              ""
            )}
            {isRegistered ? (
              <h3 className="register__message">{t("Register.ModalMessage")}</h3>
            ) : (
              <input
                className="register__btn"
                type="submit"
                value={t("Register.ModalButton")}
                onClick={addUser}
              />
            )}

            {registrationFailed ? (
              <h3 className="register__message">{registrationFailed}</h3>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
