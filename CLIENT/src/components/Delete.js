import React, { useContext } from "react";
import "./Delete.css";
import { TasksContext } from "../context/tasksContext";
import { UserContext } from "../context/userContext";
import { LoadingContext } from "../context/loadingContext";
import { MdDelete } from "react-icons/md";

const Delete = (props) => {
  const [tasks, setTasks] = useContext(TasksContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const { userName, userID, token } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [userIDValue, setUserIDValue] = userID;
  const [tokenValue, setTokenValue] = token;

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

  const deleteTask = () => {
    setIsLoading(true);
    fetch(`http://localhost:5000/api/items/${userIDValue}/delete/${props.title}`, {
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
    const index = dTasks.findIndex((task) => task._id == props.id);
    dTasks.splice(index, 1);
    setTasks(dTasks);
  };

  const handleDeleteTask = () => {
    {
      userIDValue ? deleteTask() : deleteDemoTask();
    }
  };

  return (
    <button
      onClick={handleDeleteTask}
      className={props.className ? `${props.className}` : "delete"}
    >
      <MdDelete />
    </button>
  );
};

export default Delete;
