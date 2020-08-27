import React from "react";
import "./Task.css";
import Edit from "./Edit";
import Delete from "./Delete";
import Done from "./Done";

const Task = (props) => {
  return (
    <div className={!props.done ? "task" : "task task__done"}>
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
        {!props.done ? <span>{props.deadline}</span> : <span>{props.finishDate}</span>}
      </div>
      <div className="task__editButton">
        {!props.done ? (
          <Edit
            id={props.id}
            title={props.title}
            description={props.description}
            priority={props.priority}
            deadline={props.deadline}
          />
        ) : (
          <Delete id={props.id} title={props.title} />
        )}
      </div>
      <div className="task__deleteButton">
        {!props.done ? <Delete title={props.title} id={props.id} /> : ""}
      </div>
      <div className="task__doneButton">
        {!props.done ? <Done title={props.title} id={props.id} /> : ""}
      </div>
    </div>
  );
};

export default Task;
