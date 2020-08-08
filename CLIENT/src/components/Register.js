import React, { useState } from "react";
import "./Register.css";

const RegisterModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={toggle} className="login">
        REGISTER
      </button>
      <div className={isOpen ? "register__active" : "register__background"}>
        <div className="register__modal">
          <div onClick={toggle} className="register__close">
            <span>X</span>
          </div>
          <h2 className="register__modalTitle">Register</h2>
          <form action="" className="register__form">
            <div className="register__container">
              <label for="user" className="register__label">
                User
              </label>
              <input id="user" type="text" className="register__user register__input" />
            </div>
            <div className="register__container">
              <label for="email" className="register__label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="register__email register__input"
              />
            </div>
            <div className="register__container">
              <label for="password" className="register__label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="register__password register__input"
              />
            </div>
            <div className="register__container">
              <label for="confirmPassword" className="register__label">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="register__password register__input"
              />
            </div>

            <input className="register__btn" type="submit" value="Register" />
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
