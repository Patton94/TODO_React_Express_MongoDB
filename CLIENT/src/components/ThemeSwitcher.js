import React, { useContext } from "react";
import "./ThemeSwitcher.css";
import { DarkThemeContext } from "../context/darkThemeContext";

const ThemeSwitcher = () => {
  const [darkTheme, setDarkTheme] = useContext(DarkThemeContext);

  const handleClick = (status) => {
    setDarkTheme(status);
    localStorage.setItem("darkTheme", status);
  };

  return (
    <div className="theme">
      <div className="theme__container">
        <button onClick={() => handleClick("")} className="theme__white"></button>
        <button onClick={() => handleClick("dark")} className="theme__black"></button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
