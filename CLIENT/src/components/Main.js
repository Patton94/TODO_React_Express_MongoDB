import React, { useContext, useState, useEffect } from "react";
import "./Main.css";
import DescriptionBar from "./DescriptionBar";
import Task from "./Task";
import Add from "./Add";
import LoadingBar from "./LoadingBar";
import Sort from "./Sort";
import Search from "./Search";
import LanguageSwitcher from "./LanguageSwitcher";

import { TasksContext } from "../context/tasksContext";
import { UserContext } from "../context/userContext";
import { LoadingContext } from "../context/loadingContext";
import { SearchContext } from "../context/searchContext";
import { useTranslation } from "react-i18next";

const Main = () => {
  const [tasks, setTasks] = useContext(TasksContext);
  const { userName, userID, token } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [userIDValue, setUserIDValue] = userID;
  const [tokenValue, setTokenValue] = token;
  const [t, i18n] = useTranslation();

  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const [allDone, setAllDone] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const [filteredTasks, setFilteredTasks] = useContext(SearchContext);

  const falseTasks = filteredTasks.filter((task) => task.done == false);
  const doneTasks = filteredTasks.filter((task) => task.done == true);

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
      <LanguageSwitcher />

      <Search />

      <Add />

      <Sort />

      <DescriptionBar />

      <LoadingBar class={isLoading ? "loadingBar__on" : ""} />

      {!userIDValue ? (
        <span className="main__demoInfo">
          <p>{t("Main.Demo")}</p>
        </span>
      ) : (
        ""
      )}

      {allDone ? <h4 className="main__emptyList">{t("Main.AllDone")}</h4> : ""}
      {isEmpty ? <h4 className="main__emptyList">{t("Main.EmptyList")}</h4> : ""}

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
