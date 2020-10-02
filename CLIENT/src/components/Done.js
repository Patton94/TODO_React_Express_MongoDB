import React, { useContext } from "react";
import "./Done.css";
import { TasksContext } from "../context/tasksContext";
import { UserContext } from "../context/userContext";
import { LoadingContext } from "../context/loadingContext";
import { MdDone } from "react-icons/md";
import { DarkThemeContext } from "../context/darkThemeContext";

const Done = (props) => {
  const { userID, token } = useContext(UserContext);
  const [userIDValue] = userID;
  const [tokenValue] = token;

  const [tasks, setTasks] = useContext(TasksContext);
  const [, setIsLoading] = useContext(LoadingContext);
  const [darkTheme] = useContext(DarkThemeContext);

  const getData = () => {
    fetch(`http://localhost:5000/api/items/${userIDValue}`, {
      method: "GET",
      headers: {
        "x-auth-token": `${tokenValue}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  const doneTask = () => {
    setIsLoading(true);
    fetch(`http://localhost:5000/api/items/${userIDValue}/edit/done/${props.title}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${tokenValue}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(
        setTimeout(() => {
          getData();
        }, 100)
      );
  };

  const doneDemoTask = () => {
    const currentDate = new Date();
    let date1 = new Date(currentDate);
    const finishDate = date1.toISOString().slice(0, 10);

    const dTasks = [...tasks];
    const index = dTasks.findIndex((task) => task._id === props.id);

    dTasks[index].done = true;
    dTasks[index].finishDate = finishDate;

    setTasks(dTasks);
  };

  const handleDoneTask = () => {
    userIDValue ? doneTask() : doneDemoTask();
  };

  return (
    <button onClick={handleDoneTask} className={darkTheme ? "done dark" : "done"}>
      <MdDone />
    </button>
  );
};

export default Done;
