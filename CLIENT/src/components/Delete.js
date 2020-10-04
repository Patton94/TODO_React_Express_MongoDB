import React, { useContext } from "react";
import "./Delete.css";
import { TasksContext } from "../context/tasksContext";
import { UserContext } from "../context/userContext";
import { LoadingContext } from "../context/loadingContext";
import { MdDelete } from "react-icons/md";
import { DarkThemeContext } from "../context/darkThemeContext";

const Delete = (props) => {
  const [tasks, setTasks] = useContext(TasksContext);
  const [, setIsLoading] = useContext(LoadingContext);
  const [darkTheme] = useContext(DarkThemeContext);

  const { userID, token } = useContext(UserContext);
  const [userIDValue] = userID;
  const [tokenValue] = token;

  const getData = () => {
    fetch(`https://todomg.herokuapp.com/api/items/${userIDValue}`, {
      method: "GET",
      headers: {
        "x-auth-token": `${tokenValue}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  const deleteTask = () => {
    setIsLoading(true);
    fetch(`https://todomg.herokuapp.com/api/items/${userIDValue}/delete/${props.title}`, {
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

  const deleteDemoTask = () => {
    const dTasks = [...tasks];
    const index = dTasks.findIndex((task) => task._id === props.id);
    dTasks.splice(index, 1);
    setTasks(dTasks);
  };

  const handleDeleteTask = () => {
    userIDValue ? deleteTask() : deleteDemoTask();
  };

  return (
    <button
      onClick={handleDeleteTask}
      className={
        darkTheme
          ? props.className
            ? `${props.className} dark`
            : "delete dark"
          : props.className
          ? `${props.className}`
          : "delete"
      }
    >
      <MdDelete />
    </button>
  );
};

export default Delete;
