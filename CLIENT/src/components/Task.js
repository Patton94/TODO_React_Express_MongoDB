import React from "react";
import "./Task.css";

const Task = () => {
  return (
    <div className="task">
      <div className="task__titleContainer">
        <div className="task__title">
          <h3 className="task__h3">Title</h3>
        </div>
        <div className="task__description">
          <span>Description</span>
        </div>
      </div>
      <div className="task__priority">
        <span>Priority</span>
      </div>
      <div className="task__beginDate">
        <span>Begin date</span>
      </div>
      <div className="task__deadline">
        <span>Deadline</span>
      </div>
      <div className="task__editButton">
        <button className="task__edit">Edit</button>
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
