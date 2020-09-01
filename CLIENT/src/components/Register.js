import React, { useState, useContext } from "react";
import "./Register.css";
import LoadingBar from "./LoadingBar";
import { UserContext } from "../context/userContext";

const Register = () => {
  const { userName, token, userID } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [userIDValue, setUserIDValue] = userID;
  const [tokenValue, setTokenValue] = token;

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

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log(userNameValue);
    console.log(userIDValue);
    console.log(tokenValue);
  };

  // Fetch data - post
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
        } else return setRegistrationFailed(data.msg);
      });
  };

  const addUser = (e) => {
    e.preventDefault();
    if (!name) setNameError("This field cannot be empty!");
    if (!email) setEmailError("This field cannot be empty");
    if (!email.includes("@")) setEmailError("Invalid email adress");
    if (!password) setPasswordError("This field cannot be empty");
    if (!passwordConfirm) setPasswordConfirmError("This field cannot be empty!");
    if (password !== passwordConfirm) setPasswordError("Passwords are not the same");

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
      <button onClick={toggle} className="register">
        REGISTER
      </button>
      <div className={isOpen ? "register__active" : "register__background"}>
        <div className="register__modal">
          <div onClick={toggle} className="register__close">
            <span>X</span>
          </div>
          <h2 className="register__modalTitle">Register</h2>
          <LoadingBar class={isLoading ? "loadingBar__on" : ""} />
          <form action="" className="register__form">
            <div className="register__container">
              <label htmlFor="user" className="register__label">
                User
              </label>
              <input
                id="user"
                type="text"
                className="register__user register__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => {
                  setNameError("");
                }}
              />
            </div>
            {nameError ? nameError : ""}
            <div className="register__container">
              <label htmlFor="email" className="register__label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="register__email register__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => {
                  setEmailError("");
                }}
              />
            </div>
            {emailError ? emailError : ""}
            <div className="register__container">
              <label htmlFor="password" className="register__label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="register__password register__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => {
                  setPasswordError("");
                }}
              />
            </div>
            {passwordError ? passwordError : ""}
            <div className="register__container">
              <label htmlFor="confirmPassword" className="register__label">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="register__password register__input"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                onFocus={() => {
                  setPasswordConfirmError("");
                }}
              />
            </div>
            {passwordConfirmError ? passwordConfirmError : ""}
            {isRegistered ? (
              <h3>Registration succesfull!</h3>
            ) : (
              <input
                className="register__btn"
                type="submit"
                value="Register"
                onClick={addUser}
              />
            )}

            {registrationFailed ? <h3>{registrationFailed}</h3> : ""}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
