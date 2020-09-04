import React, { useContext, useState, useEffect } from "react";
import "./Main.css";
import DescriptionBar from "./DescriptionBar";
import Task from "./Task";
import Add from "./Add";
import LoadingBar from "./LoadingBar";
import Sort from "./Sort";

import { TasksContext } from "../context/tasksContext";
import { UserContext } from "../context/userContext";
import { LoadingContext } from "../context/loadingContext";

const Main = () => {
  const [tasks, setTasks] = useContext(TasksContext);
  const { userName, userID, token } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [userIDValue, setUserIDValue] = userID;
  const [tokenValue, setTokenValue] = token;

  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const [allDone, setAllDone] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const falseTasks = tasks.filter((task) => task.done == false);
  const doneTasks = tasks.filter((task) => task.done == true);

  const checkIsDone = () => {
    if (doneTasks.length === tasks.length && tasks.length > 0) {
      setAllDone(true);
    } else setAllDone(false);
  };

  const checkIsEmpty = () => {
    if (tasks.length == 0) {
      setIsLoading(true);
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      setIsLoading(false);
    }

    setTimeout(() => {
      if (tasks.length == 0) {
        setIsLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    checkIsDone();
    checkIsEmpty();
  }, [tasks]);

  return (
    <div className="main">
      <Add />

      <Sort />

      <DescriptionBar />

      <LoadingBar class={isLoading ? "loadingBar__on" : ""} />

      {!userIDValue ? (
        <span className="main__demoInfo">
          This is demonstration mode. All changes will be removed after refreshing the
          page. To keep your own to do list, please log in.
        </span>
      ) : (
        ""
      )}

      {allDone ? (
        <h4 className="main__emptyList">
          All tasks have been completed, congratulations!
        </h4>
      ) : (
        ""
      )}
      {isEmpty ? (
        <h4 className="main__emptyList">Your tasks list is empty. Add some task. </h4>
      ) : (
        ""
      )}

      {falseTasks.map((task) => (
        <Task
          key={Math.floor(Math.random() * 999999)}
          id={task._id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          beginDate={task.beginDate.slice(0, 10)}
          deadline={task.deadline.slice(0, 10)}
        />
      ))}

      {doneTasks.map((task) => (
        <Task
          key={Math.floor(Math.random() * 999999)}
          id={task._id}
          title={task.title}
          done={task.done}
          description={task.description}
          beginDate={task.beginDate.slice(0, 10)}
          finishDate={task.finishDate.slice(0, 10)}
        />
      ))}
    </div>
  );
};

export default Main;
