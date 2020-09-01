import React from "react";
import "./LoadingBar.css";

const LoadingBar = (props) => {
  return (
    <div className="loadingBar">
      <div className={`loadingBar__inside ${props.class}`}></div>
    </div>
  );
};

export default LoadingBar;
