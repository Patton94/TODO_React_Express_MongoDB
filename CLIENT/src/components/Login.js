import React, { useState } from "react";
import "./Login.css";

const Login = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggle} className="login">
        LOGIN
      </button>
      <div className={isOpen ? "login__active" : "login__background"}>
        {" "}
        <div className="login__modal">
          <div onClick={toggle} className="login__close">
            <span>X</span>
          </div>
          <h2 className="login__modalTitle">Login</h2>
          <form action="" className="login__form">
            <div className="login__container">
              <label htmlFor="user" className="login__label">
                User
              </label>
              <input id="user" type="text" className="login__user login__input" />
            </div>
            <div className="login__container">
              <label htmlFor="password" className="login__label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="login__password login__input"
              />
            </div>

            <input className="login__btn" type="submit" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
