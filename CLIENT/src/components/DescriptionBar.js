import React from "react";
import "./DescriptionBar.css";

const DescriptionBar = () => {
  return (
    <div className="bar">
      <div className="bar__title">Title</div>
      <div className="bar__priority">Priority</div>
      <div className="bar__beginDate">BeginDate</div>
      <div className="bar__deadline">Deadline</div>
      <div className="bar__empty"></div>
    </div>
  );
};

export default DescriptionBar;
