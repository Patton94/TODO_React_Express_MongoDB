import React from "react";
import "./Task.css";
import Edit from "./Edit";

const Task = (props) => {
  return (
    <div className="task">
      <div className="task__titleContainer">
        <div className="task__title">
          <h3 className="task__h3">{props.title}</h3>
        </div>
        <div className="task__description">
          <span>{props.description}</span>
        </div>
      </div>
      <div className="task__priority">
        <span>{props.priority}</span>
      </div>
      <div className="task__beginDate">
        <span>{props.beginDate}</span>
      </div>
      <div className="task__deadline">
        <span>{props.deadline}</span>
      </div>
      <div className="task__editButton">
        <Edit />
      </div>
      <div className="task__deleteButton">
        <button className="task__delete">Delete</button>
      </div>
      <div className="task__doneButton">
        {" "}
        <button className="task__done">Done</button>
      </div>
    </div>
  );
};

export default Task;
