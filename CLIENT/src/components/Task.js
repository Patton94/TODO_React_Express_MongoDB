import React, { useState, useEffect, useContext } from "react";
import "./Task.css";
import Edit from "./Edit";
import Delete from "./Delete";
import Done from "./Done";
import { HiDotsVertical } from "react-icons/hi";
import { GrFormClose } from "react-icons/gr";
import { DarkThemeContext } from "../context/darkThemeContext";

const Task = (props) => {
  const [isDeadlineClose, setIsDeadlineClose] = useState(false);
  const [isExcedeed, setIsExcedeed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [darkTheme] = useContext(DarkThemeContext);

  const time1 = new Date(props.deadline);
  const deadlineTime = time1.getTime() + 86400000;
  const time2 = new Date();
  const currentTime = time2.getTime();
  const differenceHours = (deadlineTime - currentTime) / 1000 / 60 / 60;

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (differenceHours < 48 && differenceHours > 0) {
      setIsDeadlineClose(true);
    } else setIsDeadlineClose(false);
    if (differenceHours < 0) {
      setIsExcedeed(true);
    } else setIsExcedeed(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, [width]);

  return (
    <div className="task">
      <div
        className={
          darkTheme
            ? props.done
              ? "task__titleContainer task__done dark"
              : isExcedeed
              ? "task__titleContainer task__excedeed dark"
              : "task__titleContainer dark"
            : props.done
            ? "task__titleContainer task__done"
            : isExcedeed
            ? "task__titleContainer task__excedeed"
            : "task__titleContainer"
        }
      >
        <div className="task__title">
          <h3 className="task__h3">{props.title}</h3>
        </div>
        <div className="task__description">
          <span>{props.description}</span>
        </div>
      </div>
      <div className={darkTheme ? "task__priority dark" : "task__priority"}>
        <span>{props.priority}</span>
      </div>
      <div className={darkTheme ? "task__beginDate dark" : "task__beginDate"}>
        <span>{props.beginDate}</span>
      </div>
      <div
        className={
          darkTheme
            ? isDeadlineClose
              ? "task__deadline task__deadlineIsClose dark"
              : "task__deadline dark"
            : isDeadlineClose
            ? "task__deadline task__deadlineIsClose"
            : "task__deadline"
        }
      >
        {!props.done ? <span>{props.deadline}</span> : <span>{props.finishDate}</span>}
      </div>
      {width < 800 ? (
        !props.done ? (
          <>
            <div className="task__dots" onClick={toggle}>
              <button
                className={darkTheme ? "task__dotsButton dark" : "task__dotsButton"}
              >
                <HiDotsVertical />
              </button>
            </div>
            <div className={isOpen ? "task__active" : "task__background"}>
              <div className={darkTheme ? "task__modal dark" : "task__modal"}>
                <div
                  onClick={toggle}
                  className={darkTheme ? "task__close dark" : "task__close"}
                >
                  <GrFormClose className="task__closeIcon" />
                </div>
                {!props.done ? (
                  <>
                    <div className="task__editButton">
                      <Edit
                        id={props.id}
                        title={props.title}
                        description={props.description}
                        priority={props.priority}
                        deadline={props.deadline}
                      />
                    </div>
                    <div className="task__deleteButtonModal">
                      <Delete id={props.id} title={props.title} />
                    </div>
                    <div className="task__doneButton">
                      <Done title={props.title} id={props.id} />
                    </div>
                  </>
                ) : (
                  <div className="task__deleteButton">
                    <Delete id={props.id} title={props.title} />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="task__deleteButton">
            <Delete
              className={width < 550 ? "delete__small" : ""}
              id={props.id}
              title={props.title}
            />
          </div>
        )
      ) : (
        <>
          {" "}
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
        </>
      )}
    </div>
  );
};

export default Task;
