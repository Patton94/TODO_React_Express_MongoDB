import React, { useContext } from "react";
import "./LoadingBar.css";
import { DarkThemeContext } from "../context/darkThemeContext";

const LoadingBar = (props) => {
  const [darkTheme] = useContext(DarkThemeContext);
  return (
    <div className="loadingBar">
      <div
        className={
          darkTheme
            ? `loadingBar__inside ${props.class} dark`
            : `loadingBar__inside ${props.class}`
        }
      ></div>
    </div>
  );
};

export default LoadingBar;
