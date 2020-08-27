import React, { useContext } from "react";
import "./Delete.css";
import { TasksContext } from "../context/tasksContext";
import { UserContext } from "../context/userContext";

const Delete = (props) => {
  const [tasks, setTasks] = useContext(TasksContext);

  const { userName, userID, token } = useContext(UserContext);
  const [userNameValue, setUserNameValue] = userName;
  const [userIDValue, setUserIDValue] = userID;
  const [tokenValue, setTokenValue] = token;

  const deleteTask = () => {
    fetch(`http://localhost:5000/api/items/${userIDValue}/delete/${props.title}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${tokenValue}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
    <button onClick={handleDeleteTask} className="delete">
      Delete
    </button>
  );
};

export default Delete;