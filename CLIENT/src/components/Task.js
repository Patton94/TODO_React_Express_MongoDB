import React, { useState, useEffect } from "react";
import "./Task.css";
import Edit from "./Edit";
import Delete from "./Delete";
import Done from "./Done";

const Task = (props) => {
  const [isDeadlineClose, setIsDeadlineClose] = useState(false);
  const [isExcedeed, setIsExcedeed] = useState(false);

  const time1 = new Date(props.deadline);
  const deadlineTime = time1.getTime() + 86400000;
  const time2 = new Date();
  const currentTime = time2.getTime();
  const differenceHours = (deadlineTime - currentTime) / 1000 / 60 / 60;

  useEffect(() => {
    if (differenceHours < 48 && differenceHours > 0) {
      setIsDeadlineClose(true);
    } else setIsDeadlineClose(false);
    if (differenceHours < 0) {
      setIsExcedeed(true);
    } else setIsExcedeed(false);
  }, []);

  return (
    <div
      className={
        !props.done ? (isExcedeed ? "task task__excedeed" : "task") : "task task__done"
      }
    >
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
      {/* <div className="task__deadline"> */}
      <div
        className={
          isDeadlineClose ? "task__deadline task__deadlineIsClose" : "task__deadline"
        }
      >
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
